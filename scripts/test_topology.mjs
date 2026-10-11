import test from 'node:test';
import assert from 'node:assert/strict';
import {bettiNumbers, boundaryMatrix, rankF2, ripsFiltration, persistentHomology, bettiAt, pointPresets} from '../docs/javascripts/topology-core.mjs';
import {surfaces, mobiusPoint, createSurfaceGeometry} from '../docs/javascripts/surfaces.mjs';

test('hollow triangle and filled triangle distinguish cycles from boundaries', () => {
  const hollow = [[0], [1], [2], [0, 1], [0, 2], [1, 2]];
  assert.deepEqual(bettiNumbers(hollow), [1, 1]);
  assert.deepEqual(bettiNumbers([...hollow, [0, 1, 2]]), [1, 0]);
  assert.equal(rankF2([[1, 1, 0], [1, 0, 1], [0, 1, 1]]), 2);
});

test('square barcode has three finite H0 bars and the analytically known H1 interval', () => {
  const bars = persistentHomology(ripsFiltration(pointPresets.square.points));
  const h0 = bars.filter(b => b.dimension === 0);
  const h1 = bars.filter(b => b.dimension === 1);
  assert.equal(h0.filter(b => b.death === .5).length, 3);
  assert.equal(h0.filter(b => b.death === Infinity).length, 1);
  assert.equal(h1.length, 1);
  assert.equal(h1[0].birth, .5);
  assert.ok(Math.abs(h1[0].death - Math.SQRT2 / 2) < 1e-11);
  assert.deepEqual(bettiAt(bars, .499), [4, 0]);
  assert.deepEqual(bettiAt(bars, .5), [1, 1]);
  assert.deepEqual(bettiAt(bars, h1[0].death), [1, 0]);
});

// Independent H0 reference: connected components from a disjoint-set forest.
function componentCount(points, epsilon) {
  const parent = points.map((_, i) => i);
  function find(i) { while (parent[i] !== i) i = parent[i]; return i; }
  for (let i = 0; i < points.length; i++) for (let j = i + 1; j < points.length; j++) {
    if (Math.hypot(points[i][0] - points[j][0], points[i][1] - points[j][1]) / 2 <= epsilon) parent[find(i)] = find(j);
  }
  return new Set(points.map((_, i) => find(i))).size;
}

for (const [name, preset] of Object.entries(pointPresets)) {
  test(`${name}: persistent intervals agree with direct homology at and between every event`, () => {
    const filtration = ripsFiltration(preset.points);
    const bars = persistentHomology(filtration);
    const events = [...new Set(filtration.map(s => s.birth))];
    const probes = [...events, ...events.slice(1).map((value, i) => (events[i] + value) / 2), Math.max(...events) + .1];
    for (const radius of probes) {
      const active = filtration.filter(s => s.birth <= radius).map(s => s.vertices);
      assert.deepEqual(bettiAt(bars, radius), bettiNumbers(active), `radius ${radius}`);
      assert.equal(bettiAt(bars, radius)[0], componentCount(preset.points, radius));
    }
  });
}

test('rescaling coordinates rescales the finite barcode endpoints', () => {
  const bars = persistentHomology(ripsFiltration(pointPresets.square.points.map(p => p.map(v => v * 2))));
  const h1 = bars.find(b => b.dimension === 1);
  assert.equal(h1.birth, 1);
  assert.ok(Math.abs(h1.death - Math.SQRT2) < 1e-11);
});

// Analytic oracles below do not use the persistence reduction to set expectations.
test('empty and singleton spaces use ordinary, not reduced, H0', () => {
  assert.deepEqual(bettiNumbers([]), [0, 0]);
  assert.deepEqual(persistentHomology(ripsFiltration([])), []);
  const bars = persistentHomology(ripsFiltration([[3, -2]]));
  assert.equal(bars.length, 1);
  assert.deepEqual(bettiAt(bars, 0), [1, 0]);
  assert.equal(bars[0].death, Infinity);
  assert.equal(rankF2([]), 0);
  assert.equal(rankF2([[], []]), 0);
});

