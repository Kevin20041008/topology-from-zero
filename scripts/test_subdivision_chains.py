"""Exact, standard-library tests of the H2 ordered affine-chain experiment.

The independent Sd reference enumerates deletion permutations and descending
barycentric flags directly: it never calls boundary, cone or subdivision.
These finite rational checks supplement the general proof; they do not verify
arbitrary continuous singular simplices or replace a Lebesgue-number argument.
"""
from fractions import Fraction as Q
from itertools import permutations, product
from math import factorial
import random
import unittest

from subdivision_chains import (
    Chain, barycenter, boundary, cone, diameter_linf, homotopy,
    iterate_subdivision, iterated_homotopy, mesh_linf, pushforward, subdivision,
)


def standard_simplex(n):
    return Chain.generator(tuple(tuple(int(i == j) for j in range(n + 1))
                                 for i in range(n + 1)))


def direct_flags(vertices, ambient_dim):
    """Signed full-to-singleton flags, with sign of the deletion permutation."""
    count = len(vertices)
    if count == 0:
        return Chain.generator([], ambient_dim=ambient_dim)
    terms = []
    for perm in permutations(range(count)):
        flag = []
        for offset in range(count):
            face_indices = perm[offset:]
            flag.append(tuple(sum((Q(vertices[i][j]) for i in face_indices), Q(0))
                              / len(face_indices) for j in range(ambient_dim)))
        inversions = sum(perm[i] > perm[j] for i in range(count)
                         for j in range(i + 1, count))
        terms.append((tuple(flag), (-1)**inversions))
    return Chain(count - 1, ambient_dim, terms)


