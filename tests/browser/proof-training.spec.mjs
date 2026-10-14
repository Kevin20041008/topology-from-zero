import {test,expect} from '@playwright/test';
import {proofTraining as bank} from '../../docs/javascripts/proof-training-bank.mjs';
import {PROOF_STORAGE_KEY} from '../../docs/javascripts/proof-training-core.mjs';
const path='exercises/proof-workshop/';
test.beforeEach(async({page})=>{await page.route('https://**/*',route=>route.abort());});
const mount=(page,id)=>page.locator(`[data-proof-training="${id}"]`);

async function arrange(page,task){
  const box=mount(page,task.id);
  // Move each desired step to the end, producing the valid supplied order.
  for(const step of task.steps){
    const down=box.locator(`[data-step="${step.id}"]`).getByRole('button',{name:`下移步骤 ${step.id}`,exact:true});
    while(await down.isEnabled())await down.click();
  }
  await box.getByRole('checkbox',{name:`排除步骤 ${task.steps.find(s=>s.invalid).id}`,exact:true}).check();
}

test('all eight proof tasks diagnose errors and accept valid dependencies without certifying a free proof',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(path);
  for(const task of bank){
    const box=mount(page,task.id);await expect(box.locator('[data-proof-steps] li')).toHaveCount(5);
    await box.getByRole('button',{name:'检查步骤与理由'}).click();
    await expect(box.locator('[data-proof-feedback]')).toContainText(task.steps.find(s=>s.invalid).invalid);
    await arrange(page,task);await box.getByRole('button',{name:'检查步骤与理由'}).click();
    await expect(box.locator('[data-proof-feedback]')).toContainText('不代表你已独立掌握证明');
  }
  expect(errors).toEqual([]);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('keyboard sorting preserves focus and reset leaves the independent draft alone',async({page})=>{
  await page.goto(path);const box=mount(page,'pre1');
  const up=box.getByRole('button',{name:'上移步骤 d',exact:true});await up.focus();await page.keyboard.press('Enter');
  await expect(box.locator('[data-step]').first()).toHaveAttribute('data-step','d');
  await expect(box.getByRole('button',{name:'下移步骤 d',exact:true})).toBeFocused();
  await box.locator('textarea').fill('我还没有证明，只记录待查假设。');
  await box.getByRole('button',{name:'恢复初始步骤'}).click();
  await expect(box.locator('textarea')).toHaveValue('我还没有证明，只记录待查假设。');
  await expect(box.locator('[data-proof-steps] input:checked')).toHaveCount(0);
});

test('drafts are opt-in, stored as text, independently deletable, and not transmitted',async({page})=>{
  const payloads=[];page.on('request',r=>{if(r.postData())payloads.push(r.postData());});
  await page.goto(path);const a=mount(page,'pre1'),b=mount(page,'pre2');
  const draft='<img src=x onerror=window.proofAttack=1> 私有证明草稿';
  await a.locator('textarea').fill(draft);
  expect(await page.evaluate(key=>localStorage.getItem(key),PROOF_STORAGE_KEY)).toBeNull();
  await a.locator('[data-rubric="0"]').check();await a.getByRole('button',{name:'保存本题到本机'}).click();
  await b.locator('textarea').fill('第二题草稿');await b.getByRole('button',{name:'保存本题到本机'}).click();
  await page.reload();await expect(a.locator('textarea')).toHaveValue(draft);await expect(a.locator('[data-rubric="0"]')).toBeChecked();
  expect(await page.evaluate(()=>window.proofAttack)).toBeUndefined();
  await a.getByRole('button',{name:'删除本题本机记录'}).click();await page.reload();
  await expect(a.locator('textarea')).toHaveValue('');await expect(b.locator('textarea')).toHaveValue('第二题草稿');
  expect(payloads.some(p=>p.includes('私有证明草稿'))).toBe(false);
});

test('corrupt or unavailable storage does not block exercises or falsely report saved drafts',async({page})=>{
  await page.addInitScript(key=>localStorage.setItem(key,'{bad'),PROOF_STORAGE_KEY);await page.goto(path);
  const box=mount(page,'pre1');await expect(box.locator('textarea')).toHaveValue('');
  await page.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw new Error('blocked');}}));
  await page.reload();await expect(box.locator('[data-draft-status]')).toContainText('存储不可用');
  await box.locator('textarea').fill('仍可在本页写作');await box.getByRole('button',{name:'保存本题到本机'}).click();
  await expect(box.locator('[data-draft-status]')).toContainText('保存失败');await expect(box.locator('textarea')).toHaveValue('仍可在本页写作');
  await box.getByRole('button',{name:'删除本题本机记录'}).click();await expect(box.locator('[data-draft-status]')).toContainText('无法确认');
});

test('all chapter links reach the new transfer task and no-JavaScript answers remain available',async({browser})=>{
  const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();
  for(const t of bank){
    await page.goto('http://127.0.0.1:8123/topology-from-zero/'+t.chapter.replace('.md','/'));
    const link=page.locator(`article a[href$="proof-workshop/#${t.id}"]`);await expect(link).toHaveCount(1);await link.click();
    await expect(page.locator(`h2#${t.id}`)).toBeVisible();
  }
  await page.getByText('完整论证与边界情况（先独立作答）',{exact:true}).first().click();
  await expect(page.locator('article details[open]').first()).toContainText('若 f 满射');
  await expect(page.locator('article')).toContainText('不把自由文字与参考答案作字符串匹配');
  await context.close();
});
