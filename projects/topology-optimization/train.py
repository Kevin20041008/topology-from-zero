"""Run a fixed protocol, save every run and raw predictions, without model selection."""
from __future__ import annotations

import argparse
import copy
import hashlib
import json
import os
from pathlib import Path
import platform
import sys
import time

# Set before NumPy import. The environment record makes override values visible.
os.environ.setdefault("OPENBLAS_NUM_THREADS", "1")
os.environ.setdefault("OMP_NUM_THREADS", "1")
os.environ.setdefault("MKL_NUM_THREADS", "1")
import numpy as np

from core import adam_update, evaluate, finite_loss_gradient, init_model, objective_gradient
from data import DATA_SEEDS, SPLIT_SIZES, canonical_bytes, digest, generate, save_data

ROOT = Path(__file__).resolve().parent


def run_one(condition, seed, weight, protocol, smoke=False):
    train = generate(condition, "train", 8 if smoke else None)
    validation = generate(condition, "validation", 4 if smoke else None)
    x, y = np.array(train["x"]), np.array(train["y"])
    vx, vy = np.array(validation["x"]), np.array(validation["y"])
    parameters = init_model(seed, protocol["vertices"], protocol["hidden"])
    first = {k: np.zeros_like(v) for k, v in parameters.items()}
    second = copy.deepcopy(first)
    previous = None
    trajectory = []
    validation_trajectory = [{"epoch": 0, **evaluate(parameters, vx, vy)[0]}]
    for epoch in range(1, protocol["epochs"] + 1):
        stats, gradients, signatures = objective_gradient(parameters, x, y, weight)
        switches = 0 if previous is None else sum(a != b for a, b in zip(previous, signatures))
        previous = signatures
        norm = float(np.sqrt(sum(np.sum(g * g) for g in gradients.values())))
        trajectory.append({"epoch": epoch, "measurement": "before_update",
                           **stats, "gradient_norm": norm,
                           "pair_signature_changed_samples": switches})
        adam_update(parameters, gradients, first, second, epoch, protocol["learning_rate"])
        if epoch % 10 == 0 or epoch == protocol["epochs"]:
            validation_trajectory.append({"epoch": epoch,
                                           **evaluate(parameters, vx, vy)[0]})
    # No test arrays are requested until the fixed final epoch has been reached.
    test = generate(condition, "test", 4 if smoke else None)
    tx, ty = np.array(test["x"]), np.array(test["y"])
    test_metrics, test_detail = evaluate(parameters, tx, ty)
    return {"condition": condition, "initialization_seed": seed, "weight": weight,
            "epochs": protocol["epochs"], "train_ids": train["ids"],
            "validation_ids": validation["ids"], "test_ids": test["ids"],
            "dataset_hashes": {"train": digest(train), "validation": digest(validation),
                               "test": digest(test)},
            "parameters": {k: v.tolist() for k, v in parameters.items()},
            "trajectory": trajectory, "validation_trajectory": validation_trajectory,
            "train_final": evaluate(parameters, x, y)[0],
            "validation_final": evaluate(parameters, vx, vy)[0],
            "test": test_metrics, "test_detail": test_detail}


def switching_case():
    c, h = 0.5, 2.0 ** -20
    cases = []
    for a, b in [(c - h, c), (c, c), (c + h, c)]:
        loss, gradient, signature, bars, essential = finite_loss_gradient([0, a, b, 0])
        cases.append({"a": a, "b": b, "loss": loss,
                      "selected_dq": gradient.tolist(), "signature": signature,
                      "finite_bars": bars, "essential": essential})
    base = cases[1]["loss"]
    return {"step": h, "cases": cases,
            "left_derivative_a": (base - cases[0]["loss"]) / h,
            "right_derivative_a": (cases[2]["loss"] - base) / h,
            "central_difference_a": (cases[2]["loss"] - cases[0]["loss"]) / (2 * h),
            "explanation": "At a=b=0.5 the ordinary gradient does not exist. The branch rule picks death vertex 2; right movement of vertex 1 is not described by that branch."}


def aggregate(runs):
    summary = []
    for condition in DATA_SEEDS:
        for weight in sorted({r["weight"] for r in runs}):
            selected = [r for r in runs if r["condition"] == condition and r["weight"] == weight]
            row = {"condition": condition, "weight": weight, "runs": len(selected)}
            for metric in selected[0]["test"]:
                values = [r["test"][metric] for r in selected]
                row[metric] = {"mean": float(np.mean(values)),
                               "sample_sd": float(np.std(values, ddof=1)) if len(values) > 1 else None,
                               "per_seed": values}
            row["pair_switches"] = [sum(t["pair_signature_changed_samples"] for t in r["trajectory"])
                                    for r in selected]
            summary.append(row)
    paired = []
    for condition in DATA_SEEDS:
        baseline = {r["initialization_seed"]: r for r in runs
                    if r["condition"] == condition and r["weight"] == 0}
        for r in runs:
            if r["condition"] == condition and r["weight"] != 0:
                b = baseline[r["initialization_seed"]]
                paired.append({"condition": condition, "seed": r["initialization_seed"],
                               "weight": r["weight"], "delta_convention": "topology_minus_baseline",
                               "test_delta": {k: r["test"][k] - b["test"][k] for k in r["test"]}})
    return {"groups": summary, "paired_deltas": paired,
            "uncertainty_scope": "Sample SD across initialization seeds on the SAME fixed test set; not a confidence interval over independent datasets or patients."}


def run_experiment(output, smoke=False):
    output = Path(output)
    output.mkdir(parents=True, exist_ok=True)
    protocol = json.loads((ROOT / "protocol.json").read_text(encoding="utf-8"))
    if smoke:
        protocol["epochs"] = 2
        protocol["initialization_seeds"] = [11]
    (output / "locked-protocol.json").write_bytes(canonical_bytes(protocol) + b"\n")
    start = time.perf_counter()
    runs = []
    for condition in protocol["conditions"]:
        for seed in protocol["initialization_seeds"]:
            for weight in protocol["weights"]:
                run = run_one(condition, seed, weight, protocol, smoke)
                runs.append(run)
                print(condition, "seed", seed, "weight", weight, "complete", flush=True)
    record = {"schema": 1, "smoke": smoke, "protocol": protocol,
              "protocol_sha256": digest(protocol), "runs": runs,
              "summary": aggregate(runs), "switching": switching_case(),
              "environment": {"python": sys.version, "numpy": np.__version__,
                              "platform": platform.platform(),
                              "thread_variables": {k: os.environ.get(k) for k in
                                  ["OPENBLAS_NUM_THREADS", "OMP_NUM_THREADS", "MKL_NUM_THREADS"]}},
              "runtime_seconds": time.perf_counter() - start,
              "source_hashes": {name: hashlib.sha256((ROOT / name).read_bytes()).hexdigest()
                                for name in ["core.py", "data.py", "train.py", "protocol.json"]}}
    (output / "raw-results.json").write_bytes(canonical_bytes(record) + b"\n")
    (output / "summary.json").write_text(json.dumps(record["summary"], indent=2) + "\n", encoding="utf-8")
    if not smoke:
        save_data(output / "data")
    print("Completed", len(runs), "runs in", round(record["runtime_seconds"], 2), "seconds", flush=True)
    return record


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=ROOT / "results")
    parser.add_argument("--smoke", action="store_true", help="2 epochs, 1 seed, small splits; not course results")
    args = parser.parse_args()
    run_experiment(args.output, args.smoke)
