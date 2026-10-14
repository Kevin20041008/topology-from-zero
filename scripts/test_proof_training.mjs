import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {proofTraining as bank} from '../docs/javascripts/proof-training-bank.mjs';
import {checkArrangement,initialOrder,moveStep,decodeDrafts,encodeDrafts,MAX_DRAFT_LENGTH} from '../docs/javascripts/proof-training-core.mjs';
import {renderWorkshop} from './build_proof_workshop.mjs';

test('eight route-A workshops preserve prerequisite destinations and complete static fallback',()=>{
  assert.deepEqual(bank.map(t=>t.code),['PRE1','PRE2','PRE3','spaces','bases','PS1','continuity','connectedness']);
  const md=readFileSync(new URL('../docs/exercises/proof-workshop.md',import.meta.url),'utf8').replaceAll('\r\n','\n');
  assert.equal(md,renderWorkshop());
  for(const t of bank){
    assert.ok(existsSync(new URL('../docs/'+t.chapter,import.meta.url)),t.chapter);
    assert.equal(t.analysis.length,3);assert.equal(t.rubric.length,4);
    assert.ok(md.includes(t.transfer));assert.ok(md.includes(t.solution.join('\n\n    ')));
    assert.equal(t.steps.filter(s=>s.invalid).length,1);
    assert.ok(t.counterexample);assert.equal(t.hints.length,2);
    const ids=new Set(t.steps.map(s=>s.id));assert.equal(ids.size,t.steps.length);
    for(const s of t.steps)for(const dep of s.needs)assert.ok(ids.has(dep));
    assert.ok(readFileSync(new URL('../docs/'+t.chapter,import.meta.url),'utf8').includes(`proof-workshop.md#${t.id}`));
  }
});

test('feedback rejects a false inference, missing necessary argument, and each reversed dependency',()=>{
  for(const t of bank){
    const order=t.steps.map(s=>s.id),bad=t.steps.find(s=>s.invalid).id;
    assert.equal(checkArrangement(t,order,[]).ok,false);
    assert.ok(checkArrangement(t,order,[]).errors.some(e=>e.code==='invalid-step'));
    assert.equal(checkArrangement(t,order,[bad]).ok,true,t.id);
    const needed=t.steps.find(s=>!s.invalid).id;
    assert.ok(checkArrangement(t,order,[bad,needed]).errors.some(e=>e.code==='missing-step'));
    for(const s of t.steps.filter(s=>!s.invalid))for(const dep of s.needs){
      const altered=order.filter(x=>x!==s.id);altered.unshift(s.id);
      assert.ok(checkArrangement(t,altered,[bad]).errors.some(e=>e.code==='dependency'&&e.step===s.id&&e.dependency===dep),`${t.id}:${s.id}`);
    }
    assert.equal(checkArrangement(t,initialOrder(t),[]).ok,false);
  }
});

test('independent arguments may change order; controls do not mutate input or drop steps',()=>{
  const iff=bank[0];
  assert.equal(checkArrangement(iff,['c','d','a','b','bad'],['bad']).ok,true);
  const compact=bank.find(t=>t.id==='continuity');
  assert.equal(checkArrangement(compact,['a','c','b','d','bad'],['bad']).ok,true);
  const order=['a','b','c'];assert.deepEqual(moveStep(order,'b',-1),['b','a','c']);assert.deepEqual(order,['a','b','c']);
  for(const [id,dir] of [['a',-1],['c',1],['unknown',1],['b',8]])assert.deepEqual(moveStep(order,id,dir),order);
});

test('malformed proof state is never accepted as a proof; text drafts have no automatic score',()=>{
  const t=bank[0];
  for(const order of [null,[],['a','b','c','d','x'],['a','a','c','d','bad']])assert.equal(checkArrangement(t,order,['bad']).ok,false);
  assert.equal(checkArrangement(t,t.steps.map(s=>s.id),['unknown']).ok,false);
  for(const raw of [null,'{','null','[]','{"version":2,"drafts":{}}'])assert.deepEqual(decodeDrafts(raw,bank),{});
  const raw=JSON.stringify({version:1,drafts:{pre1:{text:'<script>not executed</script>',checks:[0,0,3,4,-1,'1']},unknown:{text:'x',checks:[]},pre2:{text:17}}});
  assert.deepEqual(decodeDrafts(raw,bank),{pre1:{text:'<script>not executed</script>',checks:[0,3]}});
  const long=decodeDrafts(JSON.stringify({version:1,drafts:{pre1:{text:'x'.repeat(MAX_DRAFT_LENGTH+1),checks:[]}}}),bank);
  assert.equal(long.pre1.text.length,MAX_DRAFT_LENGTH);
  const stored=JSON.parse(encodeDrafts({pre1:{text:'这不是证明',checks:[0]},pre2:{text:'另一种合法证明可能不同',checks:[]}},bank));
  assert.deepEqual(Object.keys(stored.drafts.pre1).sort(),['checks','text']);
});

// Independent finite checks support the stated examples; they do not prove
// the universal statements or validate a learner's free text.
const subsets=n=>Array.from({length:2**n},(_,i)=>i);
const subset=(a,b)=>(a&b)===a;
const preimage=(f,b)=>f.reduce((mask,y,x)=>mask|(((b>>y)&1)<<x),0);
test('all maps of sets with at most three elements satisfy adjunction and the surjection reflection criterion',()=>{
  let checked=0;
  for(let n=0;n<=3;n++)for(let m=0;m<=3;m++){
    const count=n===0?1:m**n;
    for(let id=0;id<count;id++){
      let value=id;const f=Array.from({length:n},()=>{const y=value%m;value=Math.floor(value/m);return y;});
      let reflection=true;
      for(const b of subsets(m))for(const c of subsets(m))if(subset(preimage(f,b),preimage(f,c))&&!subset(b,c))reflection=false;
      assert.equal(reflection,new Set(f).size===m);
      for(const a of subsets(n))for(const b of subsets(m)){
        const image=f.reduce((mask,y,x)=>mask|(((a>>x)&1)<<y),0);
        assert.equal(subset(image,b),subset(a,preimage(f,b)));
      }
      checked++;
    }
  }
  assert.equal(checked,60);
});

function isTopology(t,n){
  const full=2**n-1;if(!t.has(0)||!t.has(full))return false;
  for(const a of t)for(const b of t)if(!t.has(a|b)||!t.has(a&b))return false;
  return true; // finite powerset: binary unions cover arbitrary subfamilies
}
function closure(a,t,n){
  const full=2**n-1;let result=full;
  for(const open of t){const closed=full^open;if(subset(a,closed))result&=closed;}
  return result;
}
test('all 29 labelled three-point topologies obey the dense-open closure identity with a failing nonopen control',()=>{
  let count=0,cases=0;
  for(let mask=0;mask<256;mask++){
    const t=new Set(subsets(3).filter(a=>(mask>>a)&1));if(!isTopology(t,3))continue;count++;
    for(const a of subsets(3))if(closure(a,t,3)===7)for(const u of t){assert.equal(closure(a&u,t,3),closure(u,t,3));cases++;}
  }
  assert.equal(count,29);assert.ok(cases>0);
  // Sierpinski: {1} is dense, while the nonopen subset {0} misses it.
  const t=new Set([0,2,3]);assert.equal(closure(2,t,2),3);
  assert.notEqual(closure(2&1,t,2),closure(1,t,2));
});
