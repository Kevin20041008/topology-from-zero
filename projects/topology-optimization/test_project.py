"""Correctness tests. Topology assertions are exact; tolerances only test derivatives."""
import itertools
import unittest

import numpy as np

from core import beta0, finite_loss_gradient, init_model, objective_gradient, path_h0
from data import DATA_SEEDS, SPLIT_SIZES, digest, generate
from train import run_one, switching_case


def independent_matrix_bars(q):
    """Independent full F2 column reduction on vertices/edges (not union-find)."""
    cells = [(float(v), (i,)) for i, v in enumerate(q)]
    cells += [(float(max(q[i], q[i + 1])), (i, i + 1)) for i in range(len(q) - 1)]
    cells.sort(key=lambda cell: (cell[0], len(cell[1]), cell[1]))
    indices = {simplex: i for i, (_, simplex) in enumerate(cells)}
    pivots, zero_columns, paired = {}, set(), set()
    bars = []
    for j, (death, simplex) in enumerate(cells):
        column = set() if len(simplex) == 1 else {indices[(v,)] for v in simplex}
        while column and max(column) in pivots:
            column.symmetric_difference_update(pivots[max(column)])
        if not column:
            zero_columns.add(j)
        else:
            birth_index = max(column)
            pivots[birth_index] = column
            paired.add(birth_index)
            birth = cells[birth_index][0]
            if death > birth:
                bars.append((birth, death))
    essential = [cells[i][0] for i in zero_columns - paired if len(cells[i][1]) == 1]
    return sorted(bars), sorted(essential)


class ProjectTests(unittest.TestCase):
    def test_exhaustive_pairing_and_thresholds(self):
        for q in itertools.product([0.0, 0.25, 1.0], repeat=5):
            bars, essential = path_h0(q)
            expected, infinite = independent_matrix_bars(q)
            self.assertEqual(sorted((b["birth"], b["death"]) for b in bars), expected)
            self.assertEqual([essential["birth"]], infinite)
            for scale in [-0.1, 0, 0.125, 0.25, 0.75, 1]:
                from_bars = int(essential["birth"] <= scale) + sum(
                    b["birth"] <= scale < b["death"] for b in bars)
                self.assertEqual(from_bars, beta0(np.array(q) <= scale))

    def test_short_intervals_and_underflow(self):
        for height in [1e-12, np.nextafter(0.0, 1.0)]:
            bars, essential = path_h0([0, height, 0])
            self.assertEqual(len(bars), 1)
            self.assertEqual((bars[0]["birth"], bars[0]["death"]), (0, height))
            self.assertEqual(essential["death"], None)
        self.assertEqual(path_h0([0, 0, 0])[0], [])
        self.assertEqual(path_h0([0.5])[0], [])

    def test_invalid_inputs(self):
        for q in [[], [np.nan], [np.inf], [-0.1], [1.1], [[0.2]]]:
            with self.assertRaises(ValueError):
                path_h0(q)

    def test_vertex_gradient_away_from_ties(self):
        rng = np.random.default_rng(216)
        for _ in range(20):
            q = rng.permutation(np.linspace(0.1, 0.9, 9)) + rng.uniform(-0.01, 0.01, 9)
            loss, gradient, signature, _, _ = finite_loss_gradient(q)
            h = 1e-6
            for j in range(len(q)):
                left, right = q.copy(), q.copy()
                left[j] -= h
                right[j] += h
                fl, _, sl, _, _ = finite_loss_gradient(left)
                fr, _, sr, _, _ = finite_loss_gradient(right)
                self.assertEqual(signature, sl)
                self.assertEqual(signature, sr)
                self.assertAlmostEqual((fr - fl) / (2*h), gradient[j], delta=2e-9)

    def test_full_network_gradient(self):
        rng = np.random.default_rng(903)
        x, y = rng.uniform(0, 1, (3, 5)), rng.integers(0, 2, (3, 5))
        parameters = init_model(19, vertices=5, hidden=4)
        _, gradient, signature = objective_gradient(parameters, x, y, 0.7)
        h = 1e-6
        for key, array in parameters.items():
            for index in np.ndindex(array.shape):
                original = array[index]
                array[index] = original + h
                right, _, sr = objective_gradient(parameters, x, y, 0.7)
                array[index] = original - h
                left, _, sl = objective_gradient(parameters, x, y, 0.7)
                array[index] = original
                self.assertEqual(signature, sr)
                self.assertEqual(signature, sl)
                self.assertAlmostEqual((right["total"]-left["total"])/(2*h),
                                       gradient[key][index], delta=2e-9)

    def test_nonsmooth_tie_policy(self):
        case = switching_case()
        self.assertEqual(case["left_derivative_a"], 0)
        self.assertEqual(case["right_derivative_a"], 1 + case["step"])
        self.assertEqual(case["central_difference_a"], 0.5 + case["step"] / 2)
        self.assertEqual(case["cases"][1]["selected_dq"][1], 0)
        self.assertNotEqual(case["cases"][0]["signature"], case["cases"][2]["signature"])

    def test_split_ids_and_target_topology(self):
        all_ids = set()
        for condition in DATA_SEEDS:
            for split in SPLIT_SIZES:
                data = generate(condition, split)
                self.assertEqual(digest(data), digest(generate(condition, split)))
                self.assertFalse(set(data["ids"]) & all_ids)
                all_ids.update(data["ids"])
                for target in data["y"]:
                    self.assertEqual(beta0(target), 1 if condition == "connected" else 2)

    def test_real_training_smoke_is_reproducible(self):
        protocol = {"vertices": 12, "hidden": 24, "epochs": 2, "learning_rate": 0.02}
        a = run_one("connected", 11, 1, protocol, smoke=True)
        b = run_one("connected", 11, 1, protocol, smoke=True)
        self.assertEqual(a, b)
        initial = init_model(11)
        self.assertTrue(any(not np.array_equal(initial[k], a["parameters"][k]) for k in initial))
        self.assertEqual(len(a["trajectory"]), 2)


if __name__ == "__main__":
    unittest.main(verbosity=2)
