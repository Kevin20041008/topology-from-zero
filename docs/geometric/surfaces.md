# T2 · 紧曲面分类与多边形计算

<div class="chapter-meta">研究生课程 · 先修：T1、F2、H3、Q2；多边形商空间<br>学习方式：先独立重构证明，再完成书面练习和即时自检。实验只检验指定有限输入。</div>

## 1. 直观解释

曲面允许完整而具体的分类。分类定理提供标准形，基本群、同调、Euler 示性数和定向性则提供可以逐步检验的计算；它们的适用范围必须分开。

## 2. 严格定义

连通和（connected sum）从两个连通闭曲面各删去一个开盘，再沿边界圆周粘合。$\Sigma_g$ 表示 $g$ 个环面的定向连通和，$N_k$ 表示 $k$ 个实射影平面的连通和。亏格（genus）在定向情形指 $g$；不可定向情形用交叉帽数 $k$，不混用符号。

**引用定理（紧连通曲面分类）。** 每个紧连通曲面同胚于从 $\Sigma_g$（$g\ge0$）或 $N_k$（$k\ge1$）删去 $b\ge0$ 个互不相交开盘所得空间。定向性、$b$ 和相应参数唯一决定其同胚类型。完整证明需要多边形边词规约，本章引用分类，随后严格计算标准形的不变量。

## 3. 定理与证明

**命题 T2.1（闭曲面的群）。**

$$
\pi_1(\Sigma_g)=\langle a_i,b_i\mid\prod_{i=1}^g[a_i,b_i]=1\rangle,\qquad
\pi_1(N_k)=\langle c_1,\ldots,c_k\mid c_1^2\cdots c_k^2=1\rangle.
$$

**证明。** 标准多边形识别得到一个顶点、$2g$ 或 $k$ 条一维胞腔和一个二维胞腔。沿多边形方向读边词得到显示的附加映射，应用 F2.3。$g=0$ 时一条空关系给平凡群。$\square$

**命题 T2.2（整数同调）。** 闭连通定向曲面有 $H_0=H_2=\mathbb Z,H_1=\mathbb Z^{2g}$；不可定向曲面有 $H_0=\mathbb Z,H_2=0,H_1=\mathbb Z^{k-1}\oplus\mathbb Z/2$。

**证明。** 定向边词每个字母正负各出现一次，二维胞腔边界为零，一维边界也为零。不可定向边词给 $d_2(1)=(2,\ldots,2)$，此映射单射；向量 $(1,\ldots,1)$ 是本原向量，可扩充为整数基，故商去它的两倍给 $\mathbb Z^{k-1}\oplus\mathbb Z/2$。$\square$

**命题 T2.3（带边界）。** 当 $b>0$，上述曲面分别形变收缩到 $2g+b-1$ 或 $k+b-1$ 个圆的楔和。因此

$$
\chi(\Sigma_{g,b})=2-2g-b,\qquad\chi(N_{k,b})=2-k-b.
$$

**证明。** 选多边形标准形，将各额外边界圆用互不相交的弧接到主边界；沿这些弧切开后，剩余面是一个盘，且保留一段未识别的边界。该盘连同边界领圈可收缩到除去这段自由边界后的边界树，重新粘合得到图骨架。每个定向柄给两条环、每个交叉帽给一条环、额外边界给一条环，得到所述数量。图的 $H_0=\mathbb Z,H_1=\mathbb Z^r$，所以 $\chi=1-r$，与闭曲面删盘每次减一一致。$\square$

## 4. 正例与反例

**正例。** 莫比乌斯带是 $N_{1,1}$，$\chi=0,\pi_1=\mathbb Z$；圆柱是 $\Sigma_{0,2}$，同样形变收缩到圆周，却有两个边界分支且可定向。它们同伦等价但不同胚。

**反例。** 闭环面与 Klein 瓶的 Euler 示性数都为零，但定向性及整数 $H_1$ 不同。单凭 Euler 示性数不能分类曲面；若脱离二维流形类别，即使再加定向标签也没有一般分类结论。

## 5. 练习

1. 一个紧连通定向曲面有 3 个边界分支且 $\chi=-3$，求亏格。
2. 计算 $N_3$ 的整数与模 2 第一同调。
3. 解释莫比乌斯带与圆柱为什么不由同调区分，却由边界区分。

??? tip "提示 1"
    1：解 $2-2g-3=-3$。2：使用 T2.2 与系数定理。
??? tip "提示 2 与核对"
    1：$g=1$。2：$\mathbb Z^2\oplus\mathbb Z/2$ 与 $\mathbb F_2^3$。3：二者均同伦等价于圆周，但流形同胚保持边界及其分支数。

<div class="admonition question" data-exercise="geometric-surfaces"></div>
<noscript>即时反馈需要 JavaScript；正文习题与分步提示仍可直接阅读。</noscript>

## 6. 参考书目

- C. P. Rourke and B. J. Sanderson. *Introduction to Piecewise-Linear Topology*, Springer, 1972.
- Dale Rolfsen. *Knots and Links*, AMS Chelsea reprint, 2003.
- John Milnor. *Topology from the Differentiable Viewpoint*, Princeton University Press, 1997.
- William S. Massey. *Algebraic Topology: An Introduction*, Springer reprint, 1977.

本章以原创文字组织标准数学内容。标为“引用定理”的结果未在本章证明，不将其与已给出的证明混为一谈。
