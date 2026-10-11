import {bettiNumbers, ripsFiltration, persistentHomology, bettiAt, pointPresets} from './topology-core.mjs';

const NS = 'http://www.w3.org/2000/svg';
function svgElement(tag, attributes = {}, text) {
  const element = document.createElementNS(NS, tag);
  for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, value);
  if (text !== undefined) element.textContent = text;
  return element;
}
const number = value => Number.isFinite(value) ? value.toFixed(3) : '∞';

function triangleLab(lab) {
  function update(filled) {
    const simplices = [[0], [1], [2], [0, 1], [0, 2], [1, 2]];
    if (filled) simplices.push([0, 1, 2]);
    const betti = bettiNumbers(simplices);
    lab.querySelector('[data-b0]').textContent = betti[0];
    lab.querySelector('[data-b1]').textContent = betti[1];
    const face = lab.querySelector('[data-triangle-face]');
    face.toggleAttribute('hidden', !filled);
    lab.querySelector('[data-triangle-label]').textContent = filled ? '这个环是面的边界' : '没有二维单形';
    lab.querySelector('[data-triangle-explanation]').textContent = filled
      ? '三条边仍然组成循环，但这个循环现在恰好是三角面的边界。在同调商空间中，它代表零，所以 β₁ = 0。'
      : '三条边组成一个循环。因为没有三角面，它不是任何二维链的边界，因此代表一个非零同调类，β₁ = 1。';
    lab.querySelector('[data-triangle-counts]').textContent = `3 个顶点 · 3 条边 · ${filled ? 1 : 0} 个面`;
    lab.querySelector('[data-triangle-status]').textContent = `${filled ? '填实' : '空心'}三角形：β₀ = ${betti[0]}，β₁ = ${betti[1]}。${filled ? '循环被面填充。' : '一个独立环存活。'}`;
    lab.querySelector('[data-triangle-svg]').setAttribute('aria-label', `${filled ? '实心' : '空心'}三角形，第一 Betti 数为 ${betti[1]}`);
    for (const button of lab.querySelectorAll('[data-fill]')) button.setAttribute('aria-pressed', String((button.dataset.fill === 'true') === filled));
  }
  lab.querySelectorAll('[data-fill]').forEach(button => button.addEventListener('click', () => update(button.dataset.fill === 'true')));
  update(false);
}

