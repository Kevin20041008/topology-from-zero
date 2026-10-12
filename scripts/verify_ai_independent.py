"""Cross-check closed-square masks with GUDHI cubical cells, and path filtrations.

No tolerance is used for homology or endpoints. This is a finite comparison,
not a proof for arbitrary images or of neural-network optimization success.
"""
import json
import math
from pathlib import Path
import subprocess
import gudhi
import numpy as np

ROOT = Path(__file__).resolve().parents[1]


def main():
    data = json.loads(subprocess.check_output(["node", "scripts/export_ai_cases.mjs"], cwd=ROOT, text=True))
    for i, case in enumerate(data["masks"]):
        # Pixels, not vertices, enter at zero. Their faces get minimum coface
        # value, yielding the same union of CLOSED foreground squares at s=0.
        cubical = gudhi.CubicalComplex(top_dimensional_cells=1 - np.array(case["mask"], dtype=float))
        cubical.persistence(homology_coeff_field=2, min_persistence=0)
        actual = cubical.persistent_betti_numbers(0, 0)
        assert actual[:2] == case["betti"], (i, actual, case["betti"])
        assert not any(actual[2:]), (i, actual)
    count = 0
    for case in data["paths"]:
        tree = gudhi.SimplexTree()
        for cell in case["filtration"]:
            tree.insert(cell["vertices"], filtration=cell["birth"])
        actual = sorted((dim, b, d) for dim, (b, d) in tree.persistence(
            homology_coeff_field=2, min_persistence=0, persistence_dim_max=True))
        expected = sorted((dim, b, math.inf if d == "infinity" else d) for dim, b, d in case["bars"])
        assert actual == expected, (case["values"], actual, expected)
        count += len(actual)
    print(f"PASS GUDHI {gudhi.__version__}: {len(data['masks'])} closed-square cubical masks; "
          f"{len(data['paths'])} lower-star paths, {count} intervals exactly equal")


if __name__ == "__main__":
    main()
