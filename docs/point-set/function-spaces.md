# P10 · 函数空间、紧开拓扑与 Arzelà–Ascoli

<div class="chapter-meta">研究生课程 · 先修：P3–P9；一致收敛与实数连续函数<br>学习方式：先独立重构证明，再完成书面练习和即时自检。实验只检验指定有限输入。</div>

## 1. 直观解释

当“点”本身是一条函数时，需要先决定什么叫附近。逐点收敛只看有限位置；一致收敛控制整个定义域。紧开拓扑则在紧致区域上控制函数，适合研究带参数的映射和同伦。

## 2. 严格定义

$C(X,Y)$ 表示连续映射集合。紧开拓扑（compact-open topology）的子基为
$[K,U]=\{f:f(K)\subset U\}$，其中 $K\subset X$ 紧致、$U\subset Y$ 开。

若 $K$ 非空紧致、$Y=\mathbb R$，一致距离为 $d_\infty(f,g)=\sup_{x\in K}|f(x)-g(x)|$。函数族 $\mathcal F\subset C(K,\mathbb R)$ 等度连续（equicontinuous），指对每个 $x$ 与 $\varepsilon>0$，存在 $x$ 的邻域 $V$ 使对所有 $f\in\mathcal F,y\in V$ 都有 $|f(y)-f(x)|<\varepsilon$。一致有界指存在共同常数 $M$ 控制所有函数的绝对值。相对紧致指闭包紧致。空定义域只有一个函数，另约定其唯一距离为零；以下度量公式的证明按非空 $K$ 进行。

## 3. 定理与证明

**定理 P10.1（指数律的 LCH 情形）。** 若 $X$ 为 LCH，则求值映射 $\operatorname{ev}:C(X,Y)\times X\to Y$ 连续；$F:Z\times X\to Y$ 连续当且仅当伴随映射 $\widehat F:Z\to C(X,Y)$ 连续。

**证明。** 给 $f(x)\in U$，P6.1 在开集 $f^{-1}(U)$ 内给紧邻域 $K$ 及开 $V\ni x$，使 $V\subset K\subset f^{-1}(U)$。于是 $[K,U]\times V$ 被求值送入 $U$，证明求值连续。

若 $F$ 连续且 $F(z_0,K)\subset U$，对每个 $x\in K$ 取乘积邻域 $N_x\times V_x$ 被 $F$ 送入 $U$。有限多个 $V_x$ 覆盖 $K$，对应 $N_x$ 的有限交使整个 $K$ 都被送入 $U$，所以 $\widehat F^{-1}([K,U])$ 开。反向，$F=\operatorname{ev}\circ(\widehat F\times\operatorname{id})$，由已证求值连续得到。$\square$

**定理 P10.2（紧致度量定义域上的 Arzelà–Ascoli）。** 若 $K$ 为紧致度量空间，$\mathcal F\subset C(K,\mathbb R)$ 的一致闭包紧致，当且仅当 $\mathcal F$ 一致有界且等度连续。

**证明（充分性）。** 先把等度连续变成一个对所有点统一的距离控制：对每点选使函数振幅小于 $\varepsilon/6$ 的邻域，再取有限子覆盖及其 Lebesgue 数（P4.3 证明中的球覆盖论证）。因此足够近的两点上，所有函数值相差小于 $\varepsilon/3$。选有限个这样的采样中心覆盖 $K$。将区间 $[-M,M]$ 分成有限个长度小于 $\varepsilon/3$ 的区间，以各中心函数值所在区间给函数分类。只有有限个类别；每个非空类选一代表。同类函数在任一点与其代表的差小于 $\varepsilon$：经附近采样中心作两次等度连续估计，加上中心处的量化误差。这给一致距离下全有界性。$C(K,\mathbb R)$ 完备：一致 Cauchy 列逐点有实极限，一致 Cauchy 条件保证收敛一致，因而极限仍连续（P8 练习 2 的论证对任意 $K$ 相同），所以闭包完备且全有界，由 P4.3 紧致。

**证明（必要性）。** 紧致闭包有有限个半径 $\varepsilon/3$ 的一致球覆盖。球心为有限多个连续函数，在每个给定点处可取共同邻域使其振幅小于 $\varepsilon/3$；再加两端的一致距离误差，得到等度连续。一致有界性用半径 1 的有限球覆盖及有限多个球心的有界性得到。$\square$

## 4. 正例与反例

**正例。** $[0,1]$ 上满足 $|f|\le1$ 且 Lipschitz 常数至多 1 的全体函数在一致距离下紧致：上述条件在一致极限下保留，族闭、一致有界且等度连续。

**反例。** $f_n(x)=x^n$ 在 $[0,1]$ 上一致有界，但在 1 附近不等度连续，其逐点极限在 1 不连续，所以没有一致收敛子列。逐点有界不能独自保证函数族相对紧致。

**反例。** 逐个固定参数的函数连续不足以给联合连续；在原点补零的 $xy/(x^2+y^2)$ 两个方向分别连续，却沿 $x=y$ 不趋于零。

## 5. 练习

1. 证明 $C(K,\mathbb R)$ 中一致闭包保留共同 Lipschitz 常数。
2. 证明 $f_n(x)=x^n$ 在任意 $[0,a]$、$a<1$ 上一致趋零，却不在 $[0,1]$ 上一致收敛。
3. 用 P10.1 把 $H:X\times I\to Y$ 的同伦解释为映射空间中的道路（注意先将积因子交换）。

??? tip "提示 1"
    1：在两点不等式中取极限。2：最大值为 $a^n$。3：定义 $s\mapsto(x\mapsto H(x,s))$。

??? tip "提示 2 与核对"
    3：当 $X$ 是 LCH 时，指数律保证此道路的连续性等价于联合连续性。一般定义域缺少 LCH 时，本章没有证明相同结论，不能直接套用。

<div class="admonition question" data-exercise="point-set-function-spaces"></div>
<noscript>即时反馈需要 JavaScript；正文习题与分步提示仍可直接阅读。</noscript>

## 6. 参考书目

- James R. Munkres. *Topology*, 2nd ed., Prentice Hall, 2000.
- Stephen Willard. *General Topology*, Addison-Wesley, 1970.
- John L. Kelley. *General Topology*, Van Nostrand, 1955.

本章以原创文字组织标准数学内容。标为“引用定理”的结果未在本章证明，不将其与已给出的证明混为一谈。