function persistenceLab(lab) {
  const select = lab.querySelector('[data-preset]');
  const slider = lab.querySelector('[data-radius]');
  const cloud = lab.querySelector('[data-cloud-svg]');
  const chart = lab.querySelector('[data-barcode-svg]');
  let points, filtration, bars, events, radius, maximum;

  function drawCloud(active) {
    cloud.replaceChildren();
    const xs = points.map(p => p[0]), ys = points.map(p => p[1]);
    const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
    const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
    const extent = Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys), 1);
    const scale = 310 / (extent + maximum * 1.2);
    const position = i => [200 + (points[i][0] - cx) * scale, 175 - (points[i][1] - cy) * scale];
    for (let x = 20; x < 400; x += 30) cloud.append(svgElement('line', {x1: x, y1: 10, x2: x, y2: 340, class: 'shape-grid'}));
    for (let y = 10; y <= 340; y += 30) cloud.append(svgElement('line', {x1: 20, y1: y, x2: 380, y2: y, class: 'shape-grid'}));
    points.forEach((_, i) => {
      const [x, y] = position(i);
      cloud.append(svgElement('circle', {cx: x, cy: y, r: radius * scale, class: 'radius-ball'}));
    });
    for (const simplex of active.filter(s => s.dimension === 2)) {
      cloud.append(svgElement('polygon', {points: simplex.vertices.map(i => position(i).join(',')).join(' '), class: 'shape-face'}));
    }
    for (const simplex of active.filter(s => s.dimension === 1)) {
      const [a, b] = simplex.vertices.map(position);
      cloud.append(svgElement('line', {x1: a[0], y1: a[1], x2: b[0], y2: b[1], class: 'shape-edge'}));
    }
    points.forEach((_, i) => {
      const [x, y] = position(i);
      cloud.append(svgElement('circle', {cx: x, cy: y, r: 5, class: 'shape-point'}));
      cloud.append(svgElement('text', {x: x + 8, y: y - 8}, i));
    });
  }

  function drawBarcode() {
    chart.replaceChildren();
    const height = Math.max(245, 95 + bars.length * 23);
    chart.setAttribute('viewBox', `0 0 400 ${height}`);
    const x = value => 42 + value / maximum * 314;
    bars.forEach((bar, i) => {
      const y = 35 + i * 23;
      const alive = bar.birth <= radius && radius < bar.death;
      const end = Number.isFinite(bar.death) ? bar.death : maximum;
      const color = bar.dimension === 0 ? '#458978' : '#ba823a';
      const line = svgElement('line', {x1: x(bar.birth), y1: y, x2: x(end), y2: y,
        stroke: color, class: `barcode-bar ${alive ? 'alive' : 'inactive'}`});
      line.append(svgElement('title', {}, `H${bar.dimension}: [${number(bar.birth)}, ${number(bar.death)})`));
      chart.append(line);
      chart.append(svgElement('text', {x: 7, y: y + 4, class: 'barcode-label'}, `H${bar.dimension}`));
      if (!Number.isFinite(bar.death)) chart.append(svgElement('text', {x: x(end) + 8, y: y + 4}, '∞'));
      else chart.append(svgElement('circle', {cx: x(end), cy: y, r: 3, fill: 'var(--book-panel)', stroke: color, opacity: alive ? 1 : .35}));
    });
    const axisY = height - 38;
    chart.append(svgElement('line', {x1: x(0), y1: axisY, x2: x(maximum), y2: axisY, class: 'barcode-axis'}));
    for (const tick of [0, maximum / 2, maximum]) {
      chart.append(svgElement('text', {x: x(tick), y: axisY + 18, 'text-anchor': 'middle', class: 'barcode-label'}, number(tick)));
    }
    chart.append(svgElement('text', {x: 200, y: height - 1, 'text-anchor': 'middle', class: 'barcode-label'}, '球半径 ε'));
    chart.append(svgElement('line', {x1: x(radius), y1: 18, x2: x(radius), y2: axisY, class: 'barcode-cursor'}));
  }

  function update(nextRadius) {
    radius = Math.max(0, Math.min(maximum, nextRadius));
    slider.value = radius;
    slider.setAttribute('aria-valuetext', `球半径 ${number(radius)}`);
    lab.querySelector('[data-radius-value]').textContent = number(radius);
    const active = filtration.filter(s => s.birth <= radius);
    const [b0, b1] = bettiAt(bars, radius);
    lab.querySelector('[data-b0]').textContent = b0;
    lab.querySelector('[data-b1]').textContent = b1;
    const counts = [0, 1, 2].map(d => active.filter(s => s.dimension === d).length);
    lab.querySelector('[data-simplex-counts]').textContent = `${counts[0]} 个点 · ${counts[1]} 条边 · ${counts[2]} 个三角面`;
    lab.querySelector('[data-persistence-status]').textContent = `ε = ${number(radius)}，对应距离阈值 r = ${number(2 * radius)}。当前 ${b0} 个连通分支，${b1} 个独立一维同调类。`;
    lab.querySelector('[data-next-event]').disabled = !events.some(event => event > radius);
    drawCloud(active);
    drawBarcode();
  }

  function loadPreset() {
    points = pointPresets[select.value].points;
    filtration = ripsFiltration(points);
    bars = persistentHomology(filtration);
    events = [...new Set(filtration.map(simplex => simplex.birth))];
    maximum = Math.ceil((Math.max(...events) + .04) * 100) / 100;
    slider.max = maximum;
    const list = lab.querySelector('[data-barcode-list]');
    list.replaceChildren(...bars.map(bar => {
      const item = document.createElement('li');
      item.textContent = `H${bar.dimension}：[${number(bar.birth)}, ${number(bar.death)})`;
      return item;
    }));
    update(0);
  }
  slider.addEventListener('input', () => update(Number(slider.value)));
  select.addEventListener('change', loadPreset);
  lab.querySelector('[data-reset-radius]').addEventListener('click', () => update(0));
  lab.querySelector('[data-next-event]').addEventListener('click', () => {
    const next = events.find(event => event > radius);
    if (next !== undefined) update(next);
  });
  loadPreset();
}

for (const lab of document.querySelectorAll('[data-lab]')) {
  try {
    if (lab.dataset.lab === 'triangle') triangleLab(lab);
    if (lab.dataset.lab === 'persistence') persistenceLab(lab);
    if (lab.dataset.lab === 'surfaces') {
      import('./surfaces.mjs').then(module => module.surfaceLab(lab)).catch(error => {
        const message = lab.querySelector('[data-error]');
        message.hidden = false;
        message.textContent = '三维模型未能加载，请检查浏览器的 WebGL 支持；下方比较表可继续阅读。';
        lab.querySelector('[data-surface-status]').textContent = '三维渲染不可用。曲面性质见下方表格。';
        console.error(error);
      });
    }
  } catch (error) {
    const status = lab.querySelector('.lab-status');
    if (status) status.textContent = '实验初始化失败，请刷新页面后重试。';
    console.error(error);
  }
}
