// Original finite teaching models. F2 ranks are exact; scores use binary64.
import {bettiNumbers, persistentHomology, bettiAt} from './topology-core.mjs';

function scores(values) {
  if (!Array.isArray(values) || values.length < 1 || values.length > 32 ||
      !Array.from(values).every(x => Number.isFinite(x) && x >= 0 && x <= 1)) {
    throw new Error('Scores must contain 1–32 finite values in [0,1]');
  }
}

export function lowerStarPath(values) {
  scores(values);
  const cells = values.map((birth, i) => ({vertices: [i], dimension: 0, birth}));
  for (let i = 1; i < values.length; i++) {
    cells.push({vertices: [i - 1, i], dimension: 1, birth: Math.max(values[i - 1], values[i])});
  }
  return cells.sort((a, b) => a.birth - b.birth || a.dimension - b.dimension || a.vertices[0] - b.vertices[0]);
}

export function pathPersistence(values, threshold = 0.5) {
  scores([threshold]);
  const filtration = lowerStarPath(values);
  const bars = persistentHomology(filtration);
  const finite = bars.filter(b => Number.isFinite(b.death));
  const essential = bars.filter(b => !Number.isFinite(b.death));
  return {filtration, bars, finite, essential, betti: bettiAt(bars, threshold)};
}

export function bridgeLoss(t, threshold = 0.5) {
  scores([t]);
  const result = pathPersistence([0, t, 0], threshold);
  return {...result, loss: result.finite.reduce((sum, b) => sum + (b.death - b.birth) ** 2, 0),
    hardLoss: (result.betti[0] - 1) ** 2, gradient: 2 * t};
}

export function pairedBridgeLoss(a, b) {
  scores([a, b]);
  const result = pathPersistence([0, a, b, 0]);
  const m = Math.max(a, b);
  // At a=b>0 there is no ordinary gradient; do not silently pick a branch.
  const gradient = a === b ? (a === 0 ? [0, 0] : null) : a > b ? [2 * a, 0] : [0, 2 * b];
  return {...result, loss: result.finite.reduce((sum, bar) => sum + (bar.death - bar.birth) ** 2, 0),
    gradient, branchGradients: [[2 * m, 0], [0, 2 * m]], tie: a === b && a > 0};
}

function maskShape(mask) {
  if (!Array.isArray(mask) || mask.length > 8) throw new Error('Expected a binary grid up to 8×8');
  const width = mask.length ? mask[0]?.length : 0;
  if (!Number.isInteger(width) || width > 8 || (mask.length && width < 1) ||
      Array.from(mask).some(row => !Array.isArray(row) || row.length !== width || Array.from(row).some(x => x !== 0 && x !== 1))) {
    throw new Error('Expected a rectangular binary grid up to 8×8; [] represents an empty grid');
  }
  return [mask.length, width];
}

// Every foreground pixel is a CLOSED unit square including all faces.
// Triangulation with one fixed diagonal preserves that subset of R² exactly.
export function pixelComplex(mask) {
  const [height, width] = maskShape(mask);
  const unique = new Map();
  const vertex = (r, c) => r * (width + 1) + c;
  const add = s => { s.sort((a, b) => a - b); unique.set(s.join(','), s); };
  for (let r = 0; r < height; r++) for (let c = 0; c < width; c++) if (mask[r][c]) {
    const a = vertex(r, c), b = vertex(r, c + 1), d = vertex(r + 1, c), e = vertex(r + 1, c + 1);
    for (const v of [a, b, d, e]) add([v]);
    for (const edge of [[a,b],[a,d],[b,e],[d,e],[a,e]]) add(edge);
    add([a,b,e]); add([a,d,e]);
  }
  return [...unique.values()].sort((a, b) => a.length - b.length || a[0] - b[0]);
}

export function maskTopology(mask) {
  const simplices = pixelComplex(mask);
  const counts = [1,2,3].map(n => simplices.filter(s => s.length === n).length);
  const betti = bettiNumbers(simplices);
  return {betti, counts, euler: counts[0] - counts[1] + counts[2], pixels: mask.flat().reduce((s,x) => s+x, 0)};
}

export function diceScore(prediction, target) {
  const shape = maskShape(prediction), targetShape = maskShape(target);
  if (shape[0] !== targetShape[0] || shape[1] !== targetShape[1]) throw new Error('Grid shapes must agree');
  let countP = 0, countT = 0, intersection = 0;
  for (let r=0;r<shape[0];r++) for(let c=0;c<shape[1];c++) {
    countP += prediction[r][c]; countT += target[r][c]; intersection += prediction[r][c] * target[r][c];
  }
  const denominator = countP + countT;
  return {numerator: 2 * intersection, denominator, value: denominator ? 2 * intersection / denominator : 1,
    emptyConvention: denominator === 0};
}

const full = () => Array.from({length:5}, () => Array(5).fill(1));
const without = (r,c) => {const mask = full(); mask[r][c] = 0; return mask;};
export function segmentationPresets() {
  return {target:full(), hole:without(2,2), notch:without(0,2),
    bridge:[[0,0,0,0,0],[1,1,0,1,1],[1,1,1,1,1],[1,1,0,1,1],[0,0,0,0,0]],
    broken:[[0,0,0,0,0],[1,1,0,1,1],[1,1,0,1,1],[1,1,0,1,1],[0,0,0,0,0]],
    diagonal:[[1,0],[0,1]], empty:Array.from({length:5},()=>Array(5).fill(0))};
}
