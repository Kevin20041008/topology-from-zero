# Q1 · 上链、泛系数与杯积环

<div class="chapter-meta">研究生课程 · 先修：PRE5、H1–H3；Hom、张量积与对偶空间<br>有限自由链的自然泛系数序列在本文证明；分次交换及空间外积比较明确外引。尚无人类审阅或形式化验证。</div>

## 1. 学习目标

你应能证明杯积的 Leibniz 公式并解释代表元无关性，构造评价映射和自然 Ext 嵌入，计算整数上同调的挠子，以及用上同调环区分同调群相同的空间。你还应能指出域上对偶公式为何不能直接搬到整数系数。

## 2. 先修知识

先读 [PRE5](../../preliminaries/groups-modules.md) 的整数模和自由子群、[H3](../homology/cellular-coefficients.md) 的自由表示提升与系数自然性，以及 [H1](../homology/singular-chains.md) 的边界公式。$\operatorname{Hom}(A,G)$ 指阿贝尔群同态群；域上时明确写 $\operatorname{Hom}_k$。Ext 构造只需有限生成自由表示，不预设一般导出函子理论。

## 3. 问题引入与直观解释

上链给链赋值，上同调记录哪些赋值只依赖同调类。杯积进一步记录不同维度的类如何相互作用。两个空间即使各次同调群完全相同，环乘法仍可能将它们区分；反过来，环同构也不是同胚的充分条件。

## 4. 严格定义

整数奇异上链群为 $C^n(X;G)=\operatorname{Hom}(C_n(X;\mathbb Z),G)$，余边界（coboundary）$\delta\varphi=\varphi\partial$，$H^n=\ker\delta/\operatorname{im}\delta$。所有次数非负，负次上链取零。若系数为含单位的交换环 $R$，对 $p$ 次、$q$ 次上链定义杯积（cup product）

$$
(\varphi\smile\psi)(\sigma)=\varphi(\sigma|[v_0,\ldots,v_p])\psi(\sigma|[v_p,\ldots,v_{p+q}]).
$$

中间顶点 $v_p$ 被两段共享。连续映射 $f:X\to Y$ 的拉回为 $f^*\varphi=\varphi f_\#$，其中 $f_\#\sigma=f\circ\sigma$。它反向于空间映射，不能与同调推前混淆。

