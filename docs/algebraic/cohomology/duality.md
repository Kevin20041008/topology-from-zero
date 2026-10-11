# Q2 · 定向、帽积与 Poincaré 对偶

<div class="chapter-meta">研究生课程 · 先修：H3、Q1；单纯复形与重心细分<br>学习方式：先独立重构证明，再完成书面练习和即时自检。实验只检验指定有限输入。</div>

## 1. 直观解释

在闭定向流形中，一个余维 p 的横截截面可以与一个 p 次上同调类配对。对偶不是任意空间都具有的对称性，它依赖局部欧氏结构、定向及紧致条件。

## 2. 严格定义

本章先限制为有有限组合三角剖分的闭 $n$ 维 PL 流形 $M$。组合三角剖分（combinatorial triangulation）要求每个 $k$ 单形的链接为 PL 球面 $S^{n-k-1}$。定向（orientation）是在每个顶维单形上选择方向，使公共余维一面诱导方向相反。顶维单形之和是基本循环，其类为基本类（fundamental class）$[M]$。

上链与链的帽积（cap product）采用约定

$$
\varphi\frown[v_0,\ldots,v_n]=\varphi([v_0,\ldots,v_p])[v_p,\ldots,v_n].
$$

对奇异链同样定义，线性延拓。

## 3. 定理与证明

**命题 Q2.1。** 对 $p$ 次上链和 $n$ 次链，

$$
\partial(\varphi\frown c)=(-1)^p\bigl(\varphi\frown\partial c-(\delta\varphi)\frown c\bigr).
$$

**证明。** 展开单形边界，分成删除前 $p+1$ 个顶点和后部顶点的两组。前组与 $\delta\varphi$ 的展开相消，留下后面单形的交错边界，整体符号为 $(-1)^p$。因此闭上链帽上循环得到循环；改变任一代表只改变一个边界（使用此式及 $\delta\varphi=0$ 或 $\partial c=0$）。$\square$

**定理 Q2.2（有限 PL 情形的对偶）。** 对闭、定向、有限组合三角剖分的 $n$ 维流形，

$$
H^p(M;\mathbb Z)\cong H_{n-p}(M;\mathbb Z).
$$

!!! warning "Q2.2 证明范围：Advanced Outline"
    下文给出了对偶胞腔论证的结构，但尚未算出所用定向约定下的关联数符号及逐次数重标号公式。因此 **Q2.2 的完整证明未在本教材展开**，不能将“相差同一个符号”当作已经证明的引理。待审义务见[本章记录](../../project/reviews/Q2.md)。标准参考为 Hatcher, *Algebraic Topology*, §3.3（Poincaré Duality）；本轮核验作者提供的书籍页面，不声称逐页核查该证明。

**证明思路（上述外引引理/符号义务尚未完整展开）。** 重心细分中，对每个 $p$ 单形 $\sigma$，取所有以 $\sigma$ 为最小面的旗标单形组成的闭对偶胞腔 $D\sigma$。它是维数 $n-p$ 的球：局部链接是球面，对偶胞腔是其相应重心细分的锥。各 $D\sigma$ 构成 $M$ 的胞腔分解。用“$\sigma$ 的方向后接法方向给 $M$ 的方向”给 $D\sigma$ 定向。对偶边界的每个余维一面来自包含 $\sigma$ 的 $(p+1)$ 单形 $\tau$，其关联数与 $\sigma$ 在 $\partial\tau$ 中的关联数相差只依赖 $p$ 的同一个符号（交换切向与法向基所致）。逐次数统一调整对偶胞腔基的符号，使

$$
\Phi_p:C^p(K;\mathbb Z)\longrightarrow C_{n-p}^{\mathrm{cell}}(K^*;\mathbb Z),\qquad \partial\Phi_p=\Phi_{p+1}\delta.
$$

每个单形恰对应一个对偶胞腔，故 $\Phi$ 逐群同构。取同调并使用 H3.1 的胞腔计算，即得所述同构。（此处为条件推导/概要。）

将对偶胞腔构造与奇异帽积 $a\mapsto a\frown[M]$ 精确比较，还需要单纯链到奇异链及对角近似的比较定理；这里同样作为引用。更一般的拓扑流形对偶、非紧情形的紧支撑上同调、带边界的 Poincaré–Lefschetz 对偶也作为后续引用定理，不能直接删除当前假设。

**推论。** 闭定向奇数维有限 PL 流形的 Euler 示性数为零。
**证明。** 改用 $\mathbb Q$，Q1 的对偶和 Q2.2 给 $b_p=b_{n-p}$。当 $n$ 奇数时配对项符号相反，$\sum(-1)^pb_p=0$。$\square$

## 4. 正例与反例

**正例。** 定向属 $g$ 曲面的 $H^1$ 与 $H_1$ 都为 $\mathbb Z^{2g}$；杯积在基本类上的评价给交叉配对，其标准基矩阵为 $\begin{pmatrix}0&I\\-I&0\end{pmatrix}$。

**反例。** $\mathbb{RP}^2$ 不可定向，整数 $H^0=\mathbb Z$ 而 $H_2=0$，不满足普通整数对偶；模 2 时可不用方向选择。开直线的 $H^0=\mathbb Z$ 而 $H_1=0$，说明非紧条件也不可忽略。圆盘有边界，应使用相对群而非闭流形公式。

## 5. 练习

1. 用对偶证明闭定向连通曲面的第一 Betti 数为偶数（需非退化交叉配对这一标准兼容性）。
2. 检查 $p=0$ 时帽积边界公式。
3. 对圆盘写出预期的带边界对偶 $H^0(D^n)\cong H_n(D^n,S^{n-1})$ 并用 H2 验证。

??? tip "提示 1"
    1：有理数上非退化反对称矩阵的阶为偶数。2：不要假设零上链常值。
??? tip "提示 2 与核对"
    1：奇数阶反对称矩阵的行列式等于其负数，故为零。2：$\delta\varphi$ 正好记录端点取值差。3：两边均为 $\mathbb Z$。

<div class="admonition question" data-exercise="algebraic-cohomology-duality"></div>
<noscript>即时反馈需要 JavaScript；正文习题与分步提示仍可直接阅读。</noscript>

## 6. 参考书目

- Allen Hatcher. *Algebraic Topology*, Cambridge University Press, 2002.
- Glen E. Bredon. *Topology and Geometry*, Springer, 1993.

本章以原创文字组织标准数学内容。标为“引用定理”的结果未在本章证明，不将其与已给出的证明混为一谈。
