# H2 · 八题完整解答

[返回 H2 · 相对同调、切除与 Mayer–Vietoris](../algebraic/homology/exact-excision.md)。以下均为整数系数；锥只作用于实向量空间中的仿射参数链，普通与增广边界分别注明。每题请先独立论证，再核对假设和符号。

## 1. 圆盘对与低维端点

$D^n$ 非空可缩，所以正维同调为零，普通零维为 $\mathbb Z$。$S^{n-1}$ 非空，其 $H_0$ 到圆盘 $H_0$ 的映射把每个道路分支的点送到同一个生成元，因此满射，空间对长正合列给 $H_0(D^n,S^{n-1})=0$。

在 $k\ge1$ 次，用增广空间对短正合列得到

$$0=\widetilde H_k(D^n)\longrightarrow H_k(D^n,S^{n-1})
\xrightarrow{\delta}\widetilde H_{k-1}(S^{n-1})\longrightarrow\widetilde H_{k-1}(D^n)=0.$$

因此 $\delta$ 是同构。球面群在正文由 Mayer–Vietoris 归纳而得，未用胞腔同调，所以右侧仅在 $k=n$ 时为 $\mathbb Z$，其他次数零。

$n=1$ 时，$S^0$ 有两个点，$\widetilde H_0(S^0)$ 是系数和的核，秩一；误用普通 $H_0(S^0)=\mathbb Z^2$ 会把答案算成秩二。按连接映射定义，相对循环 $z$ 的像为 $[\partial z]$。选择球面群的一组方向生成元后，它在此同构下的唯一逆像就是相对生成元；这说明生成元选择的符号关系，不额外假设一个已经三角剖分好的圆盘基本链。区间 $D^1$ 中可直接用从一端到另一端的路径给出这个相对类。

## 2. 圆周的 Mayer–Vietoris 连接

$\alpha$ 从 $p$ 沿下半圆到 $q$，完全落在 $U$；$\beta$ 从 $q$ 沿上半圆回 $p$，完全落在 $V$。故

$$\partial\alpha=[q]-[p],\qquad\partial\beta=[p]-[q],\qquad
z=\alpha+\beta\text{ 是循环}.$$

使用有序覆盖 $(U,V)$，链提升选为 $(\alpha,\beta)$，所以

$$\delta[z]=[q]-[p]\in H_0(U\cap V).$$

交集去掉南北极后有左右两个道路分支，$p,q$ 分别位于不同分支。由 H1.3，$H_0(U\cap V)\cong\mathbb Z[p]\oplus\mathbb Z[q]$；其约化群为系数和的核，正由 $[q]-[p]$ 生成。由于 $U,V$ 可缩，约化 Mayer–Vietoris 给 $H_1(S^1)\xrightarrow{\delta}\widetilde H_0(U\cap V)$ 为同构，因此 $[z]$ 也是 $H_1(S^1)$ 的生成元。这个推理先证明其像是生成元，再由正合列证明源也是，未预先借用绕数或胞腔计算。

交换覆盖为 $(V,U)$ 时，用 $(\beta,\alpha)$ 提升同一 $z$，连接值改为 $\partial\beta=[p]-[q]$，即原值的负数。不能只交换直和两项却忘记第一箭头的符号也随之调整。

## 3. 有限次细分的链同伦与量词

因 $\mathrm{Sd}\partial=\partial\mathrm{Sd}$，对每个 $j\ge0$ 有

$$\partial(T\mathrm{Sd}^j)+(T\mathrm{Sd}^j)\partial
=(\partial T+T\partial)\mathrm{Sd}^j
=\mathrm{Sd}^j-\mathrm{Sd}^{j+1}.$$

对 $j=0,\ldots,N-1$ 求和，内部项抵消，得 $\partial T_N+T_N\partial=\mathrm{id}-\mathrm{Sd}^N$。$N=0$ 是空和，等式两边均零。每个 $\mathrm{Sd}^j$ 和 $T$ 的生成项都留在原单形像内，故其复合及有限和保持子空间和覆盖小链。

量词是“对每条有限链 $c$，存在 $N(c)$”；它不是“存在 $N$，对每条链成立”。即使人为为各链选一个 $N(c)$，也未证明

