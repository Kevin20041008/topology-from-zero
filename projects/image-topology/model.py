"""Small shared pixel MLP, explicit gradients and fixed evaluation conventions."""
import numpy as np
from scipy.ndimage import uniform_filter
from skimage.morphology import skeletonize
from topology import betti,components,expected_euler_gradient


def features(images):
    channels=[]
    for image in images:
        h,w=image.shape
        pad=np.pad(image,1,mode="edge")
        f=[pad[dy:dy+h,dx:dx+w] for dy in range(3) for dx in range(3)]
        mean3=uniform_filter(image,size=3,mode="nearest")
        variance=np.maximum(0,uniform_filter(image**2,size=3,mode="nearest")-mean3**2)
        f.extend([uniform_filter(image,size=7,mode="nearest"),np.sqrt(variance),
                  uniform_filter(image,size=15,mode="nearest")])
        channels.append(np.stack(f,axis=-1)-0.5)
    return np.array(channels)


def init(seed,inputs=12,hidden=8):
    rng=np.random.default_rng(seed)
    return {"W1":rng.normal(0,1/np.sqrt(inputs),(inputs,hidden)),
            "b1":np.zeros(hidden),"W2":rng.normal(0,1/np.sqrt(hidden),(hidden,1)),
            "b2":np.zeros(1)}


def forward(parameters,x):
    h=np.tanh(x@parameters["W1"]+parameters["b1"])
    z=(h@parameters["W2"]+parameters["b2"])[...,0]
    p=np.empty_like(z)
    positive=z>=0
    p[positive]=1/(1+np.exp(-z[positive]))
    ez=np.exp(z[~positive])
    p[~positive]=ez/(1+ez)
    return p,h,z


def objective(parameters,x,y,target_euler,weight,dice_weight=0.5,smoothing=1.0):
    if weight<0 or not np.isfinite(weight): raise ValueError("nonnegative finite weight required")
    p,h,z=forward(parameters,x)
    n,height,width=p.shape
    pixels=height*width
    bce=float(np.mean(np.logaddexp(0,z)-y*z))
    intersection=(p*y).sum(axis=(1,2))
    numerator=2*intersection+smoothing
    denominator=p.sum(axis=(1,2))+y.sum(axis=(1,2))+smoothing
    dice=float(np.mean(1-numerator/denominator))
    dp=dice_weight*(numerator[:,None,None]-2*y*denominator[:,None,None])/(n*denominator[:,None,None]**2)
    euler_loss=0.0
    expected=[]
    for i in range(n):
        chi,g=expected_euler_gradient(p[i])
        delta=chi-target_euler[i]
        euler_loss+=delta*delta/(n*pixels)
        dp[i]+=weight*2*delta*g/(n*pixels)
        expected.append(chi)
    dz=(p-y)/(n*pixels)+dp*p*(1-p)
    flat_h=h.reshape(-1,h.shape[-1])
    flat_x=x.reshape(-1,x.shape[-1])
    flat_dz=dz.reshape(-1,1)
    dh=(flat_dz@parameters["W2"].T)*(1-flat_h**2)
    gradients={"W2":flat_h.T@flat_dz,"b2":flat_dz.sum(axis=0),
               "W1":flat_x.T@dh,"b1":dh.sum(axis=0)}
    return {"bce":bce,"soft_dice_loss":dice,"euler_proxy":float(euler_loss),
            "total":bce+dice_weight*dice+weight*euler_loss,
            "expected_euler":expected},gradients


def adam(parameters,grad,first,second,step,rate):
    for key in parameters:
        first[key]=0.9*first[key]+0.1*grad[key]
        second[key]=0.999*second[key]+0.001*grad[key]**2
        parameters[key]-=rate*(first[key]/(1-0.9**step))/(np.sqrt(second[key]/(1-0.999**step))+1e-8)


def metrics(mask,truth):
    mask,truth=np.asarray(mask,bool),np.asarray(truth,bool)
    n_pred,n_true=int(mask.sum()),int(truth.sum())
    dice=2*np.count_nonzero(mask&truth)/(n_pred+n_true) if n_pred+n_true else 1.0
    if not n_pred or not n_true:
        cldice=float(n_pred==n_true)
    else:
        skp,skt=skeletonize(mask),skeletonize(truth)
        npred,ntruth=np.count_nonzero(skp),np.count_nonzero(skt)
        if not npred or not ntruth:
            raise ValueError("nonempty mask produced an empty skeleton; clDice is undefined")
        precision=np.count_nonzero(skp&truth)/npred
        recall=np.count_nonzero(skt&mask)/ntruth
        cldice=2*precision*recall/(precision+recall) if precision+recall else 0.0
    b0,b1=betti(mask);t0,t1=betti(truth)
    sizes=components(mask,diagonal=True)
    true_sizes=components(truth,diagonal=True)
    largest=max(sizes,default=0)/n_pred if n_pred else 0.0
    true_largest=max(true_sizes,default=0)/n_true if n_true else 0.0
    return {"dice":float(dice),"cldice":float(cldice),
            "beta0":b0,"beta1":b1,"true_beta0":t0,"true_beta1":t1,
            "beta0_error":abs(b0-t0),"beta1_error":abs(b1-t1),
            "betti_exact":int((b0,b1)==(t0,t1)),
            "connected":int(b0==1),"connectivity_agreement":int((b0==1)==(t0==1)),
            "largest_component_fraction":float(largest),
            "largest_component_fraction_error":float(abs(largest-true_largest))}


def evaluate(parameters,x,y):
    p,_,_=forward(parameters,x)
    rows=[metrics(pred>=0.5,truth) for pred,truth in zip(p,y)]
    averages={key:float(np.mean([r[key] for r in rows])) for key in rows[0]}
    return averages,rows,p
