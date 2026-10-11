# D4 · Morse 函数、子水平集与柄

<div class="chapter-meta">研究生课程 · 先修：D1–D2；紧致性；常微分方程；H3<br>学习方式：先独立重构证明，再完成书面练习和即时自检。实验只检验指定有限输入。</div>

## 1. 直观解释

观察函数的子水平集随阈值增长，可将连续形状变化归结到有限个临界事件。Morse 指标给事件附加的胞腔维数；临界点数量与同调相关，却不等于 Betti 数。

## 2. 严格定义

临界点满足 $df_p=0$，其 Hessian 在此点作为二次型不依赖坐标。非退化（nondegenerate）指 Hessian 可逆，Morse 指标（Morse index）为负特征值个数。Morse 函数的全部临界点均非退化。子水平集记 $M^a=f^{-1}(( -\infty,a])$。一个 $\lambda$ 柄（handle）是 $D^\lambda\times D^{n-\lambda}$，沿 $S^{\lambda-1}\times D^{n-\lambda}$ 附加。

## 3. 定理与证明

**定理 D4.1（无临界值时不变）。** 若 $f^{-1}([a,b])$ 紧且无临界点，则 $M^a$ 是 $M^b$ 的强形变收缩。

**证明。** 选 Riemann 度量，在紧带状区域附近设 $V=-\nabla f/\|\nabla f\|^2$，沿其流有 $df(V)=-1$。分母在紧带上有正下界，光滑流可存在到每点下降至高度 $a$；可用邻域中的截断向量场保证所需有限时间的存在。对 $f(x)\ge a$，令 $H(x,t)=\Phi_{t(f(x)-a)}(x)$，对 $f(x)\le a$ 令 $H(x,t)=x$。在高度 $a$ 处两式吻合且时间趋零，故连续，终点落在 $M^a$ 并始终固定该子集。$\square$

**引用定理（Morse 引理与柄附加）。** 非退化指标 $\lambda$ 的临界点附近有坐标使

$$
f=f(p)-x_1^2-\cdots-x_\lambda^2+x_{\lambda+1}^2+\cdots+x_n^2.
$$

若紧带内只有一个临界点，跨越其临界值的子水平集相当于附加一个 $\lambda$ 柄，并在同伦意义下附加一个 $\lambda$ 胞腔。一般证明须同时控制局部二次标准形和带外梯度流；本章引用这一技术定理，不只由 Hessian 图像推断柄附加。

**命题 D4.2（弱 Morse 不等式与 Euler 等式）。** 闭流形上的 Morse 函数，设指标 $i$ 临界点数 $c_i$，则对域系数 Betti 数有 $b_i\le c_i$，且 $\chi(M)=\sum_i(-1)^ic_i$。

**证明。** 非退化临界点孤立，紧致性使它们有限。柄附加定理给每个临界点一个同维胞腔（临界值相同可微扰分开而保持点数和指标）。胞腔链群维数 $c_i$；令微分秩为 $r_i$，则 $b_i=c_i-r_i-r_{i+1}\le c_i$。交错求和使所有秩项抵消，得到 Euler 等式。$\square$

**推论（强不等式）。** $\sum_{i=0}^k(-1)^{k-i}c_i\ge\sum_{i=0}^k(-1)^{k-i}b_i$。
**证明。** 用同一个等式 $c_i-b_i=r_i+r_{i+1}$ 求部分交错和，只余 $r_{k+1}\ge0$，其中 $r_0=0$。$\square$

## 4. 正例与反例

**正例。** 圆球面的高度函数有一个指标 0 和一个指标 $n$ 的临界点；环面可选有一个极小、两个鞍点、一个极大的 Morse 函数，$1-2+1=0$。

**反例。** $f(x)=x^4$ 的临界点 Hessian 为零，不能按非退化指标零套用 Morse 引理。Morse 函数也可有多余成对临界点，因此 $c_i=b_i$ 不是一般等式。

## 5. 练习

1. 计算 $f(x,y)=-x^2+2y^2$ 的指标与 Hessian。
2. 证明闭连通 $n$ 流形至少有一个指标 0 与一个指标 $n$ 的临界点。
3. 写出 $c_i-b_i$ 的秩表达式，核对强不等式的余项。

??? tip "提示 1"
    2：使用全局最大、最小与非退化性。3：先算 $k=0,1$。
??? tip "提示 2 与核对"
    1：Hessian 为 $\operatorname{diag}(-2,4)$，指标 1。2：极值 Hessian 半定且可逆，所以正定/负定。3：余项为 $r_{k+1}$。

<div class="admonition question" data-exercise="differential-morse-handles"></div>
<noscript>即时反馈需要 JavaScript；正文习题与分步提示仍可直接阅读。</noscript>

## 6. 参考书目

- John M. Lee. *Introduction to Smooth Manifolds*, 2nd ed., Springer, 2013.
- Victor Guillemin and Alan Pollack. *Differential Topology*, Prentice-Hall, 1974.
- John Milnor. *Morse Theory*, Princeton University Press, 1963.

本章以原创文字组织标准数学内容。标为“引用定理”的结果未在本章证明，不将其与已给出的证明混为一谈。
