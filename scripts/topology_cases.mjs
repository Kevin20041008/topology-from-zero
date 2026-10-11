import {pointPresets} from '../docs/javascripts/topology-core.mjs';

// Fixed seeds make failures reproducible. No generated case is selected by result.
export function pointCases() {
  const cases = Object.entries(pointPresets).map(([name, {points}]) => ({name, points}));
  cases.push(
    {name: 'empty', points: []},
    {name: 'singleton', points: [[0, 0]]},
    {name: 'P0-A-near-pair', points: [[0, 0], [1e-10, 0]]},
    {name: 'P0-B-thin-rectangle', points: [[0, 0], [1, 0], [1, 1e-5], [0, 1e-5]]},
    {name: 'duplicates', points: [[0, 0], [0, 0], [1, 0], [1, 0]]},
    {name: 'all-coincident', points: [[2, 3], [2, 3], [2, 3]]},
    {name: 'collinear', points: [[0, 0], [1e-14, 0], [1, 0], [3, 0]]},
    {name: 'tiny-square', points: [[0, 0], [1e-14, 0], [1e-14, 1e-14], [0, 1e-14]]},
  );
  for (let seed = 1; seed <= 32; seed++) {
    let state = seed;
    const random = () => {
      state ^= state << 13; state ^= state >>> 17; state ^= state << 5;
      return (state >>> 0) / 2 ** 32;
    };
    const scale = [1e-10, 1, 1e5][seed % 3];
    const points = Array.from({length: 3 + seed % 6}, () => [random() * scale, random() * scale]);
    cases.push({name: `seed-${seed}-scale-${scale}`, points});
  }
  return cases;
}
