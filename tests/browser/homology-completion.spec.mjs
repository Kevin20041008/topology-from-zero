import {test,expect} from '@playwright/test';

const h2='algebraic/homology/exact-excision/';
const h3='algebraic/homology/cellular-coefficients/';

test.beforeEach(async({page})=>{
  // The mathematics renderer and original illustrations are local assets.
  await page.route('https://**/*',route=>route.abort());
});

async function mathReady(page){
  await expect(page.locator('article .arithmatex').first()).toBeVisible();
  await page.waitForFunction(()=>{
    const formulas=[...document.querySelectorAll('article .arithmatex')];
    return formulas.length>0&&formulas.every(el=>el.querySelector('mjx-container svg'));
  });
  await expect(page.locator('mjx-merror,[data-mml-node="merror"]')).toHaveCount(0);
  await expect(page.locator('html')).toHaveAttribute('lang','zh');
}

async function layoutContained(page){
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
}

async function originalSvgLoaded(page,filename,description){
  const illustration=page.locator(`article img[src$="/${filename}"]`);
  await expect(illustration).toHaveCount(1);
  await expect(illustration).toHaveAttribute('alt',description);
  await illustration.scrollIntoViewIfNeeded();
  await expect(illustration).toBeVisible();
  await expect.poll(()=>illustration.evaluate(img=>img.complete&&img.naturalWidth>0&&img.naturalHeight>0)).toBe(true);
  expect(await illustration.evaluate(img=>{
    const box=img.getBoundingClientRect(),article=img.closest('article').getBoundingClientRect();
    return box.width>0&&box.height>0&&box.left>=article.left&&box.right<=article.right
      &&box.left>=0&&box.right<=innerWidth;
  })).toBe(true);
  await layoutContained(page);
}

test('H2 subdivision and excision formulas render with the original contained SVG',async({page})=>{
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto(h2);await mathReady(page);
  await expect(page.locator('article h1')).toContainText('H2');
  for(const id of ['proof-h2-5','proof-h2-6','proof-h2-7']){
    await expect(page.locator(`article [id="${id}"]`)).toContainText('完整证明');
  }
  await originalSvgLoaded(page,'h2-subdivision.svg',/重心细分.*六个有序小三角形/);
  expect(errors).toEqual([]);
});

test('H2 legacy numeric anchors still address the original six section meanings',async({page})=>{
  await page.goto(h2);await mathReady(page);
  const legacy=[
    ['1','问题引入与直观解释'],['2','严格定义'],['3','定理与证明'],
    ['4','典型例题：正例与反例'],['5','课后习题'],['6','参考书目'],
  ];
  for(const [id,title] of legacy){
    // Native fragment navigation after typesetting prevents layout shifts from
    // being mistaken for a missing anchor. Do not manually scroll to the node.
    await page.goto(`${h2}#${id}`);
    const target=page.locator(`article h2[id="${id}"]`);
    await expect(target).toHaveCount(1);
    await expect(target).toContainText(title);
    await expect(page.locator('article h2:target')).toHaveAttribute('id',id);
    await expect(target).toBeInViewport();
  }
  await layoutContained(page);
});

test('H3 finite CW comparison renders its new proof targets and attachment illustration',async({page})=>{
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto(h3);await mathReady(page);
  await originalSvgLoaded(page,'h3-attachment-excision.svg',/附加圆盘.*环带.*商映射/);
  for(const [id,scope] of [
    ['proof-h3-4','有限附加商先修'],
    ['proof-h3-5','生成元及连接自然性'],
    ['proof-h3-6','任意阿贝尔系数；有限 CW'],
  ]){
    await page.goto(`${h3}#${id}`);
    const target=page.locator(`article .proof-status[id="${id}"]`);
    await expect(target).toHaveCount(1);
    await expect(target).toContainText(scope);
    await expect(page.locator('article .proof-status:target')).toHaveAttribute('id',id);
    await expect(target).toBeInViewport();
    await expect(target.getByRole('link',{name:'依赖与审查义务'})).toHaveAttribute('href',new RegExp(`proof-ledger/#${id}$`));
  }
  await layoutContained(page);expect(errors).toEqual([]);
});

test('H2 and H3 solution links round-trip and the complete new answers typeset',async({page})=>{
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  for(const [chapter,solutions,label,count,lastTopic] of [
    [h2,'exercises/h2-solutions/','H2 八题完整论证式解答',8,'两个遗漏假设的反例'],
    [h3,'exercises/h3-solutions/','H3 十二题完整论证式解答',12,'图的边数与独立循环数'],
  ]){
    await page.goto(chapter);
    await page.locator('article').getByRole('link',{name:label,exact:true}).click();
    await expect(page).toHaveURL(new RegExp(`${solutions}$`));
    await mathReady(page);
    await expect(page.locator('article h2')).toHaveCount(count);
    await expect(page.locator('article h2').last()).toContainText(lastTopic);
    await layoutContained(page);
    await page.locator('article').getByRole('link',{name:/^返回 /}).click();
    await expect(page).toHaveURL(new RegExp(`${chapter}$`));
    await expect(page.locator('article h1')).toContainText(chapter===h2?'H2':'H3');
  }
  expect(errors).toEqual([]);
});
