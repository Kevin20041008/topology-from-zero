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
  assert.equal(chapters.length, 42);
  assert.equal(new Set(chapters.map(c => c.course)).size, 8);
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
