"""Verify saved results; --rerun repeats the complete fixed training protocol.

No tolerance is used to change topology, interval membership, or stored outputs.
Exact rerun comparison is expected in the recorded environment; a different
NumPy/BLAS/platform can legitimately need a separately documented result set.
"""
import argparse
import hashlib
import json
from pathlib import Path

import numpy as np

from core import evaluate
from data import digest, generate
from train import ROOT, aggregate, run_one, switching_case


def verify(path, rerun=False):
    path = Path(path)
    record = json.loads(path.read_text(encoding="utf-8"))
    if record["smoke"]:
        raise AssertionError("Smoke results cannot stand in for the full saved experiment")
    protocol = json.loads((ROOT / "protocol.json").read_text(encoding="utf-8"))
    assert record["protocol"] == protocol
    assert record["protocol_sha256"] == digest(protocol)
    expected_runs = {(condition, seed, weight) for condition in protocol["conditions"]
                     for seed in protocol["initialization_seeds"] for weight in protocol["weights"]}
    seen_runs = {(r["condition"], r["initialization_seed"], r["weight"]) for r in record["runs"]}
    assert seen_runs == expected_runs and len(record["runs"]) == len(expected_runs)
    for name, expected in record["source_hashes"].items():
        assert hashlib.sha256((ROOT / name).read_bytes()).hexdigest() == expected, name
    assert record["switching"] == json.loads(json.dumps(switching_case()))
    for run in record["runs"]:
        all_ids = set()
        for split in ["train", "validation", "test"]:
            data = generate(run["condition"], split)
            stored = json.loads((path.parent / "data" / f'{run["condition"]}-{split}.json').read_text(encoding="utf-8"))
            assert stored == data
            assert digest(data) == run["dataset_hashes"][split]
            assert run[f"{split}_ids"] == data["ids"]
            assert not all_ids.intersection(data["ids"])
            all_ids.update(data["ids"])
            parameters = {key: np.array(value) for key, value in run["parameters"].items()}
            metrics, detail = evaluate(parameters, np.array(data["x"]), np.array(data["y"]))
            assert metrics == run["test" if split == "test" else f"{split}_final"]
            if split == "test":
                assert detail == run["test_detail"]
        assert len(run["trajectory"]) == protocol["epochs"]
        if rerun:
            fresh = run_one(run["condition"], run["initialization_seed"], run["weight"], protocol)
            assert fresh == run, (run["condition"], run["initialization_seed"], run["weight"])
            print("Exact rerun:", run["condition"], run["initialization_seed"], run["weight"], flush=True)
    assert aggregate(record["runs"]) == record["summary"]
    print("Verified saved data, hashes, all model metrics, raw predictions, protocol, and summary:", len(record["runs"]), "runs")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--results", type=Path, default=ROOT / "results" / "raw-results.json")
    parser.add_argument("--rerun", action="store_true")
    args = parser.parse_args()
    verify(args.results, args.rerun)
