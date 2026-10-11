import * as THREE from '../assets/vendor/three/three.module.js';

const surfaces = {
  sphere: {title: '球面 S²', description: '把球的表面想象成一张没有边缘的薄膜。任何闭合的一维环都能在球面上收缩，但整个球面本身代表一个非零的二维同调类。',
    boundary: '0 条', orientation: '可定向', betti: '(1, 0, 1)', euler: '2'},
  torus: {title: '环面 T²', description: '沿管身绕行与沿环孔绕行，给出两个独立的一维同调类。旋转观察它们所在的不同方向；投影中看到的孔数不能代替同调计算。',
    boundary: '0 条', orientation: '可定向', betti: '(1, 2, 1)', euler: '0'},
  mobius: {title: '莫比乌斯带', description: '将带子的一端翻转半圈后粘合，得到不可定向曲面。黄色线条沿整条边界连续走一周：看似两侧的边缘属于同一条闭曲线。',
    boundary: '1 条（黄色）', orientation: '不可定向', betti: '(1, 1, 0)', euler: '0'},
};

function mobiusPoint(u, v) {
  return new THREE.Vector3((1.5 + v * Math.cos(u / 2)) * Math.cos(u),
    (1.5 + v * Math.cos(u / 2)) * Math.sin(u), v * Math.sin(u / 2));
}

