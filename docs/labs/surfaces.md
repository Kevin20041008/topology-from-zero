# 实验 3 · 三维中的拓扑曲面

<p class="lab-kicker">INTERACTIVE / 看见几何，辨认拓扑</p>

选择球面、环面或莫比乌斯带，拖动模型改变观察方向。它们都在三维空间中展示，但作为曲面，其局部维数是 **2**。

<div class="lab" data-lab="surfaces">
  <div class="lab-toolbar" role="group" aria-label="选择曲面">
    <button type="button" data-surface="sphere" aria-pressed="true">球面 S²</button><button type="button" data-surface="torus" aria-pressed="false">环面 T²</button><button type="button" data-surface="mobius" aria-pressed="false">莫比乌斯带</button>
    <button type="button" data-auto-rotate aria-pressed="false">自动旋转</button><button type="button" data-wireframe aria-pressed="true">显示网格</button>
  </div>
  <div class="lab-body">
    <div class="surface-stage"><canvas class="surface-canvas" data-surface-canvas tabindex="0" aria-label="可旋转的三维曲面，拖动或使用方向键旋转，使用加减键缩放"></canvas><span class="gesture-hint">拖动旋转 · 滚轮缩放 · 方向键与下方按钮也可操作</span><p data-error hidden></p></div>
    <div class="lab-panel"><p class="panel-title" data-surface-title>球面 S²</p><p class="lab-explanation" data-surface-explanation></p><dl class="surface-facts" data-surface-facts></dl><p class="lab-note">Betti 数使用 F₂ 系数，属于这些曲面的已知数学性质，并非对当前渲染网格进行数值估计。</p></div>
  </div>
  <div class="lab-toolbar surface-controls" role="group" aria-label="模型视角控制"><button type="button" data-rotate="left" aria-label="向左旋转">← 左转</button><button type="button" data-rotate="right" aria-label="向右旋转">右转 →</button><button type="button" data-rotate="up">抬高视角</button><button type="button" data-zoom="in">放大</button><button type="button" data-zoom="out">缩小</button><button type="button" data-reset-view>重置视角</button></div>
  <p class="lab-status" aria-live="polite" data-surface-status>正在准备本地 Three.js 模型…</p>
</div>

<noscript>交互模型需要 JavaScript 和 WebGL。下方比较表无需 JavaScript 也能阅读。</noscript>

## 三种曲面有什么不同

| 曲面 | 边界分支数 | 可定向性（orientability） | $(\beta_0,\beta_1,\beta_2)$，F₂ 系数 | 欧拉示性数 $\chi$ |
| --- | ---: | --- | --- | ---: |
| 球面（sphere） | 0 | 可定向 | $(1,0,1)$ | 2 |
| 环面（torus） | 0 | 可定向 | $(1,2,1)$ | 0 |
| 莫比乌斯带（Möbius strip） | 1 | 不可定向 | $(1,1,0)$ | 0 |

球面是球的**表面**，不是实心球。环面的两个独立一维同调类可分别沿管身和环孔方向绕行。莫比乌斯带有一条边界；它沿中线收缩到一个圆，所以第一同调与圆相同，却不与圆同胚。

可定向性的含义是能否在整个曲面上连续选择一致的局部方向。沿莫比乌斯带的中线绕行一周，局部方向会翻转。表中差异来自曲面的拓扑结构，不能仅靠屏幕投影中“看起来有几个洞”判断。

## 观察与思考

1. 把球面旋转任意角度，为什么不会改变 Betti 数？
2. 环面与莫比乌斯带都有 $\chi=0$，为什么它们仍然不同胚？尝试用边界和可定向性回答。
3. 莫比乌斯带的一条边界看起来可能像两条边。旋转模型，追踪高亮边界，看看它如何连成同一条闭曲线。

模型采用本地 Three.js，无需 CDN。黄色线条仅用来强调莫比乌斯带的边界；光照与网格帮助辨认几何，不作为可定向性的数学证明。参考：Allen Hatcher, *Algebraic Topology*, Cambridge University Press, 2002。

**验证范围。** 自动化测试在两种较粗采样下构建这三种几何，识别重合接缝与球面极点后计算 $H_0,H_1,H_2$、欧拉示性数、边界分支及面定向的一致性。莫比乌斯带额外检查 $(0,v)\sim(2\pi,-v)$ 的接缝以及边界绕两周闭合。测试不会把用于光照的重复顶点误当成空间断开，也不能替代曲面分类或三角剖分不变性的证明。表中的连续空间结论仍属于引用的标准结果，详见[数学审查](../math-review.md)。

[返回实验室](index.md){ .md-button }
