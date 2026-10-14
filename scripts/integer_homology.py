"""Exact finite free Z-chain calculations with auditable basis changes.

No floating point, numerical rank tolerance or field reduction is used here.
This deliberately small teaching implementation has no polynomial bit-complexity
claim: Euclidean elementary operations may grow coefficients substantially.
"""
from dataclasses import dataclass
from fractions import Fraction


@dataclass(frozen=True, init=False)
class ZMatrix:
    rows: tuple
    nrows: int
    ncols: int

    def __init__(self, rows, *, ncols=None):
        data = tuple(tuple(row) for row in rows)
        width = len(data[0]) if data else (0 if ncols is None else ncols)
        if type(width) is not int or width < 0:
            raise ValueError('Nonnegative integer column count required')
        if ncols is not None and (type(ncols) is not int or ncols != width):
            raise ValueError('Declared column count disagrees with rows')
        if any(len(row) != width for row in data):
            raise ValueError('A matrix must be rectangular')
        if any(type(value) is not int for row in data for value in row):
            raise TypeError('Entries must be exact Python integers (not bool or float)')
        object.__setattr__(self, 'rows', data)
        object.__setattr__(self, 'nrows', len(data))
        object.__setattr__(self, 'ncols', width)

    @property
    def shape(self):
        return self.nrows, self.ncols

    def __matmul__(self, other):
        if not isinstance(other, ZMatrix) or self.ncols != other.nrows:
            raise ValueError('Incompatible matrix product')
        return ZMatrix([[sum(self.rows[i][k] * other.rows[k][j]
                             for k in range(self.ncols))
                         for j in range(other.ncols)] for i in range(self.nrows)],
                       ncols=other.ncols)

    def is_zero(self):
        return all(value == 0 for row in self.rows for value in row)


def zeros(m, n):
    if type(m) is not int or type(n) is not int or min(m, n) < 0:
        raise ValueError('Nonnegative integer dimensions required')
    return ZMatrix([[0] * n for _ in range(m)], ncols=n)


def identity(n):
    if type(n) is not int or n < 0:
        raise ValueError('Nonnegative integer dimension required')
    return ZMatrix([[int(i == j) for j in range(n)] for i in range(n)], ncols=n)


def inverse_unimodular(matrix):
    """Exact Gauss-Jordan inverse; reject non-square/non-unimodular input."""
    n, m = matrix.shape
    if n != m:
        raise ValueError('Unimodular inverse requires a square matrix')
    rows = [[Fraction(v) for v in row] + [Fraction(int(i == j)) for j in range(n)]
            for i, row in enumerate(matrix.rows)]
    for k in range(n):
        pivot = next((i for i in range(k, n) if rows[i][k]), None)
        if pivot is None:
            raise ValueError('Singular matrix')
        rows[k], rows[pivot] = rows[pivot], rows[k]
        value = rows[k][k]
        rows[k] = [v / value for v in rows[k]]
        for i in range(n):
            if i != k:
                value = rows[i][k]
                rows[i] = [a - value * b for a, b in zip(rows[i], rows[k])]
    inverse = [row[n:] for row in rows]
    if any(v.denominator != 1 for row in inverse for v in row):
        raise ValueError('Matrix is not unimodular over Z')
    return ZMatrix([[int(v) for v in row] for row in inverse], ncols=n)


@dataclass(frozen=True)
class SmithResult:
    diagonal: ZMatrix
    left: ZMatrix
    right: ZMatrix
    invariant_factors: tuple

    @property
    def rank(self):
        return len(self.invariant_factors)


