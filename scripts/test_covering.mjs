import test from 'node:test';
import assert from 'node:assert/strict';
import {liftPath,loopSamples,projectTurn,liftNext} from '../docs/javascripts/covering-core.mjs';

test('circle lifts preserve projection and winding under integer sheet changes',()=>{
  for(const n of [-3,-1,0,1,2,3])for(const k of [-3,0,2]){
    const samples=loopSamples(n),result=liftPath(samples,k);
    assert.equal(result.winding,n);
    assert.deepEqual(result.lift.map(projectTurn),samples);
    assert.deepEqual(result.lift.map(u=>u-k),liftPath(samples).lift);
  }
});
test('reverse, concatenate and backtrack obey covering invariants',()=>{
  const a=loopSamples(2),b=loopSamples(-1);
  assert.equal(liftPath([...a].reverse()).winding,-2);
  assert.equal(liftPath([...a,...b.slice(1)]).winding,1);
  assert.equal(liftPath([0,.125,.25,.125,0]).winding,0);
});
test('shortest arc is not a guess of hidden winding; antipodes reject',()=>{
  assert.deepEqual(liftPath([0,.75]).lift,[0,-.25]);
  assert.equal(liftPath([0,0]).winding,0);
  assert.throws(()=>liftPath([0,.5]),/对径/);
  assert.throws(()=>liftPath([0,.25,.75]),/对径/);
  assert.equal(liftPath([0,.25,.5]).closed,false);
});
test('no tolerance declares a near-loop closed or suppresses a short segment',()=>{
  const s=2**-60;
  assert.equal(liftPath([0,s]).winding,null);
  assert.equal(liftPath([0,s]).lift[1],s);
  assert.equal(projectTurn(s),s);
  assert.equal(liftPath([0,s],1).states[1].turn,s);
  assert.equal(liftPath([0,s,0]).winding,0);
});
test('near-antipodal arc decisions are independent of the chosen sheet',()=>{
  for(const s of [.5-2**-54,.5+2**-53])for(const k of [-1000,-1,0,1,1000]){
    const reference=liftPath([0,s,0]),translated=liftPath([0,s,0],k);
    assert.deepEqual(translated.states.map(v=>({sheet:v.sheet-k,turn:v.turn})),reference.states);
    assert.equal(translated.winding,0);
  }
  for(const k of [-1000,-1,0,1,1000])assert.throws(()=>liftPath([0,.5],k),/对径/);
});
test('subtraction rounding cannot invent antipodes and normalization cannot invent closure',()=>{
  for(const tiny of [Number.MIN_VALUE,2**-60,2**-55]){
    assert.deepEqual(liftPath([0,tiny,.5]).states.at(-1),{sheet:0,turn:.5});
    assert.deepEqual(liftPath([0,.25,.5,tiny]).states.at(-1),{sheet:0,turn:tiny});
    assert.throws(()=>projectTurn(-tiny),/无法表示/);
  }
});
test('all ordered dyadic boundary samples agree with a power-of-two rational comparison oracle',()=>{
  // Independent conversion by repeated powers of two, not the production bit decoder.
  function exact(x){let denominator=1n;while(!Number.isInteger(x)){x*=2;denominator*=2n;}return [BigInt(x),denominator];}
  const values=[0,Number.MIN_VALUE,2**-60,2**-55,.125,.25,.5-2**-54,.5,.5+2**-53,.75,1-2**-53];
  for(const a of values)for(const b of values)for(const k of [-1,0,1]){
    const [an,ad]=exact(a),[bn,bd]=exact(b),twice=2n*(bn*ad-an*bd),den=ad*bd;
    if(twice===den||twice===-den){assert.throws(()=>liftNext({sheet:k,turn:a},b),/对径/);continue;}
    const expected=k+(twice>den?-1:twice< -den?1:0);
    assert.deepEqual(liftNext({sheet:k,turn:a},b),{sheet:expected,turn:b});
  }
});
test('subdivision respects the specified lifted path exactly on dyadic samples',()=>{
  const result=liftPath([0,.25,.5,.75,0]);
  const fine=liftPath(loopSamples(1));
  assert.deepEqual(fine.lift.filter((_,i)=>i%2===0),result.lift);
});
test('invalid samples and unsupported coordinate range fail explicitly',()=>{
  for(const samples of [[],[.1],[0,1],[0,-.1],[0,NaN],[0,Infinity]])assert.throws(()=>liftPath(samples));
  for(const sheet of [NaN,.5,1001])assert.throws(()=>liftPath([0],sheet));
  assert.throws(()=>liftNext(Infinity,0));assert.throws(()=>projectTurn(1e7));
});
