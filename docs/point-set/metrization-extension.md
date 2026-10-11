# P7 · Urysohn 引理、Tietze 延拓与度量化

<div class="chapter-meta">研究生课程 · 先修：P2、P3、P4；连续函数级数的一致收敛<br>学习方式：先独立重构证明，再完成书面练习和即时自检。实验只检验指定有限输入。</div>

## 1. 直观解释

分离闭集的开集可以逐层嵌套，编码成取值在区间中的连续函数。再用可数多个这样的函数记录点的位置，就能把纯拓扑空间放进可度量的可数立方体。这是从分离性质走向度量结构的桥梁。

## 2. 严格定义

函数 $f:X\to[0,1]$ 分离闭集 $A,B$，指 $f|_A=0,f|_B=1$。嵌入（embedding）指到其像（取子空间拓扑）的同胚。

空间可度量化（metrizable），指存在产生其拓扑的度量。延拓（extension）指给定 $h:A\to\mathbb R$ 后寻找 $H:X\to\mathbb R$ 满足 $H|_A=h$。本章先证明有界实值 Tietze 延拓，再推出一般实值版本。

## 3. 定理与证明

**定理 P7.1（Urysohn 引理）。** 正规空间中的不交闭集可被连续 $[0,1]$ 值函数分离。

**证明。** 正规性给出闭集缩小性质：闭 $F\subset O$ 且 $O$ 开时，存在开 $V$ 使 $F\subset V\subset\overline V\subset O$；分离 $F$ 与 $X\setminus O$ 即得。取 $U_1=X\setminus B$，选 $A\subset U_0\subset\overline U_0\subset U_1$。逐层在相邻二进有理数间插入开集，始终保证 $r<s\Rightarrow\overline U_r\subset U_s$。每层只需有限次缩小，递归给出 $[0,1]$ 的全部二进有理指标。

令 $f(x)=\inf\{r:x\in U_r\}$，空集的下确界在此约定为 1。在 $A$ 上为零，在 $B$ 上为一。对 $0<a<1$，

$$
\{f<a\}=\bigcup_{r<a}U_r,\qquad
\{f>a\}=\bigcup_{r>a}(X\setminus\overline U_r).
$$

第一式由下确界和稠密性得到。第二式中，若 $f(x)>a$，取 $a<r<s<f(x)$，则 $x\notin U_s$，所以 $x\notin\overline U_r$；反向若 $x\notin\overline U_r$，则任何指标小于 $r$ 的 $U_t$ 都不含 $x$，故 $f(x)\ge r>a$。端点外的逆像为空或全集。两种严格不等式的逆像开，给连续性。$\square$

**定理 P7.2（有界 Tietze 延拓）。** 正规 $X$ 的闭子集 $A$ 上每个连续 $h:A\to[-1,1]$ 都可延拓为 $H:X\to[-1,1]$。

**证明。** $h\le-1/3$ 与 $h\ge1/3$ 的两闭子集在 $X$ 中闭，用 P7.1 构造 $g_0:X\to[-1/3,1/3]$，在这两部分分别为 $-1/3,1/3$；于是 $|h-g_0|\le2/3$ 于 $A$。对剩余误差反复缩放同一构造，得到
$\|g_n\|_\infty\le(1/3)(2/3)^n$，以及 $A$ 上第 $n$ 次之后的误差至多 $(2/3)^{n+1}$。级数 $H=\sum_{n\ge0}g_n$ 一致收敛，因而连续，且 $|H|\le1$；在 $A$ 上误差趋零，故延拓成立。一致极限连续可直接用尾和小于 $\varepsilon/3$ 与有限部分连续证明，不需要 $X$ 可度量。$\square$

**推论（一般实值 Tietze 延拓）。** 正规空间的闭子集上的连续实值函数均有连续实值延拓。