test('coincident labeled vertices merge at zero without spurious positive bars', () => {
  for (const points of [[[0, 0], [0, 0], [0, 0]], [[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]]) {
    const bars = persistentHomology(ripsFiltration(points));
    assert.deepEqual(bettiAt(bars, 0), [new Set(points.map(p => p.join(','))).size, 0]);
    assert.ok(bars.every(b => b.death > b.birth));
  }
  const bars = persistentHomology(ripsFiltration([[0, 0], [0, 0], [0, 0]]));
  assert.equal(bars.length, 1);
  assert.equal(bars[0].death, Infinity);
});

test('collinear Rips points merge as a tree and have no persistent H1', () => {
  const bars = persistentHomology(ripsFiltration([[0, 0], [1, 0], [3, 0], [6, 0]]));
  assert.deepEqual(bars.filter(b => b.dimension === 0).map(b => b.death).sort((a, b) => a - b), [.5, 1, 1.5, Infinity]);
  assert.equal(bars.filter(b => b.dimension === 1).length, 0);
});

for (const scale of [1e-8, 1e-11, 1e-14, 1e8]) {
  test(`square at scale ${scale} retains its positive interval and correct event states`, () => {
    const filtration = ripsFiltration(pointPresets.square.points.map(p => p.map(x => x * scale)));
    const bars = persistentHomology(filtration);
    const h1 = bars.filter(b => b.dimension === 1);
    assert.equal(h1.length, 1);
    assert.ok(Math.abs(h1[0].birth / scale - .5) < 1e-14);
    assert.ok(Math.abs(h1[0].death / scale - Math.SQRT2 / 2) < 1e-14);
    assert.deepEqual(bettiAt(bars, scale * .25), [4, 0]);
    assert.deepEqual(bettiAt(bars, h1[0].birth), [1, 1]);
    assert.deepEqual(bettiAt(bars, h1[0].death), [1, 0]);
  });
}

test('translation, right-angle rotation and reflection preserve the square barcode', () => {
  const signature = points => persistentHomology(ripsFiltration(points)).map(({dimension, birth, death}) => [dimension, birth, death]);
  const points = pointPresets.square.points;
  const expected = signature(points);
  for (const map of [([x, y]) => [x + 3, y - 5], ([x, y]) => [-y, x], ([x, y]) => [-x, y]]) {
    assert.deepEqual(signature(points.map(map)), expected);
  }
});

test('equal-time ordering changes representatives but not persistence intervals', () => {
  const filtration = ripsFiltration(pointPresets.square.points);
  const tied = [...filtration].sort((a, b) => a.birth - b.birth || a.dimension - b.dimension || b.vertices.join(',').localeCompare(a.vertices.join(',')));
  const signature = f => persistentHomology(f).map(({dimension, birth, death}) => [dimension, birth, death]);
  assert.deepEqual(signature(tied), signature(filtration));
  assert.equal(signature(tied).length, 5); // 4 H0 bars, 1 positive H1 bar.
});

test('triangle subdivisions and a disjoint union preserve expected Betti numbers', () => {
  const triangle = [[0], [1], [2], [0, 1], [0, 2], [1, 2]];
  const subdivided = [[0], [1], [2], [3], [0, 3], [1, 3], [0, 2], [1, 2]];
  assert.deepEqual(bettiNumbers(subdivided), [1, 1]);
  assert.deepEqual(bettiNumbers([...subdivided, [0, 2, 3], [1, 2, 3], [2, 3]]), [1, 0]);
  const second = triangle.map(s => s.map(v => v + 3));
  assert.deepEqual(bettiNumbers([...triangle, ...second]), [2, 2]);
  assert.deepEqual(bettiNumbers([[0], [1], [2], [0, 1]]), [2, 0]);
});

test('boundary squared vanishes and Euler characteristic includes H2 of the 2-skeleton', () => {
  for (const {points} of Object.values(pointPresets)) {
    const filtration = ripsFiltration(points);
    for (const radius of new Set(filtration.map(s => s.birth))) {
      const layers = [0, 1, 2].map(d => filtration.filter(s => s.dimension === d && s.birth <= radius).map(s => s.vertices));
      const d1 = boundaryMatrix(layers[0], layers[1]);
      const d2 = boundaryMatrix(layers[1], layers[2]);
      for (const row of d1) for (let j = 0; j < layers[2].length; j++) {
        assert.equal(row.reduce((sum, entry, k) => sum ^ (entry & d2[k][j]), 0), 0);
      }
      const [b0, b1] = bettiNumbers(layers.flat());
      const b2 = layers[2].length - rankF2(d2); // No 3-simplices in this truncated complex.
      assert.equal(layers[0].length - layers[1].length + layers[2].length, b0 - b1 + b2);
    }
  }
  const tetrahedronBoundary = ripsFiltration(pointPresets.square.points).map(s => s.vertices);
  const triangles = tetrahedronBoundary.filter(s => s.length === 3);
  assert.equal(triangles.length - rankF2(boundaryMatrix(tetrahedronBoundary.filter(s => s.length === 2), triangles)), 1);
});

test('nonfinite coordinates and unrepresentable distances are rejected', () => {
  for (const points of [[[NaN, 0]], [[0, Infinity]], [[1]], [[0, 0, 1]], [[Number.MAX_VALUE, 0], [-Number.MAX_VALUE, 0]], [[0, 0], [Number.MIN_VALUE, 0]]]) {
    assert.throws(() => ripsFiltration(points), /finite|coordinate|distance/i);
  }
});

// Weld coincident render vertices only in these bounded, coarse fixtures.
// This tolerance is not used by the Rips algorithm or claimed for arbitrary meshes.
function meshComplex(geometry) {
  const points = [], remap = [];
  const position = geometry.getAttribute('position');
  for (let i = 0; i < position.count; i++) {
    const p = [position.getX(i), position.getY(i), position.getZ(i)];
    assert.ok(p.every(Number.isFinite));
    let v = points.findIndex(q => Math.hypot(...p.map((x, j) => x - q[j])) < 1e-5);
    if (v < 0) { v = points.length; points.push(p); }
    remap.push(v);
  }
  const faceMap = new Map(), edges = new Map();
  const indices = geometry.index.array;
  for (let i = 0; i < indices.length; i += 3) {
    const face = Array.from(indices.slice(i, i + 3), v => remap[v]).sort((a, b) => a - b);
    assert.equal(new Set(face).size, 3, 'no collapsed triangles after seam/pole identification');
    faceMap.set(face.join(','), face);
  }
  const triangles = [...faceMap.values()];
  triangles.forEach((face, f) => {
    for (let j = 0; j < 3; j++) {
      const a = face[j], b = face[(j + 1) % 3];
      const edge = [a, b].sort((x, y) => x - y), key = edge.join(',');
      if (!edges.has(key)) edges.set(key, {vertices: edge, faces: []});
      edges.get(key).faces.push({face: f, direction: a < b ? 1 : -1});
    }
  });
  return {vertices: points.map((_, i) => [i]), edges: [...edges.values()], triangles};
}

function meshOrientable(mesh) {
  const adjacency = mesh.triangles.map(() => []);
  for (const {faces} of mesh.edges) if (faces.length === 2) {
    const [a, b] = faces;
    const factor = -a.direction * b.direction;
    adjacency[a.face].push([b.face, factor]);
    adjacency[b.face].push([a.face, factor]);
  }
  const signs = new Map();
  for (let start = 0; start < adjacency.length; start++) {
    if (signs.has(start)) continue;
    signs.set(start, 1);
    const pending = [start];
    while (pending.length) {
      const face = pending.pop();
      for (const [other, factor] of adjacency[face]) {
        const expected = signs.get(face) * factor;
        if (signs.has(other)) { if (signs.get(other) !== expected) return false; }
        else { signs.set(other, expected); pending.push(other); }
      }
    }
  }
  return true;
}

for (const [name, expected] of Object.entries({sphere: [1, 0, 1], torus: [1, 2, 1], mobius: [1, 1, 0]})) {
  test(`${name}: welded meshes verify Betti, Euler, boundary and orientability at two resolutions`, () => {
    for (const size of [6, 10]) {
      const geometry = createSurfaceGeometry(name, {width: size, height: 4, radial: 4, tubular: size, along: size, across: 4});
      const mesh = meshComplex(geometry);
      geometry.dispose();
      const edges = mesh.edges.map(e => e.vertices);
      const b01 = bettiNumbers([...mesh.vertices, ...edges, ...mesh.triangles]);
      const b2 = mesh.triangles.length - rankF2(boundaryMatrix(edges, mesh.triangles));
      assert.deepEqual([...b01, b2], expected);
      assert.equal(surfaces[name].betti, `(${expected.join(', ')})`);
      const chi = mesh.vertices.length - edges.length + mesh.triangles.length;
      assert.equal(chi, expected[0] - expected[1] + expected[2]);
      assert.equal(Number(surfaces[name].euler), chi);
      assert.ok(mesh.edges.every(e => [1, 2].includes(e.faces.length)));
      assert.equal(meshOrientable(mesh), name !== 'mobius');
      const boundary = mesh.edges.filter(e => e.faces.length === 1).map(e => e.vertices);
      if (name !== 'mobius') assert.equal(boundary.length, 0);
      else {
        const vertices = [...new Set(boundary.flat())];
        assert.ok(vertices.every(v => boundary.filter(e => e.includes(v)).length === 2));
        assert.deepEqual(bettiNumbers([...vertices.map(v => [v]), ...boundary]), [1, 1]);
      }
    }
  });
}

test('Mobius seam reverses the width coordinate and its boundary closes after two turns', () => {
  for (const v of [-.55, 0, .55]) {
    assert.ok(mobiusPoint(0, v).distanceTo(mobiusPoint(2 * Math.PI, -v)) < 1e-12);
  }
  const start = mobiusPoint(0, .55);
  assert.ok(start.distanceTo(mobiusPoint(2 * Math.PI, .55)) > 1);
  assert.ok(start.distanceTo(mobiusPoint(4 * Math.PI, .55)) < 1e-12);
});

test('invalid filtrations fail rather than silently produce negative or meaningless bars', () => {
  const vertex = {vertices: [0], dimension: 0, birth: 0};
  assert.throws(() => persistentHomology([vertex, vertex]), /duplicate/i);
  assert.throws(() => persistentHomology([{...vertex, birth: NaN}]), /birth/i);
  assert.throws(() => persistentHomology([{...vertex, dimension: 1}]), /dimension/i);
  assert.throws(() => persistentHomology([vertex, {vertices: [1], dimension: 0, birth: -1}]), /birth|order/i);
  assert.throws(() => persistentHomology([{...vertex, birth: 1}, {vertices: [1], dimension: 0, birth: 0}]), /order/i);
  assert.throws(() => persistentHomology([vertex, {vertices: [0, 1], dimension: 1, birth: 0}]), /order|face/i);
});

test('relabeling vertices preserves the multiset of persistence intervals', () => {
  const signature = points => persistentHomology(ripsFiltration(points))
    .map(b => `${b.dimension}:${b.birth}:${b.death}`).sort();
  for (const preset of Object.values(pointPresets)) assert.deepEqual(signature(preset.points), signature([...preset.points].reverse()));
});
