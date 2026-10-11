// Abstract triangulations with exact parameter identifications.
// These are mathematical complexes, not vertex buffers used for lighting.
export function surfaceComplex(name, {along = 8, across = 4} = {}) {
  if (!['sphere', 'torus', 'mobius'].includes(name)) throw new Error('Unknown surface');
  if (!Number.isInteger(along) || along < 4 || !Number.isInteger(across) || across < 3) {
    throw new Error('Use at least 4 by 3 parameter subdivisions');
  }
  function vertex(i, j) {
    if (name === 'sphere') {
      if (j === 0) return 0;
      if (j === across) return 1;
      return 2 + (j - 1) * along + i % along;
    }
    if (name === 'torus') return (i % along) * across + j % across;
    // (2pi, v) ~ (0, -v): the last strip reverses the transverse index.
    return i === along ? across - j : i * (across + 1) + j;
  }
  const simplices = new Map();
  function addFace(face) {
    if (new Set(face).size < 3) return; // Collapsed sphere pole triangle.
    for (let mask = 1; mask < 8; mask++) {
      const simplex = face.filter((_, j) => mask & (1 << j)).sort((a, b) => a - b);
      simplices.set(simplex.join(','), simplex);
    }
  }
  for (let i = 0; i < along; i++) for (let j = 0; j < across; j++) {
    const a = vertex(i, j), b = vertex(i + 1, j);
    const c = vertex(i, j + 1), d = vertex(i + 1, j + 1);
    addFace([a, b, c]);
    addFace([b, d, c]);
  }
  return [...simplices.values()].sort((a, b) => a.length - b.length || a.join(',').localeCompare(b.join(',')));
}
