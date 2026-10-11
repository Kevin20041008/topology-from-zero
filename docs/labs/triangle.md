# 实验 1 · 三角形的洞

<p class="lab-kicker">INTERACTIVE / 从循环到边界</p>

同样的三条边，加入一个面之后，拓扑信息会怎样变化？点击两个状态，观察第一 Betti 数（first Betti number）$\beta_1$。

<div class="lab" data-lab="triangle">
  <div class="lab-toolbar" role="group" aria-label="三角形状态">
    <button type="button" data-fill="false" aria-pressed="true">空心三角形</button>
    <button type="button" data-fill="true" aria-pressed="false">填实三角形</button>
  </div>
  <div class="lab-body">
    <div class="lab-panel">
      <p class="panel-title">一个环，能否被面填充？</p>
      <svg viewBox="0 0 340 290" role="img" aria-label="三角形单纯复形" data-triangle-svg>
        <path d="M170 35 L45 245 L295 245 Z" class="shape-face" data-triangle-face hidden></path>
        <path d="M170 35 L45 245 L295 245 Z" class="shape-edge"></path>
        <circle cx="170" cy="35" r="6" class="shape-point"></circle><circle cx="45" cy="245" r="6" class="shape-point"></circle><circle cx="295" cy="245" r="6" class="shape-point"></circle>
        <text x="166" y="21">0</text><text x="25" y="261">1</text><text x="305" y="261">2</text>
        <text x="170" y="163" text-anchor="middle" data-triangle-label>没有二维单形</text>
      </svg>
    </div>
    <div class="lab-panel">
      <p class="panel-title">同调 · 系数域 F₂</p>
      <div class="betti-row"><div class="betti-value"><small>β₀ · 连通分支</small><strong data-b0>1</strong></div><div class="betti-value"><small>β₁ · 独立环</small><strong data-b1>1</strong></div></div>
      <p class="lab-explanation" data-triangle-explanation></p>
      <p class="lab-note" data-triangle-counts></p>
    </div>
  </div>
  <p class="lab-status" aria-live="polite" data-triangle-status>正在准备实验…</p>
</div>

<noscript>此实验需要启用 JavaScript。空心三角形的 (β₀, β₁)=(1,1)，填实后为 (1,0)。</noscript>

## 先预测，再操作

1. 三个顶点一直由三条边连在一起，为什么 $\beta_0$ 没有变化？
2. 填实后，三条边的和还是循环（cycle）吗？它是否同时成了边界（boundary）？
3. 再次移去面，哪个同调类重新出现？

!!! note "计算与解释"
    两种状态的 Betti 数都由当前复形的边界矩阵在 $\mathbb F_2$ 上计算。填实后，三条边组成的循环仍然存在，但它是三角面的边界，所以在同调商空间中代表零。

## 理论衔接

$$
\beta_1=\dim C_1-\operatorname{rank}\partial_1-\operatorname{rank}\partial_2.
$$

三条边固定，$\operatorname{rank}\partial_1=2$。没有面时 $\operatorname{rank}\partial_2=0$；加入面后为 $1$。

完整定义、证明与参考书目见[第三章：环、边界与同调](../algebraic/03-homology.md)。用 Python 复现请打开[同调 Notebook](index.md#homology)。

[下一个实验：点云与持续同调 →](point-cloud.md){ .md-button .md-button--primary }
