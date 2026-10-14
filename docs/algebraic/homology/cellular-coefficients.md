# H3 · 胞腔同调、挠与系数变换

<div class="chapter-meta">研究生课程 · 先修：H1、H2、F2；整数矩阵 Smith 标准形与张量积<br>学习方式：先独立重构证明，再完成书面练习和即时自检。实验只检验指定有限输入。</div>

## 1. 直观解释

胞腔分解把无限的奇异链计算压缩为每个胞腔一个生成元。整数矩阵除了秩还保存整除信息；改用域系数会改变可见的不变量。

## 2. 严格定义

有限 CW 复形的 $n$ 骨架记为 $X^n$，并约定 $X^{-1}=\varnothing$。胞腔链群（cellular chain group）为 $C_n^{\mathrm{cell}}(X)=H_n(X^n,X^{n-1};\mathbb Z)$。球面自映射的度（degree）定义为其在 $\widetilde H_n(S^n;\mathbb Z)\cong\mathbb Z$ 上的乘数（$n\ge0$）；使用约化群使零维球面也符合这一约定。

对阿贝尔群 $G$，系数链复形为 $C_*(X;\mathbb Z)\otimes G$。记 $G[m]=\{g:mg=0\}$；$\operatorname{Tor}(\mathbb Z/m,G)=G[m]$，$\operatorname{Tor}(\mathbb Z,G)=0$，对有限直和逐项定义。

## 3. 定理与证明

