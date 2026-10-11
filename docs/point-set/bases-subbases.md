# 基础 A · 拓扑基与子基

<div class="chapter-meta">模块：点集拓扑 · 先修：第一章、集合的并交 · 建议：阅读 40 分钟，练习 40 分钟<br>目标：从少量开集生成拓扑，并为子空间与积空间提供可用的局部语言。</div>

## 1. 直观解释：用小块描述所有开集

实数轴的开集有很多，但我们通常只需要检查开区间。一个开集可能不是单个区间，却总能在每个点附近找到完全落在其中的小区间。拓扑基（basis for a topology）把这种“小块拼接”的办法抽象出来。子基（subbasis）更节省材料：先取有限交，再取任意并。

这里的“生成”有精确含义：生成拓扑包含指定材料，并且包含于任何包含这些材料的拓扑。只说“把集合放在一起”并不足以说明得到了拓扑。

## 2. 严格定义：基、子基及两种空间构造

**定义 A.1。** 集合 $X$ 上的一族子集 $\mathcal B$ 称为拓扑基，如果：

1. 对每个 $x\in X$，存在 $B\in\mathcal B$ 使 $x\in B$；
2. 若 $x\in B_1\cap B_2$，其中 $B_1,B_2\in\mathcal B$，则存在 $B_3\in\mathcal B$ 使 $x\in B_3\subseteq B_1\cap B_2$。

第二条只要求在每个交点附近有更小的基元素，不要求 $B_1\cap B_2$ 本身在基中。允许空集是基元素；它不会影响生成结果。若 $X=\varnothing$，空集合族也是基。

记 $\tau(\mathcal B)$ 为所有基元素的任意并组成的集合族，包含空并 $\varnothing$。对已有拓扑 $\tau$，说 $\mathcal B$ 是它的基，指 $\tau=\tau(\mathcal B)$。

**定义 A.2。** 本章允许任意 $\mathcal S\subseteq\mathcal P(X)$ 作为子基。先令

$$
\mathcal B_{\mathcal S}=\left\{\bigcap_{j=1}^{n}S_j:n\geq0,\ S_j\in\mathcal S\right\},
$$

约定空交为 $X$，再定义 $\tau(\mathcal S)=\tau(\mathcal B_{\mathcal S})$。有些书另要求子基覆盖 $X$；此处用空交约定统一处理。特别地，$\mathcal S=\varnothing$ 生成平凡拓扑。

**定义 A.3。** 若 $A\subseteq X$，子空间拓扑（subspace topology）是 $\tau_A=\{A\cap U:U\in\tau_X\}$。若 $X,Y$ 是拓扑空间，积拓扑（product topology）由所有开矩形 $U\times V$ 生成，其中 $U\in\tau_X,V\in\tau_Y$。本章仅讨论两个因子的积。

## 3. 定理与证明

**定理 A.4（基判据）。** 定义 A.1 的两个条件保证 $\tau(\mathcal B)$ 是拓扑。并且 $U\in\tau(\mathcal B)$ 当且仅当对每个 $x\in U$，存在 $B\in\mathcal B$ 使 $x\in B\subseteq U$。

**证明。** 空集是空并，$X$ 因覆盖条件是基元素之并。基元素的并再取任意并仍是基元素之并。若 $U,V$ 都是这种并，对每个 $x\in U\cap V$，先找 $x\in B_1\subseteq U$ 和 $x\in B_2\subseteq V$，再用第二条件得到 $x\in B_3\subseteq U\cap V$。把所有包含于 $U\cap V$ 的基元素取并，便恰好得到 $U\cap V$。二元交封闭推出有限交封闭，零元交为 $X$。

若 $U$ 是基元素之并，其中的每点就在某个这样的基元素里；反向则对全部包含于 $U$ 的基元素取并。$\square$

**定理 A.5（子基生成）。** $\mathcal B_{\mathcal S}$ 是基，且 $\tau(\mathcal S)$ 是包含 $\mathcal S$ 的最小拓扑。

**证明。** 空交 $X$ 保证覆盖。两个有限交的交仍是有限交，因而满足局部交条件。由 A.4 得到拓扑；每个 $S\in\mathcal S$ 是一个单元素族的交，因此属于该拓扑。若拓扑 $\sigma$ 包含 $\mathcal S$，它必须包含 $X$、所有有限交以及这些有限交的任意并，故 $\tau(\mathcal S)\subseteq\sigma$。$\square$

**命题 A.6（子空间与积的基）。** 子空间拓扑确实是拓扑；若 $\mathcal B$ 是 $X$ 的基，则 $\{A\cap B:B\in\mathcal B\}$ 是 $A$ 的基。开矩形构成 $X\times Y$ 的基。

