"""Original real-data course figures; fixed test IDs and seed, no training."""
import json
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
from data import ROOT,load_split


def main():
    record=json.loads((ROOT/"results"/"results.json").read_text())
    plt.rcParams.update({"font.family":"DejaVu Sans","font.size":9,"svg.fonttype":"path",
                         "svg.hashsalt":"topology-real-image-project-v1"})
    image,truth,ids=load_split("test")
    runs=[next(r for r in record["runs"] if r["seed"]==11 and r["euler_weight"]==weight)
          for weight in [0,.02]]
    predictions=[]
    for r in runs:
        with np.load(ROOT/"results"/r["prediction_file"]) as d:predictions.append(d["test"]>=.5)
    fig,axes=plt.subplots(2,4,figsize=(11,4.8),constrained_layout=True)
    for row in range(2):
        panels=[image[row],truth[row],predictions[0][row],predictions[1][row]]
        for j,(title,panel) in enumerate(zip(["Real fluorescence (coarsened)","Annotated foreground (coarsened)",
                                             "BCE + soft Dice","Baseline + expected Euler"],panels)):
            axes[row,j].imshow(panel,cmap="gray",vmin=0,vmax=1,interpolation="nearest")
            axes[row,j].set_xticks([]);axes[row,j].set_yticks([])
            if row==0:axes[row,j].set_title(title)
            if j==0:axes[row,j].set_ylabel(ids[row].split("_w")[0],fontsize=8)
            if j>=2:
                m=runs[j-2]["evaluation"]["test"]["images"][row]
                axes[row,j].set_xlabel(f"Dice={m['dice']:.3f}; beta=({m['beta0']},{m['beta1']})")
    fig.suptitle("BBBC039v1 (CC0): first two official-subset test IDs, seed 11\n"
                 "65 x 87 block-majority task; nuclei are not tube-like objects",fontsize=11)
    output=ROOT.parents[1]/"docs"/"ai"/"projects"/"image-topology-examples.svg"
    fig.savefig(output,metadata={"Date":None})
    fig.savefig(ROOT/"results"/"examples.png",dpi=130)
    plt.close(fig)
    fig,axes=plt.subplots(1,3,figsize=(11,3.2),constrained_layout=True)
    for weight,color in [(0,"#246d5b"),(.02,"#ae5a2b")]:
        selected=[r for r in record["runs"] if r["euler_weight"]==weight]
        for ax,key,title in zip(axes,["bce","soft_dice_loss","euler_proxy"],
                               ["Training BCE","Training soft-Dice loss","Training expected-Euler proxy"]):
            values=np.array([[p[key] for p in r["trajectory"]] for r in selected])
            mean,sd=values.mean(axis=0),values.std(axis=0,ddof=1)
            x=np.arange(1,values.shape[1]+1)
            ax.plot(x,mean,label=f"lambda={weight:g}",color=color)
            ax.fill_between(x,np.maximum(0,mean-sd),mean+sd,alpha=.15,color=color)
            ax.set_title(title);ax.set_xlabel("Update (measured before update)")
    axes[0].legend()
    fig.suptitle("3 initialization seeds; bands are sample SD, not dataset confidence intervals",fontsize=11)
    fig.savefig(ROOT.parents[1]/"docs"/"ai"/"projects"/"image-topology-training.svg",metadata={"Date":None})
    fig.savefig(ROOT/"results"/"training.png",dpi=130)
    plt.close(fig)
    for name in ["image-topology-examples.svg","image-topology-training.svg"]:
        path=ROOT.parents[1]/"docs"/"ai"/"projects"/name
        path.write_bytes(("\n".join(line.rstrip() for line in path.read_text(encoding="utf8").splitlines())+"\n").encode("utf8"))


if __name__=="__main__":
    main()
