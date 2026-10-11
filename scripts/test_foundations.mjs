import test from 'node:test';
import assert from 'node:assert/strict';
import {members,imageMask,preimageMask,topologyViolation,generatedTopology,integerMetricReport,integerOpenBall} from '../docs/javascripts/foundations-core.mjs';

// Independent reference: sets of element labels and all subfamilies, no closure
// iteration. A three-point labelled set has 29 topologies.
const subsets=Array.from({length:8},(_,m)=>new Set([0,1,2].filter(x=>m & 2**x)));
const key=s=>[...s].sort().join(',');
function referenceTopology(family) {
  const keys=new Set(family.map(key));
  if (!keys.has('') || !keys.has('0,1,2')) return false;
  for (let bits=0;bits<2**family.length;bits++) {
    const selected=family.filter((_,i)=>bits & 2**i);
    if (!keys.has(key(new Set(selected.flatMap(s=>[...s]))))) return false;
  }
  return family.every(a=>family.every(b=>keys.has(key(new Set([...a].filter(x=>b.has(x)))))));
}
const topologies=[];
for (let mask=0;mask<256;mask++) {
  const family=subsets.filter((_,i)=>mask & 2**i);
  if (referenceTopology(family)) topologies.push(family.map(s=>subsets.findIndex(t=>key(t)===key(s))));
}

test('all 64 three-point generating families give the intersection of all containing topologies',()=>{
  assert.equal(topologies.length,29);
  for(let mask=0;mask<64;mask++) {
    const input=Array.from({length:6},(_,i)=>i+1).filter((_,i)=>mask & 2**i);
    const containing=topologies.filter(t=>input.every(s=>t.includes(s)));
    const expected=Array.from({length:8},(_,i)=>i).filter(s=>containing.every(t=>t.includes(s)));
    const actual=generatedTopology(3,input);
    assert.deepEqual(actual,expected);
    assert.equal(topologyViolation(3,actual),null);
    assert.deepEqual(generatedTopology(3,actual),actual);
  }
});
test('all finite families have a valid axiom failure witness exactly when not a topology',()=>{
  for(let mask=0;mask<256;mask++) {
    const input=Array.from({length:8},(_,i)=>i).filter(i=>mask & 2**i);
    const violation=topologyViolation(3,input);
    assert.equal(violation===null,referenceTopology(input.map(i=>subsets[i])));
    if(violation) {
      assert.ok(!input.includes(violation.result));
      if(violation.kind==='union'||violation.kind==='intersection') {
        assert.ok(input.includes(violation.a)&&input.includes(violation.b));
        const a=subsets[violation.a], b=subsets[violation.b];
        const expected=violation.kind==='union'?new Set([...a,...b]):new Set([...a].filter(x=>b.has(x)));
        assert.equal(key(expected),key(subsets[violation.result]));
      }
    }
  }
});
test('empty sets, singletons, redundant generators and invalid masks',()=>{
  assert.deepEqual(generatedTopology(0,[]),[0]);
  assert.deepEqual(generatedTopology(1,[]),[0,1]);
  assert.deepEqual(generatedTopology(3,[3,6,3]),[0,2,3,6,7]);
  assert.throws(()=>generatedTopology(3,[8]));
  assert.throws(()=>generatedTopology(5,[]));
});
test('every map between sets up to three points preserves inverse-image unions, intersections and complements',()=>{
  let maps=0;
  for(let n=0;n<=3;n++) for(let m=0;m<=3;m++) {
    const count=n===0?1:m**n;
    for(let code=0;code<count;code++) {
      let digits=code;
      const f=Array.from({length:n},()=>{const y=digits%m;digits=Math.floor(digits/m);return y;});
      maps++;
      for(let a=0;a<2**m;a++) for(let b=0;b<2**m;b++) {
        const pa=preimageMask(f,m,a),pb=preimageMask(f,m,b);
        assert.equal(preimageMask(f,m,a|b),pa|pb);
        assert.equal(preimageMask(f,m,a&b),pa&pb);
        assert.equal(preimageMask(f,m,(2**m-1)^a),(2**n-1)^pa);
        assert.deepEqual(members(n,pa),f.flatMap((y,x)=>(a & 2**y)?[x]:[]));
      }
    }
  }
  assert.equal(maps,60);
});
test('image-intersection counterexample and the empty-domain convention stay explicit',()=>{
  const f=[0,0,1], a=1, b=2;
  assert.equal(imageMask(f,3,a&b),0);
  assert.equal(imageMask(f,3,a)&imageMask(f,3,b),1);
  assert.equal(imageMask([],0,0),0);
  assert.equal(preimageMask([],3,7),0);
  assert.throws(()=>imageMask([0],0,1));
  assert.throws(()=>preimageMask([0],1,2));
});
test('integer metrics distinguish real violations from pseudometric zero separation',()=>{
  assert.deepEqual(integerMetricReport([]),{kind:'metric'});
  assert.deepEqual(integerMetricReport([[0]]),{kind:'metric'});
  assert.deepEqual(integerMetricReport([[0,1,2],[1,0,1],[2,1,0]]),{kind:'metric'});
  assert.deepEqual(integerMetricReport([[0,0],[0,0]]),{kind:'pseudometric',i:0,j:1});
  assert.equal(integerMetricReport([[1]]).kind,'diagonal');
  assert.equal(integerMetricReport([[0,1],[2,0]]).kind,'symmetry');
  const bad=[[0,1,3],[1,0,1],[3,1,0]], r=integerMetricReport(bad);
  assert.equal(r.kind,'triangle');
  assert.ok(bad[r.i][r.j]>bad[r.i][r.k]+bad[r.k][r.j]);
  assert.equal(integerMetricReport([[0,1000000],[1000000,0]]).kind,'metric');
  for(const input of [[[]],[[NaN]],[[Infinity]],[[0,.1],[.1,0]],[[0,-1],[-1,0]],[[1000001]],null]) {
    assert.throws(()=>integerMetricReport(input));
  }
});
test('strict open balls exclude exact boundary points and respect zero-distance classes',()=>{
  assert.deepEqual(integerOpenBall([[0,2,3],[2,0,4],[3,4,0]],0,3),[0,1]);
  assert.deepEqual(integerOpenBall([[0,0,1],[0,0,1],[1,1,0]],0,1),[0,1]);
  assert.throws(()=>integerOpenBall([],0,1));
  assert.throws(()=>integerOpenBall([[0]],0,0));
  assert.throws(()=>integerOpenBall([[0]],1,1));
  assert.throws(()=>integerOpenBall([[0,1,3],[1,0,1],[3,1,0]],0,3));
});
test('216 integer triangle matrices and 1998 strict balls agree with an independent edge classification',()=>{
  let matrices=0,balls=0;
  for(let a=0;a<=5;a++) for(let b=0;b<=5;b++) for(let c=0;c<=5;c++) {
    const matrix=[[0,a,b],[a,0,c],[b,c,0]], edges=[a,b,c].sort((x,y)=>x-y);
    const expected=edges[2]>edges[0]+edges[1]?'triangle':edges[0]===0?'pseudometric':'metric';
    assert.equal(integerMetricReport(matrix).kind,expected);matrices++;
    if(expected!=='triangle') for(let center=0;center<3;center++) for(let radius=1;radius<=6;radius++) {
      const actual=integerOpenBall(matrix,center,radius);
      for(let vertex=0;vertex<3;vertex++) assert.equal(actual.includes(vertex),matrix[center][vertex]<radius);
      balls++;
    }
  }
  assert.equal(matrices,216);assert.equal(balls,1998);
});