$$\mathrm{Sd}^{N(c+d)}(c+d)=\mathrm{Sd}^{N(c)}c+\mathrm{Sd}^{N(d)}d,$$

因此这个逐链过程不是已经定义好的线性链映射。H2.2 的满射与单射证明只需对当前有限循环及有限填充链选择共同次数，足以得到包含诱导的同调同构；它没有将这个选择包装为全局链同伦逆。不能反过来声称这样的逆在任何其他构造下都不存在，本题只指出当前论证尚未构造它。

## 4. 增广锥与常值边

在增广仿射链中，$\partial[v]=[]$、$b*[]=[b]$，于是

$$\partial(b*[v])=\partial[b,v]=[v]-[b]=[v]-b*\partial[v].$$

若将 $\partial[v]$ 错当成普通零边界，会丢掉 $-[b]$。这说明构造阶段需要增广，不能任意混用链复形。

令 $m=(a+b)/2$。$\mathrm{Sd}[a,b]=[m,b]-[m,a]$，又 $T_0=0$，所以

$$T[a,b]=m*([a,b]-[m,b]+[m,a])
=[m,a,b]-[m,m,b]+[m,m,a].$$

逐项边界为

$$
\begin{aligned}
\partial[m,a,b]&=[a,b]-[m,b]+[m,a],\\
\partial[m,m,b]&=[m,m],\\
\partial[m,m,a]&=[m,m].
\end{aligned}
$$

后两项连同原来的正负号抵消，给 $\partial T[a,b]=[a,b]-\mathrm{Sd}[a,b]$。它们可能相互抵消，不能据此把任意退化单形规定为零。

若 $a=b=v$，$\partial[v,v]=[v]-[v]=0$，所以细分为零；三个锥项的总系数为 $1-1+1=1$，给 $T[v,v]=[v,v,v]$。其边界也是 $1-1+1$ 倍的 $[v,v]$，等于 $[v,v]$。在当前未取退化商的奇异链模型中，这个非零链恰好是同伦式右侧所需的项。

## 5. 网格直径的明确界

令 $D=\max_{i,j}\|v_i-v_j\|$。对凸包内 $x=\sum_i\alpha_iv_i,y=\sum_j\beta_jv_j$，非负系数各自和为一，有

$$\|x-y\|=\left\|\sum_{i,j}\alpha_i\beta_j(v_i-v_j)\right\|
\le\sum_{i,j}\alpha_i\beta_jD=D.$$

原顶点也在凸包内，所以凸包直径恰为最大顶点距离。

细分单形的顶点是一条嵌套非空指标子集旗标的重心。对 $S\subsetneq R$、$|S|=s,|R|=r\le n+1$，

$$b_R-b_S=\frac{r-s}{r}(b_{R\setminus S}-b_S),$$

两侧重心都在原凸包，故距离至多 $((r-s)/r)D\le(n/(n+1))D$。任意两旗标顶点都可这样比较，再用凸包直径结论即得网格界。重复顶点不会破坏估计，因为指标子集大小仍按位置计算。

当 $n\ge1,D>0$ 时，令 $q=n/(n+1)\in(0,1)$。任取整数

$$N\ge0,\qquad N>\frac{\log(D/\lambda)}{\log((n+1)/n)}$$

即可保证 $q^ND<\lambda$。例如取右侧实数的下取整加一，再与零取最大值；若 $D<\lambda$，可直接取 $N=0$。$D=\lambda$ 时 $N=0$ 不满足严格不等号，应至少细分一次。零单形和 $D=0$ 单独处理，直径已经为零且覆盖成员包含该参数点。

这个界发生在参数单形的赋范度量中；不对任意连续奇异单形的像宣称同一缩小比率。正确做法是把覆盖拉回参数域，再使用其 Lebesgue 数。

## 6. 相对小链单射的两个余项

小相对循环 $z$ 意味着 $z\in C_n^{\mathcal U}(X)$ 且 $\partial z\in C_{n-1}^{\mathcal U}(A)$。若它在大商中为边界，存在有限链 $b\in C_{n+1}(X)$、$a\in C_n(A)$ 满足 $z=\partial b+a$。为 $b,a$ 分别选足够细分次数，再取最大值 $N$，使 $\mathrm{Sd}^Nb$、$\mathrm{Sd}^Na$ 都小。

