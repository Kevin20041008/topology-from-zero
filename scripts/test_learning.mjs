import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {decodeProgress,setCompleted,routeProgress,assess} from '../docs/javascripts/learning-core.mjs';
const json=p=>JSON.parse(readFileSync(new URL(p,import.meta.url),'utf8'));
const curriculum=json('./curriculum.json').chapters;
const routes=json('../docs/assets/learning-paths.json').routes;

test('three route sequences include every prerequisite, with explicit completed entry bridges',()=>{
  assert.deepEqual(routes.map(r=>r.id),['A','B','C']);
  const chapters=new Map(curriculum.map(c=>[c.code,c]));
  for(const route of routes){
    const seen=new Set();
    for(const code of [...route.entryCodes,...route.lessons.map(l=>l.code)]){
      assert.ok(chapters.has(code),code);
      for(const pre of chapters.get(code).prerequisites)assert.ok(seen.has(pre),`${route.id}: ${code} requires ${pre}`);
      assert.ok(!seen.has(code),`${route.id} duplicate ${code}`);seen.add(code);
    }
    assert.equal(route.questions.length,3);
    for(const l of route.lessons){assert.equal(l.path,chapters.get(l.code).path);assert.ok(l.hours>0);}
    const doc=readFileSync(new URL(`../docs/start/${route.slug}.md`,import.meta.url),'utf8');
    assert.ok(doc.includes('{#project}'));assert.ok(doc.includes('核对与'));
  }
});
test('stored progress rejects malformed state and unknown lesson IDs without trusting arbitrary keys',()=>{
  for(const raw of [null,'null','{','[]','{"completed":null}','42'])assert.deepEqual(decodeProgress(raw,['A'],['B']),{route:null,completed:[]});
  assert.deepEqual(decodeProgress('{"route":"B","completed":["A","A",3,"Z"]}',['A'],['B']),{route:'B',completed:['A']});
  assert.deepEqual(decodeProgress('{"route":"unknown","completed":["A"]}',['A'],['B']),{route:null,completed:['A']});
});
test('completion is idempotent, reversible, route-specific and does not mutate prior state',()=>{
  const original={route:'A',completed:[]};
  let state=setCompleted(original,'PRE1',true);state=setCompleted(state,'PRE1',true);
  assert.deepEqual(original.completed,[]);assert.equal(routeProgress(routes[0],state).completed,1);
  assert.equal(routeProgress(routes[0],state).next.code,'PRE2');
  state=setCompleted(state,'PRE1',false);assert.equal(routeProgress(routes[0],state).completed,0);
  const all={completed:routes[0].lessons.map(l=>l.code)};assert.equal(routeProgress(routes[0],all).next,null);
});
test('diagnostic answers distinguish unanswered and wrong, retain actual mathematical explanation',()=>{
  const q=routes[0].questions;
  const r=assess(q,[null,q[1].correct,(q[2].correct+1)%3]);
  assert.equal(r[0].answered,false);assert.equal(r[1].correct,true);assert.equal(r[2].correct,false);
  assert.deepEqual(r.map(x=>x.explanation),q.map(x=>x.explanation));
});
test('focused theorem ledger resolves references, source anchors, dependencies and every numbered claim',()=>{
  const ledger=json('./proof-ledger.json'),by=new Map(ledger.statements.map(s=>[s.id,s]));
  assert.equal(by.size,28);assert.equal(ledger.scope.length,7);
  const active=new Set(),done=new Set();
  function visit(id){assert.ok(by.has(id),id);assert.ok(!active.has(id),id);if(done.has(id))return;active.add(id);by.get(id).dependencies.forEach(visit);active.delete(id);done.add(id);}
  const index=readFileSync(new URL('../docs/project/proof-ledger.md',import.meta.url),'utf8');
  for(const s of by.values()){
    visit(s.id);assert.ok(['complete','external','outline','pending'].includes(s.kind));
    assert.ok(ledger.references[s.reference]?.url.startsWith('https://'));
    assert.ok(s.assumptions&&s.obligation&&s.review);
    const doc=readFileSync(new URL('../docs/'+s.path,import.meta.url),'utf8');
    assert.equal(doc.split(`id="${s.anchor}"`).length,2,s.id);assert.ok(index.includes(`{#${s.anchor}}`));
  }
  for(const code of ledger.scope){
    const doc=readFileSync(new URL('../docs/'+curriculum.find(c=>c.code===code).path,import.meta.url),'utf8');
    for(const claim of doc.matchAll(/\*\*(?:命题|定理) ([A-Z][0-9]\.\d+)/g))assert.ok(by.has(claim[1]),claim[1]);
  }
  for(const id of ['H3.1','H3.2','Q2.2','G1.2'])assert.equal(by.get(id).kind,'outline');
  assert.equal(by.get('Q1.3').kind,'external');assert.ok(by.get('A8.4').dependencies.includes('R1.pairing'));
});
