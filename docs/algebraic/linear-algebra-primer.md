# 代数预备 · 链群与线性商空间

<div class="chapter-meta">先修：集合、有限求和、模 2 加法；建议：阅读 45 分钟，练习 35 分钟<br>目标：为第三章的链群、核、像与商空间维数公式建立可手算的基础。</div>

## 1. 直观解释：链记录选择，商空间记录差别

在二元域（binary field）$\mathbb F_2=\{0,1\}$ 上，$1+1=0$。一条链可用一串零一数记录选中了哪些边。例如三个边的链 $(1,0,1)$ 选中第一条与第三条；同一条边加两次会抵消。

线性商空间（quotient vector space）不是简单删除一组向量，而是把相差某个子空间中向量的元素视为同一类。同调中先限制到循环空间，再把边界视为零。次序不能颠倒，也不能对任意子集直接取这种商。

## 2. 严格定义

**定义 E.1。** 对有限集合 $S$，$\mathbb F_2^S$ 是全部坐标函数 $S\to\mathbb F_2$，逐坐标加法与数乘使它成为向量空间（vector space）。对每个 $s\in S$，单位向量 $e_s$ 仅在 $s$ 处为 $1$。每个向量唯一写成 $\sum_{s\in S}a_se_s$，称这组单位向量为基（basis）。这里的线性代数“基”与拓扑基不是同一个概念。

向量的线性组合（linear combination）是有限和 $\sum_i a_iv_i$。如果只有全部系数为零时该和才为零，称这组向量线性无关（linearly independent）；由全部线性组合组成的集合称为张成空间（span）。一组基是线性无关且张成全空间的向量组，基中向量的个数为维数（dimension）。

本章始终使用有限维 $\mathbb F_2$ 空间。维数不依赖基的选择：若基有 $r$ 个向量，唯一表达给出恰好 $2^r$ 个空间元素；另一组含 $s$ 个向量的基则给出 $2^s$ 个同样的元素，所以 $r=s$。子空间的基可从其有限个元素中依次选择尚未被已有向量张成的元素得到。

**定义 E.2。** 子空间（linear subspace）$B\subseteq V$ 包含零向量且对加法、数乘封闭。线性映射（linear map）$D:V\to W$ 满足 $D(av+bw)=aD(v)+bD(w)$。核（kernel）是 $\ker D=\{v:D(v)=0\}$，像（image）是 $\operatorname{im}D=\{D(v):v\in V\}$，秩（rank）是像的维数。直接应用线性性可知核、像都是子空间。

**定义 E.3。** 若 $B\subseteq Z$ 为向量空间的子空间，定义 $z\sim z'$ 当且仅当 $z-z'\in B$。在 $\mathbb F_2$ 上减法等于加法。等价类为陪集（coset）$z+B=\{z+b:b\in B\}$，全部陪集组成 $Z/B$。

**定义 E.4。** 对有限单纯复形 $K$，以全部 $k$ 维单形组成的集合 $K_k$ 作坐标集，链群（chain group）就是 $C_k=\mathbb F_2^{K_k}$；“群”指其加法群，它同时是向量空间。若边界映射满足 $\partial_k\partial_{k+1}=0$，则 $Z_k=\ker\partial_k$、$B_k=\operatorname{im}\partial_{k+1}$ 且 $B_k\subseteq Z_k$，因而可取同调 $H_k=Z_k/B_k$。第三章会定义边界并证明复合为零。

## 3. 定理与证明

**命题 E.5（商运算良定义）。** E.3 是等价关系，且 $[z]+[w]=[z+w]$、$a[z]=[az]$ 使 $Z/B$ 成为向量空间。

**证明。** $z-z=0\in B$ 给自反性；$z-z'\in B$ 蕴含其负数在 $B$ 中，给对称性；两个这样的差相加给传递性。若 $z'=z+b_1,w'=w+b_2$，则 $(z'+w')-(z+w)=b_1+b_2\in B$，且 $az'-az=ab_1\in B$，所以运算不依赖代表元。结合、交换、分配等公理由代表元上的运算传递，零元为 $B=[0]$，加法逆元为 $[-z]$。$\square$

**定理 E.6（商空间维数）。** 若 $Z$ 有限维且 $B\subseteq Z$ 是子空间，则 $\dim(Z/B)=\dim Z-\dim B$。

**证明。** 取 $B$ 的基 $b_1,\ldots,b_r$，扩充为 $Z$ 的基 $b_1,\ldots,b_r,z_1,\ldots,z_m$。有限维中的扩充可逐次从一个有限生成组中加入尚未被张成的向量，故会结束。任意向量模 $B$ 后只剩 $[z_i]$ 的线性组合，故它们张成商空间。若 $\sum_i a_i[z_i]=0$，则 $\sum_i a_iz_i\in B$，可写成 $b_j$ 的线性组合；整组基的线性无关性迫使全部 $a_i=0$。故 $[z_1],\ldots,[z_m]$ 是商空间的基，维数 $m=\dim Z-r$。$\square$