结合链同伦式与给定等式，

$$
\begin{aligned}
z&=\mathrm{Sd}^Nz+\partial T_Nz+T_N\partial z\\
 &=\partial(\mathrm{Sd}^Nb+T_Nz)+(\mathrm{Sd}^Na+T_N\partial z).
\end{aligned}
$$

第一括号小：第一项按选择小，第二项由 $z$ 原本小且 $T_N$ 支撑保持而小。第二括号在 $A$ 中：$a$ 在 $A$、$\partial z$ 在 $A$，而细分和同伦都保持子空间；它又是小链，因为 $\mathrm{Sd}^Na$ 按选择小，$T_N\partial z$ 从原本小的 $\partial z$ 得来。因此模掉小的 $A$ 链后，$z$ 是第一括号的边界。

整个论证没有设 $\partial z=0$。恰恰是保留下来的 $T_N\partial z$ 说明相对证明比绝对循环证明多了一项责任。

## 7. 连接映射的自然性及覆盖次序

对抽象短正合列，取循环 $c$ 和提升 $b$，令 $i(a)=\partial b$。在交换链映射 $f_A,f_B,f_C$ 下，$q'f_Bb=f_Cc$，所以 $f_Bb$ 可作为目标循环的提升。再由

$$\partial f_Bb=f_B\partial b=f_Bi(a)=i'f_A(a),$$

得 $\delta' f_{C*}[c]=f_{A*}\delta[c]$。这一证明使用实际提升，不只依赖两个群抽象同构。

对有序开覆盖，$f(U)\subseteq U'$、$f(V)\subseteq V'$ 保证 $f_\#$ 把交集链、两个直和项及小链都送到对应项。第一箭头仍为 $(w,-w)$，最后箭头仍为相加，因此短正合列方块交换。选 $z'=a+b$ 后，目标连接代表为 $\partial f_\#a=f_\#\partial a$，正是原连接代表的推前。小链包含同构也自然，所以这给 $H_n(X)$ 上的连接自然性。

若只交换同一空间的覆盖次序，新分解为 $b+a$，第一分量的边界为 $\partial b=-\partial a$。因此新连接映射为原映射的负数。在两条短正合列之间，交换直和两个因子的映射将 $(w,-w)$ 送到 $(-w,w)$；要让方块交换，交集项需同时取 $-\mathrm{id}$。这与连接值的符号改变一致。

## 8. 两个遗漏假设的反例

第一例中 $X=[0,1]$ 可缩，$A=\{0,1\}$ 的 $H_0=\mathbb Z^2$，$H_1=0$。空间对长正合列给

$$0\to H_1(X,A)\xrightarrow{\delta}\mathbb Z^2\xrightarrow{(r,s)\mapsto r+s}\mathbb Z\to H_0(X,A)\to0.$$

所以 $H_1(X,A)\cong\mathbb Z$、$H_0(X,A)=0$；更高次因区间及有限点集的正维群均零，也全部为零。删去 $Z=\{0\}$ 后，$(0,1]$ 可缩到 $1$，包含 $\{1\}\hookrightarrow(0,1]$ 在零次为同构，正维群都零，长正合列给所有相对群零。原有非零一次类消失。遗漏的是 $\overline Z\subseteq\operatorname{int}_X A$；这里右边为空。

第二例中 $U=[0,1),V=\{1\}$ 各非空可缩，$U\cap V=\varnothing$。若不要求两者开放就套用普通 Mayer–Vietoris，在 $H_0(U)\oplus H_0(V)$ 处需有

$$\operatorname{im}(0\to\mathbb Z^2)=\ker(\mathbb Z^2\xrightarrow{+}\mathbb Z).$$

左边为零，右边为 $\mathbb Z(1,-1)$，故不正合。$U$ 确实在 $X$ 中开，失败来自 $V$ 不是开集；不能把“两成员都开”的充分假设弱化成“覆盖且至少一成员开”。这里没有否认其他特殊非开覆盖也可能满足切除条件，只否认对任意覆盖的无条件推广。
