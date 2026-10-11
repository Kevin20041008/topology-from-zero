"""Compare exact binary64 filtration endpoints with GUDHI, without a tolerance.

GUDHI independently constructs Rips simplices and reduces their boundary matrix.
The input edge values are shared, so this checks combinatorics/persistence, not
the accuracy of JavaScript Euclidean distances as approximations to real numbers.
"""
import json
import math
from pathlib import Path
import subprocess

import gudhi

ROOT = Path(__file__).resolve().parents[1]


def main():
    data = json.loads(subprocess.check_output(["node", "scripts/export_topology_cases.mjs"], cwd=ROOT, text=True))
    total_bars = 0
    for case in data["points"]:
        # Matrix entries are d/2 already, matching the browser epsilon parameter.
        if case["points"]:
            tree = gudhi.RipsComplex(distance_matrix=case["distances"], max_edge_length=math.inf).create_simplex_tree(max_dimension=2)
        else:
            tree = gudhi.SimplexTree()
        actual_simplices = {tuple(s): value for s, value in tree.get_filtration()}
        expected_simplices = {tuple(s["vertices"]): s["birth"] for s in case["filtration"]}
        assert actual_simplices == expected_simplices, f"{case['name']}: different filtered complex"
        persistence = tree.persistence(homology_coeff_field=2, min_persistence=0, persistence_dim_max=True)
        actual = sorted((dimension, birth, death) for dimension, (birth, death) in persistence if dimension <= 1)
        expected = sorted((d, b, math.inf if e == "infinity" else e) for d, b, e in case["bars"])
        # No isclose, rounding, lifetime cutoffs, or removal of short positive bars.
        assert actual == expected, f"{case['name']}: GUDHI {actual} != JavaScript {expected}"
        assert all(death > birth for _, birth, death in actual)
        total_bars += len(actual)
    for case in data["surfaces"]:
        tree = gudhi.SimplexTree()
        for simplex in case["simplices"]:
            tree.insert(simplex, filtration=0)
        tree.persistence(homology_coeff_field=2, min_persistence=0, persistence_dim_max=True)
        assert tree.betti_numbers() == case["betti"], f"{case['name']}: surface Betti mismatch"
    print(f"PASS GUDHI {gudhi.__version__}: {len(data['points'])} point clouds, {total_bars} H0/H1 intervals exactly equal; 3 abstract surface complexes")


if __name__ == "__main__":
    main()