function mobiusGeometry() {
  const along = 112, across = 20, positions = [], indices = [];
  for (let i = 0; i <= along; i++) for (let j = 0; j <= across; j++) {
    positions.push(...mobiusPoint(i / along * 2 * Math.PI, (j / across - .5) * 1.1).toArray());
  }
  for (let i = 0; i < along; i++) for (let j = 0; j < across; j++) {
    const a = i * (across + 1) + j, b = a + across + 1;
    indices.push(a, b, a + 1, b, b + 1, a + 1);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

export function surfaceLab(lab) {
  const canvas = lab.querySelector('[data-surface-canvas]');
  const renderer = new THREE.WebGLRenderer({canvas, antialias: true, alpha: true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, .1, 100);
  camera.up.set(0, 0, 1);
  scene.add(new THREE.HemisphereLight(0xe8fff1, 0x253d45, 2.6));
  const light = new THREE.DirectionalLight(0xffffff, 3.1);
  light.position.set(4, -3, 6);
  scene.add(light);
  const fill = new THREE.DirectionalLight(0xc0dcd7, 1.4);
  fill.position.set(-4, 2, 1);
  scene.add(fill);
  const group = new THREE.Group();
  scene.add(group);
  let yaw = -.9, pitch = .55, distance = 7.5, autoRotate = false, wireframe = true;
  let frame = null, previousTime = 0, disposed = false;

  function render() {
    camera.position.set(distance * Math.cos(pitch) * Math.cos(yaw),
      distance * Math.cos(pitch) * Math.sin(yaw), distance * Math.sin(pitch));
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }
  function resize() {
    const width = canvas.clientWidth, height = canvas.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    render();
  }

  function selectSurface(name) {
    for (const child of [...group.children]) {
      group.remove(child);
      child.geometry.dispose();
      child.material.dispose();
    }
    const geometry = name === 'sphere' ? new THREE.SphereGeometry(1.55, 48, 30) :
      name === 'torus' ? new THREE.TorusGeometry(1.4, .5, 24, 72) : mobiusGeometry();
    const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
      color: name === 'mobius' ? 0x75aeaf : 0x70b297, side: THREE.DoubleSide, roughness: .5, metalness: .08,
      polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1,
    }));
    group.add(mesh);
    const wire = new THREE.LineSegments(new THREE.WireframeGeometry(geometry),
      new THREE.LineBasicMaterial({color: 0x245c50, transparent: true, opacity: .23}));
    wire.name = 'wire';
    wire.visible = wireframe;
    group.add(wire);
    if (name === 'mobius') {
      // A single boundary curve: u travels 0..4pi at fixed v, closing at 4pi.
      const boundaryPoints = Array.from({length: 449}, (_, i) => mobiusPoint(i / 448 * 4 * Math.PI, .55));
      const boundaryCurve = new THREE.CatmullRomCurve3(boundaryPoints.slice(0, -1), true);
      const boundary = new THREE.Mesh(new THREE.TubeGeometry(boundaryCurve, 448, .018, 6, true),
        new THREE.MeshStandardMaterial({color: 0xf0b547, roughness: .5, metalness: .05}));
      group.add(boundary);
    }
    const data = surfaces[name];
    lab.querySelector('[data-surface-title]').textContent = data.title;
    lab.querySelector('[data-surface-explanation]').textContent = data.description;
    const facts = [['曲面维数', '2'], ['边界分支', data.boundary], ['可定向性', data.orientation],
      ['(β₀, β₁, β₂)', data.betti], ['欧拉示性数 χ', data.euler]];
    lab.querySelector('[data-surface-facts]').replaceChildren(...facts.map(([term, value]) => {
      const row = document.createElement('div'), dt = document.createElement('dt'), dd = document.createElement('dd');
      dt.textContent = term; dd.textContent = value; row.append(dt, dd); return row;
    }));
    lab.querySelectorAll('[data-surface]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.surface === name)));
    canvas.setAttribute('aria-label', `${data.title}三维模型。拖动或使用方向键旋转，加减键缩放。`);
    lab.querySelector('[data-surface-status]').textContent = `当前：${data.title}。模型已就绪，可拖动旋转；方向键和视角按钮也可操作。`;
    render();
  }

  function rotate(dx, dy = 0) {
    yaw += dx;
    pitch = Math.max(-1.45, Math.min(1.45, pitch + dy));
    render();
  }
  function zoom(factor) {
    distance = Math.max(4.6, Math.min(12, distance * factor));
    render();
  }
  let drag = null;
  canvas.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    drag = [event.clientX, event.clientY];
    canvas.setPointerCapture(event.pointerId);
    canvas.focus({preventScroll: true});
  });
  canvas.addEventListener('pointermove', event => {
    if (!drag) return;
    rotate((drag[0] - event.clientX) * .009, (event.clientY - drag[1]) * .009);
    drag = [event.clientX, event.clientY];
  });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) canvas.addEventListener(type, () => { drag = null; });
  canvas.addEventListener('wheel', event => { event.preventDefault(); zoom(Math.exp(event.deltaY * .001)); }, {passive: false});
  canvas.addEventListener('keydown', event => {
    const actions = {ArrowLeft: () => rotate(-.15), ArrowRight: () => rotate(.15),
      ArrowUp: () => rotate(0, .15), ArrowDown: () => rotate(0, -.15),
      '+': () => zoom(.9), '=': () => zoom(.9), '-': () => zoom(1.1)};
    if (actions[event.key]) { event.preventDefault(); actions[event.key](); }
  });
  lab.querySelectorAll('[data-surface]').forEach(button => button.addEventListener('click', () => selectSurface(button.dataset.surface)));
  lab.querySelectorAll('[data-rotate]').forEach(button => button.addEventListener('click', () => {
    if (button.dataset.rotate === 'up') rotate(0, .22);
    else rotate(button.dataset.rotate === 'left' ? -.25 : .25);
  }));
  lab.querySelectorAll('[data-zoom]').forEach(button => button.addEventListener('click', () => zoom(button.dataset.zoom === 'in' ? .85 : 1.15)));
  lab.querySelector('[data-reset-view]').addEventListener('click', () => { yaw = -.9; pitch = .55; distance = 7.5; render(); });
  lab.querySelector('[data-wireframe]').addEventListener('click', event => {
    wireframe = !wireframe;
    event.currentTarget.setAttribute('aria-pressed', String(wireframe));
    group.getObjectByName('wire').visible = wireframe;
    render();
  });
  function animate(time) {
    frame = null;
    if (!autoRotate || document.hidden || disposed) return;
    const elapsed = previousTime ? Math.min((time - previousTime) / 1000, .05) : 0;
    previousTime = time;
    rotate(elapsed * .28);
    frame = requestAnimationFrame(animate);
  }
  lab.querySelector('[data-auto-rotate]').addEventListener('click', event => {
    autoRotate = !autoRotate;
    event.currentTarget.setAttribute('aria-pressed', String(autoRotate));
    event.currentTarget.textContent = autoRotate ? '暂停旋转' : '自动旋转';
    if (frame !== null) cancelAnimationFrame(frame);
    previousTime = 0;
    frame = autoRotate ? requestAnimationFrame(animate) : null;
  });
  document.addEventListener('visibilitychange', () => {
    if (frame !== null) cancelAnimationFrame(frame);
    previousTime = 0;
    frame = autoRotate && !document.hidden && !disposed ? requestAnimationFrame(animate) : null;
  });
  canvas.addEventListener('webglcontextlost', event => {
    event.preventDefault();
    lab.querySelector('[data-surface-status]').textContent = '图形上下文暂时中断，恢复后会自动重新绘制。';
  });
  canvas.addEventListener('webglcontextrestored', () => { render(); lab.querySelector('[data-surface-status]').textContent = '三维模型已恢复，可继续旋转。'; });
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  // Full-page navigation is used by this MkDocs site; dispose on page departure.
  window.addEventListener('pagehide', event => {
    if (event.persisted) return;
    disposed = true;
    observer.disconnect();
    if (frame !== null) cancelAnimationFrame(frame);
    for (const child of group.children) { child.geometry.dispose(); child.material.dispose(); }
    renderer.dispose();
  }, {once: true});
  selectSurface('sphere');
  resize();
}
