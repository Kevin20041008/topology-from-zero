import {test,expect} from '@playwright/test';
import {readFileSync} from 'node:fs';
import {exercises} from '../../docs/javascripts/exercise-bank.mjs';
const routes=JSON.parse(readFileSync('docs/assets/learning-paths.json','utf8')).routes;
const key='topology-from-zero-learning-v1';
test.beforeEach(async({page})=>{
  // Third-party repository counters are not part of teaching or test evidence.
  await page.route('https://**/*',route=>route.abort());
});
async function mathReady(page){
  await expect(page.locator('article .arithmatex').first()).toBeVisible();
  await page.waitForFunction(()=>[...document.querySelectorAll('article .arithmatex')].every(el=>el.querySelector('mjx-container svg')));
  await expect(page.locator('mjx-merror,[data-mml-node="merror"]')).toHaveCount(0);
}
for(const path of ['preliminaries/countability-choice/','point-set/subspaces/','preliminaries/groups-modules/','computational/integer-homology/',
  'algebraic/cohomology/cochains-products/','algebraic/cohomology/duality/','ai/projects/topology-optimization/','math-check/']){
  test(`render Chinese mathematics and contain layout: ${path}`,async({page},info)=>{
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto(path);await mathReady(page);
    await expect(page.locator('html')).toHaveAttribute('lang','zh');
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    expect(errors).toEqual([]);
    if(path==='computational/integer-homology/')await page.screenshot({path:info.outputPath('integer-homology.png'),fullPage:true});
  });
}
for(const route of routes)test(`route ${route.id}: assessment, persisted progress and next lesson`,async({page},info)=>{
  await page.goto(`start/${route.slug}/`);
  const mount=page.locator('[data-learning-route]');
  await expect(mount.locator('input[type=checkbox]')).toHaveCount(route.lessons.length);
  await expect(page.locator('[data-route-progress]')).toContainText(`0/${route.lessons.length}`);
  await mount.locator('input').first().check();await page.reload();
  await expect(mount.locator('input').first()).toBeChecked();
  const form=page.locator('[data-route-assessment]');
  await form.getByRole('button',{name:'检查先修知识'}).click();
  await expect(form.locator('[data-assessment-feedback]')).toContainText('尚未作答');
  for(const [i,q] of route.questions.entries())await form.locator('fieldset').nth(i).getByRole('radio').nth(q.correct).check();
  await form.getByRole('button',{name:'检查先修知识'}).click();
  await expect(form.locator('[data-assessment-feedback] p')).toHaveCount(3);
  expect(await form.locator('[data-assessment-feedback]').innerText()).not.toContain('需回看');
  await mount.locator('a').first().click();
  const bar=page.locator('[data-route-bar]');await expect(bar).toBeVisible();
  await expect(bar.getByRole('checkbox')).toBeChecked();
  await bar.getByRole('link',{name:/下一课/}).click();
  await expect(page).toHaveURL(new RegExp(route.lessons[1].path.replace('.md','/')));
  if(info.project.name==='mobile')await page.locator('.md-header__button[for="__drawer"]').click();
  const nav=page.getByRole('navigation',{name:'路线章节'});await expect(nav).toBeVisible();
  const toggle=nav.getByRole('button');await toggle.focus();await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded','true');await expect(page.locator('#full-course-navigation')).toBeVisible();
});
test('corrupt/unavailable storage does not block learning and reset is scoped',async({page})=>{
  await page.addInitScript(key=>localStorage.setItem(key,'{bad'),key);
  await page.goto('start/beginner/');await expect(page.locator('[data-route-progress]')).toContainText('0/8');
  await page.locator('[data-learning-route] input').first().check();
  await page.getByRole('button',{name:'清除此路线的完成记录'}).click();
  await expect(page.locator('[data-route-progress]')).toContainText('0/8');
  await page.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw new Error('disabled');}}));
  await page.goto('start/beginner/');await expect(page.locator('[data-route-progress]')).toContainText('存储不可用');
  await page.locator('[data-learning-route] input').first().check();await expect(page.locator('[data-route-progress]')).toContainText('1/8');
});
test('new chapter self-tests give two hints, wrong/correct reasons and reset',async({page})=>{
  const chapters=JSON.parse(readFileSync('scripts/curriculum.json','utf8')).chapters.filter(c=>['PRE4','PS1','PRE5','CT1'].includes(c.code));
  for(const chapter of chapters){
    await page.goto(chapter.path.replace('.md','/'));
    const mount=page.locator(`[data-exercise="${chapter.exercise}"]`),exercise=exercises[chapter.exercise];
    await mount.getByRole('button',{name:'检查答案'}).click();await expect(mount.locator('[data-feedback]')).toContainText('请先选择');
    await mount.getByRole('button',{name:'提示 1',exact:true}).click();await mount.getByRole('button',{name:'提示 2',exact:true}).click();
    await expect(mount.locator('[data-hints] li')).toHaveCount(2);
    await mount.getByRole('radio').nth(exercise.choices.findIndex(c=>!c.correct)).check();
    await mount.getByRole('button',{name:'检查答案'}).click();await expect(mount.locator('[data-feedback]')).toContainText('还需要');
    await mount.getByRole('radio').nth(exercise.choices.findIndex(c=>c.correct)).check();
    await mount.getByRole('button',{name:'检查答案'}).click();await expect(mount.locator('[data-feedback]')).toContainText('答对了');
    await mount.getByRole('button',{name:'重新作答'}).click();await expect(mount.locator('[data-hints] li')).toHaveCount(0);
    await expect(mount.locator('input:checked')).toHaveCount(0);
  }
});
test('static learning routes remain usable with JavaScript disabled',async({browser})=>{
  const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();
  await page.goto('http://127.0.0.1:8123/topology-from-zero/start/beginner/');
  await expect(page.getByRole('heading',{name:'连续课表'})).toBeVisible();
  await expect(page.locator('article table a')).toHaveCount(8);
  await page.locator('article details summary').first().click();
  await expect(page.locator('article details[open]')).toContainText('逆像');
  await page.locator('article table a').first().click();await expect(page.getByRole('heading',{level:1})).toContainText('PRE1');
  await context.close();
});
test('existing triangle and exact event persistence controls still calculate',async({page})=>{
  await page.goto('labs/triangle/');await expect(page.locator('[data-b1]')).toHaveText('1');
  await page.getByRole('button',{name:'填实三角形'}).click();await expect(page.locator('[data-b1]')).toHaveText('0');
  await expect(page.getByRole('button',{name:'填实三角形'})).toHaveAttribute('aria-pressed','true');
  await page.goto('labs/point-cloud/');await page.getByRole('button',{name:'重置',exact:true}).click();
  await expect(page.locator('[data-b0]')).toHaveText('4');
  await page.getByRole('button',{name:'下一个临界尺度'}).click();
  await expect(page.locator('[data-b0]')).toHaveText('1');await expect(page.locator('[data-b1]')).toHaveText('1');
  await page.getByRole('button',{name:'下一个临界尺度'}).click();await expect(page.locator('[data-b1]')).toHaveText('0');
});
test('surface controls render, switch topology and support keyboard',async({page})=>{
  await page.goto('labs/surfaces/');
  await expect(page.locator('[data-surface-status]')).not.toContainText('正在准备');
  await expect(page.locator('[data-error]')).toBeHidden();
  await page.getByRole('button',{name:'莫比乌斯带',exact:true}).click();
  await expect(page.locator('[data-surface-title]')).toContainText('莫比乌斯');
  await expect(page.locator('[data-surface-facts]')).toContainText('不可定向');
  const canvas=page.locator('canvas');await canvas.focus();await page.keyboard.press('ArrowRight');await expect(canvas).toBeFocused();
  expect(await canvas.evaluate(el=>el.width>0&&el.height>0)).toBe(true);
});
test('AI lab retains equal Dice counterexample and nondifferentiable event',async({page})=>{
  await page.goto('labs/ai-topology/');
  const seg=page.locator('[data-ai-lab="segmentation"]');
  await expect(seg.locator('[data-output]')).toContainText('48/49');
  const before=await seg.locator('[data-output]').innerText();
  await seg.getByRole('combobox').selectOption('notch');
  await expect(seg.locator('[data-output]')).toContainText('48/49');
  expect(await seg.locator('[data-output]').innerText()).not.toEqual(before);
  await page.getByRole('button',{name:'设置 a=b=0.5'}).click();
  await expect(page.locator('[data-ai-lab="differentiable"] [data-output]')).toContainText('不存在');
});
test('four entrances, search, theme and source metadata are usable',async({page},info)=>{
  await page.goto('');await expect(page.locator('[data-build-info]')).toContainText('本页构建');
  if(info.project.name==='desktop')for(const name of ['开始学习','课程目录','交互实验','开发者与审查'])await expect(page.locator('.md-tabs').getByRole('link',{name,exact:true})).toBeVisible();
  const toggle=page.locator('[data-md-component="palette"] label:visible');await toggle.click();
  await expect(page.locator('body')).toHaveAttribute('data-md-color-scheme','slate');
  if(info.project.name==='mobile')await page.locator('.md-header__button[for="__search"]').click();
  await page.getByRole('textbox',{name:'搜索',exact:true}).fill('拓扑损失');
  await expect(page.locator('.md-search-result__list')).toContainText('A3');
});
