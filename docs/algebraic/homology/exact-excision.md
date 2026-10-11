# H2 · 相对同调、切除与 Mayer–Vietoris

<div class="chapter-meta">研究生课程 · 先修：H1；短正合列和核像；紧致度量空间 Lebesgue 数<br>学习方式：先独立重构证明，再完成书面练习和即时自检。实验只检验指定有限输入。</div>

## 1. 直观解释

相对链把子空间中的链视为零，适合研究“附加了什么”。正合列把各部分之间的信息传递精确化；切除说明远离边界的内部部分可以从相对问题中删去。

## 2. 严格定义

对 $A\subset X$，定义 $C_n(X,A)=C_n(X)/C_n(A)$，诱导边界给相对同调（relative homology）$H_n(X,A)$。序列在某项正合（exact）意为进入映射的像等于出去映射的核。

对开覆盖 $\mathcal U$，$C_*^{\mathcal U}(X)$ 为每个生成单形的像落在某个覆盖成员内的链子复形，称小链（small chains）。

## 3. 定理与证明

**定理 H2.1（长正合列）。** 对链复形短正合列 $0\to A_*\xrightarrow{i}B_*\xrightarrow{q}C_*\to0$，存在连接映射 $\delta:H_n(C)\to H_{n-1}(A)$，组成长正合列。

**证明。** 循环 $c$ 提升为 $b$，则 $q\partial b=0$，唯一写 $\partial b=i(a)$，并有 $\partial a=0$。定义 $\delta[c]=[a]$。换提升 $b+i(u)$ 改变 $a$ 一个边界；换循环代表 $c+\partial v$ 时取 $b+\partial\widetilde v$，不变。若 $\delta[c]=0$，用 $i(u)$ 校正 $b$ 得循环，所以 $\ker\delta=\operatorname{im}q_*$；若循环 $b$ 的像是边界，减去一个提升边界后成为 $i(a)$，所以 $\ker q_*=\operatorname{im}i_*$；若 $i(a)=\partial b$，则 $q(b)$ 为循环且 $\delta[q(b)]=[a]$，所以 $\ker i_*=\operatorname{im}\delta$。包含关系的反向均由复合为零。$\square$

应用到 $0\to C_*(A)\to C_*(X)\to C_*(X,A)\to0$ 即得空间对的长正合列。

**引理 H2.2（小链）。** 包含 $C_*^{\mathcal U}(X)\hookrightarrow C_*(X)$ 诱导同调同构。

**证明。** 在仿射单形上递归定义重心细分 $\mathrm{Sd}$：零单形不变，高维单形用重心向细分后的边界作锥。锥边界恒等式 $\partial(b*c)=c-b*(\partial c)$（正维链；零维使用增广）推出 $\partial\mathrm{Sd}=\mathrm{Sd}\partial$。在标准单形内归纳构造 $T$ 使 $\partial T+T\partial=\mathrm{id}-\mathrm{Sd}$：已定义低维 $T$ 后，$\mathrm{id}-\mathrm{Sd}-T\partial$ 是循环，对其作锥得到 $T$。经奇异单形推到 $X$，所有生成元仍留在原单形像内。

每次细分使 $n$ 维单形的网格直径至多乘 $n/(n+1)$。对一条有限链，分别将覆盖拉回有限个标准单形，Lebesgue 数保证某次共同细分后成为小链。若 $z$ 为循环，则 $z-\mathrm{Sd}^Nz=\partial T_Nz$，其中 $T_N=\sum_{j=0}^{N-1}T\mathrm{Sd}^j$，得满射。若小循环 $z=\partial b$ 在大复形中为边界，细分 $b$ 使其小；$T_Nz$ 也小，因为构造不离开每个原小单形的像。于是 $z=\partial(\mathrm{Sd}^Nb+T_Nz)$ 已在小复形中为边界，得单射。$\square$

**定理 H2.3（切除，excision）。** 若 $\overline Z\subset\operatorname{int}_X A$，则 $(X\setminus Z,A\setminus Z)\hookrightarrow(X,A)$ 诱导相对同调同构。

**证明。** 用开覆盖 $\{\operatorname{int}A,X\setminus\overline Z\}$，细分使每个链生成元落在 $A$ 内或 $X\setminus Z$ 内；在模掉 $C_*(A)$ 后只剩后者。上述细分与链同伦同时保留子空间链，故对相对循环的满射和对相对边界的单射论证与 H2.2 相同。更明确地，子复形 $C_*(A)+C_*(X\setminus Z)$ 的包含是链同伦意义下对有限链可细分的小链等价，而它模 $C_*(A)$ 自然为 $C_*(X\setminus Z)/C_*(A\setminus Z)$。$\square$

**定理 H2.4（Mayer–Vietoris）。** 对开覆盖 $X=U\cup V$，有

$$
\cdots\to H_n(U\cap V)\xrightarrow{(i_*,-j_*)}H_n(U)\oplus H_n(V)\to H_n(X)\xrightarrow{\delta}H_{n-1}(U\cap V)\to\cdots.
$$

**证明。** 链级序列 $0\to C_*(U\cap V)\to C_*(U)\oplus C_*(V)\to C_*^{\{U,V\}}(X)\to0$ 正合，第二映射为相加。核的描述由奇异单形作为自由基直接成立。结合 H2.1 与 H2.2。$\square$

## 4. 正例与反例

**正例。** 将 $S^n$ 用去掉南北极的两个开集覆盖，二者可缩，交集形变收缩到 $S^{n-1}$，约化序列给 $\widetilde H_k(S^n)\cong\widetilde H_{k-1}(S^{n-1})$。由 $S^0$ 两点出发，得到仅第 $n$ 维为 $\mathbb Z$。

**反例。** 对 $(X,A)=([0,1],\{0,1\})$ 删 $Z=\{0\}$ 不满足切除条件：$H_1(X,A)=\mathbb Z$，但 $H_1((0,1],\{1\})=0$。不能任意删除边界点。

## 5. 练习

1. 计算 $H_k(D^n,S^{n-1})$（$n\ge1$）。
2. 在圆周两开弧覆盖中，明确写出从 $H_1(S^1)$ 到 $\widetilde H_0(U\cap V)$ 的连接映射。
3. 补出 H2.2 中 $T_N$ 的链同伦等式。

??? tip "提示 1"
    1：用空间对长正合列及球面计算。2：把圆周拆成分别位于两弧的链。
??? tip "提示 2 与核对"
    1：只在 $k=n$ 时为 $\mathbb Z$。2：生成元映成两个交集分支的点之差，符号取决于定向。3：求和后 $\sum(\mathrm{Sd}^j-\mathrm{Sd}^{j+1})=\mathrm{id}-\mathrm{Sd}^N$。

<div class="admonition question" data-exercise="algebraic-homology-exact-excision"></div>
<noscript>即时反馈需要 JavaScript；正文习题与分步提示仍可直接阅读。</noscript>

## 6. 参考书目

- Allen Hatcher. *Algebraic Topology*, Cambridge University Press, 2002.
- Glen E. Bredon. *Topology and Geometry*, Springer, 1993.

本章以原创文字组织标准数学内容。标为“引用定理”的结果未在本章证明，不将其与已给出的证明混为一谈。
