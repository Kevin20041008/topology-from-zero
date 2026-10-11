# 实验 2 · 点云与持续同调

<p class="lab-kicker">INTERACTIVE / 在尺度之间追踪形状</p>

拖动球半径 $\varepsilon$ 滑块，观察小球相遇、边出现，以及三角面填充循环。右侧条形码（barcode）显示同调类从出生到死亡的区间，竖线对应当前尺度。

<div class="lab" data-lab="persistence">
  <div class="lab-toolbar">
    <label for="point-preset">点云</label><select id="point-preset" data-preset><option value="square">单位正方形 · 4 点</option><option value="ring">椭圆环 · 8 点</option><option value="clusters">两个点簇 · 6 点</option></select>
    <button type="button" data-next-event>下一个临界尺度</button><button type="button" data-reset-radius>重置</button>
    <label for="point-radius">球半径 ε · 两点距离 ≤ 2ε 时连边</label>
    <div class="slider-row"><input id="point-radius" type="range" min="0" max="0.75" step="any" value="0.35" data-radius aria-label="球半径 ε"><output for="point-radius" data-radius-value>0.350</output></div>
  </div>
  <div class="lab-body">
    <div class="lab-panel"><p class="panel-title">Vietoris–Rips 复形 · 二维骨架</p><svg viewBox="0 0 400 350" role="img" aria-label="当前尺度的点云、边与三角面" data-cloud-svg></svg><p class="lab-note" data-simplex-counts></p></div>
    <div class="lab-panel"><p class="panel-title">BARCODE · 深色线段表示当前存活的类</p><svg viewBox="0 0 400 350" role="img" aria-label="零维与一维持续同调条形码" data-barcode-svg></svg><div class="betti-row"><div class="betti-value"><small>β₀ · 连通分支</small><strong data-b0></strong></div><div class="betti-value"><small>β₁ · 独立环</small><strong data-b1></strong></div></div><details><summary>查看区间数值</summary><ul class="barcode-list" data-barcode-list></ul></details></div>
  </div>
  <p class="lab-status" aria-live="polite" data-persistence-status>正在计算滤过与持续区间…</p>
</div>

<noscript>此实验需要 JavaScript。单位正方形的一维持续区间为 [1/2, √2/2)。</noscript>

## 观察任务

1. 选择单位正方形，依次查看 $\varepsilon=0$、$1/2$、$\sqrt2/2$ 附近。按“下一个临界尺度”可以精确到达变化点。
2. 换成椭圆环，在条形码中找到一维同调类最长的区间。
3. 换成两个点簇，观察零维条形码如何记录连通分支的合并。最后剩下的那条零维区间延伸到无穷。

## 这里计算的是什么

使用 Vietoris–Rips 复形（Vietoris–Rips complex）：点在 $\varepsilon=0$ 加入；一条边在 $\varepsilon=d/2$ 加入；三条边齐全时加入对应三角面。这个规则与“几个圆拥有共同交集”不同，后者对应 Čech 复形（Čech complex）的构造。

!!! info "与前文的尺度换算"
    前文和 Notebook 使用距离阈值 $r$，本实验使用球半径 $\varepsilon$，所以 $r=2\varepsilon$。单位正方形的一维区间在这里为 $[1/2,\sqrt2/2)$，对应前文的 $[1,\sqrt2)$。

程序将单形按出生尺度排序，并在二元域上约化边界矩阵，计算 $H_0,H_1$ 的出生与死亡配对。区间采用左闭右开 $[b,d)$；零长度区间不显示。浅色区间提供整个滤过的背景，深色区间表示当前存活的类。

这里只展示二维骨架与前两维同调。四点完整 Rips 复形后期还包含三维单形；不能根据本实验推断其第二同调。几何距离统一舍入到小数点后 12 位，以保持对称点集的相同临界尺度。

完整理论入口见[持续同调](../persistence/index.md)，边界矩阵推导见[第三章](../algebraic/03-homology.md)。参考：Edelsbrunner and Harer, *Computational Topology: An Introduction*, AMS, 2010。

[下一个实验：三维中的拓扑曲面 →](surfaces.md){ .md-button .md-button--primary }