**证明。** 子空间中 $\varnothing=A\cap\varnothing$，$A=A\cap X$；与 $A$ 取交的操作保持任意并和有限交，所以继承拓扑公理。任取相对开集 $A\cap U$ 中的点 $x$，在 $X$ 中取 $x\in B\subseteq U$，便有 $x\in A\cap B\subseteq A\cap U$，由 A.4 的局部判据得结论。积中的全集 $X\times Y$ 是开矩形，且

$$
(U_1\times V_1)\cap(U_2\times V_2)=(U_1\cap U_2)\times(V_1\cap V_2),
$$

所以矩形满足基的两条件。$\square$

**命题 A.7（连续性判据）。** 连续映射（continuous map）指每个开集的逆像都开。若 $\mathcal S$ 生成 $Y$ 的拓扑，则 $f:X\to Y$ 连续当且仅当每个 $f^{-1}(S)$（$S\in\mathcal S$）都开。对基也成立。

**证明。** 必要性来自子基元素是开集。充分性利用逆像保持任意并和有限交：将 $Y$ 的开集写成有限个子基元素之交的任意并，拉回后仍是开集的任意并与有限交。空交拉回为 $X$，也开。基的情况只需要任意并。$\square$

**推论 A.8。** $h:Z\to X\times Y$ 连续当且仅当两个坐标映射 $h_X,h_Y$ 连续。

**证明。** 投影的逆像为 $\pi_X^{-1}(U)=U\times Y$ 和 $\pi_Y^{-1}(V)=X\times V$，故投影连续；连续映射的复合连续，因为 $(g\circ f)^{-1}(W)=f^{-1}(g^{-1}(W))$。反向，$h^{-1}(U\times V)=h_X^{-1}(U)\cap h_Y^{-1}(V)$ 是开集，用 A.7 的基判据即可。$\square$

后面的同伦 $H:X\times[0,1]\to Y$ 就使用这个积拓扑，而不是只要求每一条时间切片连续。

## 4. 正例与反例

**正例：有理端点足够。** 所有 $p,q\in\mathbb Q$、$p<q$ 的区间 $(p,q)$ 是实数通常拓扑的基。它们都开；对开集 $U$ 中的 $x$，先取 $(x-\delta,x+\delta)\subseteq U$，再由有理数稠密性选择 $x-\delta<p<x<q<x+\delta$。用 A.4 即得生成的恰是通常拓扑。

**正例：半直线作子基。** $\{(-\infty,a),(a,\infty):a\in\mathbb R\}$ 生成通常拓扑：材料本身都开，且 $(a,b)=(a,\infty)\cap(-\infty,b)$；开区间已经是基。

**反例：覆盖仍不够。** 在 $X=\{a,b,c\}$ 上，$\mathcal B=\{\{a,b\},\{b,c\}\}$ 覆盖 $X$，但交点 $b$ 周围没有包含于 $\{b\}$ 的基元素。其所有并是 $\varnothing,\{a,b\},\{b,c\},X$，对交不封闭。

**反例：基元素不必对交封闭。** $\mathbb R$ 中全部有界开区间是一组基，但两个不交区间之交是空集，空集不在这组基里。不要把“局部交条件”误写成“交必须属于基”。

**反例：相对开不等于环境开。** $[0,1/2)$ 在 $[0,1]$ 中开，因为它等于 $[0,1]\cap(-1,1/2)$；但它在 $\mathbb R$ 中不开，任意以 $0$ 为中心的开球都包含负数。

## 5. 练习

1. 证明任意度量空间的全部开球构成其度量拓扑的基。补证开球自身开。
2. 在三点集上，子基 $\{\{a,b\},\{b,c\}\}$ 生成哪些开集？与反例中的“只取并”比较。
3. 证明若 $f:X\to Y$ 连续且 $f(X)\subseteq A\subseteq Y$，则把陪域缩为子空间 $A$ 后仍连续。
4. 证明 $\mathbb R^2$ 的欧氏拓扑与通常拓扑的两因子积一致。不要只画矩形与圆。

??? tip "提示与核对"
    1. 若 $y\in B(x,r)$，取 $\rho=r-d(x,y)>0$，三角不等式给出 $B(y,\rho)\subseteq B(x,r)$。再用度量开集的定义。
    2. 结果为 $\varnothing,\{b\},\{a,b\},\{b,c\},X$。
    3. $(f:X\to A)^{-1}(A\cap V)=f^{-1}(V)$。
    4. 开矩形内每点可放一个小球；半径 $r$ 的球中心处可放边长 $r$ 的开正方形，因为半对角线 $r/\sqrt2<r$。对球内其他点先找更小的同心于该点的球。

下一步阅读[第二章](02-continuity.md)的连续像证明，再进入[连通性](connectedness.md)。

## 6. 参考书目

- James R. Munkres. *Topology*, 2nd ed. Prentice Hall, 2000. 基、子基、子空间与有限积拓扑。
- Stephen Willard. *General Topology*. Addison-Wesley, 1970. 生成拓扑与连续性的局部判据。

定义采用标准数学约定；本章的说明、论证顺序与练习表述为本项目原创。