**证明。** 取同胚 $u:\mathbb R\to(-1,1)$，先将 $u\circ h$ 按 P7.2 延拓为 $g:X\to[-1,1]$。闭集 $B=g^{-1}(\{-1,1\})$ 与 $A$ 不交，Urysohn 引理给 $f:X\to[0,1]$，在 $A$ 上为一、在 $B$ 上为零。于是 $fg$ 在全空间严格取值于 $(-1,1)$，在 $A$ 上等于 $u\circ h$。令 $H=u^{-1}\circ(fg)$ 即得延拓。注意直接对 $g$ 应用 $u^{-1}$ 可能遇到端点，必须先做这一步修正。$\square$

**引理 P7.3。** 正则 Lindelöf 空间正规。

**证明。** 对不交闭集 $A,B$，用正则性和 Lindelöf 性选可数开族 $U_n$ 覆盖 $A$、$V_n$ 覆盖 $B$，满足 $\overline U_n\cap B=\overline V_n\cap A=\varnothing$。Lindelöf 性对闭子集遗传：给其覆盖加入补集即可。令
$U=\bigcup_n(U_n\setminus\bigcup_{i\le n}\overline V_i)$，
$V=\bigcup_n(V_n\setminus\bigcup_{i\le n}\overline U_i)$。
二者开且分别含 $A,B$。任一来自第 $n$ 项与第 $m$ 项的交，在 $n\le m$ 时被 $V$ 的减项排除，在 $m\le n$ 时被 $U$ 的减项排除，故不交。$\square$

**定理 P7.4（Urysohn 度量化）。** 第二可数正则空间可度量化。

**证明。** P2.2 与 P7.3 先给正规性。固定可数基 $(B_i)$，对每个满足 $\overline B_i\subset B_j$ 的指标对，用 P7.1 取 $f_{ij}$，在 $\overline B_i$ 上为 1、在 $X\setminus B_j$ 上为 0。这是可数多个函数。任意 $x\in O$（$O$ 开），先取 $x\in B_j\subset O$，再正则缩小并取 $x\in B_i$ 使 $\overline B_i\subset B_j$。因此 $x\in\{f_{ij}>1/2\}\subset O$。这些函数分离不同点，并恢复所有开邻域，故联合映射到 $[0,1]^{\mathbb N}$ 是嵌入。该积由 P3.3 可度量，其子空间也可度量。空集和一点空间直接处理。$\square$

## 4. 正例与反例

**正例。** 第二可数 Hausdorff 流形局部同胚于欧氏空间，且局部紧致；P6.1 给正则性，P7.4 给可度量化。此处“流形”尚不要求光滑结构。

**反例。** 不可数离散空间可度量，却非第二可数，所以 P7.4 的条件是充分条件，不是所有可度量空间的必要条件。

**反例。** 闭性不可从延拓定理删去：$h(x)=\sin(1/x)$ 定义于 $(0,1]\subset[0,1]$，是有界连续函数，但无法在零点连续延拓。

## 5. 练习

1. 将 P7.2 缩放为任意固定有界区间 $[-M,M]$ 的延拓。
2. 证明紧致 Hausdorff 且第二可数空间可度量。
3. 为 $\sin(1/x)$ 构造两个趋零数列，其函数值分别恒为 1 和 −1。

??? tip "提示 1"
    1：$M=0$ 单独处理；否则除以 $M$。2：P4.2。3：正弦的极大、极小相位。

??? tip "提示 2 与核对"
    2：紧致 Hausdorff 正规，因而正则，可应用 P7.4。3：分别取 $x_n=(\pi/2+2\pi n)^{-1}$ 和 $y_n=(3\pi/2+2\pi n)^{-1}$。

<div class="admonition question" data-exercise="point-set-metrization-extension"></div>
<noscript>即时反馈需要 JavaScript；正文习题与分步提示仍可直接阅读。</noscript>

## 6. 参考书目

- James R. Munkres. *Topology*, 2nd ed., Prentice Hall, 2000.
- Stephen Willard. *General Topology*, Addison-Wesley, 1970.
- John L. Kelley. *General Topology*, Van Nostrand, 1955.

本章以原创文字组织标准数学内容。标为“引用定理”的结果未在本章证明，不将其与已给出的证明混为一谈。
