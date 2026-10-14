# H3 · 胞腔同调、挠与系数变换

<div class="chapter-meta">研究生课程 · 先修：H1、H2、F2、PRE5、CT1<br>本章含完整有限链代数证明及明确引用的胞腔比较。章内证明状态逐条标记；尚无人类审稿或形式化验证。</div>

## 1. 学习目标

完成本章后，你应能从骨架对的相对群推导胞腔链的计算结论，构造有限自由链的系数短正合列及其自然映射，计算挠子改变系数后的贡献，并证明自然短正合列未必有自然分裂。你还应能写出张量链收缩的符号，识别几何比较定理与有限代数计算各自承担的任务。

## 2. 先修知识

先读 [H1](singular-chains.md)、[H2](exact-excision.md) 的链复形、长正合列与同伦不变性；群的自由子群、张量泛性质与商公式见 [PRE5](../../preliminaries/groups-modules.md)，整数矩阵计算见 [CT1](../../computational/integer-homology.md)。本章自然系数定理不依赖尚未证明的胞腔比较：它对给定的有限自由整数链独立成立。

## 3. 问题引入与直观解释

胞腔分解把无限的奇异链计算压缩为每个胞腔一个生成元。整数矩阵除了秩还保存整除信息；改用域系数会改变可见的不变量。对映射也进行比较时，仅列出两个抽象同构的群不够：同构是否与映射交换，决定它能否用于连续变化的空间族。

## 4. 严格定义

有限 CW 复形的 $n$ 骨架记为 $X^n$，$X^{-1}=\varnothing$。胞腔链群（cellular chain group）为 $C_n^{\mathrm{cell}}(X)=H_n(X^n,X^{n-1};\mathbb Z)$。球面自映射的度（degree）是其在 $\widetilde H_n(S^n;\mathbb Z)\cong\mathbb Z$ 上的乘数，$n\ge0$；约化群让零维球面也适用。

以下“有限自由链”指非负次数、逐次有限秩自由、仅有限个链群非零的整数链复形。设 $Z_n=\ker d_n$、$B_n=\operatorname{im}d_{n+1}$、$H_n=Z_n/B_n$；负次数的这些群均为零。对任意阿贝尔群 $G$，系数链为 $C\otimes_{\mathbb Z}G$。这里二变量函子 $\operatorname{Tor}_1(M,G)$ 与 PRE5 的挠子子群 $\operatorname{Tor}(M)$ 不是同一个对象。

