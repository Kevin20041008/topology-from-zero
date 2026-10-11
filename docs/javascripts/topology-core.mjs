// Original teaching implementation; exact F_2 arithmetic, floating-point geometry.
export function rankF2(input) {
  const rows = input.map(row => Uint8Array.from(row, value => value & 1));
  if (!rows.length) return 0;
  let rank = 0;
  for (let column = 0; column < rows[0].length && rank < rows.length; column++) {
    let pivot = rank;
    while (pivot < rows.length && !rows[pivot][column]) pivot++;
    if (pivot === rows.length) continue;
    [rows[rank], rows[pivot]] = [rows[pivot], rows[rank]];
    for (let i = rank + 1; i < rows.length; i++) {
      if (rows[i][column]) for (let j = column; j < rows[0].length; j++) rows[i][j] ^= rows[rank][j];
    }
    rank++;
  }
  return rank;
}

export function faces(vertices) {
  return vertices.map((_, i) => vertices.filter((__, j) => i !== j));
}

export function boundaryMatrix(lower, upper) {
  const lookup = new Map(lower.map((simplex, i) => [simplex.join(','), i]));
  const matrix = Array.from({length: lower.length}, () => new Uint8Array(upper.length));
  upper.forEach((simplex, column) => {
    for (const face of faces(simplex)) {
      const row = lookup.get(face.join(','));
      if (row === undefined) throw new Error('A simplex is missing a face');
      matrix[row][column] = 1;
    }
  });
  return matrix;
}

export function bettiNumbers(simplices) {
  const layers = [1, 2, 3].map(size => simplices.filter(s => s.length === size));
  const r1 = rankF2(boundaryMatrix(layers[0], layers[1]));
  const r2 = rankF2(boundaryMatrix(layers[1], layers[2]));
  return [layers[0].length - r1, layers[1].length - r1 - r2];
}

// The filtration parameter is ball radius epsilon: an edge enters at d/2.
// Keep representable positive lifetimes; a fixed rounding grid breaks rescaling.
export function ripsFiltration(points) {
  if (!Array.isArray(points) || points.some(p => !Array.isArray(p) || p.length !== 2 || !p.every(Number.isFinite))) {
    throw new Error('Expected finite 2D coordinates');
  }
  const result = points.map((_, i) => ({vertices: [i], dimension: 0, birth: 0}));
  const edgeBirths = new Map();
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const distance = Math.hypot(points[i][0] - points[j][0], points[i][1] - points[j][1]);
      if (!Number.isFinite(distance)) throw new Error('Pairwise distance must be finite; rescale coordinates');
      const birth = distance / 2;
      if (distance > 0 && birth === 0) throw new Error('Pairwise distance underflows at half scale; rescale coordinates');
      edgeBirths.set(`${i},${j}`, birth);
      result.push({vertices: [i, j], dimension: 1, birth});
    }
  }
  for (let i = 0; i < points.length; i++) for (let j = i + 1; j < points.length; j++) {
    for (let k = j + 1; k < points.length; k++) {
      const birth = Math.max(edgeBirths.get(`${i},${j}`), edgeBirths.get(`${i},${k}`), edgeBirths.get(`${j},${k}`));
      result.push({vertices: [i, j, k], dimension: 2, birth});
    }
  }
  return result.sort((a, b) => {
    const order = a.birth - b.birth || a.dimension - b.dimension;
    if (order) return order;
    for (let i = 0; i < a.vertices.length; i++) {
      if (a.vertices[i] !== b.vertices[i]) return a.vertices[i] - b.vertices[i];
    }
    return 0;
  });
}

function xorSets(a, b) {
  const result = new Set(a);
  for (const value of b) result.has(value) ? result.delete(value) : result.add(value);
  return result;
}

// Standard left-to-right boundary-column reduction. Faces precede cofaces.
export function persistentHomology(filtration) {
  const lookup = new Map();
  filtration.forEach((s, i) => {
    if (!Array.isArray(s.vertices) || !s.vertices.length ||
        s.vertices.some((v, j) => !Number.isSafeInteger(v) || v < 0 || (j > 0 && v <= s.vertices[j - 1]))) {
      throw new Error('Simplex vertices must be distinct increasing nonnegative integers');
    }
    if (s.dimension !== s.vertices.length - 1) throw new Error('Invalid simplex dimension');
    if (!Number.isFinite(s.birth) || s.birth < 0) throw new Error('Invalid birth scale');
    if (i && s.birth < filtration[i - 1].birth) throw new Error('Invalid filtration order');
    const key = s.vertices.join(',');
    if (lookup.has(key)) throw new Error('Duplicate simplex');
    lookup.set(key, i);
  });
  const reduced = [];
  const owner = new Map();
  const births = [];
  const deaths = new Map();
  filtration.forEach((simplex, j) => {
    let column = new Set(simplex.dimension ? faces(simplex.vertices).map(face => lookup.get(face.join(','))) : []);
    if ([...column].some(i => i === undefined || i >= j)) throw new Error('Invalid filtration order');
    while (column.size) {
      const low = Math.max(...column);
      if (!owner.has(low)) break;
      column = xorSets(column, reduced[owner.get(low)]);
    }
    reduced[j] = column;
    if (column.size) {
      const low = Math.max(...column);
      owner.set(low, j);
      deaths.set(low, simplex.birth);
    } else births.push(j);
  });
  return births.filter(i => filtration[i].dimension <= 1).map(i => ({
    dimension: filtration[i].dimension,
    birth: filtration[i].birth,
    death: deaths.has(i) ? deaths.get(i) : Infinity,
    creator: filtration[i].vertices,
  })).filter(bar => bar.death > bar.birth)
    .sort((a, b) => a.dimension - b.dimension || a.birth - b.birth || b.death - a.death);
}

export function bettiAt(bars, radius) {
  return [0, 1].map(d => bars.filter(bar => bar.dimension === d && bar.birth <= radius && radius < bar.death).length);
}

export const pointPresets = {
  square: {name: '单位正方形 · 4 点', points: [[0, 0], [1, 0], [1, 1], [0, 1]]},
  ring: {name: '椭圆环 · 8 点', points: Array.from({length: 8}, (_, i) => [1.15 * Math.cos(i * Math.PI / 4), .9 * Math.sin(i * Math.PI / 4)])},
  clusters: {name: '两个点簇 · 6 点', points: [[-.95, -.12], [-.6, .22], [-.65, -.3], [.65, .15], [1, .22], [.85, -.25]]},
};
