# H1 · 整数奇异链与同伦不变性

<div class="chapter-meta">研究生课程 · 先修：链群与线性商空间；F1；自由阿贝尔群<br>学习方式：先独立重构证明，再完成书面练习和即时自检。实验只检验指定有限输入。</div>

## 1. 直观解释

有限网格的边界矩阵能启发定义，但一般空间不一定带有指定网格。奇异同调允许所有连续单形，从而使每个连续映射自动诱导链映射。

## 2. 严格定义

标准单形 $\Delta^n=\{(t_0,\ldots,t_n):t_i\ge0,\sum t_i=1\}$。奇异单形（singular simplex）是连续映射 $\sigma:\Delta^n\to X$，不要求单射。$C_n(X;\mathbb Z)$ 为以这些映射为基的自由阿贝尔群；每条链只有有限多个非零系数。令

$$
\partial_n\sigma=\sum_{i=0}^n(-1)^i\sigma\circ\delta_i,\qquad H_n(X;\mathbb Z)=\ker\partial_n/\operatorname{im}\partial_{n+1},
$$

其中 $\delta_i$ 插入第 $i$ 个零坐标，$\partial_0=0$。链映射（chain map）与链同伦（chain homotopy）分别满足 $\partial f=f\partial$、$g-f=\partial P+P\partial$。

## 3. 定理与证明

**定理 H1.1。** $\partial^2=0$，连续映射诱导同调同态，且复合、恒等与之相容。

**证明。** 从一个有序单形删去顶点 $i<j$ 有两种次序。先删 $j$ 再删 $i$ 的符号为 $(-1)^{i+j}$，先删 $i$ 再删原来的 $j$ 的符号为 $(-1)^{i+j-1}$，两项相消。连续 $f$ 给 $f_\#(\sigma)=f\sigma$，与取面交换，因此将循环送到循环、边界送到边界；复合律在每个生成元上直接成立。$\square$

**定理 H1.2（棱柱算子）。** 同伦 $F:X\times I\to Y$ 的端点映射 $f,g$ 诱导相同的同调同态。

**证明。** 记棱柱 $\Delta^n\times I$ 的底、顶顶点为 $v_i^0,v_i^1$，定义

$$
P_n(\sigma)=\sum_{i=0}^n(-1)^i F\circ(\sigma\times\mathrm{id})\circ[v_0^0,\ldots,v_i^0,v_i^1,\ldots,v_n^1],
$$

方括号表示从标准 $(n+1)$ 单形到该仿射单形的线性映射。求边界时，共享的内部面分别来自相邻棱柱单形，符号相反；外侧面组成 $-P_{n-1}(\partial\sigma)$，余下顶底面为 $g_\#\sigma-f_\#\sigma$。所以 $\partial P+P\partial=g_\#-f_\#$。若 $z$ 是循环，则 $gz-fz=\partial Pz$ 是边界，故同调类相等。$\square$

**命题 H1.3。** $H_0(X;\mathbb Z)$ 是以道路分支为基的自由阿贝尔群。

**证明。** 将每点送到其道路分支的符号，得到 $C_0(X)$ 到分支自由群的满射。一条道路的边界为终点减起点，故所有边界在核内。核中每条有限零链在每个分支内系数和为零；对出现的每个分支选代表点，用连接道路把每个点减代表点写成边界，即将该链写成边界。商同构成立。$\square$

一点空间的 $C_n\cong\mathbb Z$，$n\ge1$ 时边界为偶数 $n$ 的恒等、奇数 $n$ 的零映射，因此 $H_0=\mathbb Z,H_{n>0}=0$。可缩非空空间由 H1.2 有同样同调。约化同调（reduced homology）在零维用系数和增广 $C_0\to\mathbb Z$；后文默认讨论非空空间的约化群。

## 4. 正例与反例

**正例。** $\mathbb R^n$ 用线性收缩同伦到一点，所有正维奇异同调为零；这不是靠有限采样得出的。

**反例。** 零维奇异同调数的是道路分支，不是一般空间的连通分支。闭拓扑学正弦曲线连通却有两个道路分支，所以 $H_0\cong\mathbb Z^2$。实验只输出域上的维数，无法直接显示整数群的挠元素。

## 5. 练习

1. 展开有向三角形的整数边界并逐项计算边界的边界。
2. 证明链同伦映射在同调上相等。
3. 计算两个互不相交圆盘的 $H_0,H_1$。

??? tip "提示 1"
    1：保留每个 $(-1)^i$。3：连续单形的像在一个分支内，链复形分裂为直和。
??? tip "提示 2 与核对"
    1：$[12]-[02]+[01]$ 的边界为零。2：对循环代入链同伦恒等式。3：分别为 $\mathbb Z^2,0$。

<div class="admonition question" data-exercise="algebraic-homology-singular-chains"></div>
<noscript>即时反馈需要 JavaScript；正文习题与分步提示仍可直接阅读。</noscript>

## 6. 参考书目

- Allen Hatcher. *Algebraic Topology*, Cambridge University Press, 2002.
- Glen E. Bredon. *Topology and Geometry*, Springer, 1993.

本章以原创文字组织标准数学内容。标为“引用定理”的结果未在本章证明，不将其与已给出的证明混为一谈。
