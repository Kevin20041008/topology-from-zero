import {ripsFiltration, persistentHomology, bettiNumbers, boundaryMatrix, rankF2} from '../docs/javascripts/topology-core.mjs';
import {surfaceComplex} from '../docs/javascripts/surface-topology.mjs';
import {pointCases} from './topology_cases.mjs';

const points = pointCases().map(({name, points}) => {
  const filtration = ripsFiltration(points);
  const distances = points.map((_, i) => Array(i).fill(0));
  for (const s of filtration) if (s.dimension === 1) distances[s.vertices[1]][s.vertices[0]] = s.birth;
  const bars = persistentHomology(filtration).map(b => [b.dimension, b.birth, b.death === Infinity ? 'infinity' : b.death]);
  return {name, points, distances, filtration, bars};
});
const surfaces = ['sphere', 'torus', 'mobius'].map(name => {
  const simplices = surfaceComplex(name);
  const edges = simplices.filter(s => s.length === 2), faces = simplices.filter(s => s.length === 3);
  return {name, simplices, betti: [...bettiNumbers(simplices), faces.length - rankF2(boundaryMatrix(edges, faces))]};
});
process.stdout.write(JSON.stringify({points, surfaces}));