<div class="proof-status" id="proof-h3-1" markdown>
**证明概要 / Advanced Outline** · [依赖与审查义务](../../project/proof-ledger.md#proof-h3-1)
</div>

**定理 H3.1（有限 CW 的胞腔计算）。** $C_n^{\mathrm{cell}}$ 为 $n$ 胞腔上的自由阿贝尔群；边界为相邻相对群间的连接映射复合，且其同调为 $H_*(X;\mathbb Z)$。

!!! warning "H3.1 证明范围：条件推导"
    下文开头使用了 CW 对的相对同调引理：骨架对的相对群集中在胞腔维数，且以该维胞腔为自由基。对于非正则 CW 复形，附加球的边界可被识别，“取领圈”不是这里已完成的证明。该引理的完整证明未在本教材展开；本章余下长正合列推导以它为前提。参考 Hatcher, *Algebraic Topology*, §2.2 的胞腔同调。一般 CW 版本还需直极限等论证。

**证明思路（上述外引引理/符号义务尚未完整展开）。** 对每个附加球取领圈，用切除将 $(X^n,X^{n-1})$ 化为各 $(D^n,S^{n-1})$ 的直和（$n=0$ 直接数点）。H2 的计算说明相对群仅在 $n$ 维非零。定义 $d_n$ 为

$$
H_n(X^n,X^{n-1})\to H_{n-1}(X^{n-1})\to H_{n-1}(X^{n-1},X^{n-2}).
$$

长正合列使相邻连接复合为零。骨架维数归纳给 $H_k(X^r)=0$（$k>r$）。于是 $H_n(X^n)$ 单射到 $C_n^{\mathrm{cell}}$，像恰为 $\ker d_n$：连接值落在 $H_{n-1}(X^{n-1})$，而该群到相对群的映射单射，因为 $H_{n-1}(X^{n-2})=0$。下一层长正合列给 $H_n(X^{n+1})=\ker d_n/\operatorname{im}d_{n+1}$；更高层的相关相对群为零，不再改变 $H_n$。有限层迭代得结论。（此处为条件推导/概要。）

当 $n\ge2$ 时，边界矩阵的 $(e^{n-1},e^n)$ 项是附加球面映到 $X^{n-1}$，再把除 $e^{n-1}$ 外的骨架压成一点得到的球面映射之度。$n=1$ 时直接用有向边的“终点减起点”，$d_0=0$。这些公式由相对群生成元及连接映射的自然性给出。

<div class="proof-status" id="proof-h3-2" markdown>
**证明概要 / Advanced Outline** · [依赖与审查义务](../../project/proof-ledger.md#proof-h3-2)
</div>

**定理 H3.2（有限自由链复形的系数定理）。** 对有限生成自由整数链复形 $C$，有自然短正合列

$$
0\to H_n(C)\otimes G\to H_n(C\otimes G)\to\operatorname{Tor}(H_{n-1}(C),G)\to0,
$$

且可分裂，但分裂通常不自然。

!!! warning "H3.2 证明范围：分解已推导，自然性仍为引用"
    Smith 分块论证给出抽象群的分裂形式，但“Tor 不依赖基”尚未构造自然的右端映射与交换图。自然短正合列的完整证明未在本教材展开；这部分按 Hatcher, *Algebraic Topology*, §3.A（Universal Coefficients for Homology）引用。不能由非自然分裂自动推出自然性。具体待审义务见[H3 审查记录](../../project/reviews/H3.md)。

**证明思路（上述外引引理/符号义务尚未完整展开）。** 子群 $B_n\subset Z_n\subset C_n$ 都自由；$C_n\to B_{n-1}$ 的满射因目标自由可选截面，所以 $C_n\cong Z_n\oplus B_{n-1}$。对包含 $B_n\hookrightarrow Z_n$ 取 Smith 基，矩阵为对角非零整数 $m_i$ 加零方向。于是链复形分解为单项自由生成元与二项复形 $\mathbb Z\xrightarrow{m_i}\mathbb Z$（$m_i=1$ 的项可缩）。张量后变成 $G\xrightarrow{m_i}G$，下层同调为 $G/m_iG=(\mathbb Z/m_i)\otimes G$，上层为 $G[m_i]$。逐块合并即给所述群和分裂。自然映射由循环张量送入同调构造，商的 Tor 描述不依赖所选 Smith 基；选择分裂依赖基，故不声称自然。（此处为条件推导/概要。）

<div class="proof-status" id="proof-h3-3" markdown>
**完整证明（所列依赖下）** · [依赖与审查义务](../../project/proof-ledger.md#proof-h3-3)
</div>

**命题 H3.3（域上的链 Künneth）。** 对域 $k$ 上有限维链复形 $C,D$，$H_n(C\otimes D)\cong\bigoplus_{p+q=n}H_p(C)\otimes H_q(D)$。

**证明。** 取 $C_n=B_n\oplus H'_n\oplus L_n$，使 $d:L_n\cong B_{n-1}$。因此 $C$ 为零微分的同调代表子复形与可缩二项块的直和，$D$ 同理。张量微分为 $d(c\otimes d)=dc\otimes d+(-1)^{|c|}c\otimes dd$；可缩块的收缩 $s\otimes1$ 仍满足 $d s+s d=1$，混合项符号相消。只余两个同调代表的张量。$\square$

<div class="proof-status" id="proof-h3-ez" markdown>
**引用定理** · [依赖与审查义务](../../project/proof-ledger.md#proof-h3-ez)
</div>

**引用定理。** Eilenberg–Zilber 定理将空间乘积的奇异链与张量链复形链同伦等价。结合上式得到空间的域系数 Künneth 定理；本章未构造 shuffle 同伦。

## 4. 正例与反例

**正例。** $\mathbb{RP}^2$ 有每维一个 $0,1,2$ 胞腔，整数链为 $\mathbb Z\xrightarrow{2}\mathbb Z\xrightarrow{0}\mathbb Z$。所以 $H_1=\mathbb Z/2,H_2=0$；改用 $\mathbb F_2$ 后两个微分都零，$H_1=H_2=\mathbb F_2$。

**正例。** 环面二维胞腔的附加词为交换子，对每条边的代数次数为零。因此整数同调是 $\mathbb Z,\mathbb Z^2,\mathbb Z$。

**反例。** 用实数矩阵秩只能看到 $\mathbb{RP}^2$ 的 Betti 数 $(1,0,0)$，无法由它判断 $H_1$ 是否有二阶挠。改变系数也不能被称为增加数值精度。

## 5. 练习

1. 计算链 $\mathbb Z\xrightarrow{6}\mathbb Z$ 的整数同调和 $\mathbb F_2,\mathbb F_5$ 同调。
2. 用环面细胞数验证 Euler 示性数。
3. 用 H3.3 计算 $H_*(S^2\times S^1;\mathbb Q)$。

??? tip "提示 1"
    1：分别看乘 6 的核与余核。3：将两球面的非零次数相加。
??? tip "提示 2 与核对"
    1：整数低维为 $\mathbb Z/6$、高维零；模 2 两维均一维，模 5 两维均零。2：$1-2+1=0$。3：次数 $0,1,2,3$ 各一维。

<div class="admonition question" data-exercise="algebraic-homology-cellular-coefficients"></div>
<noscript>即时反馈需要 JavaScript；正文习题与分步提示仍可直接阅读。</noscript>

## 6. 参考书目

- Allen Hatcher. *Algebraic Topology*, Cambridge University Press, 2002.
- Glen E. Bredon. *Topology and Geometry*, Springer, 1993.

本章以原创文字组织标准数学内容。标为“引用定理”的结果未在本章证明，不将其与已给出的证明混为一谈。
