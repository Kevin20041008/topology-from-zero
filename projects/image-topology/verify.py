"""Read-only artifact verification; --rerun retrains all six recorded runs.

Exact archive checks target the recorded NumPy/BLAS environment. On another
platform first train to a NEW output directory, then verify that directory.
Do not weaken topology assertions to accommodate floating BLAS differences.
"""
import argparse
import json
import os
from pathlib import Path
# Must precede NumPy/BLAS initialization, as in train.py.
os.environ.setdefault("OPENBLAS_NUM_THREADS","1")
os.environ.setdefault("OMP_NUM_THREADS","1")
os.environ.setdefault("MKL_NUM_THREADS","1")
import numpy as np
from data import ROOT,canonical,sha,load_split
from model import features,evaluate
from train import run_one,summarize


def verify(path,rerun=False):
    path=Path(path)
    report=json.loads(path.read_text())
    if report["smoke"]:
        raise AssertionError("smoke is not the full course evidence")
    protocol=json.loads((ROOT/"protocol.json").read_text())
    assert report["protocol"]==protocol
    assert report["protocol_sha256"]==sha(canonical(protocol))
    assert report["data_manifest_sha256"]==sha((ROOT/"data"/"manifest.json").read_bytes())
    for file,digest in report["source_sha256"].items():
        assert sha((ROOT/file).read_bytes())==digest,file
    expected={(s,w) for s in protocol["seeds"] for w in protocol["euler_weights"]}
    assert {(r["seed"],r["euler_weight"]) for r in report["runs"]}==expected
    assert len(report["runs"])==len(expected)
    for r in report["runs"]:
        predfile=path.parent/r["prediction_file"]
        assert sha(predfile.read_bytes())==r["prediction_sha256"]
        parameters={k:np.array(v) for k,v in r["parameters"].items()}
        with np.load(predfile,allow_pickle=False) as saved:
            for split in ["training","validation","test"]:
                images,y,ids=load_split(split)
                avg,rows,p=evaluate(parameters,features(images),y)
                assert np.array_equal(p,saved[split])
                assert avg==r["evaluation"][split]["mean"]
                assert [{"id":name,**row} for name,row in zip(ids,rows)]==r["evaluation"][split]["images"]
        assert len(r["trajectory"])==protocol["epochs"]
        if rerun:
            fresh,pred=run_one(r["seed"],r["euler_weight"],protocol)
            original={k:v for k,v in r.items() if k not in ["prediction_file","prediction_sha256"]}
            assert fresh==original,(r["seed"],r["euler_weight"])
            with np.load(predfile,allow_pickle=False) as saved:
                assert all(np.array_equal(pred[s],saved[s]) for s in pred)
            print("Exact rerun",r["seed"],r["euler_weight"],flush=True)
    assert summarize(report["runs"])==report["summary"]
    print("PASS: six runs, 24 real-image records, all probabilities/metrics/hashes; rerun="+str(rerun))


if __name__=="__main__":
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--results",type=Path,default=ROOT/"results"/"results.json")
    parser.add_argument("--rerun",action="store_true")
    args=parser.parse_args()
    verify(args.results,args.rerun)
