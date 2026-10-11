# 持续同调

**核心问题：** 随着观察尺度变化，拓扑特征能维持多久？

持续同调（persistent homology）研究嵌套复形之间的同调映射。滤过（filtration）是一族满足 $K_r\subseteq K_s$（当 $r\le s$）的复形；包含映射诱导 $H_k(K_r)\to H_k(K_s)$，让我们追踪同调类。

## 目前可读与可运行

[第三章](../algebraic/03-homology.md)与 [Notebook 02](../labs/index.md#homology)使用单位正方形四点。在距离不超过 $r$ 时连边的约定下，一维环在 $r=1$ 出生，在 $r=\sqrt2$ 被面填充，得到区间 $[1,\sqrt2)$。

这个例子足够简单，可以由复形变化直接确定区间。Notebook 计算各尺度的 Betti 数并画出曲线；它**没有实现一般持续同调配对算法**。不同数据即使 Betti 曲线相同，同调类的跨尺度对应也可能不同。

## 浏览器交互实验

[实验 2：点云与持续同调](../labs/point-cloud.md)进一步实现了有限 Rips 滤过的边界矩阵约化，可切换点云、拖动球半径并查看真实计算的 $H_0,H_1$ Barcode。它使用球半径 $\varepsilon$，与前文距离阈值的换算是 $r=2\varepsilon$。Notebook 保持原有的入门推导与 Betti 曲线实验。

**后续范围：** 持续约化的系统证明、条形码（barcode）分解、持续图（persistence diagram）、瓶颈距离（bottleneck distance）与稳定性定理。进入这些主题前，应熟悉第三章的商空间和边界矩阵。

延伸阅读：Herbert Edelsbrunner and John Harer, *Computational Topology: An Introduction*, AMS, 2010。
