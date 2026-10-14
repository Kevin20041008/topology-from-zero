import {test,expect} from '@playwright/test';

for(const path of ['algebraic/homology/cellular-coefficients/','exercises/h3-solutions/',
  'exercises/q1-solutions/','exercises/q2-solutions/','ai/projects/image-topology/','labs/covering-space/']){
  test(`v0.6 mathematics renders without errors: ${path}`,async({page},info)=>{
    const errors=[];page.on('pageerror',error=>errors.push(error.message));
    await page.goto(path);
    await expect(page.locator('article .arithmatex').first()).toBeVisible();
    await page.waitForFunction(()=>[...document.querySelectorAll('article .arithmatex')].every(el=>el.querySelector('mjx-container svg')));
    await expect(page.locator('mjx-merror,[data-mml-node="merror"]')).toHaveCount(0);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    expect(errors).toEqual([]);
    if(path==='labs/covering-space/'||path==='ai/projects/image-topology/')await page.screenshot({path:info.outputPath('v06-course.png'),fullPage:true});
  });
}

test('HTML provenance is static and a mismatched manifest cannot relabel the page',async({page})=>{
  await page.route('**/build-info.json',route=>route.fulfill({contentType:'application/json',body:JSON.stringify({commit:'f'.repeat(40),inventory_sha256:'wrong',dirty:false})}));
  await page.goto('');
  const sha=await page.locator('meta[name="topology-build-commit"]').getAttribute('content');
  const info=page.locator('[data-build-info]');
  await expect(info).toContainText(sha.slice(0,7));
  await expect(info).toHaveAttribute('data-version-mismatch','true');
  await expect(info).toContainText('版本不一致');
  expect(await info.textContent()).not.toContain('fffffff');
});

test('homepage count and all selected document identities match the built manifest',async({page,request})=>{
  const manifest=await (await request.get('build-info.json')).json();
  for(const path of ['', 'curriculum/', 'start/', 'labs/covering-space/', 'exercises/proof-workshop/']){
    await page.goto(path);
    await expect(page.locator('meta[name="topology-build-commit"]')).toHaveAttribute('content',manifest.commit);
    await expect(page.locator('meta[name="topology-inventory-sha256"]')).toHaveAttribute('content',manifest.inventory_sha256);
  }
  await page.goto('');
  const stats=page.locator('.book-stats strong');
  expect(await stats.allTextContents()).toEqual(['planned_parts','chapters','labs','notebooks'].map(k=>String(manifest.counts[k])));
});

test('covering lift presets, keyboard, sheet translation and exact closure',async({page})=>{
  await page.goto('labs/covering-space/');
  const out=page.locator('[data-cover-output]');
  await page.getByRole('button',{name:'逆时针两圈',exact:true}).click();
  await expect(out).toContainText('绕数 2');
  await page.getByRole('combobox',{name:'初始提升层',exact:true}).selectOption('-1');
  await expect(out).toContainText('终点提升 1.00000');
  await page.getByRole('button',{name:'顺时针一圈',exact:true}).click();
  await expect(out).toContainText('绕数 -1');
  await page.getByRole('button',{name:'重置路径',exact:true}).click();
  await page.locator('[data-cover-circle]').focus();await page.keyboard.press('ArrowRight');
  await expect(out).toContainText('路径未闭合');
  await page.getByRole('button',{name:'沿短弧闭合到起点',exact:true}).click();
  await expect(out).toContainText('绕数 0');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('pointer input produces a lifted path and never infers closure from displayed rounding',async({page})=>{
  await page.goto('labs/covering-space/');
  const circle=page.locator('[data-cover-circle]');await circle.scrollIntoViewIfNeeded();
  const box=await circle.boundingBox();
  const cx=box.x+box.width/2,cy=box.y+box.height/2,r=box.width*.35;
  await page.mouse.move(cx+r,cy);await page.mouse.down();
  for(let i=1;i<=6;i++){const angle=i*Math.PI/12;await page.mouse.move(cx+r*Math.cos(angle),cy-r*Math.sin(angle));}
  await page.mouse.up();
  await expect(page.locator('[data-cover-output]')).toContainText('路径未闭合');
  await expect(page.locator('[data-cover-error]')).toBeEmpty();
  expect(await page.locator('[data-cover-graph] polyline').getAttribute('points')).toContain(' ');
});

test('source label and covering examples remain readable without JavaScript',async({browser})=>{
  const context=await browser.newContext({javaScriptEnabled:false}),page=await context.newPage();
  await page.goto('http://127.0.0.1:8123/topology-from-zero/');
  await expect(page.locator('[data-build-info]')).toContainText('本页构建');
  await page.goto('http://127.0.0.1:8123/topology-from-zero/labs/covering-space/');
  await expect(page.getByRole('heading',{name:'可复现例子与反例 ¶',exact:true})).toBeVisible();
  await expect(page.locator('article table tbody tr')).toHaveCount(5);
  await context.close();
});
