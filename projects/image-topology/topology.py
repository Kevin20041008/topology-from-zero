"""Closed-square cubical topology and exact Bernoulli expected Euler gradient.

No persistence pairing is used by the training loss. h0_bars is a separate
grayscale demonstration and never filters a positive lifetime by tolerance.
"""
from collections import deque
import numpy as np


def _probabilities(p):
    p = np.asarray(p, dtype=np.float64)
    if p.ndim != 2 or min(p.shape) == 0 or not np.all(np.isfinite(p)):
        raise ValueError("nonempty finite 2D image required")
    if np.any((p < 0) | (p > 1)):
        raise ValueError("probabilities must lie in [0,1]")
    return p


def expected_euler_gradient(p):
    """E chi and d/dp for independent occupied closed squares; exact polynomial.

    Outside-domain squares are absent with probability one. Products excluding
    a variable are computed directly, so p=1 does not cause 0/0.
    """
    p = _probabilities(p)
    h, w = p.shape
    r = np.pad(1 - p, 1, constant_values=1)
    # Incident missing-square probabilities at each lattice vertex.
    corners = [r[dy:dy+h+1, dx:dx+w+1] for dy, dx in [(0,0),(0,1),(1,0),(1,1)]]
    v = np.zeros((h+1, w+1), dtype=float) + 1
    for c in corners:
        v *= c
    # Two squares adjacent to horizontal / vertical lattice edges.
    ha, hb = r[:h+1, 1:w+1], r[1:h+2, 1:w+1]
    va, vb = r[1:h+1, :w+1], r[1:h+1, 1:w+2]
    value = float(np.sum(1-v) - np.sum(1-ha*hb) - np.sum(1-va*vb) + p.sum())
    gradient = np.ones_like(p)
    # At its four corners, each pixel is respectively SE, SW, NE, NW.
    for index, sy, sx in [(3,0,0),(2,0,1),(1,1,0),(0,1,1)]:
        derivative = np.ones((h+1,w+1))
        for j,c in enumerate(corners):
            if j != index:
                derivative *= c
        gradient += derivative[sy:sy+h, sx:sx+w]
    # Two horizontal and two vertical incident edges contribute negatively.
    gradient -= r[:h, 1:w+1] + r[2:h+2, 1:w+1]
    gradient -= r[1:h+1, :w] + r[1:h+1, 2:w+2]
    return value, gradient


def components(mask, diagonal=False):
    """Independent flood fill, including empty foreground; return sizes."""
    a = np.asarray(mask, dtype=bool)
    if a.ndim != 2:
        raise ValueError("2D mask required")
    h,w = a.shape
    seen = np.zeros_like(a)
    offsets = [(dy,dx) for dy in [-1,0,1] for dx in [-1,0,1]
               if (dy or dx) and (diagonal or abs(dy)+abs(dx)==1)]
    sizes = []
    for y,x in zip(*np.nonzero(a)):
        if seen[y,x]:
            continue
        pending = deque([(y,x)])
        seen[y,x] = True
        size = 0
        while pending:
            r,c = pending.popleft()
            size += 1
            for dy,dx in offsets:
                u,v = r+dy,c+dx
                if 0<=u<h and 0<=v<w and a[u,v] and not seen[u,v]:
                    seen[u,v]=True
                    pending.append((u,v))
        sizes.append(size)
    return sizes


def betti(mask):
    """Planar closed-square union: b0 foreground8, b1 padded background4 - 1."""
    a = np.asarray(mask,dtype=bool)
    if a.ndim != 2 or min(a.shape)==0:
        raise ValueError("nonempty 2D canvas required")
    b0 = len(components(a,diagonal=True))
    b1 = len(components(np.pad(~a,1,constant_values=True),diagonal=False))-1
    return b0,b1


def cubical_cells(mask):
    """Independent explicit face closure; used by the finite F2 oracle."""
    a=np.asarray(mask,dtype=bool)
    vertices,edges,faces=set(),set(),set()
    for y,x in zip(*np.nonzero(a)):
        y,x=int(y),int(x)
        corners=[(y,x),(y,x+1),(y+1,x),(y+1,x+1)]
        vertices.update(corners)
        edges.update([tuple(sorted([corners[i],corners[j]])) for i,j in [(0,1),(0,2),(1,3),(2,3)]])
        faces.add((y,x))
    return sorted(vertices),sorted(edges),sorted(faces)


def f2_rank(columns):
    pivots={}
    for original in columns:
        column=set(original)
        while column and max(column) in pivots:
            column.symmetric_difference_update(pivots[max(column)])
        if column:
            pivots[max(column)]=column
    return len(pivots)


def matrix_betti(mask):
    """Explicit cubical boundary matrices, independent of flood fill/Euler."""
    vertices,edges,faces=cubical_cells(mask)
    vi={v:i for i,v in enumerate(vertices)}
    ei={e:i for i,e in enumerate(edges)}
    b1=[{vi[a],vi[b]} for a,b in edges]
    b2=[]
    for y,x in faces:
        c=[(y,x),(y,x+1),(y+1,x),(y+1,x+1)]
        column={ei[tuple(sorted([c[i],c[j]]))] for i,j in [(0,1),(0,2),(1,3),(2,3)]}
        boundary=set()
        for j in column:
            boundary.symmetric_difference_update(b1[j])
        if boundary:
            raise AssertionError("boundary squared is nonzero")
        b2.append(column)
    r1,r2=f2_rank(b1),f2_rank(b2)
    return len(vertices)-r1,len(edges)-r1-r2,len(faces)-r2


def h0_bars(q):
    """Sublevel closed-square union H0 with 8-neighbor elder pairing.

    q is supplied binary64, no quantization. Each pixel enters as a whole
    square with its faces. Finite intervals are half-open [birth,death).
    Equal values use row-major IDs. Infinite death is None.
    """
    a=_probabilities(q)
    h,w=a.shape
    values=a.ravel()
    parent=list(range(len(values)))
    active=np.zeros(len(values),dtype=bool)
    bars=[]
    def find(i):
        while parent[i]!=i:
            parent[i]=parent[parent[i]]
            i=parent[i]
        return i
    for v in sorted(range(len(values)),key=lambda i:(values[i],i)):
        active[v]=True
        y,x=divmod(v,w)
        for dy in [-1,0,1]:
            for dx in [-1,0,1]:
                if not (dy or dx) or not(0<=y+dy<h and 0<=x+dx<w):
                    continue
                u=(y+dy)*w+x+dx
                if not active[u]:
                    continue
                r,s=find(v),find(u)
                if r==s:
                    continue
                old,young=sorted((r,s),key=lambda i:(values[i],i))
                birth,death=float(values[young]),float(values[v])
                if death>birth:
                    bars.append((birth,death))
                parent[young]=old
    root=find(0)
    return sorted(bars),(float(values[root]),None)
