"""Render original course figures from saved observations; no training or tuning."""
import argparse
import json
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

ROOT = Path(__file__).resolve().parent


def plot(path, output):
    record = json.loads(Path(path).read_text(encoding="utf-8"))
    colors = {0: "#246d5b", 1: "#ae5a2b"}
    plt.rcParams.update({"font.family": "DejaVu Sans", "font.size": 10,
                         "svg.fonttype": "path", "axes.spines.top": False,
                         "axes.spines.right": False, "svg.hashsalt": "topology-project-c-v1"})
    fig, axes = plt.subplots(2, 3, figsize=(12, 6.3), constrained_layout=True)
    for row, condition in enumerate(["connected", "disconnected"]):
        for weight in [0, 1]:
            runs = [r for r in record["runs"] if r["condition"] == condition and r["weight"] == weight]
            for column, (metric, title) in enumerate([
                ("bce", "Training BCE (before update)"),
                ("topological_proxy", "Training finite-bar penalty"),
                ("beta0_mae", "Validation beta0 absolute error")]):
                key = "validation_trajectory" if column == 2 else "trajectory"
                epochs = [p["epoch"] for p in runs[0][key]]
                values = np.array([[p[metric] for p in r[key]] for r in runs])
                mean, sd = values.mean(axis=0), values.std(axis=0, ddof=1)
                label = "BCE" if weight == 0 else "BCE + PH (lambda=1)"
                axes[row, column].plot(epochs, mean, color=colors[weight], label=label,
                                       linestyle="-" if weight == 0 else "--", linewidth=1.8)
                axes[row, column].fill_between(epochs, np.maximum(0, mean-sd), mean+sd,
                                               color=colors[weight], alpha=0.12)
                axes[row, column].set_title(title)
                axes[row, column].set_xlabel("Epoch")
                axes[row, column].grid(alpha=0.15)
        axes[row, 0].set_ylabel("Connected target" if row == 0 else "Disconnected target\n(incompatible prior)")
    axes[0, 0].legend(fontsize=8)
    fig.suptitle("Actual NumPy MLP training: 5 initialization seeds, fixed datasets\nBands: initialization sample SD; not dataset confidence intervals", fontsize=12)
    output = Path(output)
    output.parent.mkdir(parents=True, exist_ok=True)
    fig.savefig(output, metadata={"Date": None})
    # Matplotlib emits trailing spaces in SVG paths; keep generated diffs clean.
    if output.suffix.lower() == '.svg':
        output.write_text('\n'.join(line.rstrip() for line in output.read_text(encoding='utf-8').splitlines()) + '\n', encoding='utf-8', newline='\n')
    fig.savefig(ROOT / "results" / "trajectories.png", dpi=130)
    plt.close(fig)
    print(output)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--results", type=Path, default=ROOT / "results" / "raw-results.json")
    parser.add_argument("--output", type=Path,
                        default=ROOT.parents[1] / "docs/ai/projects/topology-optimization-trajectories.svg")
    args = parser.parse_args()
    plot(args.results, args.output)
