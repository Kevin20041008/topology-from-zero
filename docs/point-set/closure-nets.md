# P1 · 闭包、内部、边界与网

<div class="chapter-meta">研究生课程 · 先修：第一章、基础 A；集合补集与有向偏序<br>学习方式：先独立重构证明，再完成书面练习和即时自检。实验只检验指定有限输入。</div>

## 1. 直观解释

一个点“不属于集合”并不说明它与集合隔开。闭包记录每个邻域都无法避开的点；边界记录同时无法避开集合及其补集的点。

数列只有可数多个时刻。一般空间的邻域可能无法由可数族控制，所以研究生课程需要网（net），而不能把度量空间中的序列经验当成拓扑公理。

## 2. 严格定义

内部（interior）$A^\circ$ 是包含于 $A$ 的全部开集之并；闭包（closure）$\overline A$ 是包含 $A$ 的全部闭集之交；边界（boundary）为 $\partial A=\overline A\cap\overline{X\setminus A}$。点 $x$ 是聚点（accumulation point），若每个开邻域都遇到 $A\setminus\{x\}$。聚点与属于闭包不可混同。

有向集（directed set）是非空预序集 $(D,\le)$，任意两元素有共同上界。网是函数 $d\mapsto x_d$。称 $x_d\to x$，若对每个开邻域 $U$，存在 $d_0$ 使 $d\ge d_0$ 时 $x_d\in U$。

点 $x$ 处的邻域基是开邻域族，使每个开邻域包含其中某一成员；每点有可数邻域基的空间称第一可数（first countable）。

## 3. 定理与证明

**定理 P1.1（闭包的等价刻画）。** $x\in\overline A$ 当且仅当每个开邻域都遇到 $A$。并且 $X\setminus\overline A=(X\setminus A)^\circ$，$\partial A=\overline A\setminus A^\circ$。

**证明。** 若某开邻域 $U$ 避开 $A$，则闭集 $X\setminus U$ 包含 $A$ 却不含 $x$。反之，若 $x$ 不在闭包，按闭包的交集定义，有包含 $A$ 的闭集不含 $x$，其补集是避开 $A$ 的邻域。这同时给出第一个集合恒等式；将 $A$ 换成补集后代入边界定义，得到第二式。$\square$

**定理 P1.2（网判据）。** $x\in\overline A$ 当且仅当存在取值于 $A$ 的网收敛到 $x$。映射 $f:X\to Y$ 连续当且仅当它保持所有网的极限。

**证明。** 闭包中的点，其开邻域按反向包含排序构成有向集；从每个邻域 $U$ 选 $a_U\in A\cap U$，便有 $a_U\to x$。这是通常 ZFC 背景下的选择。反向，收敛网最终落入每个邻域，故该邻域遇到 $A$。

连续时，$f(x)$ 的开邻域逆像是 $x$ 的开邻域，直接得到像网收敛。若 $f$ 在 $x$ 不连续，存在 $f(x)$ 的开邻域 $V$，使每个 $x$ 的邻域 $U$ 都含 $x_U$ 满足 $f(x_U)\notin V$。网 $x_U\to x$，但像网不趋于 $f(x)$，矛盾。$\square$

**命题 P1.3。** 第一可数空间中，闭包判据可改用数列；Hausdorff 空间中网的极限至多一个。

**证明。** 把可数邻域基换成逐项有限交，得到递减基 $V_n$。若 $x\in\overline A$，选择 $a_n\in A\cap V_n$；每个邻域最终包含所有 $a_n$。唯一性方面，两个不同极限若有不交邻域，网最终应同时落在二者中，不可能。$\square$

## 4. 正例与反例

**正例。** 在通常实数轴，$\overline{\mathbb Q}=\mathbb R$、$\mathbb Q^\circ=\varnothing$，所以 $\partial\mathbb Q=\mathbb R$。稠密性不等于开性或连通性。

**反例：数列看不见全部闭包。** 在不可数集合 $X$ 上取余可数拓扑：非空开集的补集可数。若数列收敛到 $x$，去掉它所有不同于 $x$ 的取值，仍得到 $x$ 的开邻域，所以数列最终恒等于 $x$。然而 $X\setminus\{x\}$ 稠密：任意非空开集不可数，不可能只含 $x$。因此没有其中的数列收敛到 $x$，却有网收敛到 $x$。

**反例。** 两点平凡空间中常值网也可趋于另一个点；极限唯一性确实需要分离条件。

## 5. 练习

1. 证明 $\overline{A\cup B}=\overline A\cup\overline B$，并给出无限并不能同样交换闭包的例子。
2. 证明 $A$ 开当且仅当 $A\cap\partial A=\varnothing$；$A$ 闭当且仅当 $\partial A\subseteq A$。
3. 证明余可数拓扑中的不可数空间不是第一可数。

??? tip "提示 1"
    1：有限并闭仍闭；无限并考虑有理数的单点分解。3：从每个可数邻域基成员中排除一个新的非基点。

??? tip "提示 2 与核对"
    1：每个有理单点已闭，但其并的闭包为实数轴。2：使用 P1.1 的边界公式及补集公式。3：若 $U_n$ 是基，选不同于 $x$ 的 $x_n\in U_n$，则 $X\setminus\{x_n:n\ge1\}$ 是 $x$ 的邻域，却不包含任何 $U_n$。

<div class="admonition question" data-exercise="point-set-closure-nets"></div>
<noscript>即时反馈需要 JavaScript；正文习题与分步提示仍可直接阅读。</noscript>

## 6. 参考书目

- James R. Munkres. *Topology*, 2nd ed., Prentice Hall, 2000.
- Stephen Willard. *General Topology*, Addison-Wesley, 1970.
- John L. Kelley. *General Topology*, Van Nostrand, 1955.

本章以原创文字组织标准数学内容。标为“引用定理”的结果未在本章证明，不将其与已给出的证明混为一谈。
