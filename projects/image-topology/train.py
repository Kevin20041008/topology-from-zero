"""Actual CPU training under the recorded fixed protocol; no best-run selection."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import platform
import sys
import time
os.environ.setdefault("OPENBLAS_NUM_THREADS","1")
os.environ.setdefault("OMP_NUM_THREADS","1")
os.environ.setdefault("MKL_NUM_THREADS","1")
import numpy as np
from data import ROOT,load_split,canonical,sha
from model import features,init,objective,adam,evaluate
from topology import betti


def run_one(seed,weight,protocol,smoke=False):
    images,y,train_ids=load_split("training")
    vi,vy,validation_ids=load_split("validation")
    if smoke:
        images,y,train_ids=images[:2],y[:2],train_ids[:2]
        vi,vy,validation_ids=vi[:2],vy[:2],validation_ids[:2]
    x,vx=features(images),features(vi)
    targets=np.array([b0-b1 for b0,b1 in map(betti,y)])
    parameters=init(seed,hidden=protocol["hidden"])
    first={k:np.zeros_like(v) for k,v in parameters.items()}
    second={k:np.zeros_like(v) for k,v in parameters.items()}
    trajectory=[];validation=[]
    for step in range(1,protocol["epochs"]+1):
        stats,g=objective(parameters,x,y,targets,weight,protocol["dice_weight"],protocol["dice_smoothing"])
        trajectory.append({"epoch":step,"measurement":"before_update",**stats,
                           "gradient_norm":float(np.sqrt(sum(np.sum(a*a) for a in g.values())))})
        adam(parameters,g,first,second,step,protocol["learning_rate"])
        if step%20==0 or step==protocol["epochs"]:
            validation.append({"epoch":step,**evaluate(parameters,vx,vy)[0]})
    # The test arrays are not loaded until the fixed final epoch.
    ti,ty,test_ids=load_split("test")
    if smoke:ti,ty,test_ids=ti[:2],ty[:2],test_ids[:2]
    tx=features(ti)
    prediction_arrays={}
    evaluations={}
    for split,fx,truth,ids in [("training",x,y,train_ids),("validation",vx,vy,validation_ids),("test",tx,ty,test_ids)]:
        avg,rows,p=evaluate(parameters,fx,truth)
        evaluations[split]={"mean":avg,"images":[{"id":name,**row} for name,row in zip(ids,rows)]}
        prediction_arrays[split]=p
    result={"seed":seed,"euler_weight":weight,"train_ids":train_ids,"validation_ids":validation_ids,
            "test_ids":test_ids,"parameters":{k:v.tolist() for k,v in parameters.items()},
            "trajectory":trajectory,"validation_trajectory":validation,"evaluation":evaluations}
    return result,prediction_arrays


def summarize(runs):
    summaries=[]
    keys=["dice","cldice","beta0_error","beta1_error","betti_exact","connectivity_agreement",
          "largest_component_fraction_error"]
    for weight in sorted({r["euler_weight"] for r in runs}):
        selected=[r for r in runs if r["euler_weight"]==weight]
        row={"euler_weight":weight,"runs":len(selected)}
        for key in keys:
            values=[r["evaluation"]["test"]["mean"][key] for r in selected]
            row[key]={"mean":float(np.mean(values)),
                      "initialization_sample_sd":float(np.std(values,ddof=1)) if len(values)>1 else None,
                      "per_seed":values}
        summaries.append(row)
    paired=[]
    for r in runs:
        if r["euler_weight"]==0:continue
        b=next(x for x in runs if x["seed"]==r["seed"] and x["euler_weight"]==0)
        paired.append({"seed":r["seed"],"euler_weight":r["euler_weight"],
                       "difference":"Euler model minus baseline",
                       **{k:r["evaluation"]["test"]["mean"][k]-b["evaluation"]["test"]["mean"][k] for k in keys}})
    return {"groups":summaries,"paired_seed_differences":paired,
            "scope":"Three initializations share SIX original test images. SD is initialization variation, not dataset generalization uncertainty."}


def run(output,smoke=False):
    output=Path(output);output.mkdir(parents=True,exist_ok=True)
    protocol=json.loads((ROOT/"protocol.json").read_text())
    if protocol["threshold"]!=.5 or protocol["block_size"]!=8 or protocol["raster_shape"]!=[65,87]:
        raise ValueError("these data/metric conventions require synchronized code and dataset changes")
    if smoke:protocol={**protocol,"epochs":2,"seeds":[11]}
    (output/"protocol.json").write_bytes(canonical(protocol)+b"\n")
    runs=[];start=time.perf_counter()
    for seed in protocol["seeds"]:
        for weight in protocol["euler_weights"]:
            result,pred=run_one(seed,weight,protocol,smoke)
            name=f"predictions-seed{seed}-weight{weight:g}.npz"
            np.savez_compressed(output/name,**pred)
            result["prediction_file"]=name
            result["prediction_sha256"]=sha((output/name).read_bytes())
            runs.append(result)
            print("Completed",seed,weight,result["evaluation"]["test"]["mean"],flush=True)
    source_names=["topology.py","model.py","data.py","train.py","protocol.json","sources.json"]
    report={"schema":1,"smoke":smoke,"protocol":protocol,"protocol_sha256":sha(canonical(protocol)),
            "data_manifest_sha256":sha((ROOT/"data"/"manifest.json").read_bytes()),
            "runs":runs,"summary":summarize(runs),
            "runtime_seconds":time.perf_counter()-start,
            "environment":{"python":sys.version,"numpy":np.__version__,"platform":platform.platform(),
                           "thread_variables":{k:os.environ.get(k) for k in
                                              ["OPENBLAS_NUM_THREADS","OMP_NUM_THREADS","MKL_NUM_THREADS"]}},
            "source_sha256":{n:sha((ROOT/n).read_bytes()) for n in source_names}}
    (output/"results.json").write_bytes(canonical(report)+b"\n")
    (output/"summary.json").write_bytes((json.dumps(report["summary"],indent=2)+"\n").encode("utf8"))
    print("Saved",len(runs),"runs",report["runtime_seconds"],"seconds",flush=True)
    return report


if __name__=="__main__":
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output",type=Path,default=ROOT/"results")
    parser.add_argument("--smoke",action="store_true")
    args=parser.parse_args()
    run(args.output,args.smoke)
