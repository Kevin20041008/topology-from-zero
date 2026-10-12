import {maskTopology,pathPersistence} from '../docs/javascripts/ai-topology-core.mjs';
const masks=Array.from({length:512},(_,bits)=>{
  const mask=Array.from({length:3},(_,r)=>Array.from({length:3},(_,c)=>(bits>>(3*r+c))&1));
  return {mask,betti:maskTopology(mask).betti};
});
const paths=[];
for(const a of [0,5e-15,.25,.5,1])for(const b of [0,5e-15,.25,.5,1]) {
  const values=[0,a,b,0],r=pathPersistence(values);
  paths.push({values,filtration:r.filtration,bars:r.bars.map(bar=>[bar.dimension,bar.birth,Number.isFinite(bar.death)?bar.death:'infinity'])});
}
console.log(JSON.stringify({masks,paths}));
