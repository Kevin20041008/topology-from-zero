---
hide:
  - toc
---

<div class="book-hero" markdown>
<div markdown>
<p class="eyebrow">TOPOLOGY FROM ZERO / 中文开放教材</p>

# 从形状出发，<br>理解空间。

<p class="lead">一条不断裂的路径，一个不能填满的环。<br>从这些朴素问题走向拓扑的语言，再用代码检验有限的例子。</p>

[开始第一章 →](introduction/01-spaces.md){ .md-button .md-button--primary }
[进入实验室](labs/index.md){ .md-button }

</div>
<div markdown>
![原创拓扑示意图：环状曲面与从方环到填充方形的变化](assets/topology-study.svg)
</div>
</div>

<div class="book-stats"><span><strong>06</strong> 课程模块</span><span><strong>03</strong> 示范章节</span><span><strong>03</strong> 浏览器交互实验</span><span><strong>02</strong> Python Notebook</span></div>

## 动手改变一个空间

[三角形的洞](labs/triangle.md){ .md-button }
[点云与 Barcode](labs/point-cloud.md){ .md-button }
[旋转三维曲面](labs/surfaces.md){ .md-button }

切换一个面、改变观察尺度，或转动一张曲面。三个实验直接在浏览器中运行，和下面的严格定义、证明以及 Python Notebook 相互补充。

## 先读懂三个问题

<div class="chapter-grid" markdown>
<div class="chapter-card" markdown>
<span class="number">01</span>

### 没有距离，还能谈附近吗？

用开集描述空间。从度量的直观出发，亲手验证拓扑的三条公理。

[从距离到拓扑 →](introduction/01-spaces.md)
</div>
<div class="chapter-card" markdown>
<span class="number">02</span>

### 连续究竟保留了什么？

用逆像刻画连续，再用开覆盖证明：紧致空间的连续像仍然紧致。

[连续映射与紧致性 →](point-set/02-continuity.md)
</div>
<div class="chapter-card" markdown>
<span class="number">03</span>

### 一个环，何时不再是洞？

把点、边和三角形写成矩阵。区分闭合的链与能够被填充的边界。

[环、边界与同调 →](algebraic/03-homology.md)
</div>
</div>

## 学习路线图

主线按 **01 → 02 → 03 → 04 → 05 → 06** 推进；计算实验也可从第三章提前进入。第一次阅读只需集合、函数与基础线性代数。涉及群、商空间或概率的后续内容会先补充所需概念。

<div class="route-grid" markdown>
<div class="route-step" markdown>
<small>01 / 建立语言 · 已有示范</small>

### [拓扑学导论](introduction/index.md)
从开集与邻域开始。目标：辨认一个集合族是否构成拓扑。
</div>
<div class="route-step" markdown>
<small>02 / 研究空间 · 已有示范</small>

### [点集拓扑](point-set/index.md)
连续、紧致、连通与分离。目标：把直观陈述变成可证明的命题。
</div>
<div class="route-step" markdown>
<small>03 / 提取不变量 · 已有示范</small>

### [代数拓扑](algebraic/index.md)
同伦、基本群与同调。目标：理解代数怎样区分空间。
</div>
<div class="route-step" markdown>
<small>04 / 把定义变成算法 · 实验先行</small>

### [计算拓扑](computational/index.md)
复形、边界矩阵与消元。目标：计算小型复形的 Betti 数。
</div>
<div class="route-step" markdown>
<small>05 / 在尺度间追踪 · 实验先行</small>

### [持续同调](persistence/index.md)
滤过、区间与稳定性。目标：理解一个洞何时出生、何时死亡。
</div>
<div class="route-step" markdown>
<small>06 / 连接数据学习 · 规划中</small>

### [拓扑与人工智能](ai/index.md)
拓扑特征、模型与评估。目标：判断拓扑信息何时对学习任务有帮助。
</div>
</div>

## 怎样使用这本书

每篇示范章都按照“直观解释 → 严格定义 → 定理与证明 → 正例与反例 → 练习 → 参考书目”展开。建议先独立完成习题，再展开提示。Notebook 中的计算只验证具体有限例子；证明负责一般结论。

!!! info "教材进度 · 2026-10-11"
    当前 v0.2 包含三篇示范章、三个浏览器交互实验与两份 Notebook，尚未完成整本教材，也未经过独立同行审阅。其他模块提供学习目标、先修关系和后续范围，不放置空白章节。详见[进度说明](progress.md)和[贡献约定](contributing.md)。
