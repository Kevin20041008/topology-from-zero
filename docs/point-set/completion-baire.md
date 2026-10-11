# P8 · 完备化、Baire 空间与不动点

<div class="chapter-meta">研究生课程 · 先修：P4；数列、级数与实数完备性<br>学习方式：先独立重构证明，再完成书面练习和即时自检。实验只检验指定有限输入。</div>

## 1. 直观解释

完备化把 Cauchy 数列“应当到达”的点补入空间。Baire 定理则说明：在完备空间中，可数多个稠密开条件可以同时满足。它是泛性质方法、泛位置论证和泛函分析的拓扑基础。

## 2. 严格定义

闭包内部为空的集合称无处稠密（nowhere dense）；可数个无处稠密集合的并称第一纲或贫集（meagre）。Baire 空间要求可数个稠密开集的交仍稠密，等价于每个非空开子空间都不是原空间中贫集。

度量完备化（completion）为完备度量空间 $\widehat X$ 及等距稠密嵌入 $X\hookrightarrow\widehat X$。压缩映射（contraction）满足 $d(Tx,Ty)\le qd(x,y)$，其中固定 $0\le q<1$。

## 3. 定理与证明

**定理 P8.1（完备化的构造）。** 每个度量空间有完备化，且保持原空间的等距同构意义下唯一。

**证明。** 空空间单独处理。令元素为 $X$ 中 Cauchy 数列的等价类，$(x_n)\sim(y_n)$ 当 $d(x_n,y_n)\to0$。三角不等式给等价关系，且 $d(x_n,y_n)$ 为实 Cauchy 数列，因为两项之差绝对值至多 $d(x_n,x_m)+d(y_n,y_m)$。定义类间距离为其极限；同一估计证明与代表无关，正定性正是等价关系定义。常值列给等距嵌入；每个类被自身代表的常值列逼近，故像稠密。

为证完备，对完备化内的 Cauchy 列 $z_n$，利用稠密性选 $x_n\in X$ 使 $\widehat d(x_n,z_n)<1/n$。则 $(x_n)$ 在 $X$ 中 Cauchy，定义一个类 $z$，且 $\widehat d(x_n,z)\to0$，所以 $z_n\to z$。若另有完备化，把 $[(x_n)]$ 送到另一空间中 $x_n$ 的极限；等距性、代表无关、满射与唯一性均分别来自距离极限、稠密性和目标完备性。$\square$

**定理 P8.2（Baire）。** 完备度量空间和局部紧致 Hausdorff 空间都是 Baire 空间。

**证明。** 完备度量情形中，给稠密开集 $G_n$ 与非空开 $O$，递归选闭球 $\overline B(x_n,r_n)$，半径正且趋零，满足第一球含于 $O\cap G_1$、下一球含于上一开球与 $G_{n+1}$。稠密性与开性保证可选。球心为 Cauchy 列，极限在每个闭球内，所以属于 $O\cap\bigcap_nG_n$。若空间有孤立点，足够小的球可为单点，论证仍成立。

LCH 情形用 P6.1 递归选非空开 $V_n$，使紧致闭包满足 $\overline V_1\subset O\cap G_1$ 和 $\overline V_{n+1}\subset V_n\cap G_{n+1}$。这些闭包在第一个紧集内有 FIP，其交非空，因此仍得到 $O\cap\bigcap_nG_n\ne\varnothing$。$\square$

**定理 P8.3（Banach 不动点）。** 非空完备度量空间上的压缩映射有唯一不动点；迭代 $x_{n+1}=Tx_n$ 对每个初值收敛到它。

**证明。** $d(x_{n+1},x_n)\le q^nd(x_1,x_0)$。累加几何级数得 $m>n$ 时距离至多 $q^nd(x_1,x_0)/(1-q)$，故迭代 Cauchy。极限 $x$ 满足 $Tx=x$，因为压缩映射连续。若还有 $y=Ty$，则 $d(x,y)\le qd(x,y)$，迫使 $x=y$。$\square$

## 4. 正例与反例

**正例。** 有理数按通常距离的完备化是实数。$(0,1)$ 在通常距离下不完备，却同胚于实数，故可赋予另一种完备度量。这说明“这个度量完备”和“可完全度量化”不同。

**反例。** $\mathbb Q$ 是可数个单点之并，且没有孤立点，故它在自身中为第一纲，不是 Baire 空间。$T(x)=x/2$ 在 $(0,1)$ 是压缩，却没有不动点；完备性不可删去。

## 5. 练习

1. 证明 Baire 空间的可数个稠密开集之交与每个非空开集相交。
2. 证明 $C([0,1],\mathbb R)$ 在一致距离下完备。
3. 给压缩迭代写出到极限的误差上界。

??? tip "提示 1"
    2：逐点使用实数完备性，再用一致 Cauchy 条件。3：让 P8.3 的 $m$ 趋于无穷。

??? tip "提示 2 与核对"
    2：逐点极限实际上是一致极限；一致极限连续。3：$d(x_n,x)\le q^nd(x_1,x_0)/(1-q)$。这是一条解析误差界，不是观察图像得出的结论。

<div class="admonition question" data-exercise="point-set-completion-baire"></div>
<noscript>即时反馈需要 JavaScript；正文习题与分步提示仍可直接阅读。</noscript>

## 6. 参考书目

- James R. Munkres. *Topology*, 2nd ed., Prentice Hall, 2000.
- Stephen Willard. *General Topology*, Addison-Wesley, 1970.
- John L. Kelley. *General Topology*, Van Nostrand, 1955.

本章以原创文字组织标准数学内容。标为“引用定理”的结果未在本章证明，不将其与已给出的证明混为一谈。