class SubdivisionTests(unittest.TestCase):
    def assert_identities(self, chain):
        if chain.degree >= 0:
            self.assertFalse(boundary(boundary(chain)))
        self.assertEqual(boundary(subdivision(chain)), subdivision(boundary(chain)))
        self.assertEqual(boundary(homotopy(chain)) + homotopy(boundary(chain)),
                         chain - subdivision(chain))

    def test_exact_input_contract_zero_groups_and_cancellation(self):
        for coordinate in [True, 0.5, '1/2']:
            with self.assertRaises(TypeError):
                Chain.generator([(coordinate,)])
        for coefficient in [False, Q(1), 1.0]:
            with self.assertRaises(TypeError):
                Chain(0, 1, [(((0,),), coefficient)])
        for degree, ambient, terms in [
            (-3, 1, []), (0, -1, []), (0, 1, [(((0, 1),), 1)]),
            (1, 1, [(((0,),), 1)]), (-2, 1, [((), 1)]),
        ]:
            with self.assertRaises(ValueError):
                Chain(degree, ambient, terms)
        for degree in range(-1, 4):
            self.assert_identities(Chain(degree, 2))
        edge = Chain.generator([(0,), (1,)])
        self.assertFalse(edge - edge)
        self.assertEqual(0 * edge, Chain(1, 1))
        with self.assertRaises(ValueError):
            _ = edge + boundary(edge)
        with self.assertRaises(ValueError):
            cone((0, 0), edge)
        for invalid in [-1, 0.5, True]:
            with self.assertRaises(ValueError):
                iterate_subdivision(edge, invalid)
            with self.assertRaises(ValueError):
                iterated_homotopy(edge, invalid)
        with self.assertRaises(ValueError):
            pushforward(edge, [(1, 0)], [0])

    def test_augmentation_and_cone_identity_including_vertices(self):
        empty = Chain.generator([], ambient_dim=2)
        vertex = Chain.generator([(2, 3)])
        self.assertEqual(boundary(vertex), empty)
        self.assertEqual(boundary(empty), Chain(-2, 2))
        self.assert_identities(empty)
        for n in range(5):
            c = standard_simplex(n)
            apex = tuple(Q(-1, n + 2) for _ in range(n + 1))
            self.assertEqual(boundary(cone(apex, c)) + cone(apex, boundary(c)), c)
        self.assertEqual(boundary(cone((2, 3), empty)), empty)
        self.assertEqual(cone((2, 3), boundary(empty)), Chain(-1, 2))

    def test_order_is_not_an_orientation_quotient(self):
        a, b = (Q(0),), (Q(1),)
        edge = Chain.generator([a, b])
        reverse = Chain.generator([b, a])
        self.assertNotEqual(reverse, -edge)
        self.assertEqual(len((reverse + edge).terms), 2)
        m = (Q(1, 2),)
        expected_sd = Chain(1, 1, [((m, b), 1), ((m, a), -1)])
        expected_t = Chain(2, 1, [((m, a, b), 1), ((m, m, b), -1),
                                  ((m, m, a), 1)])
        self.assertEqual(subdivision(edge), expected_sd)
        self.assertEqual(homotopy(edge), expected_t)
        # The usual positively oriented two subintervals are NOT equal chains
        # in the free ordered singular model used here.
        oriented_picture = Chain(1, 1, [((a, m), 1), ((m, b), 1)])
        self.assertNotEqual(subdivision(edge), oriented_picture)
        self.assert_identities(edge)

    def test_repeated_vertices_are_not_discarded(self):
        a = (Q(2, 7), Q(-3, 5))
        edge = Chain.generator([a, a])
        triangle = Chain.generator([a, a, a])
        self.assertTrue(edge)
        self.assertTrue(triangle)
        self.assertEqual(boundary(triangle), edge)
        self.assertFalse(subdivision(edge))  # actual integer cancellation
        self.assertEqual(homotopy(edge), triangle)
        self.assert_identities(edge)
        self.assert_identities(triangle)

    def test_direct_flags_standard_dimensions_zero_through_four(self):
        for n in range(5):
            c = standard_simplex(n)
            vertices = c.terms[0][0]
            expected = direct_flags(vertices, n + 1)
            self.assertEqual(subdivision(c), expected)
            self.assertEqual(len(expected.terms), factorial(n + 1))
            self.assertTrue(all(abs(k) == 1 for _, k in expected.terms))
            self.assert_identities(c)

    def test_exhaustive_120_ordered_small_simplices(self):
        points = [(Q(0), Q(0)), (Q(1), Q(0)), (Q(0), Q(1))]
        checked = 0
        for n in range(4):
            for vertices in product(points, repeat=n + 1):
                c = Chain.generator(vertices)
                self.assert_identities(c)
                self.assertEqual(subdivision(c), direct_flags(vertices, 2))
                checked += 1
        self.assertEqual(checked, 120)

    def test_affine_naturality_including_rank_zero_and_dimension_zero(self):
        rng = random.Random(20261015)
        for n in range(4):
            c = standard_simplex(n)
            source = n + 1
            maps = [
                ((), ()),  # collapse to the unique point of R^0
                ([[0] * source, [0] * source], [Q(2, 5), Q(-1, 7)]),
                ([[1] * source], [Q(3, 2)]),  # all simplex vertices coincide
                ([[Q(rng.randrange(-3, 4), rng.randrange(1, 5))
                   for _ in range(source)] for _ in range(3)], [Q(1, 2), -1, 0]),
            ]
            for matrix, translation in maps:
                f = lambda chain: pushforward(chain, matrix, translation)
                self.assertEqual(boundary(f(c)), f(boundary(c)))
                self.assertEqual(subdivision(f(c)), f(subdivision(c)))
                self.assertEqual(homotopy(f(c)), f(homotopy(c)))
                self.assert_identities(f(c))
                self.assertEqual(iterate_subdivision(f(c), 2),
                                 f(iterate_subdivision(c, 2)))

    def test_support_stays_inside_original_simplex(self):
        # In the standard simplex the coordinates ARE barycentric coordinates,
        # so this is an exact convex-hull certificate, not a bounding-box test.
        for n in range(5):
            c = standard_simplex(n)
            for result in [subdivision(c), homotopy(c)]:
                for vertices, _ in result.terms:
                    for v in vertices:
                        self.assertEqual(sum(v), Q(1))
                        self.assertTrue(all(x >= 0 for x in v))
        c = standard_simplex(2)
        for result in [iterate_subdivision(c, 3), iterated_homotopy(c, 2)]:
            for vertices, _ in result.terms:
                for v in vertices:
                    self.assertEqual(sum(v), Q(1))
                    self.assertTrue(all(x >= 0 for x in v))

    def test_triangle_residual_is_an_explicit_cycle(self):
        a, b, c = (Q(0), Q(0)), (Q(1), Q(0)), (Q(0), Q(1))
        triangle = Chain.generator([a, b, c])

        def explicit_edge_t(u, v):
            m = tuple((x + y) / 2 for x, y in zip(u, v))
            return Chain(2, 2, [((m, u, v), 1), ((m, m, v), -1),
                                ((m, m, u), 1)])

        # No recursive subdivision/homotopy calls construct this reference.
        face_homotopies = explicit_edge_t(b, c) - explicit_edge_t(a, c) + explicit_edge_t(a, b)
        residual = triangle - direct_flags((a, b, c), 2) - face_homotopies
        self.assertFalse(boundary(residual))
        center = (Q(1, 3), Q(1, 3))
        explicit_t2 = Chain(3, 2, [((center,) + s, k) for s, k in residual.terms])
        self.assertEqual(homotopy(triangle), explicit_t2)
        self.assertEqual(boundary(explicit_t2), residual)
        self.assertTrue(any(len(set(s)) < len(s) for s, _ in explicit_t2.terms))

    def test_exact_mesh_contraction_and_repeated_subdivision(self):
        self.assertEqual(diameter_linf([]), Q(0))
        self.assertEqual(mesh_linf(Chain(2, 3)), Q(0))
        for n, repeats in [(1, 5), (2, 3), (3, 2), (4, 1)]:
            c = standard_simplex(n)
            original_mesh = mesh_linf(c)
            self.assertEqual(mesh_linf(subdivision(c)), Q(n, n + 1) * original_mesh)
            result = iterate_subdivision(c, repeats)
            self.assertEqual(len(result.terms), factorial(n + 1)**repeats)
            self.assertLessEqual(mesh_linf(result), Q(n, n + 1)**repeats * original_mesh)
            self.assertEqual(boundary(result), iterate_subdivision(boundary(c), repeats))
        # A nonstandard, rational, rank-deficient affine triangle, in max norm.
        c = Chain.generator([(Q(-2, 3),), (Q(1, 7),), (Q(5, 4),)])
        self.assertLessEqual(mesh_linf(iterate_subdivision(c, 2)), Q(4, 9) * mesh_linf(c))

    def test_finite_chains_uniform_mesh_and_iterated_homotopy(self):
        a = Chain.generator([(0, 0), (1, 0), (0, 1)])
        b = Chain.generator([(Q(5, 2), 0), (Q(7, 2), 0), (Q(5, 2), 1)])
        c = 2 * a - 3 * b
        self.assert_identities(c)
        for count in range(3):
            self.assertEqual(iterate_subdivision(c, count),
                             2 * iterate_subdivision(a, count) - 3 * iterate_subdivision(b, count))
            self.assertEqual(boundary(iterated_homotopy(c, count))
                             + iterated_homotopy(boundary(c), count),
                             c - iterate_subdivision(c, count))
        # One N=2 works for EVERY remaining generator, by their common bound.
        refined = iterate_subdivision(c, 2)
        self.assertLessEqual(mesh_linf(refined), Q(4, 9))
        self.assertLess(mesh_linf(refined), Q(1, 2))
        self.assertEqual(len(refined.terms), 72)
        self.assertEqual(barycenter([(0,), (1,)]), (Q(1, 2),))


if __name__ == '__main__':
    print('Exact Fraction / Z coefficients; no floating tolerance.', flush=True)
    print('Coverage: 120 ordered small simplices; standard dimensions 0..4;', flush=True)
    print('16 affine maps including rank-zero; repeats through 5 (1D), 3 (2D), 2 (3D).', flush=True)
    unittest.main(verbosity=2)
