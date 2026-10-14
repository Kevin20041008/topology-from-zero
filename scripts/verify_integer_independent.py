"""Independent SymPy oracle and replayable seeded integer-chain experiments.

For a chain A B=0, ker A is saturated in Z^n, hence a direct summand.
Therefore torsion(ker A/im B)=torsion(coker B), and the free rank is
n-rank(A)-rank(B). This oracle uses original A,B; it does not reuse our
kernel basis or transformed relation matrix. See CT1 for the proof.
"""
import argparse
import json
from pathlib import Path
import random

import sympy as sp
from sympy.matrices.normalforms import smith_normal_form as sympy_smith
from integer_homology import (ZMatrix, zeros, identity, inverse_unimodular,
                              smith_normal_form, integer_homology)


def reference_factors(a):
    matrix = sp.Matrix(a.nrows, a.ncols, [v for row in a.rows for v in row])
    d = sympy_smith(matrix, domain=sp.ZZ)
    return tuple(abs(int(d[i, i])) for i in range(min(a.shape)) if d[i, i])


def random_unimodular(n, rng):
    rows = [list(row) for row in identity(n).rows]
    if n > 1:
        for _ in range(8):
            i, j = rng.sample(range(n), 2)
            multiple = rng.choice([-3, -2, -1, 1, 2, 3])
            rows[i] = [a + multiple * b for a, b in zip(rows[i], rows[j])]
    return ZMatrix(rows, ncols=n)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--output', type=Path)
    args = parser.parse_args()
    rng = random.Random(20261014)
    matrices = [zeros(0, 4), zeros(4, 0), zeros(0, 0), zeros(3, 2),
                ZMatrix([[6, 0], [0, 10]]), ZMatrix([[2**100+3, 0], [0, 2**100+4]])]
    for _ in range(180):
        m, n = rng.randrange(6), rng.randrange(6)
        matrices.append(ZMatrix([[rng.randint(-20, 20) for _ in range(n)]
                                 for _ in range(m)], ncols=n))
    for a in matrices:
        actual = smith_normal_form(a)
        assert actual.invariant_factors == reference_factors(a)
        assert actual.left @ a @ actual.right == actual.diagonal
        assert inverse_unimodular(actual.left) @ actual.left == identity(a.nrows)
        assert actual.right @ inverse_unimodular(actual.right) == identity(a.ncols)

    chains = []
    for _ in range(120):
        p, n, q = (rng.randrange(6) for _ in range(3))
        rank_a = rng.randrange(min(p, n) + 1)
        diagonal = [[0] * n for _ in range(p)]
        for i in range(rank_a):
            diagonal[i][i] = rng.randint(1, 6)
        kernel_coordinates = [[0] * q for _ in range(rank_a)] + [
            [rng.randint(-8, 8) for _ in range(q)] for _ in range(n - rank_a)]
        basis = random_unimodular(n, rng)
        a = ZMatrix(diagonal, ncols=n) @ inverse_unimodular(basis)
        b = basis @ ZMatrix(kernel_coordinates, ncols=q)
        h = integer_homology(a, b)
        af, bf = reference_factors(a), reference_factors(b)
        expected = {'free_rank': n - len(af) - len(bf),
                    'torsion': [v for v in bf if v > 1]}
        assert h.description() == expected
        assert (a @ h.cycle_basis).is_zero()
        assert h.cycle_basis @ h.boundary_in_cycles == b
        chains.append({'outgoing_shape': list(a.shape), 'incoming_shape': list(b.shape),
                       'outgoing': a.rows, 'incoming': b.rows, 'homology': expected})
    examples = {
        'kernel_basis_regression': integer_homology(ZMatrix([[2, 1]]), ZMatrix([[-3], [6]])).description(),
        'RP2_H1': integer_homology(zeros(1, 1), ZMatrix([[2]])).description(),
        'RP2_H2': integer_homology(ZMatrix([[2]]), zeros(1, 0)).description(),
        'Klein_H1': integer_homology(zeros(1, 2), ZMatrix([[0], [2]])).description(),
    }
    report = {'status': 'PASS', 'seed': 20261014, 'sympy_version': sp.__version__,
              'smith_matrices': len(matrices), 'integer_chain_cases': len(chains),
              'examples': examples, 'chains': chains,
              'scope': 'Exact finite integer matrices only; no geometric realization claim or all-input proof.'}
    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf8')
    print(f'PASS SymPy {sp.__version__}: {len(matrices)} Smith forms and {len(chains)} integer chain complexes; all exact certificates hold')
    print(json.dumps(examples, ensure_ascii=False))


if __name__ == '__main__':
    main()
