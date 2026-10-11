# D5 · 向量丛、截面与特征类入口

<div class="chapter-meta">研究生课程 · 先修：D1、D3、C1、Q1；线性代数与群作用<br>学习方式：先独立重构证明，再完成书面练习和即时自检。实验只检验指定有限输入。</div>

## 1. 直观解释

切空间随点变化组成切丛。每个局部都能选基，不代表能在整个空间选一套连续的基。向量丛把这种粘合问题独立出来，特征类记录全局平凡化的障碍。

## 2. 严格定义

秩 $r$ 向量丛（vector bundle）$\pi:E\to X$ 局部同构于 $U\times\mathbb F^r$，转移函数 $g_{ij}:U_i\cap U_j\to\mathrm{GL}_r(\mathbb F)$ 满足余循环关系。截面（section）$s:X\to E$ 满足 $\pi s=\mathrm{id}$。平凡丛（trivial bundle）全局同构于 $X\times\mathbb F^r$。

特征类（characteristic class）是与拉回相容的上同调类。本章具体讨论复线丛的第一 Chern 类 $c_1\in H^2(X;\mathbb Z)$，一般分类定理列为引用。

## 3. 定理与证明

**命题 D5.1。** 一个秩 $r$ 向量丛平凡，当且仅当有 $r$ 个处处线性无关的截面。
**证明。** 平凡丛的标准基给截面。反之，映射 $(x,a_1,\ldots,a_r)\mapsto\sum_i a_is_i(x)$ 在每根纤维上线性同构；在任意局部平凡化中对应可逆矩阵，其逆由余子式除非零行列式给出，因此连续（光滑情形亦光滑），得到丛同构。$\square$

**命题 D5.2（球面复线丛的粘合分类）。** 将 $S^2$ 写成两闭盘沿赤道粘合，复线丛由赤道转移 $g:S^1\to\mathbb C^*$ 构造；其同构类由 $g/|g|$ 的绕数 $n\in\mathbb Z$ 分类。

**证明。** 先引用向量丛在可缩、仿紧基空间上平凡的标准同伦定理，从而任意球面线丛可在两盘平凡化。改变盘内平凡化会在边界将 $g$ 左右乘上可延伸到盘内的非零函数；这些边界函数绕数为零，故 $n$ 不变。若两个转移函数绕数相同，则其比值绕数零；由 C1 的提升判据，其单位相位有连续实角度，沿径向用截断函数将角度从边界延伸到盘内，并对正模长用对数作同样延伸。于是比值延伸为盘上的非零函数，用它改变一侧平凡化就得到丛同构。每个 $n$ 由 $g(z)=z^n$ 实现。光滑转移时选在中心附近为零的光滑径向截断，得到光滑延伸。$\square$

**推论。** 绕数非零的线丛不存在处处非零截面。
**证明。** 非零截面按 D5.1 给线丛平凡化，而平凡丛的转移可取常值，绕数为零，矛盾。$\square$

**引用定理。** 对具有 CW 同伦型的仿紧空间，复线丛同构类由 $H^2(X;\mathbb Z)$ 分类，分类类为 $c_1$。在球面上，它在基本类上的评价等于上述绕数，正负由赤道方向和转移约定共同决定。对光滑 Hermitian 线丛，酉联络曲率满足 $[F/(2\pi i)]\in H^2_{\mathrm{dR}}(M)$ 是 $c_1$ 的实化；不同联络之差为全局一形式，所以曲率差为恰当形式。这验证了实类的联络独立性，但整性和与拓扑 Chern 类的比较仍属引用定理。

一般 Chern 类、Stiefel–Whitney 类、Euler 类及 Chern–Weil 理论是本单元后续专题；本章不声称已完成其完整构造。

## 4. 正例与反例

**正例。** 绕数一的球面复线丛局部都是 $U\times\mathbb C$，全局却无非零截面。圆周的平凡实线丛有常值非零截面。

**反例。** 莫比乌斯实线丛的截面在切开区间中为连续函数 $f$，端点须 $f(1)=-f(0)$；若端点非零，介值定理迫使中间过零，若端点为零则已过零。所以局部可选基不意味着全局可选基。一个非零截面也不足以使高秩丛平凡：需要整套处处独立的截面。

## 5. 练习

1. 证明转移函数绕数 $n,m$ 的线丛张量积绕数为 $n+m$。
2. 证明对偶线丛的绕数为 $-n$。
3. 指出曲率代表实上同调类为何不能独自检测一般整数挠。

??? tip "提示 1"
    1：张量积的转移函数相乘。2：对偶转移函数取逆。
??? tip "提示 2 与核对"
    1–2：用 C1 的绕数加法。3：整数挠在映到实系数后为零，所以实微分形式遗漏这部分。

<div class="admonition question" data-exercise="differential-bundles-characteristic"></div>
<noscript>即时反馈需要 JavaScript；正文习题与分步提示仍可直接阅读。</noscript>

## 6. 参考书目

- John M. Lee. *Introduction to Smooth Manifolds*, 2nd ed., Springer, 2013.
- Victor Guillemin and Alan Pollack. *Differential Topology*, Prentice-Hall, 1974.
- John Milnor. *Morse Theory*, Princeton University Press, 1963.
- John W. Milnor and James D. Stasheff. *Characteristic Classes*, Princeton University Press, 1974.

本章以原创文字组织标准数学内容。标为“引用定理”的结果未在本章证明，不将其与已给出的证明混为一谈。
