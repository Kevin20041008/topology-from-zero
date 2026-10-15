"""Exact augmented affine singular chains for the H2 subdivision construction.

A basis element is an ORDERED tuple of rational vertices in real affine space.
The simplex maps into R^d, not into the totally disconnected space Q^d.
Repeated vertices
are retained, and permuting vertices does not replace a generator by its sign.
This is a free subgroup of affine singular chains, not oriented simplicial
chains and not the quotient by degenerate singular simplices.

Conventions: d[v]=[], d[]=0; cone_b(s)=[b,*s]; Sd_-1=Sd_0=id;
T_-1=T_0=0; for n>=1, Sd(s)=cone_b(Sd(d(s))) and
T(s)=cone_b(s-Sd(s)-T(d(s))), with b the barycenter of s.
Consequently dT+Td=id-Sd. The extra degree -2 contains only zero.

Only integer coefficients and int/Fraction coordinates are accepted. There
are no floating tolerances. This small teaching implementation grows rapidly
with dimension and repeated subdivision; it is not a general homology engine.
"""
from dataclasses import dataclass
from fractions import Fraction
from functools import lru_cache


def rational(value):
    """Reject silent conversion of binary floats, booleans and strings."""
    if type(value) is int or type(value) is Fraction:
        return Fraction(value)
    raise TypeError('Coordinates must be exact int or Fraction values')


def point(coordinates):
    return tuple(rational(v) for v in coordinates)


@dataclass(frozen=True, init=False)
class Chain:
    """A finite integral chain with rational vertices in a declared real R^d."""
    degree: int
    ambient_dim: int
    terms: tuple

    def __init__(self, degree, ambient_dim, terms=()):
        if type(degree) is not int or degree < -2:
            raise ValueError('Degree must be an integer >= -2')
        if type(ambient_dim) is not int or ambient_dim < 0:
            raise ValueError('Ambient dimension must be a nonnegative integer')
        collected = {}
        for vertices, coefficient in terms:
            if type(coefficient) is not int:
                raise TypeError('Chain coefficients must be exact integers')
            simplex = tuple(point(v) for v in vertices)
            if degree == -2 or len(simplex) != degree + 1:
                raise ValueError('Generator has the wrong number of vertices')
            if any(len(v) != ambient_dim for v in simplex):
                raise ValueError('All vertices must have the declared ambient dimension')
            collected[simplex] = collected.get(simplex, 0) + coefficient
        object.__setattr__(self, 'degree', degree)
        object.__setattr__(self, 'ambient_dim', ambient_dim)
        object.__setattr__(self, 'terms', tuple(sorted(
            (s, k) for s, k in collected.items() if k != 0)))

    @classmethod
    def generator(cls, vertices, *, ambient_dim=None):
        vertices = tuple(tuple(v) for v in vertices)
        inferred = len(vertices[0]) if vertices else 0
        return cls(len(vertices) - 1, inferred if ambient_dim is None else ambient_dim,
                   [(vertices, 1)])

    def __add__(self, other):
        if not isinstance(other, Chain):
            return NotImplemented
        if (self.degree, self.ambient_dim) != (other.degree, other.ambient_dim):
            raise ValueError('Only chains of the same degree and ambient space add')
        return Chain(self.degree, self.ambient_dim, self.terms + other.terms)

    def __neg__(self):
        return -1 * self

    def __sub__(self, other):
        return self + (-other)

    def __rmul__(self, coefficient):
        if type(coefficient) is not int:
            raise TypeError('Scalar must be an exact integer')
        return Chain(self.degree, self.ambient_dim,
                     ((s, coefficient * k) for s, k in self.terms))

    def __bool__(self):
        return bool(self.terms)


def boundary(chain):
    """Augmented boundary, including the empty generator in degree -1."""
    if chain.degree == -2:
        raise ValueError('Degree -2 is only the terminal zero group')
    return Chain(chain.degree - 1, chain.ambient_dim,
                 ((s[:i] + s[i + 1:], k * (-1)**i)
                  for s, k in chain.terms for i in range(len(s))))


