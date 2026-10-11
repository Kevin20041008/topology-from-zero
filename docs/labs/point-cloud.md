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

这里只展示二维骨架与前两维同调。四点完整 Rips 复形后期还包含三维单形；不能根据本实验推断其第二同调。

几何距离使用 JavaScript 双精度浮点数，不再按固定小数位舍入；所有可表示的正长度持续区间都会保留，只有出生与死亡数值相等的区间省略。距离溢出、半距离下溢或非有限坐标会明确报错，需要先调整输入尺度。相同坐标可带不同顶点标签，它们在半径零时由边连接，零长度合并区间不显示。

浮点计算并非实数精确几何：例如通过三角函数生成的对称点，临界值仍可能相差几个末位。数值标签显示三位小数只用于阅读，不参与区间存活判定；“下一个临界尺度”按内部保存的值推进。算法测试包括重合点、共线点、尺度从 $10^{-14}$ 到 $10^8$ 的方形、重新编号和等距变换，不能据此宣称任意数值尺度都无误差。

**12 位舍入为何改变滤过。** 两点距离为 $10^{-14}$ 时，真实边出生半径为 $5\times10^{-15}$；若把它舍入到小数点后 12 位，就变为零。于是零尺度的两个分支会被提前合并。这是改变了滤过，不只是改变了显示格式。本版的语义是对输入的 JavaScript 浮点坐标计算双精度边出生值，再对这个数值滤过精确做模 2 线性代数。

**独立对照。** `scripts/verify_independent.py` 使用 GUDHI 3.11.0 对 43 组固定输入独立构造 Rips 二维骨架并约化，逐值比较全部 217 条正长度 $H_0,H_1$ 区间，包括极近两点和薄矩形；32 组为固定种子的随机点云。比较不舍入、不用 `isclose`，也不删掉很短的正区间。两种实现共享同一组浮点边出生值，因此结果支持组合构造与配对的一致性，不验证距离计算相对真实欧氏几何的误差，也不覆盖高维持续同调。

完整理论入口见[持续同调](../persistence/index.md)，边界矩阵推导见[第三章](../algebraic/03-homology.md)。参考：Edelsbrunner and Harer, *Computational Topology: An Introduction*, AMS, 2010。

[下一个实验：三维中的拓扑曲面 →](surfaces.md){ .md-button .md-button--primary }
