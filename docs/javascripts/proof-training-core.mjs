export const PROOF_STORAGE_KEY = 'topology-from-zero-proof-v1';
export const MAX_DRAFT_LENGTH = 12000;

export function initialOrder(task) {
  return [...task.steps].reverse().map(step => step.id);
}

// Evaluate only the provided step dependencies. A different free proof is not graded.
export function checkArrangement(task, order, excluded = []) {
  const steps = new Map(task.steps.map(step => [step.id, step]));
  if (!Array.isArray(order) || order.length !== steps.size ||
      new Set(order).size !== steps.size || order.some(id => !steps.has(id)) ||
      !Array.isArray(excluded) || excluded.some(id => !steps.has(id))) {
    return {ok: false, errors: [{code:'invalid-input', message:'步骤清单损坏或重复；请恢复初始步骤。'}]};
  }
  const removed = new Set(excluded);
  const position = new Map(order.map((id,index) => [id,index]));
  const errors = [];
  for (const id of order) {
    const step = steps.get(id);
    if (step.invalid) {
      if (!removed.has(id)) errors.push({code:'invalid-step', step:id, message:step.invalid});
      continue;
    }
    if (removed.has(id)) {
      errors.push({code:'missing-step', step:id, message:`必要步骤被排除：${step.text} 理由：${step.reason}`});
      continue;
    }
    for (const dependency of step.needs) {
      if (removed.has(dependency) || position.get(dependency) >= position.get(id)) {
        errors.push({code:'dependency', step:id, dependency,
          message:`“${step.text}” 尚缺前提步骤“${steps.get(dependency).text}”。${step.reason}`});
      }
    }
  }
  return {ok: errors.length === 0, errors};
}

export function moveStep(order, id, direction) {
  const next = [...order], index = next.indexOf(id), target = index + direction;
  if (![1,-1].includes(direction) || index < 0 || target < 0 || target >= next.length) return next;
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

// Only explicit clicks persist drafts. No names, timing, grade or inferred mastery.
export function decodeDrafts(raw, tasks) {
  const clean = {};
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== 1 || !parsed.drafts || typeof parsed.drafts !== 'object') return clean;
    for (const task of tasks) {
      const value = parsed.drafts[task.id];
      if (!value || typeof value.text !== 'string') continue;
      clean[task.id] = {text:value.text.slice(0, MAX_DRAFT_LENGTH),
        checks: [...new Set((Array.isArray(value.checks) ? value.checks : [])
          .filter(n => Number.isInteger(n) && n >= 0 && n < task.rubric.length))]};
    }
  } catch { /* Corrupt or unavailable data must not block the exercise. */ }
  return clean;
}

export function encodeDrafts(drafts, tasks) {
  return JSON.stringify({version:1, drafts:decodeDrafts(JSON.stringify({version:1,drafts}),tasks)});
}
