import test from 'node:test';
import assert from 'node:assert/strict';
import {bettiNumbers, boundaryMatrix, rankF2, ripsFiltration, persistentHomology, bettiAt, pointPresets} from '../docs/javascripts/topology-core.mjs';
import {surfaces, mobiusPoint, createSurfaceGeometry} from '../docs/javascripts/surfaces.mjs';
import {surfaceComplex} from '../docs/javascripts/surface-topology.mjs';
import {pointCases} from './topology_cases.mjs';

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

// Combinatorial incidence only: no coordinate tolerance identifies vertices.
function complexMesh(simplices) {
  const triangles = simplices.filter(s => s.length === 3), edges = new Map();
  triangles.forEach((face, f) => {
    for (let j = 0; j < 3; j++) {
      const a = face[j], b = face[(j + 1) % 3];
      const edge = [a, b].sort((x, y) => x - y), key = edge.join(',');
      if (!edges.has(key)) edges.set(key, {vertices: edge, faces: []});
      edges.get(key).faces.push({face: f, direction: a < b ? 1 : -1});
    }
  });
  return {vertices: simplices.filter(s => s.length === 1), edges: [...edges.values()], triangles};
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
  test(`${name}: exact quotient meshes verify Betti, Euler, boundary and orientability at two resolutions`, () => {
    for (const size of [6, 10]) {
      const geometry = createSurfaceGeometry(name, {width: size, height: 4, radial: 4, tubular: size, along: size, across: 4});
      assert.ok(Array.from(geometry.getAttribute('position').array).every(Number.isFinite));
      const mesh = complexMesh(surfaceComplex(name, {along: size, across: 4}));
      geometry.dispose();
      const edges = mesh.edges.map(e => e.vertices);
      const d1 = boundaryMatrix(mesh.vertices, edges), d2 = boundaryMatrix(edges, mesh.triangles);
      for (const row of d1) for (let j = 0; j < mesh.triangles.length; j++) {
        assert.equal(row.reduce((sum, entry, k) => sum ^ (entry & d2[k][j]), 0), 0);
      }
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

test('raw Mobius render indices describe a cut rectangle, not the identified mathematical band', () => {
  const along = 8, across = 4;
  const geometry = createSurfaceGeometry('mobius', {along, across});
  const indices = geometry.index.array, simplices = new Map();
  for (let i = 0; i < indices.length; i += 3) {
    const face = Array.from(indices.slice(i, i + 3));
    for (let mask = 1; mask < 8; mask++) {
      const simplex = face.filter((_, j) => mask & (1 << j)).sort((a, b) => a - b);
      simplices.set(simplex.join(','), simplex);
    }
  }
  assert.equal(geometry.getAttribute('position').count, (along + 1) * (across + 1));
  assert.deepEqual(bettiNumbers([...simplices.values()]), [1, 0]);
  assert.equal(meshOrientable(complexMesh([...simplices.values()])), true);
  const band = surfaceComplex('mobius', {along, across});
  assert.equal(band.filter(s => s.length === 1).length, along * (across + 1));
  assert.deepEqual(bettiNumbers(band), [1, 1]);
  assert.equal(meshOrientable(complexMesh(band)), false);
  geometry.dispose();
});

test('43 adversarial and seeded random point clouds agree at every event and intervening scale', () => {
  for (const {name, points} of pointCases()) {
    const filtration = ripsFiltration(points), bars = persistentHomology(filtration);
    const events = [...new Set([0, ...filtration.map(s => s.birth)])];
    const probes = [...events, ...events.slice(1).map((end, i) => events[i] + (end - events[i]) / 2)];
    for (const epsilon of probes) {
      const active = filtration.filter(s => s.birth <= epsilon).map(s => s.vertices);
      assert.deepEqual(bettiAt(bars, epsilon), bettiNumbers(active), `${name} at ${epsilon}`);
      assert.equal(bettiAt(bars, epsilon)[0], componentCount(points, epsilon), `${name} H0 at ${epsilon}`);
    }
    assert.ok(bars.every(b => b.death > b.birth));
    const signature = ps => persistentHomology(ripsFiltration(ps)).map(b => [b.dimension, b.birth, b.death]);
    assert.deepEqual(signature([...points].reverse()), signature(points), `${name} relabeling`);
  }
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

test('P0 A: points 1e-10 apart have two H0 classes at epsilon zero', () => {
  const filtration = ripsFiltration([[0, 0], [1e-10, 0]]);
  const bars = persistentHomology(filtration);
  assert.deepEqual(bettiAt(bars, 0), [2, 0]);
  assert.equal(bars.filter(b => b.dimension === 0 && b.death > 0 && b.death < Infinity).length, 1);
  assert.deepEqual(bettiAt(bars, 0), bettiNumbers(filtration.filter(s => s.birth <= 0).map(s => s.vertices)));
});

test('P1: a 12-decimal grid must not move a positive edge birth to zero', () => {
  const filtration = ripsFiltration([[0, 0], [1e-14, 0]]);
  assert.equal(filtration.find(s => s.dimension === 1).birth, 5e-15);
  assert.deepEqual(bettiAt(persistentHomology(filtration), 0), [2, 0]);
  assert.deepEqual(bettiAt(persistentHomology(filtration), 5e-15), [1, 0]);
});

test('P0 B: a thin rectangle retains its short nonzero H1 interval', () => {
  const filtration = ripsFiltration([[0, 0], [1, 0], [1, 1e-5], [0, 1e-5]]);
  const bars = persistentHomology(filtration);
  const epsilon = 0.5000000000125;
  assert.deepEqual(bettiAt(bars, epsilon), [1, 1]);
  const h1 = bars.filter(b => b.dimension === 1);
  assert.equal(h1.length, 1);
  assert.ok(h1[0].death > h1[0].birth && h1[0].death - h1[0].birth < 1e-10);
  assert.deepEqual(bettiAt(bars, epsilon), bettiNumbers(filtration.filter(s => s.birth <= epsilon).map(s => s.vertices)));
  assert.deepEqual(bettiAt(bars, h1[0].death), [1, 0]);
});