**定理 E.7（秩–零度，rank–nullity）。** 对有限维线性映射 $D:V\to W$，有 $\dim V=\dim\ker D+\operatorname{rank}D$。

**证明。** 取核的基 $k_1,\ldots,k_r$，扩充为 $V$ 的基 $k_1,\ldots,k_r,v_1,\ldots,v_m$。任意像向量只由 $D(v_i)$ 张成。若 $\sum_i a_iD(v_i)=0$，则 $\sum_i a_iv_i\in\ker D$；以 $k_j$ 表示后，由整组基独立得全部 $a_i=0$。所以 $D(v_i)$ 是像的基，秩为 $m$，结论成立。$\square$

**推论 E.8。** 若 $D_k,D_{k+1}$ 是相邻边界矩阵且 $D_kD_{k+1}=0$，$n_k=\dim C_k$，则

$$
\beta_k=\dim H_k=n_k-\operatorname{rank}D_k-\operatorname{rank}D_{k+1}.
$$

**证明。** 复合为零保证 $B_k\subseteq Z_k$。由 E.7，$\dim Z_k=n_k-\operatorname{rank}D_k$；再用 E.6 减去 $\dim B_k=\operatorname{rank}D_{k+1}$。$\square$

## 4. 正例与反例

**正例：四个向量变成两类。** 在 $Z=\mathbb F_2^2$ 中取 $B=\{(0,0),(1,1)\}$。商空间的两个元素分别是 $B$ 与 $(1,0)+B=\{(1,0),(0,1)\}$；维数从 $2$ 减至 $1$，而不是剩下两个“未删除的点”。

**正例：三角形的循环。** 按边 $01,02,12$ 排序，边界矩阵为第三章的 $D_1$。方程 $D_1(a,b,c)^T=0$ 等价于 $a+b=a+c=b+c=0$，故循环仅有 $000,111$。没有面时 $B_1=0$，商空间维数为 $1$；加入三角面时 $B_1=\operatorname{span}(111)=Z_1$，商空间只有零类，维数为 $0$。

**反例：任意子集不能充当分母。** 取 $B=\{0,e_1,e_2\}\subseteq\mathbb F_2^2$。若仍用 $x-y\in B$ 定义关系，则 $e_1\sim0$、$0\sim e_2$，但 $e_1\not\sim e_2$，因为 $e_1+e_2\notin B$。传递性已经失败。

**反例：没有包含关系不能套用维数相减。** 在 $\mathbb F_2^2$ 中，$Z=\operatorname{span}(e_1)$、$B=\operatorname{span}(e_2)$ 各自是一维子空间，但 $B\nsubseteq Z$。$e_1+B$ 甚至不包含于 $Z$；E.6 的前提不成立。链群中先证明边界是循环，正是为了避免这种错误。

## 5. 练习

1. 列出 $\mathbb F_2^3/\operatorname{span}(111)$ 的全部陪集，给出一组商空间基。
2. 令 $D(a,b,c)=(a+b,b+c)$。求核、秩，并验证 E.7。
3. 对 $Z=\operatorname{span}(110,011)$，分别取 $B=0$、$B=\operatorname{span}(101)$、$B=Z$，求商维数。先核对 $B\subseteq Z$。
4. 为什么实数域中的无符号边界矩阵不能直接替代模 2 矩阵？用第三章三角形的三列之和说明。

??? tip "分步提示 1：先写出子空间"
    1：每类有两个向量，彼此相差 $111$。2：先令输出为零。3：$101=110+011$。4：实数中的 $1+1$ 不等于零。

??? tip "分步提示 2：结果与检查"
    1：四类可取代表 $000,100,010,110$，基可取 $[100],[010]$。2：核为 $\{000,111\}$，维数 $1$；像是 $\mathbb F_2^2$，秩 $2$。3：商维数依次为 $2,1,0$。4：三列之和在实数下为 $(2,2,2)^T$，模 2 下才为零；实系数链还需选方向并使用正负号。

<div class="admonition question" data-exercise="linear-quotient"></div>
<noscript>即时反馈需启用 JavaScript；上方练习及两级提示可直接阅读。</noscript>

## 6. 参考书目

- Sheldon Axler. *Linear Algebra Done Right*, 4th ed. Springer, 2024. 有限维向量空间、核与像、商空间。
- Allen Hatcher. *Algebraic Topology*. Cambridge University Press, 2002. 链复形与同调群。

本章按有限模 2 计算的需要独立组织说明、证明和例题，没有复制参考书正文或解答。
