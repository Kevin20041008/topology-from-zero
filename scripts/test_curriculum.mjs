import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {exercises} from '../docs/javascripts/exercise-bank.mjs';

const curriculum = JSON.parse(readFileSync(new URL('./curriculum.json', import.meta.url), 'utf8'));
const chapters = curriculum.chapters;

test('all course prerequisites resolve and form an acyclic learning graph', () => {
  const byCode = new Map(chapters.map(c => [c.code, c]));
  assert.equal(byCode.size, chapters.length);
  assert.equal(new Set(chapters.map(c => c.path)).size, chapters.length);
  assert.equal(chapters.length, 55); // 51 preserved chapters + PRE4, PS1, PRE5, CT1.
  assert.equal(new Set(chapters.map(c => c.course)).size, 9);
  const active = new Set(), complete = new Set();
  function visit(code) {
    assert.ok(byCode.has(code), `Unknown prerequisite ${code}`);
    assert.ok(!active.has(code), `Circular prerequisite ${code}`);
    if (complete.has(code)) return;
    active.add(code);
    for (const dependency of byCode.get(code).prerequisites) visit(dependency);
    active.delete(code); complete.add(code);
  }
  for (const code of byCode.keys()) visit(code);
  // The covering-based circle calculation is needed before van Kampen examples.
  assert.ok(byCode.get('F2').prerequisites.includes('C1'));
});

test('the 42-chapter candidate baseline and every original exercise URL are preserved', () => {
  const baseline=JSON.parse(readFileSync(new URL('./graduate-baseline.json',import.meta.url),'utf8'));
  assert.equal(baseline.chapters.length,42);
  for(const before of baseline.chapters) {
    const after=chapters.find(c=>c.code===before.code);
    assert.ok(after, before.code);
    assert.equal(after.path,before.path);
    assert.equal(after.exercise,before.exercise);
  }
});

test('the 89-unit master plan covers eleven parts without missing or cyclic prerequisites',()=>{
  const plan=JSON.parse(readFileSync(new URL('./master-plan.json',import.meta.url),'utf8')).units;
  assert.equal(plan.length,89);
  assert.equal(new Set(plan.map(u=>u.part)).size,11);
  const byCode=new Map(plan.map(u=>[u.code,u]));
  assert.equal(byCode.size,plan.length);
  const active=new Set(),done=new Set();
  function visit(code) {
    assert.ok(byCode.has(code),`Unresolved planned prerequisite ${code}`);
    assert.ok(!active.has(code),`Circular plan at ${code}`);
    if(done.has(code)) return;
    active.add(code);
    for(const pre of byCode.get(code).prerequisites) visit(pre);
    active.delete(code);done.add(code);
  }
  for(const unit of plan) {visit(unit.code);assert.ok(unit.proof&&unit.examples&&unit.lab);}
  for(const c of chapters) assert.ok(byCode.has(c.code));
});

test('new formal chapters have twelve sections, eight exercises, complete solution pages and review records',()=>{
  const additions=chapters.filter(c=>c.template===2);
  assert.equal(additions.length,16);
  for(const chapter of additions) {
    const source=readFileSync(new URL(`../docs/${chapter.path}`,import.meta.url),'utf8');
    assert.deepEqual([...source.matchAll(/^## (\d+)\./gm)].map(x=>Number(x[1])),Array.from({length:12},(_,i)=>i+1));
    const exercises=source.split(/^## 9\./m)[1].split(/^## 10\./m)[0];
    assert.deepEqual([...exercises.matchAll(/^(\d+)\. /gm)].map(x=>Number(x[1])),[1,2,3,4,5,6,7,8]);
    const solutions=readFileSync(new URL(`../docs/${chapter.solutions}`,import.meta.url),'utf8');
    const solutionNumbers=[...solutions.matchAll(/^## (?:第 |题 )?(\d+)(?: 题)?[.：]/gm)].map(m=>Number(m[1]));
    assert.deepEqual(solutionNumbers,Array.from({length:chapter.exerciseCount},(_,i)=>i+1));
    assert.ok(source.includes(chapter.solutions.split('/').at(-1)));
    const review=readFileSync(new URL(`../docs/${chapter.review}`,import.meta.url),'utf8');
    assert.ok(review.includes(chapter.code));
  }
});

test('each registered chapter mounts its unique exercise with usable staged feedback', () => {
  const keys = chapters.map(c => c.exercise);
  assert.equal(new Set(keys).size, keys.length);
  assert.deepEqual(new Set(Object.keys(exercises)), new Set(keys));
  for (const chapter of chapters) {
    const source = readFileSync(new URL(`../docs/${chapter.path}`, import.meta.url), 'utf8');
    assert.ok(source.includes(`data-exercise="${chapter.exercise}"`), chapter.path);
    const exercise = exercises[chapter.exercise];
    assert.ok(exercise.question.trim());
    assert.equal(exercise.hints.length, 2);
    assert.equal(new Set(exercise.hints).size, 2);
    assert.ok(exercise.hints.every(h => h.trim()));
    assert.equal(exercise.choices.length, 3);
    assert.equal(exercise.choices.filter(c => c.correct === true).length, 1);
    assert.equal(new Set(exercise.choices.map(c => c.feedback)).size, 3);
    assert.ok(exercise.choices.every(c => c.text.trim() && c.feedback.trim()));
  }
});

test('original quizzes and precision teaching answers remain present', () => {
  for (const key of ['spaces', 'bases', 'continuity', 'connectedness', 'quotient', 'homotopy', 'linear-quotient', 'homology']) {
    assert.ok(exercises[key]);
  }
  const correct = key => exercises[key].choices.find(c => c.correct).text;
  assert.equal(correct('persistence-modules-reduction'), '在核心计算保留');
  assert.equal(correct('persistence-stability'), 'δ');
  assert.equal(correct('computational-boundary-algorithms'), 'H₀ 与 H₁');
});
