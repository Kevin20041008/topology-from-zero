import test from 'node:test';
import assert from 'node:assert/strict';
import {bettiNumbers, rankF2, ripsFiltration, persistentHomology, bettiAt, pointPresets} from '../docs/javascripts/topology-core.mjs';

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
    if (Math.hypot(points[i][0] - points[j][0], points[i][1] - points[j][1]) / 2 <= epsilon + 5e-13) parent[find(i)] = find(j);
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

test('relabeling vertices preserves the multiset of persistence intervals', () => {
  const signature = points => persistentHomology(ripsFiltration(points))
    .map(b => `${b.dimension}:${b.birth}:${b.death}`).sort();
  for (const preset of Object.values(pointPresets)) assert.deepEqual(signature(preset.points), signature([...preset.points].reverse()));
});