<div class="proof-status" id="proof-q1-0" markdown>
**完整证明（所列代数或链先修下）** · [依赖与审查义务](../../project/proof-ledger.md#proof-q1-0)
</div>

**引理 Q1.0（有限自由表示的 Ext）。** 对有限生成阿贝尔群 $M$，取 $0\to R\xrightarrow{j}F\to M\to0$，定义

$$
\operatorname{Ext}_{\mathbb Z}^1(M,G)=
\operatorname{coker}\bigl(j^*: \operatorname{Hom}(F,G)\to\operatorname{Hom}(R,G)\bigr).
$$

所得群与表示规范无关，对 $M$ 反变、对任意阿贝尔系数 $G$ 协变。本章简记 Ext。

**证明。** 对 $a:M\to M'$，H3.0 构造提升 $a_0:F\to F'$、$a_1:R\to R'$，满足 $a_0j=j'a_1$。预合成 $a_1$ 将 $\operatorname{Hom}(R',G)$ 映到 $\operatorname{Hom}(R,G)$，并将可从 $F'$ 延拓的同态送到可从 $F$ 延拓的同态，故下降到余核。另一个提升满足 $a'_1-a_1=hj$，因此任一 $\eta:R'\to G$ 的两个像相差 $(\eta h)j$，在余核中为零。恒等与复合用相应提升直接计算；同一群的不同表示间提升恒等映射，给规范互逆同构。系数同态 $u:G\to G'$ 以后合成作用，保留可延拓子群，且与上述预合成交换。因此全部自然性成立。$\square$

对 $M=\mathbb Z/m$，$j$ 为乘 $m$，所以 $\operatorname{Ext}(\mathbb Z/m,G)=G/mG$；自由 $M$ 取 $R=0$，Ext 为零。有限直和可用直和表示逐项计算。

## 5. 定理与证明

<div class="proof-status" id="proof-q1-1" markdown>
**完整证明（所列依赖下）** · [依赖与审查义务](../../project/proof-ledger.md#proof-q1-1)
</div>

**命题 Q1.1。** $\delta^2=0$，并且

$$
\delta(\varphi\smile\psi)=\delta\varphi\smile\psi+(-1)^p\varphi\smile\delta\psi.
$$

**证明。** 第一式由 $\partial^2=0$。为核对第二式，设 $n=p+q+1$。$\delta\varphi\smile\psi$ 展开为

$$
\sum_{i=0}^{p+1}(-1)^i\varphi([v_0,\ldots,\widehat v_i,\ldots,v_{p+1}])\psi([v_{p+1},\ldots,v_n]).
$$

$(-1)^p\varphi\smile\delta\psi$ 展开为

$$
\sum_{i=p}^{n}(-1)^i\varphi([v_0,\ldots,v_p])\psi([v_p,\ldots,\widehat v_i,\ldots,v_n]).
$$

第一和的 $i=p+1$ 项与第二和的 $i=p$ 项系数相反、取值相同，恰好抵消。余下第一和的 $0\le i\le p$ 项与第二和的 $p+1\le i\le n$ 项，分别是 $\delta(\varphi\smile\psi)$ 在删除前段与后段顶点时的值；这穷尽所有 $n+1$ 个面。故循环的杯积仍为循环。若 $p\ge1$，把闭上链 $\varphi$ 换为 $\varphi+\delta a$，杯积变化为 $\delta(a\smile\psi)$；若 $q\ge1$，换第二个代表，变化为 $(-1)^p\delta(\varphi\smile b)$。所以杯积降到上同调，结合律由连续切取前、中、后三段顶点直接成立。$\square$

**拉回与乘法的自然性（完整计算）。** 连续映射与参数单形取面交换，因此逐个 $\sigma$ 代入定义即得

$$f^*(\varphi\smile\psi)=f^*\varphi\smile f^*\psi,\qquad f^*\delta=\delta f^*.$$

常值为 $1_R$ 的零上链闭合，且与任意上链杯积仍是该上链，给单位。因而 $H^*(X;R)$ 是带单位分次环，$f^*$ 为环同态。若改变系数，保持杯积需 $R\to R'$ 为环同态；任意阿贝尔群同态仅保证下面加法群的 UCT 自然性。

<div class="proof-status" id="proof-q1-2" markdown>
**完整证明（域上链与线性代数先修下）** · [依赖与审查义务](../../project/proof-ledger.md#proof-q1-2)
</div>

**命题 Q1.2（域上的评价对偶）。** 对域 $k$ 上链复形，评价诱导自然同构

$$\rho:H^n(\operatorname{Hom}_k(C,k))\longrightarrow\operatorname{Hom}_k(H_n(C),k),\quad[\varphi]\longmapsto([z]\mapsto\varphi(z)).$$

**证明。** 闭上链恰在 $B_n$ 上消失，故限制到 $Z_n$ 可以下降到 $H_n$；改变上链一个余边界不改变循环上的值。任一 $H_n$ 上泛函提升到 $Z_n$，选补空间将它延拓到 $C_n$，即给闭上链，所以满射。若其在 $Z_n$ 上也零，则经 $C_n/Z_n\cong B_{n-1}$ 分解，将此泛函延拓到 $C_{n-1}$ 得 $\varphi=\psi d_n=\delta\psi$。故核正是余边界。无限维选基与延拓使用选择公理，有限维只用有限选基。

对链映射 $f:C\to D$，对循环 $z$ 有 $(f^*\varphi)(z)=\varphi(fz)$，给下列方块；证明同构所选补空间不进入自然映射的定义。

$$
\begin{array}{ccc}
H^n(\operatorname{Hom}_k(D,k))&\xrightarrow{\rho_D}&\operatorname{Hom}_k(H_n(D),k)\\
\downarrow H^n(f^*)&&\downarrow(-\circ H_n(f))\\
H^n(\operatorname{Hom}_k(C,k))&\xrightarrow{\rho_C}&\operatorname{Hom}_k(H_n(C),k)
\end{array}
$$

这证明对 $k$ 线性链映射的自然性。$\square$

<div class="proof-status" id="proof-q1-3" markdown>
**完整证明（有限自由整数链与 PRE5 代数先修下）** · [依赖与审查义务](../../project/proof-ledger.md#proof-q1-3)
</div>

**定理 Q1.3（上同调泛系数）。** 对 H3 约定的有限自由整数链 $C$、任意阿贝尔群 $G$、$n\ge0$，有短正合列

$$
0\to\operatorname{Ext}(H_{n-1}(C),G)\xrightarrow{\lambda}H^n(\operatorname{Hom}(C,G))
\xrightarrow{\rho}\operatorname{Hom}(H_n(C),G)\to0.
$$

它对整数链映射反变、对系数群同态协变且自然。序列可以分裂，但不存在与全部链映射相容的自然分裂选择。

**证明：评价及满射。** 沿用 H3 的 $q_n:C_n\to B_{n-1}$ 和 $j_{n-1}:B_{n-1}\to Z_{n-1}$。与 Q1.2 一样定义 $\rho$。因为 $q_n$ 的自由目标允许截面，$Z_n$ 是 $C_n$ 的直和项，可选投影 $p_n:C_n\to Z_n$。对 $\ell:H_n(C)\to G$，上链

$$C_n\xrightarrow{p_n}Z_n\longrightarrow H_n(C)\xrightarrow{\ell}G$$

在 $B_n$ 上为零，故闭合，且评价为 $\ell$。这既证明 $\rho$ 满射，也给依赖 $p_n$ 的群同态分裂。

**证明：Ext 嵌入与核。** 自由表示 $0\to B_{n-1}\xrightarrow{j_{n-1}}Z_{n-1}\to H_{n-1}\to0$ 给 Ext 的余核模型。对 $h:B_{n-1}\to G$ 定义

$$\lambda([h])=[h q_n].$$

因 $q_nd_{n+1}=0$，此上链闭合。如果 $h=k j_{n-1}$，先将 $k:Z_{n-1}\to G$ 经直和投影延拓到 $\psi:C_{n-1}\to G$，则 $h q_n=\psi d_n=\delta\psi$。所以定义与 Ext 代表元无关。

反之，若 $h q_n=\delta\psi$，$q_n$ 满射保证 $h$ 正是 $\psi$ 在 $B_{n-1}$ 上的限制，因而是 $\psi|_{Z_{n-1}}$ 的限制，Ext 类为零，故 $\lambda$ 单射。$\rho\lambda=0$，因为 $q_n$ 在循环上零。若 $\rho([\varphi])=0$，则 $\varphi(z)=0$ 对所有 $z\in Z_n$ 成立，因此 $\varphi$ 唯一分解为 $h q_n$，属于 $\operatorname{im}\lambda$。这证明正合性，包括 $n=0$ 时 Ext 左项为零。

**证明：自然性。** 对链映射 $f:C\to D$，$q_n^D f_n=f_{B,n-1}q_n^C$。Q1.0 中的 Ext 映射由 $h\mapsto h f_B$ 表示，故

$$
\begin{array}{ccc}
\operatorname{Ext}(H_{n-1}(D),G)&\xrightarrow{\lambda_D}&H^n(\operatorname{Hom}(D,G))\\
\downarrow\operatorname{Ext}(H_{n-1}(f),1)&&\downarrow H^n(f^*)\\
\operatorname{Ext}(H_{n-1}(C),G)&\xrightarrow{\lambda_C}&H^n(\operatorname{Hom}(C,G))
\end{array}
$$

逐代表元交换。$\rho$ 的方块与 Q1.2 相同，只将 $k$ 换为阿贝尔群 $G$、线性 Hom 换为群 Hom。对任意 $u:G\to G'$，$h,\varphi,\ell$ 都以后合成 $u$ 变化，全部方块交换。无自然分裂的反例见第6节。$\square$

<div class="proof-status" id="proof-q1-cellular-comparison" markdown>
**引用定理：有限模型与空间上同调的比较** · [依赖与审查义务](../../project/proof-ledger.md#proof-q1-cellular-comparison)
</div>

**引用范围。** 对有限 CW 复形 $X$，胞腔上链 $\operatorname{Hom}(C_*^{\mathrm{cell}}(X;\mathbb Z),G)$ 的上同调与奇异上同调 $H^*(X;G)$ 有标准比较同构，且对胞腔映射自然；一般连续映射的处理还使用胞腔逼近。这一上链比较及评价的兼容性在本章外引 Hatcher §3.1，不能仅从 H3.1 的抽象同调群同构推出。以下 $\mathbb{RP}^2$、楔和和环面的有限链计算均使用这一输入。胞腔上链还不能在未构造对角近似时随意套用单纯面的杯积公式；空间环乘法继续依赖下面的独立乘积比较。

<div class="proof-status" id="proof-q1-commutativity" markdown>
**引用定理** · [依赖与审查义务](../../project/proof-ledger.md#proof-q1-commutativity)
</div>

**引用定理（分次交换性及外积比较）。** 对交换环 $R$，上同调上 $a\smile b=(-1)^{pq}b\smile a$。完整证明需比较对角近似的链同伦（例如 cup-one），本章未展开。链级杯积一般不严格分次交换。空间杯积与外积的兼容性也采用标准 Eilenberg–Zilber 比较，不能只从 Q1.1 的 Leibniz 公式得出。

## 6. 典型例题：正例与反例

**基础计算。** 由 H3 的整数同调、上述胞腔上链比较及 Q1.3，$\mathbb{RP}^2$ 有 $H^0=\mathbb Z,H^1=0,H^2=\mathbb Z/2$。二次上同调来自一维同调的 Ext；只取 $\operatorname{Hom}(H_2,\mathbb Z)$ 会错误地给零。

**非平凡乘积。** 环面 $T^2=S^1\times S^1$ 的 $a,b$ 是两个投影对圆周一维生成元的拉回。由拉回自然性与 $H^2(S^1;\mathbb Z)=0$，$a^2=b^2=0$。利用外引的外积/Künneth 比较，$a\smile b$ 是 $H^2(T^2;\mathbb Z)$ 的**二次、无限阶生成元**；分次交换给 $b\smile a=-a\smile b$。所以环为 $\Lambda_{\mathbb Z}(a,b)$。“二次”是次数，不是元素的阶为二。

**同调群不能替代环。** $W=S^1\vee S^1\vee S^2$ 与 $T^2$ 的整数同调群逐次同构。用楔和的胞腔模型及 Q1.3，包含 $i:S^2\hookrightarrow W$ 的拉回 $i^*:H^2(W;\mathbb Z)\to H^2(S^2;\mathbb Z)$ 为同构，而 $H^1(S^2;\mathbb Z)=0$。任意一维类 $x,y$ 有 $i^*(x\smile y)=i^*x\smile i^*y=0$，故 $x\smile y=0$。环面有非零一维杯积，因此两者上同调环不同构，也不可能同伦等价。最后一步使用 H1 的链同伦与本章杯积自然性：若 $g_\#-f_\#=\partial P+P\partial$，定义 $P^*\varphi=\varphi P$，则 $g^*-f^*=\delta P^*+P^*\delta$。闭上链的两拉回相差余边界，故同伦映射诱导同一上同调映射；同伦等价遂给互逆环映射。这里显式对偶链同伦，不从“同调群不变”单独推断环不变。

**综合反例：上同调也无自然分裂。** 用 H3 的链 $de=2v,du=0$，但取 $G=\mathbb Z$。上链边界为 $\delta v^*=2e^*$，所以

$$H^1(C;\mathbb Z)=\mathbb Z\langle u^*\rangle\oplus(\mathbb Z/2)\langle e^*\rangle.$$

UCT 左项是 $\mathbb Z/2\langle e^*\rangle$，右项是 $\operatorname{Hom}(\mathbb Zu,\mathbb Z)=\mathbb Z$。链自同构 $f(e)=e+u$ 诱导 $f^*u^*=u^*+e^*$、$f^*e^*=e^*$，而两端均为恒等。任何截面把 $1$ 送到 $u^*+\epsilon e^*$，$\epsilon\in\{0,1\}$，两者被交换，无自然截面。

## 7. 原创图解：自然性方块

第5节两个交换方块分别表达“评价与拉回相容”和“Ext 类与上同调拉回相容”。所有纵向箭头都从 $D$ 的不变量到 $C$ 的不变量，因为上链是预合成。对照 H3 的协变方块，可发现将箭头方向画反会直接使 $\varphi(fz)$ 无法定义。这些图是证明的一部分，不只是记忆口号。

## 8. 编程实验：符号核对

下列整数运算核对一组边上链在四面体上的 $p=q=1$ Leibniz 公式。它测试特定输入；公式对全部上链成立由 Q1.1 的删面证明保证。

~~~python
phi = {(0, 1): 2, (0, 2): -1, (1, 2): 3}
psi = {(1, 2): 5, (1, 3): 7, (2, 3): 11}
lhs = (phi[1, 2] * psi[2, 3] - phi[0, 2] * psi[2, 3]
       + phi[0, 1] * psi[1, 3] - phi[0, 1] * psi[1, 2])
rhs = ((phi[1, 2] - phi[0, 2] + phi[0, 1]) * psi[2, 3]
       - phi[0, 1] * (psi[2, 3] - psi[1, 3] + psi[1, 2]))
assert lhs == rhs == 48
~~~

## 9. 课后习题

1. **符号证明。** 在 $[0,1,2,3]$ 上展开 $p=q=1$ 的杯积 Leibniz 公式，找出抵消项。
2. **系数计算。** 用 Q1.3 计算 $\mathbb{RP}^2$ 的全部整数上同调，分别注明 Hom 与 Ext 的贡献。
3. **错误推断。** 为什么奇数次类的平方在特征二中不被分次交换性强迫为零？在整数系数中仅凭分次交换能推出什么？
4. **Ext 计算。** 求 $\operatorname{Ext}(\mathbb Z/6,\mathbb Z/4)$；比较 $\operatorname{Hom}(\mathbb Z/6,\mathbb Z/4)$ 的计算方式。
5. **自然性证明。** 逐奇异单形证明 $f^*(\varphi\smile\psi)=f^*\varphi\smile f^*\psi$；说明若系数变换仅是加法同态，为什么不能保证乘法自然性。
6. **综合反例。** 使用第6节剪切映射证明 Q1.3 不存在对全部链映射自然的分裂。
7. **环区分。** 详细证明 $T^2$ 与 $S^1\vee S^1\vee S^2$ 不能同伦等价，列出需要引用的空间比较。
8. **挑战。** 对 $C_1\xrightarrow{6}C_0$，$C_i=\mathbb Z$，比较 $G=\mathbb Z$ 与 $G=\mathbb Z/6$ 时的 $H^0,H^1$；为何第一种系数中 $H^0=0$ 不矛盾于非空道路连通空间的 $H^0=\mathbb Z$？

??? tip "第一层提示"
    1：第一段和第二段的共享面各出现一次。2：$H_1=\mathbb Z/2,H_2=0$。3：先移项。4：Ext 是余核，Hom 是核。5：看系数相乘是否保持。6：研究截面在 $1$ 的值。7：限制到楔和中的 $S^2$。8：给定自由链未必来自空间。

??? tip "第二层提示"
    1：抵消的是 $\varphi_{01}\psi_{23}$。3：得到 $2a^2=0$。4：模四乘六等于乘二。6：$f^*u^*=u^*+e^*$。8：$H_0(C)=\mathbb Z/6$ 有挠子，而空间的普通 $H_0$ 是道路分量上的自由群。

<div class="admonition question" data-exercise="algebraic-cohomology-cochains-products"></div>
<noscript>即时反馈需要 JavaScript；正文习题与完整解答仍可阅读。</noscript>

## 10. 习题解答

[Q1 八题完整论证式解答](../../exercises/q1-solutions.md)。解答分别注明计算步骤、反例和所用的外引，不把有限代码验证当作一般证明。

## 11. 本章总结

上同调在域系数下是同调的评价对偶；整数系数需要 Ext 修正。UCT 的自然性来自评价、限制与自由表示提升，不能从群的分块列表推出。杯积保留群列表之外的信息，但其分次交换、空间外积比较仍有独立的链同伦证明义务。

## 12. 参考书目

- Allen Hatcher, *Algebraic Topology*, Cambridge University Press, 2002，§3.1（上同调泛系数）、§3.2（杯积）。[作者教材页](https://pi.math.cornell.edu/~hatcher/AT/ATpage.html)已访问；本批不声称逐页核验全文。
- Glen E. Bredon, *Topology and Geometry*, Springer, 1993，上同调与乘积相关内容；本批未访问原书全文，不给未经核验的页码或定理号。

本文证明、例子与叙述均原创。证明义务见 [Q1 审查记录](../../project/reviews/Q1.md)。
