# P6 · 局部紧致、紧化与适当映射

<div class="chapter-meta">研究生课程 · 先修：P2–P5、基础 D<br>学习方式：先独立重构证明，再完成书面练习和即时自检。实验只检验指定有限输入。</div>

## 1. 直观解释

紧致空间适合做全局论证，局部紧致空间只要求每个点附近有一块紧致控制区。把所有“逃向无穷远”的方向收成一点，得到一点紧化；但新空间是否 Hausdorff，取决于原空间的局部结构。

## 2. 严格定义

本章局部紧致 Hausdorff（locally compact Hausdorff，LCH）指 Hausdorff 空间中每点有紧致邻域：存在紧致 $K$ 和开 $U$，使 $x\in U\subseteq K$。紧化（compactification）是空间到紧致 Hausdorff 空间的稠密嵌入。

对非紧致 LCH 空间 $X$，一点紧化（one-point compactification）$X^+=X\cup\{\infty\}$ 保留 $X$ 的所有开集，并规定 $\infty$ 的基本邻域为 $\{\infty\}\cup(X\setminus K)$，$K\subseteq X$ 紧致。

本章适当映射（proper map）指连续映射 $f:X\to Y$，使紧致子集的逆像紧致；在更一般文献中也有其他约定。本章讨论其闭性时要求 $X,Y$ 为 LCH。

## 3. 定理与证明

**引理 P6.1（紧邻域缩小）。** LCH 空间中，若 $x\in O$ 且 $O$ 开，可取开 $V$ 使 $x\in V\subseteq\overline V\subseteq O$，且 $\overline V$ 紧致。

**证明。** 先取紧邻域 $K$，使 $x\in\operatorname{int}K$。$K$ 是紧致 Hausdorff，故正规。在 $K$ 内把 $x$ 的相对开邻域 $O\cap\operatorname{int}K$ 缩小，得相对开 $V$，其在 $K$ 中的闭包包含于该邻域。因为 $V\subseteq\operatorname{int}K$，$V$ 实际在 $X$ 中开；又 $K$ 在 $X$ 中闭，所以两种闭包相同。闭包作为紧致集的闭子集紧致。$\square$

**定理 P6.2。** 上述 $X^+$ 是紧致 Hausdorff 空间，$X$ 以原拓扑作为稠密开子空间嵌入其中。

**证明。** 两个无穷远邻域之交对应两个紧致集之并，仍紧致；它们与 $X$ 中开集的交仍开，因为紧致子集在 Hausdorff 空间中闭。任意并也满足定义，故确为拓扑。$X$ 中两点可原样分离；分离 $x$ 与 $\infty$ 时，用 P6.1 的 $V$ 和 $X^+\setminus\overline V$。给开覆盖，取包含 $\infty$ 的一员，其补集包含于某紧致 $K$；用有限多个成员覆盖 $K$ 即足够。最后任意 $\infty$ 邻域都遇到 $X$，否则 $X$ 本身紧致，违反假设，因此嵌入稠密。$\square$

**命题 P6.3。** LCH 空间间的适当映射为闭映射。

**证明。** 设 $F\subseteq X$ 闭，$y\notin f(F)$。在 $y$ 周围取紧邻域 $K$ 及开 $V\subseteq K$。$F\cap f^{-1}(K)$ 紧致，其像 $C$ 在 $Y$ 中紧致且闭。于是 $V\setminus C$ 是避开 $f(F)$ 的 $y$ 的开邻域，所以 $f(F)$ 闭。$\square$

## 4. 正例与反例

**正例。** 实数轴的一点紧化同胚于圆周。可用逆立体投影
$x\mapsto(2x/(1+x^2),(x^2-1)/(1+x^2))$，并把 $\infty$ 送到北极；逆像中北极附近对应有界紧集的补。映射是连续双射，由 P4.2 得同胚。

**反例。** $\mathbb Q$ 不是局部紧致：若某有理点有紧邻域，它包含一段相对开区间。在此区间选择趋向无理数的有理数列；任何子列的实数极限仍为该无理数，不可能在 $\mathbb Q$ 内收敛，违反度量紧致性。

**反例。** 连续映射未必适当：$\mathbb R\to\{*\}$ 的点逆像非紧致。若 $X$ 已紧致，同一加点规则使 $\infty$ 孤立，$X$ 不稠密，因此本章紧化声明明确排除了该情形。

## 5. 练习

1. 证明 LCH 空间的开子空间和闭子空间仍 LCH。
2. 证明闭嵌入 $X\hookrightarrow Y$（$Y$ Hausdorff）是适当映射。
3. 证明非紧致 LCH 空间的一点紧化在保持 $X$ 不变的意义下唯一。

??? tip "提示 1"
    1：开子空间用 P6.1；闭子空间取紧邻域与闭集的交。3：另一个紧化中新增点的闭补集是 $X$ 内紧集。

??? tip "提示 2 与核对"
    2：紧集与闭像的交紧致，经嵌入的反函数拉回。3：两个紧化的新增点邻域都恰以 $X$ 中紧集的补为基，恒等对应双向连续。

<div class="admonition question" data-exercise="point-set-local-compactness"></div>
<noscript>即时反馈需要 JavaScript；正文习题与分步提示仍可直接阅读。</noscript>

## 6. 参考书目

- James R. Munkres. *Topology*, 2nd ed., Prentice Hall, 2000.
- Stephen Willard. *General Topology*, Addison-Wesley, 1970.
- John L. Kelley. *General Topology*, Van Nostrand, 1955.

本章以原创文字组织标准数学内容。标为“引用定理”的结果未在本章证明，不将其与已给出的证明混为一谈。