def smith_normal_form(matrix):
    """Return D,U,V with U A V=D, U,V integral unimodular, d_i|d_(i+1).

    At each pivot, exact Euclidean row/column operations clear its cross.
    If that pivot fails to divide the remaining block, bring one offending
    entry into the pivot row and repeat: a later nonzero remainder strictly
    reduces the absolute pivot. Completed pivots are never touched again.
    """
    m, n = matrix.shape
    a = [list(row) for row in matrix.rows]
    u = [list(row) for row in identity(m).rows]
    v = [list(row) for row in identity(n).rows]

    def swap_rows(i, j):
        a[i], a[j] = a[j], a[i]
        u[i], u[j] = u[j], u[i]

    def add_row(target, source, multiple):
        a[target] = [x + multiple * y for x, y in zip(a[target], a[source])]
        u[target] = [x + multiple * y for x, y in zip(u[target], u[source])]

    def swap_columns(i, j):
        for row in a:
            row[i], row[j] = row[j], row[i]
        for row in v:
            row[i], row[j] = row[j], row[i]

    def add_column(target, source, multiple):
        for row in a:
            row[target] += multiple * row[source]
        for row in v:
            row[target] += multiple * row[source]

    for k in range(min(m, n)):
        entry = next(((i, j) for i in range(k, m) for j in range(k, n) if a[i][j]), None)
        if entry is None:
            break
        swap_rows(k, entry[0])
        swap_columns(k, entry[1])
        while True:
            if a[k][k] < 0:
                a[k] = [-x for x in a[k]]
                u[k] = [-x for x in u[k]]
            pivot = a[k][k]
            # A swap after a nonzero remainder may reintroduce entries in the
            # cleared row/column, so start again immediately after every swap.
            changed_pivot = False
            for i in range(k + 1, m):
                if a[i][k]:
                    q = a[i][k] // pivot
                    add_row(i, k, -q)
                    if a[i][k]:
                        swap_rows(i, k)
                        changed_pivot = True
                        break
            if changed_pivot:
                continue
            for j in range(k + 1, n):
                if a[k][j]:
                    q = a[k][j] // pivot
                    add_column(j, k, -q)
                    if a[k][j]:
                        swap_columns(j, k)
                        changed_pivot = True
                        break
            if changed_pivot:
                continue
            bad = next(((i, j) for i in range(k + 1, m) for j in range(k + 1, n)
                        if a[i][j] % pivot), None)
            if bad is None:
                break
            add_row(k, bad[0], 1)
        # The pivot divides the whole remaining block. Later elementary
        # operations preserve this divisibility as well as previous zeros.
    d = ZMatrix(a, ncols=n)
    factors = tuple(a[i][i] for i in range(min(m, n)) if a[i][i])
    return SmithResult(d, ZMatrix(u, ncols=m), ZMatrix(v, ncols=n), factors)


@dataclass(frozen=True)
class HomologyResult:
    free_rank: int
    torsion: tuple
    cycle_basis: ZMatrix
    boundary_in_cycles: ZMatrix
    outgoing_smith: SmithResult
    relation_smith: SmithResult

    def description(self):
        return {'free_rank': self.free_rank, 'torsion': list(self.torsion)}


def integer_homology(outgoing, incoming):
    """Compute ker(A:Z^n→Z^p)/im(B:Z^q→Z^n), rejecting A B != 0.

    If U A V=D and rank A=r, columns V[:,r:] form the INTEGER kernel basis.
    Crucially transform B to V^-1 B before keeping its bottom n-r rows.
    """
    if outgoing.ncols != incoming.nrows:
        raise ValueError('Boundary dimensions do not agree')
    if not (outgoing @ incoming).is_zero():
        raise ValueError('Chain condition violated: outgoing @ incoming != 0')
    snf = smith_normal_form(outgoing)
    n, r = outgoing.ncols, snf.rank
    cycle_basis = ZMatrix([row[r:] for row in snf.right.rows], ncols=n - r)
    coordinates = inverse_unimodular(snf.right) @ incoming
    if any(v for row in coordinates.rows[:r] for v in row):
        raise AssertionError('A chain boundary has nonzero coordinates outside the kernel')
    relations = ZMatrix(coordinates.rows[r:], ncols=incoming.ncols)
    if cycle_basis @ relations != incoming:
        raise AssertionError('Kernel-coordinate certificate failed')
    relation_smith = smith_normal_form(relations)
    return HomologyResult(n - r - relation_smith.rank,
                          tuple(d for d in relation_smith.invariant_factors if d > 1),
                          cycle_basis, relations, snf, relation_smith)


if __name__ == '__main__':
    # A nontrivial kernel basis: rationally normalized null vectors would
    # obscure the primitive generator (-2,1) of ker[1,2].
    a = ZMatrix([[1, 2]])
    b = ZMatrix([[-6], [3]])
    print('H of [1,2] <- (-6,3):', integer_homology(a, b).description())
    print('RP2 cellular H1:', integer_homology(zeros(1, 1), ZMatrix([[2]])).description())
    print('RP2 cellular H2:', integer_homology(ZMatrix([[2]]), zeros(1, 0)).description())
