# P2 · 分离公理与可数性

<div class="chapter-meta">研究生课程 · 先修：P1、基础 A、连续映射<br>学习方式：先独立重构证明，再完成书面练习和即时自检。实验只检验指定有限输入。</div>

## 1. 直观解释

分离公理控制能否用开集区分点与闭集；可数性控制需要多少局部信息。这是两条不同的轴：有很多可数基的非 Hausdorff 空间，也有第一可数、可分但没有可数基的 Hausdorff 空间。

## 2. 严格定义

$T_0$ 要求不同点至少可被一个开集区分；$T_1$ 要求每个单点闭；Hausdorff（$T_2$）要求不同点有不交开邻域。

本书约定正则（regular，$T_3$）包含 $T_1$，且点与不含它的闭集可被不交开集分离；正规（normal，$T_4$）包含 $T_1$，且任意不交闭集可被不交开集分离。其他文献可能把 $T_1$ 单独列出。

第二可数（second countable）指存在可数拓扑基；可分（separable）指存在可数稠密子集；Lindelöf 性指每个开覆盖有可数子覆盖。第一可数只要求每个点分别有可数邻域基。

## 3. 定理与证明

**命题 P2.1。** $T_4\Rightarrow T_3\Rightarrow T_2\Rightarrow T_1\Rightarrow T_0$。正则性等价于：给 $x\in U$ 且 $U$ 开，可取开 $V$ 使 $x\in V\subseteq\overline V\subseteq U$（同时假设 $T_1$）。

**证明。** 前两步分别把一个闭集取成单点，及把另一个点作为闭集。Hausdorff 时，对每个 $y\ne x$ 取避开 $x$ 的开邻域，取并得 $X\setminus\{x\}$ 开。最后一步直接成立。若能分离 $x$ 与 $X\setminus U$，设不交开集为 $V,W$，则 $\overline V\subseteq X\setminus W\subseteq U$。反向给点 $x$ 与闭集 $F$，把缩小性质用于 $U=X\setminus F$；$V$ 和 $X\setminus\overline V$ 即为所需分离。$\square$

**定理 P2.2。** 第二可数蕴含第一可数、可分及 Lindelöf。第二可数对任意子空间遗传。

**证明。** 含指定点的基成员构成可数邻域基。从每个非空基成员选一个点，得到可数稠密集。给开覆盖，对每个包含于某个覆盖成员的基元素选择一个这样的成员；这些被选成员覆盖每点且可数。子空间中把全部基成员与子空间取交，仍为可数基。$\square$

**定理 P2.3（度量空间正规）。** 任意度量空间是 $T_4$。

**证明。** 单点闭。设不交闭集 $A,B$ 非空，函数 $d(x,A)=\inf_{a\in A}d(x,a)$ 为 1-Lipschitz：三角不等式给两个方向的差估计。闭性给出 $d(x,A)=0$ 当且仅当 $x\in A$，因此 $d(x,A)+d(x,B)>0$。连续函数

$$
f(x)=\frac{d(x,A)}{d(x,A)+d(x,B)}
$$

在 $A,B$ 上分别为 $0,1$；逆像 $f^{-1}([0,1/3))$、$f^{-1}((2/3,1])$ 是不交开邻域（陪域取 $[0,1]$）。一集合为空时直接取空集与全集。$\square$

## 4. 正例与反例

**正例。** 欧氏空间的有理中心、正有理半径开球构成可数基；因此其任意子空间第二可数。不可数离散空间正规且第一可数，但不可分、非 Lindelöf、非第二可数。

**反例：可分加第一可数仍不够。** Sorgenfrey 直线（lower limit topology）以 $[a,b)$ 为基。每点的 $[x,x+1/n)$ 是邻域基，$\mathbb Q$ 稠密，不同点可用不交半开区间分离。若它有可数基，对每个 $x$ 取 $x\in B_x\subseteq[x,x+1)$。当 $x<y$，$B_x$ 含 $x$ 而 $B_y$ 不含 $x$，故不同点对应不同基成员，矛盾。

**反例。** 无限集的余有限拓扑为 $T_1$ 却不是 Hausdorff：任意两个非空开集相交。

## 5. 练习

1. 证明 Hausdorff 性和正则性对任意子空间遗传。
2. 证明第二可数的连续开满射像仍第二可数。
3. 度量空间中证明可分等价于第二可数。

??? tip "提示 1"
    1：对子空间中的点，用环境开集表达其邻域；正则性使用闭包缩小。2：考察可数基的像。3：围绕可数稠密点取正有理半径球。

??? tip "提示 2 与核对"
    1：若 $x\in A\cap U$，在环境空间取 $x\in V\subseteq\overline V\subseteq U$；子空间闭包包含于 $A\cap\overline V$。2：开满射使基元素的像开，且任意像空间开集的每点都有这样的基元素像邻域。3：给 $x\in U$，取小球后在其内选稠密点，并选择使 $x$ 落入而球仍含于 $U$ 的有理半径。

<div class="admonition question" data-exercise="point-set-separation-countability"></div>
<noscript>即时反馈需要 JavaScript；正文习题与分步提示仍可直接阅读。</noscript>

## 6. 参考书目

- James R. Munkres. *Topology*, 2nd ed., Prentice Hall, 2000.
- Stephen Willard. *General Topology*, Addison-Wesley, 1970.
- John L. Kelley. *General Topology*, Van Nostrand, 1955.

本章以原创文字组织标准数学内容。标为“引用定理”的结果未在本章证明，不将其与已给出的证明混为一谈。