def cone(apex, chain):
    """Prepend apex, with no degeneracy or orientation normalization."""
    apex = point(apex)
    if len(apex) != chain.ambient_dim:
        raise ValueError('Apex must lie in the same ambient space')
    return Chain(chain.degree + 1, chain.ambient_dim,
                 (((apex,) + s, k) for s, k in chain.terms))


def barycenter(vertices):
    vertices = tuple(point(v) for v in vertices)
    if not vertices or any(len(v) != len(vertices[0]) for v in vertices):
        raise ValueError('Barycenter needs a nonempty tuple of equally sized points')
    return tuple(sum((v[j] for v in vertices), Fraction(0)) / len(vertices)
                 for j in range(len(vertices[0])))


@lru_cache(maxsize=4096)
def _subdivide_generator(vertices, ambient_dim):
    generator = Chain.generator(vertices, ambient_dim=ambient_dim)
    if generator.degree <= 0:
        return generator
    return cone(barycenter(vertices), subdivision(boundary(generator)))


def subdivision(chain):
    """Extend the recursive barycentric subdivision to finite chains linearly."""
    result = Chain(chain.degree, chain.ambient_dim)
    for vertices, coefficient in chain.terms:
        result += coefficient * _subdivide_generator(vertices, chain.ambient_dim)
    return result


@lru_cache(maxsize=4096)
def _homotopy_generator(vertices, ambient_dim):
    generator = Chain.generator(vertices, ambient_dim=ambient_dim)
    if generator.degree <= 0:
        return Chain(generator.degree + 1, ambient_dim)
    residual = generator - subdivision(generator) - homotopy(boundary(generator))
    return cone(barycenter(vertices), residual)


def homotopy(chain):
    """The sign convention is dT+Td=id-Sd, not Sd-id."""
    result = Chain(chain.degree + 1, chain.ambient_dim)
    for vertices, coefficient in chain.terms:
        result += coefficient * _homotopy_generator(vertices, chain.ambient_dim)
    return result


def _iterations(count):
    if type(count) is not int or count < 0:
        raise ValueError('Iteration count must be a nonnegative integer')


def iterate_subdivision(chain, count):
    _iterations(count)
    for _ in range(count):
        chain = subdivision(chain)
    return chain


def iterated_homotopy(chain, count):
    """T_N=sum_{j=0}^{N-1} T Sd^j; dT_N+T_Nd=id-Sd^N."""
    _iterations(count)
    result = Chain(chain.degree + 1, chain.ambient_dim)
    for _ in range(count):
        result += homotopy(chain)
        chain = subdivision(chain)
    return result


def pushforward(chain, matrix, translation):
    """Push forward by x -> matrix*x+translation, even for rank-zero maps."""
    translation = point(translation)
    matrix = tuple(point(row) for row in matrix)
    if len(matrix) != len(translation) or any(
            len(row) != chain.ambient_dim for row in matrix):
        raise ValueError('Affine matrix/translation dimensions disagree')

    def image(vertex):
        return tuple(sum((a * x for a, x in zip(row, vertex)), Fraction(0)) + b
                     for row, b in zip(matrix, translation))

    return Chain(chain.degree, len(translation),
                 ((tuple(image(v) for v in simplex), k)
                  for simplex, k in chain.terms))


def diameter_linf(vertices):
    """Exact rational diameter in the maximum norm; empty diameter is zero."""
    vertices = tuple(point(v) for v in vertices)
    if vertices and any(len(v) != len(vertices[0]) for v in vertices):
        raise ValueError('All vertices must lie in one ambient space')
    return max((abs(v[j] - w[j]) for v in vertices for w in vertices
                for j in range(len(v))), default=Fraction(0))


def mesh_linf(chain):
    return max((diameter_linf(s) for s, _ in chain.terms), default=Fraction(0))


if __name__ == '__main__':
    edge = Chain.generator([(0,), (1,)])
    print('Ordered edge:', edge.terms)
    print('Sd edge:', subdivision(edge).terms)
    print('T edge (degenerate terms retained):', homotopy(edge).terms)
    print('dT+Td=id-Sd:', boundary(homotopy(edge)) + homotopy(boundary(edge))
          == edge - subdivision(edge))
