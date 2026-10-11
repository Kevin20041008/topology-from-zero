import {exercises} from './exercise-bank.mjs';

function element(tag, text, attributes = {}) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  for (const [key, value] of Object.entries(attributes)) node.setAttribute(key, value);
  return node;
}

for (const [index, root] of [...document.querySelectorAll('[data-exercise]')].entries()) {
  const exercise = exercises[root.dataset.exercise];
  if (!exercise) { root.textContent = '练习暂未加载，请先使用正文中的题目与提示。'; continue; }
  root.append(element('p', '自检练习 · 分步提示与即时反馈', {class: 'admonition-title'}));
  const form = element('form'), fieldset = element('fieldset');
  fieldset.append(element('legend', exercise.question));
  const radios = exercise.choices.map((choice, i) => {
    const row = element('p'), label = element('label');
    const input = element('input', undefined, {type: 'radio', name: `answer-${index}`, value: String(i)});
    label.append(input, document.createTextNode(` ${choice.text}`));
    row.append(label); fieldset.append(row);
    return input;
  });
  const feedback = element('p', '', {role: 'status', 'aria-live': 'polite', 'aria-atomic': 'true', 'data-feedback': ''});
  const check = element('button', '检查答案', {type: 'submit', class: 'md-button'});
  const hint = element('button', '提示 1', {type: 'button', class: 'md-button'});
  const reset = element('button', '重新作答', {type: 'reset', class: 'md-button'});
  const hints = element('ol', undefined, {'data-hints': '', 'aria-live': 'polite'});
  let hintIndex = 0;
  form.append(fieldset, check, document.createTextNode(' '), hint, document.createTextNode(' '), reset, feedback, hints);
  form.addEventListener('submit', event => {
    event.preventDefault();
    const selected = radios.findIndex(input => input.checked);
    if (selected < 0) { feedback.textContent = '请先选择一个答案；也可以先展开提示。'; return; }
    const answer = exercise.choices[selected];
    feedback.textContent = `${answer.correct ? '答对了。' : '还需要再想一步。'}${answer.feedback}`;
  });
  form.addEventListener('change', () => { feedback.textContent = ''; });
  hint.addEventListener('click', () => {
    hints.append(element('li', exercise.hints[hintIndex++]));
    hint.disabled = hintIndex === exercise.hints.length;
    hint.textContent = hint.disabled ? '提示已全部展开' : `提示 ${hintIndex + 1}`;
  });
  form.addEventListener('reset', () => {
    feedback.textContent = ''; hints.replaceChildren(); hintIndex = 0;
    hint.disabled = false; hint.textContent = '提示 1';
  });
  root.append(form);
}