<div class="proof-status" id="proof-h3-0" markdown>
**完整证明（所列代数或链先修下）** · [依赖与审查义务](../../project/proof-ledger.md#proof-h3-0)
</div>

**引理 H3.0（自由表示与 Tor 的映射）。** 有限生成阿贝尔群 $M$ 取自由表示

$$
0\longrightarrow R\xrightarrow{j}F\xrightarrow{p}M\longrightarrow0,
$$

其中 $F,R$ 有限秩自由，$j$ 单射。定义此表示的

$$
T(M;G)=\ker(j\otimes1:R\otimes G\to F\otimes G).
$$

它给出与表示无关、对两变量协变的群，记 $\operatorname{Tor}^{\mathbb Z}_1(M,G)$，本章简写 Tor。

**证明。** 存在性由有限生成满射 $F\to M$ 及 PRE5 的自由子群定理。给定 $a:M\to M'$，为 $F$ 的每个基元素提升 $ap$ 到 $F'$，线性延伸成 $a_0:F\to F'$。因 $p'a_0j=0$，唯一得到 $a_1:R\to R'$ 使 $a_0j=j'a_1$。张量后 $a_1\otimes1$ 将上述核送到对应核。

若换另一提升 $a'_0$，其差落在 $j'(R')$，唯一写成 $a'_0-a_0=j'h$，$h:F\to R'$。于是由 $j'$ 单射得 $a'_1-a_1=hj$。对核中的 $t$，差的作用为 $(h\otimes1)(j\otimes1)t=0$，所以诱导映射不依赖提升。恒等与复合可以用恒等及复合提升计算，给出函子律。对同一 $M$ 的两个表示提升恒等映射，两向复合在核上都是恒等，因此给规范同构，且同构满足传递相容性。系数同态 $G\to G'$ 在张量第二因子作用，与所有这些映射交换。$\square$

取表示 $\mathbb Z\xrightarrow{\times m}\mathbb Z\to\mathbb Z/m$，$m\ge1$，得到 $\operatorname{Tor}(\mathbb Z/m,G)=G[m]=\{g:mg=0\}$；自由群可取 $R=0$，所以其 Tor 为零。直和表示给有限直和可逐项计算。这里的映射构造使“自然”有可检验的含义。

## 5. 定理与证明

<div class="proof-status" id="proof-h3-1" markdown>
**条件推导 / Advanced Outline** · [依赖与审查义务](../../project/proof-ledger.md#proof-h3-1)
</div>

**定理 H3.1（有限 CW 的胞腔计算）。** $C_n^{\mathrm{cell}}$ 为定向 $n$ 胞腔上的自由阿贝尔群。以相对群连接映射定义边界后，其同调同构于 $H_n(X;\mathbb Z)$。

!!! warning "外引的几何输入"
    对任意有限 CW 复形，$H_k(X^r,X^{r-1};\mathbb Z)$ 在 $k\ne r$ 时为零，在 $k=r$ 时为定向 $r$ 胞腔上的自由群。这里对非正则 CW 也适用，但本章未证明该骨架对引理。附加球的边界可能自我识别，不能用一句“取领圈”代替证明。参考 Hatcher §2.2；以下完整展开的是接受此引理后的长正合列推导。

**条件证明。** 由骨架对长正合列及归纳，$H_k(X^r)=0$ 对 $k>r$ 成立：$X^0$ 是有限离散点集，归纳步使用 $H_k(X^r,X^{r-1})=0$。写

$$
\delta_n:C_n^{\mathrm{cell}}\to H_{n-1}(X^{n-1}),\qquad
 a_n:H_n(X^n)\to C_n^{\mathrm{cell}},\qquad d_n=a_{n-1}\delta_n.
$$

$d_0=0$。同一个骨架对正合列给 $\delta_{n-1}a_{n-1}=0$，所以 $d_{n-1}d_n=0$。当 $n\ge1$ 时，$H_n(X^{n-1})=0$，故 $a_n$ 单射；又因 $H_{n-1}(X^{n-2})=0$，$a_{n-1}$ 单射，故 $\ker d_n=\ker\delta_n=\operatorname{im}a_n$。当 $n=1$ 时这里 $a_0$ 是 $H_0(X^0)\to H_0(X^0,\varnothing)$ 的恒等识别。$n=0$ 则直接有 $\ker d_0=C_0^{\mathrm{cell}}=H_0(X^0)$。

下一骨架的长正合列包含

$$
C_{n+1}^{\mathrm{cell}}\xrightarrow{\delta_{n+1}}H_n(X^n)
\longrightarrow H_n(X^{n+1})\longrightarrow0.
$$

末项为零来自相对群的次数集中。用 $a_n$ 识别中间群后，得到 $H_n(X^{n+1})\cong\ker d_n/\operatorname{im}d_{n+1}$，包括 $n=0$。当 $r\ge n+2$，相对群在 $n,n+1$ 次均为零，故 $H_n(X^{r-1})\to H_n(X^r)$ 为同构。有限次迭代到 $X$ 得结论。$\square$

当 $n\ge2$ 时，边界矩阵的 $(e^{n-1},e^n)$ 项可用附加球面映到 $X^{n-1}$、再压去其余骨架所得球面映射的度计算；$n=1$ 是“终点减起点”。此度公式的几何比较同样引用 Hatcher §2.2，不由上述纯正合列计算单独推出。

<div class="proof-status" id="proof-h3-2" markdown>
**完整证明（有限自由链与 PRE5 代数先修下）** · [依赖与审查义务](../../project/proof-ledger.md#proof-h3-2)
</div>

**定理 H3.2（有限自由链的同调泛系数定理，universal coefficient theorem）。** 对上述 $C$、任意阿贝尔群 $G$ 与 $n\ge0$，有短正合列

$$
0\to H_n(C)\otimes G\xrightarrow{\alpha}H_n(C\otimes G)
\xrightarrow{\beta}\operatorname{Tor}_1^{\mathbb Z}(H_{n-1}(C),G)\to0.
$$

此列对整数链映射及系数群同态分别协变且自然；它可作为阿贝尔群序列分裂，但不存在对所有链映射自然的分裂选择。

**证明：构造映射。** 写 $i_n:Z_n\hookrightarrow C_n$、$j_n:B_n\hookrightarrow Z_n$，$q_n:C_n\twoheadrightarrow B_{n-1}$ 为 $d_n$ 缩小陪域后的满射。PRE5.10 给 $B_n,Z_n$ 有限自由。提升 $B_{n-1}$ 的一组基得到截面 $s_n$，所以

$$
0\to Z_n\xrightarrow{i_n}C_n\xrightarrow{q_n}B_{n-1}\to0
$$

分裂，张量后仍分裂，尤其 $i_n\otimes1$ 单射。用自由表示 $0\to B_{n-1}\xrightarrow{j_{n-1}}Z_{n-1}\to H_{n-1}\to0$ 表示 Tor。

定义 $\alpha([z]\otimes g)=[i_n(z)\otimes g]$。改变 $z$ 一个边界只改变右端一个张量边界；双可加性使定义下降到张量积。若 $x\in C_n\otimes G$ 为循环，定义

$$
\beta([x])=(q_n\otimes1)x\in\ker(j_{n-1}\otimes1).
$$

确实 $d_n=i_{n-1}j_{n-1}q_n$，由 $i_{n-1}\otimes1$ 单射，循环条件保证落在此核。又 $q_nd_{n+1}=0$，故改变边界代表不改变 $\beta$。

**证明：正合与分裂。** $\ker(q_n\otimes1)=\operatorname{im}(i_n\otimes1)$，所以 $\ker\beta$ 可用 $Z_n\otimes G$ 中的元素代表。张量边界恰是其中的 $\operatorname{im}(j_n\otimes1)$：因为 $q_{n+1}$ 有截面，$q_{n+1}\otimes1$ 满射。PRE5.13 的商公式给

$$
(Z_n\otimes G)/\operatorname{im}(j_n\otimes1)\cong (Z_n/B_n)\otimes G.
$$

这同时证明 $\alpha$ 单射且像为 $\ker\beta$。若 $t\in\ker(j_{n-1}\otimes1)$，则 $(s_n\otimes1)t$ 是循环，且 $\beta([(s_n\otimes1)t])=t$。因此 $\beta$ 满射并有群同态右逆。

**证明：自然性。** 对链映射 $f:C\to D$，限制映射 $f_Z,f_B$ 满足 $q^D_nf_n=f_{B,n-1}q^C_n$ 及 $f_Zj^C=j^Df_B$。后两映射正是 H3.0 的自由表示提升，所以

$$
\begin{array}{ccc}
H_n(C\otimes G)&\xrightarrow{\beta_C}&\operatorname{Tor}_1(H_{n-1}(C),G)\\
\downarrow H_n(f\otimes1)&&\downarrow\operatorname{Tor}_1(H_{n-1}(f),1)\\
H_n(D\otimes G)&\xrightarrow{\beta_D}&\operatorname{Tor}_1(H_{n-1}(D),G)
\end{array}
$$

交换；$\alpha$ 的方块在纯张量 $[z]\otimes g$ 上直接交换。对任意 $u:G\to G'$，所有定义将张量第二因子的 $g$ 换成 $u(g)$，因此两方块同样交换。这里没有要求 $u$ 单射、满射或系数为域。自然性不使用选定的 $s_n$；截面只用于证明存在分裂。不可能自然选择截面的反例见第6节。$\square$

<div class="proof-status" id="proof-h3-3" markdown>
**完整证明（域上有限链）** · [依赖与审查义务](../../project/proof-ledger.md#proof-h3-3)
</div>

**命题 H3.3（域上的链 Künneth）。** 对域 $k$ 上有界、逐次有限维链复形 $C,D$，映射 $[c]\otimes[d]\mapsto[c\otimes d]$ 给自然同构

$$H_n(C\otimes D)\cong\bigoplus_{p+q=n}H_p(C)\otimes_k H_q(D).$$

**证明。** 取 $C_n=B_n\oplus H'_n\oplus L_n$，$d:L_n\cong B_{n-1}$，因此 $C=H'\oplus E$，$H'$ 微分零，$E$ 有收缩 $s$：$ds+sd=1_E$。$D$ 同理。张量微分取 $d(x\otimes y)=dx\otimes y+(-1)^{|x|}x\otimes dy$。在 $E\otimes D$ 上令 $S=s\otimes1$，对 $|x|=p$，

$$
(dS+Sd)(x\otimes y)=(ds+sd)x\otimes y+
\bigl((-1)^{p+1}+(-1)^p\bigr)sx\otimes dy=x\otimes y.
$$

而 $H'\otimes E_D$ 上取 $S(x\otimes y)=(-1)^p x\otimes s_Dy$，得到 $(dS+Sd)(x\otimes y)=x\otimes(d_Ds_D+s_Dd_D)y$。故所有含可缩因子的直和项无同调，只留下 $H'\otimes H'_D$。循环张量送到循环；改变任一循环一个边界，张量改变一个边界，故开头的典范映射良定义，且上述分解证明它是同构。链映射与纯张量的公式交换，所以同构自然，尽管证明中选择的补空间不自然。$\square$

<div class="proof-status" id="proof-h3-ez" markdown>
**引用定理** · [依赖与审查义务](../../project/proof-ledger.md#proof-h3-ez)
</div>

**空间比较的引用范围。** Eilenberg–Zilber 定理给奇异链 $C_*(X\times Y;k)$ 与 $C_*(X;k)\otimes_k C_*(Y;k)$ 的自然链同伦等价。其 shuffle 映射和同伦未在本章构造。奇异链通常不有限维，不能直接把 H3.3 的有限版本套上去；空间的一般域系数 Künneth 作为外引，有限 CW 例子也可借胞腔模型及其乘积比较计算。外引范围与有限链证明分开保留。

## 6. 典型例题：正例与反例

**基础系数计算。** $\mathbb{RP}^2$ 每维一个 $0,1,2$ 胞腔，度公式给整数链 $\mathbb Z\xrightarrow{2}\mathbb Z\xrightarrow{0}\mathbb Z$。所以 $H_0=\mathbb Z,H_1=\mathbb Z/2,H_2=0$。模二后所有边界为零，$H_0,H_1,H_2$ 均为 $\mathbb F_2$；H3.2 中 $H_2$ 的新增项来自 $\operatorname{Tor}_1(\mathbb Z/2,\mathbb F_2)$，而非整数 $H_2$ 的张量。

**非平凡胞腔例。** 环面二维胞腔的附加词为交换子，每条边的代数次数为零，整数同调为 $\mathbb Z,\mathbb Z^2,\mathbb Z$。这里附加度识别依赖 H3.1 标出的几何输入。

**错误推断。** 实数矩阵秩只给 $\mathbb{RP}^2$ 的 Betti 数 $(1,0,0)$，不能区分其整数 $H_1$ 与零群。改变系数不是提高数值精度。

**综合反例：不存在自然分裂。** 取 $C_1=\mathbb Ze\oplus\mathbb Zu$、$C_0=\mathbb Zv$，$de=2v,du=0$，其他群零，系数 $G=\mathbb F_2$。有 $H_1(C)=\mathbb Zu$、$H_0(C)=\mathbb Z/2$，系数序列为

$$0\to\mathbb F_2\langle u\rangle\to\mathbb F_2\langle e,u\rangle\xrightarrow{\beta}\mathbb F_2\to0,\quad\beta(e)=1,\ \beta(u)=0.$$

链自同构 $f(e)=e+u,f(u)=u,f(v)=v$ 在两端都诱导恒等，中间却把 $e$ 与 $e+u$ 交换。任一线性右逆只能将 $1$ 送到这两者之一，均不与 $f$ 交换。因此不存在对全部链映射自然的分裂规则；这比“我们恰好选了基”更强。

## 7. 原创图解：自然性方块

第5节的交换方块是本章的结构图：横向 $\beta$ 把一个系数循环送到 Tor 障碍，纵向把输入链映到另一条链。沿方块两条路线应得到同一个元素。第6节的剪切自同构说明，给 $\beta$ 选择逆方向的一条箭头可能破坏这个方块。读图时必须同时记录群、映射与方向。

## 8. 编程实验：有限代数核对

下列标准库程序穷举综合反例的四个模二向量。它验证指定例子的映射与两种右逆均不自然；一般 UCT 的证明仍是第5节。

~~~python
from itertools import product
vectors = list(product(range(2), repeat=2))  # (e, u) 系数
beta = lambda x: x[0]
f = lambda x: (x[0], (x[0] + x[1]) % 2)
assert all(beta(f(x)) == beta(x) for x in vectors)
sections_at_one = [x for x in vectors if beta(x) == 1]
assert len(sections_at_one) == 2
assert all(f(x) != x for x in sections_at_one)
~~~

## 9. 课后习题

1. **基础计算。** 链 $C_1=\mathbb Z\xrightarrow{6}C_0=\mathbb Z$ 的整数、$\mathbb F_2$、$\mathbb F_5$ 同调分别是什么？
2. **一致性。** 用环面胞腔数及整数同调的自由秩分别计算 Euler 示性数，解释两种计数为何一致。
3. **空间计算。** 计算 $H_*(S^2\times S^1;\mathbb Q)$，标出使用的空间比较输入。
4. **Tor 计算。** 对正整数 $m,r$，从 H3.0 证明 $\operatorname{Tor}_1(\mathbb Z/m,\mathbb Z/r)\cong\mathbb Z/\gcd(m,r)$。
5. **自然性。** 对上述二项乘六链，比较系数映射 $\mathbb Z/6\to\mathbb Z/3$ 的 UCT 右侧与中间 $H_1$ 上的映射。
6. **反例证明。** 不引用“分裂依赖基”，用第6节的 $f$ 证明不可能选择与所有链映射交换的 UCT 分裂。
7. **符号。** 完整核对 $H'\otimes E_D$ 的收缩公式，为何少掉 $(-1)^p$ 时奇数 $p$ 出错？
8. **挑战。** 对有限自由整数链证明 $H_n(C\otimes\mathbb Q)\cong H_n(C)\otimes\mathbb Q$，说明为什么此结论不能恢复整数挠子。

??? tip "第一层提示"
    1：求核与余核。2：链秩和同调秩之间隔着边界秩。3：非零次数相加。4：找出模 $r$ 中被 $m$ 杀死的元素。5：用实际循环 $a$ 表示 Tor。6：只需检查右逆在 $1$ 上的值。7：$H'$ 的微分为零。8：先计算循环群与 $\mathbb Q$ 的 Tor。

??? tip "第二层提示"
    4：令 $d=\gcd(m,r)$，核由 $r/d$ 生成。5：两端都是约化 $a\mapsto a\bmod3$。7：张量微分和收缩各贡献一次 $(-1)^p$。8：用 CT1 的有限生成阿贝尔群分解及有理数乘非零整数可逆。

<div class="admonition question" data-exercise="algebraic-homology-cellular-coefficients"></div>
<noscript>即时反馈需要 JavaScript；正文习题与完整解答仍可阅读。</noscript>

## 10. 习题解答

[H3 八题完整论证式解答](../../exercises/h3-solutions.md)。解答分别注明计算步骤、反例和所用的外引，不把有限代码验证当作一般证明。

## 11. 本章总结

改系数包含循环张量与 Tor 两种来源。自然性由具体的 $\alpha,\beta$ 构造决定，可分裂并不保证自然分裂。有限链的代数证明已经展开；从空间进入胞腔或乘积链模型仍有明确外引义务，不能用小矩阵测试替代这些几何比较。

## 12. 参考书目

- Allen Hatcher, *Algebraic Topology*, Cambridge University Press, 2002，§2.2（胞腔同调）、§3.A（同调泛系数）。[作者教材页](https://pi.math.cornell.edu/~hatcher/AT/ATpage.html)已访问，未声称逐页核验全文。
- Glen E. Bredon, *Topology and Geometry*, Springer, 1993，同调、系数与乘积相关内容；本批未访问原书，不给未经核对的页码或定理号。

本章定义的组织、证明叙述、例题及程序为原创；具体证明边界见[H3 审查记录](../../project/reviews/H3.md)。
