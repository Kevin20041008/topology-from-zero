export const STORAGE_KEY = 'topology-from-zero-learning-v1';

export function decodeProgress(raw, codes, routeIds) {
  const empty = {route: null, completed: []};
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.completed)) return empty;
    return {route: routeIds.includes(parsed.route) ? parsed.route : null,
      completed: [...new Set(parsed.completed.filter(c => typeof c === 'string' && codes.includes(c)))]};
  } catch { return empty; }
}

export function setCompleted(state, code, checked) {
  return {...state, completed: checked ? [...new Set([...state.completed, code])] : state.completed.filter(c => c !== code)};
}

export function routeProgress(route, state) {
  const completed = route.lessons.filter(l => state.completed.includes(l.code)).length;
  return {completed, total: route.lessons.length,
    next: route.lessons.find(l => !state.completed.includes(l.code)) ?? null};
}

export function assess(questions, answers) {
  return questions.map((q,i) => ({answered: Number.isInteger(answers[i]), correct: answers[i] === q.correct, explanation:q.explanation}));
}
