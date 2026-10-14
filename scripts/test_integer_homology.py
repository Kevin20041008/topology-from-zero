"""Standard-library regression suite for exact Z matrices and homology."""
import random
import unittest

from integer_homology import (ZMatrix, zeros, identity, inverse_unimodular,
                              smith_normal_form, integer_homology)


def assert_smith(test, a):
    result = smith_normal_form(a)
    test.assertEqual(result.left @ a @ result.right, result.diagonal)
    test.assertEqual(inverse_unimodular(result.left) @ result.left, identity(a.nrows))
    test.assertEqual(result.right @ inverse_unimodular(result.right), identity(a.ncols))
    d = result.diagonal
    test.assertTrue(all(v == 0 for i, row in enumerate(d.rows)
                        for j, v in enumerate(row) if i != j))
    test.assertTrue(all(v > 0 for v in result.invariant_factors))
    test.assertTrue(all(b % a == 0 for a, b in zip(result.invariant_factors,
                                                result.invariant_factors[1:])))
    return result


class IntegerTests(unittest.TestCase):
    def test_exact_input_contract_and_zero_shapes(self):
        for value in [True, 1.0, 1.5, '1']:
            with self.assertRaises(TypeError):
                ZMatrix([[value]])
        for rows in [[[1], []], [[1, 2], [3]]]:
            with self.assertRaises(ValueError):
                ZMatrix(rows)
        with self.assertRaises(ValueError):
            ZMatrix([], ncols=-1)
        self.assertEqual((zeros(0, 3) @ zeros(3, 2)).shape, (0, 2))
        self.assertEqual((zeros(3, 0) @ zeros(0, 2)).shape, (3, 2))
        self.assertEqual(inverse_unimodular(zeros(0, 0)), zeros(0, 0))

    def test_smith_zero_rectangular_signed_and_divisibility(self):
        for a, expected in [
            (zeros(0, 0), ()), (zeros(0, 4), ()), (zeros(3, 0), ()),
            (zeros(2, 3), ()), (ZMatrix([[-6]]), (6,)),
            (ZMatrix([[6, 0], [0, 10]]), (2, 30)),
            (ZMatrix([[2, 4, 6], [0, 6, 12]]), (2, 6)),
            (ZMatrix([[0, 0], [0, 5], [0, 10]]), (5,)),
        ]:
            self.assertEqual(assert_smith(self, a).invariant_factors, expected)

    def test_big_integers_do_not_pass_through_float(self):
        value = 2**100 + 3
        a = ZMatrix([[value, 0], [0, value + 1]])
        self.assertEqual(assert_smith(self, a).invariant_factors,
                         (1, value * (value + 1)))

    def test_seeded_smith_certificates(self):
        rng = random.Random(20261014)
        for _ in range(120):
            m, n = rng.randrange(6), rng.randrange(6)
            a = ZMatrix([[rng.randint(-12, 12) for _ in range(n)]
                         for _ in range(m)], ncols=n)
            assert_smith(self, a)

    def test_invalid_chain_and_nonunimodular_inverse_rejected(self):
        with self.assertRaisesRegex(ValueError, 'Chain condition'):
            integer_homology(ZMatrix([[1]]), ZMatrix([[1]]))
        with self.assertRaisesRegex(ValueError, 'dimensions'):
            integer_homology(zeros(1, 2), zeros(3, 0))
        for a in [ZMatrix([[2]]), ZMatrix([[0]]), zeros(1, 2)]:
            with self.assertRaises(ValueError):
                inverse_unimodular(a)

    def test_kernel_basis_transform_regression(self):
        a, b = ZMatrix([[2, 1]]), ZMatrix([[-3], [6]])
        h = integer_homology(a, b)
        self.assertEqual(h.description(), {'free_rank': 0, 'torsion': [3]})
        self.assertEqual((a @ h.cycle_basis).rows, ((0,),))
        self.assertEqual(h.cycle_basis @ h.boundary_in_cycles, b)
        self.assertNotEqual(abs(h.boundary_in_cycles.rows[0][0]), 6)

    def test_circle_triangle_and_disjoint_vertices(self):
        b1 = ZMatrix([[-1, 0, -1], [1, -1, 0], [0, 1, 1]])
        b2 = ZMatrix([[1], [1], [-1]])
        self.assertEqual(integer_homology(b1, zeros(3, 0)).description(),
                         {'free_rank': 1, 'torsion': []})
        self.assertEqual(integer_homology(b1, b2).description(),
                         {'free_rank': 0, 'torsion': []})
        self.assertEqual(integer_homology(zeros(0, 3), b1).free_rank, 1)
        self.assertEqual(integer_homology(zeros(0, 3), zeros(3, 0)).free_rank, 3)

    def test_cleared_rational_vectors_need_not_span_integer_kernel(self):
        a = ZMatrix([[2, 1, 1]])
        b = ZMatrix([[-1], [1], [1]])
        h = integer_homology(a, b)
        self.assertEqual(h.description(), {'free_rank': 1, 'torsion': []})
        self.assertTrue((a @ h.cycle_basis).is_zero())
        self.assertEqual(h.cycle_basis @ h.boundary_in_cycles, b)
        # Clearing denominators of two rational null vectors separately
        # yields (-1,2,0),(-1,0,2), which cannot express this odd/odd boundary.
        incomplete = ZMatrix([[-1, -1], [2, 0], [0, 2]])
        self.assertTrue((a @ incomplete).is_zero())
        self.assertEqual(b.rows[1][0] % 2, 1)
        self.assertEqual(b.rows[2][0] % 2, 1)

    def test_torsion_cw_examples_and_zero_chain(self):
        rp2_h1 = integer_homology(zeros(1, 1), ZMatrix([[2]]))
        rp2_h2 = integer_homology(ZMatrix([[2]]), zeros(1, 0))
        klein_h1 = integer_homology(zeros(1, 2), ZMatrix([[0], [2]]))
        self.assertEqual(rp2_h1.description(), {'free_rank': 0, 'torsion': [2]})
        self.assertEqual(rp2_h2.description(), {'free_rank': 0, 'torsion': []})
        self.assertEqual(klein_h1.description(), {'free_rank': 1, 'torsion': [2]})
        self.assertEqual(integer_homology(zeros(0, 0), zeros(0, 0)).description(),
                         {'free_rank': 0, 'torsion': []})
        # Z/1 is trivial, not a reported torsion summand.
        self.assertEqual(integer_homology(zeros(0, 1), ZMatrix([[1]])).torsion, ())


if __name__ == '__main__':
    unittest.main(verbosity=2)
