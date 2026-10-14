// Exact formal coefficient checks for the front-face cup/cap conventions.
// Bounded degree checks support these examples; they are not general proofs.
import test from 'node:test';
import assert from 'node:assert/strict';

const sign = exponent => exponent % 2 === 0 ? 1n : -1n;
const omit = (face, i) => [...face.slice(0, i), ...face.slice(i + 1)];
const simplex = n => Array.from({length: n + 1}, (_, i) => i);
function add(expression, monomial, coefficient) {
  // Ordered factors remain ordered: no assumed commutativity is used here.
  const key = JSON.stringify(monomial);
  const total = (expression.get(key) ?? 0n) + coefficient;
  if (total === 0n) expression.delete(key);
  else expression.set(key, total);
}
const canonical = expression => [...expression.entries()].sort(([a], [b]) => a.localeCompare(b));

function cupLeibniz(p, q) {
  const n = p + q + 1, face = simplex(n);
  const left = new Map(), right = new Map();
  // delta(phi cup psi): first take the whole boundary, then split each face.
  for (let i = 0; i <= n; i++) {
    const smaller = omit(face, i);
    add(left, [smaller.slice(0, p + 1), smaller.slice(p)], sign(i));
  }
  // (delta phi) cup psi: split first, then boundary only the front face.
  const frontHigher = face.slice(0, p + 2), back = face.slice(p + 1);
  for (let i = 0; i <= p + 1; i++) {
    add(right, [omit(frontHigher, i), back], sign(i));
  }
  // (-1)^p phi cup (delta psi): boundary only the back face.
  const front = face.slice(0, p + 1), backHigher = face.slice(p);
  for (let j = 0; j <= q + 1; j++) {
    add(right, [front, omit(backHigher, j)], sign(p + j));
  }
  return [canonical(left), canonical(right)];
}

function capBoundary(n, p) {
  const face = simplex(n), left = new Map(), right = new Map();
  // Each monomial stores [face evaluated by phi, remaining chain face].
  // Ordinary C_0 has zero boundary; cap above chain degree is zero.
  if (p <= n && n - p > 0) {
    const front = face.slice(0, p + 1), tail = face.slice(p);
    for (let j = 0; j < tail.length; j++) {
      add(left, [front, omit(tail, j)], sign(j));
    }
  }
  // (-1)^p phi cap boundary(sigma)
  if (n > 0 && p <= n - 1) {
    for (let i = 0; i <= n; i++) {
      const smaller = omit(face, i);
      add(right, [smaller.slice(0, p + 1), smaller.slice(p)], sign(p + i));
    }
  }
  // -(-1)^p (delta phi) cap sigma
  if (p + 1 <= n) {
    const front = face.slice(0, p + 2), tail = face.slice(p + 1);
    for (let i = 0; i <= p + 1; i++) {
      add(right, [omit(front, i), tail], sign(p + 1 + i));
    }
  }
  return [canonical(left), canonical(right)];
}

test('Q1.1 cup Leibniz: 36 exact formal identities, p,q from 0 through 5', () => {
  for (let p = 0; p <= 5; p++) for (let q = 0; q <= 5; q++) {
    const [left, right] = cupLeibniz(p, q);
    assert.deepEqual(left, right, `p=${p}, q=${q}`);
  }
});

test('Q2.1 cap boundary: 52 exact identities, including p=0, n=p, and n<p', () => {
  for (let n = 0; n <= 7; n++) for (let p = 0; p <= n + 2; p++) {
    const [left, right] = capBoundary(n, p);
    assert.deepEqual(left, right, `n=${n}, p=${p}`);
    if (n <= p) assert.deepEqual(left, [], 'all terms vanish in ordinary chain degrees');
  }
});
