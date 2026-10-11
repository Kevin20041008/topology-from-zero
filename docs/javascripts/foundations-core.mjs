// Exact finite teaching models: masks for subsets, integer distance matrices.
// No tolerance is used to decide equality or a mathematical axiom.
function size(n) {
  if (!Number.isInteger(n) || n < 0 || n > 4) throw new Error('集合大小必须为 0 到 4 的整数');
}
function subset(n, mask) {
  size(n);
  if (!Number.isInteger(mask) || mask < 0 || mask >= 2 ** n) throw new Error('子集编号超出全集');
}
export function members(n, mask) {
  subset(n, mask);
  return Array.from({length: n}, (_, i) => i).filter(i => mask & (1 << i));
}
export function imageMask(mapping, targetSize, mask) {
  size(mapping.length); size(targetSize); subset(mapping.length, mask);
  if (mapping.some(y => !Number.isInteger(y) || y < 0 || y >= targetSize)) throw new Error('映射值超出陪域');
  return members(mapping.length, mask).reduce((result, x) => result | (1 << mapping[x]), 0);
}
export function preimageMask(mapping, targetSize, mask) {
  imageMask(mapping, targetSize, 0); subset(targetSize, mask);
  return mapping.reduce((result, y, x) => result | ((mask & (1 << y)) ? (1 << x) : 0), 0);
}
export function topologyViolation(n, family) {
  size(n); family.forEach(mask => subset(n, mask));
  const sets = new Set(family), full = 2 ** n - 1;
  if (!sets.has(0)) return {kind: 'empty', result: 0};
  if (!sets.has(full)) return {kind: 'whole', result: full};
  for (const a of sets) for (const b of sets) {
    if (!sets.has(a | b)) return {kind: 'union', a, b, result: a | b};
    if (!sets.has(a & b)) return {kind: 'intersection', a, b, result: a & b};
  }
  return null;
}
export function generatedTopology(n, generators) {
  size(n); generators.forEach(mask => subset(n, mask));
  const family = new Set([0, 2 ** n - 1, ...generators]);
  let previous;
  do {
    previous = family.size;
    for (const a of [...family]) for (const b of [...family]) {
      family.add(a | b); family.add(a & b);
    }
  } while (family.size !== previous);
  return [...family].sort((a,b) => a-b);
}
export function integerMetricReport(matrix) {
  if (!Array.isArray(matrix) || matrix.length > 8 ||
      matrix.some(row => !Array.isArray(row) || row.length !== matrix.length ||
        row.some(d => !Number.isSafeInteger(d) || d < 0 || d > 1000000))) {
    throw new Error('需要至多 8×8、元素为 0 到 1000000 整数的方阵');
  }
  const n = matrix.length;
  for (let i=0;i<n;i++) {
    if (matrix[i][i] !== 0) return {kind:'diagonal', i};
    for (let j=0;j<n;j++) {
      if (matrix[i][j] !== matrix[j][i]) return {kind:'symmetry', i, j};
      for (let k=0;k<n;k++) {
        if (matrix[i][j] > matrix[i][k] + matrix[k][j]) return {kind:'triangle', i, j, k};
      }
    }
  }
  for (let i=0;i<n;i++) for (let j=i+1;j<n;j++) {
    if (matrix[i][j] === 0) return {kind:'pseudometric', i, j};
  }
  return {kind:'metric'};
}

export function integerOpenBall(matrix, center, radius) {
  const report=integerMetricReport(matrix);
  if (!['metric','pseudometric'].includes(report.kind)) throw new Error('距离矩阵须先满足伪度量公理');
  if (!Number.isInteger(center)||center<0||center>=matrix.length) throw new Error('球心编号不在集合内');
  if (!Number.isSafeInteger(radius)||radius<=0||radius>1000000) throw new Error('半径须为 1 到 1000000 的整数');
  return matrix[center].flatMap((distance, i)=>distance<radius?[i]:[]);
}
