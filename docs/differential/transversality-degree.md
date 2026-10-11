# D2 · 横截性、交叉与映射度

<div class="chapter-meta">研究生课程 · 先修：D1、H3、Q2；紧致一维流形的区间/圆周分类<br>学习方式：先独立重构证明，再完成书面练习和即时自检。实验只检验指定有限输入。</div>

## 1. 直观解释

横截性表示两个对象相交时有足够独立的方向。它让解集成为流形，并把有符号解的数量变成在变形下不变的拓扑量。

## 2. 严格定义

映射 $f:M\to N$ 横截（transverse）于嵌入子流形 $S\subset N$，记 $f\pitchfork S$，若所有 $f(p)\in S$ 都满足 $df_p(T_pM)+T_{f(p)}S=T_{f(p)}N$。

对连通闭定向同维流形 $M^n,N^n$，正则值 $y$ 的几何度候选为 $\sum_{x\in f^{-1}(y)}\operatorname{sgn}\det df_x$；导数符号用两边定向比较。

## 3. 定理与证明

**定理 D2.1（横截原像）。** 若 $f\pitchfork S$，则 $f^{-1}(S)$ 是余维 $\operatorname{codim}S$ 的子流形。
**证明。** 在 $S$ 的子流形坐标中，$S$ 为后 $c$ 个坐标为零。横截条件正是后 $c$ 个坐标复合 $f$ 的导数满射，应用 D1.2。$\square$

**引用定理（Sard）。** 对 $C^r$ 映射 $M^m\to N^n$，若整数 $r>\max(m-n,0)$，临界值集在目标坐标中为 Lebesgue 零测集。本文全用光滑映射，满足该假设；Sard 的测度论证明作为外部依赖。

**定理 D2.2（参数横截性）。** 设光滑 $F:M\times P\to N$ 横截于 $S$，则除 $P$ 中零测参数集外，$F_a:M\to N$ 横截于 $S$。
**证明。** $W=F^{-1}(S)$ 是流形。对投影 $\pi:W\to P$ 应用 Sard。设 $(x,a)\in W$，把 $dF$ 复合到法商空间 $T_yN/T_yS$，写为满射 $L:T_xM\oplus T_aP\to Q$。$d\pi:\ker L\to T_aP$ 满射当且仅当 $L(T_xM)=Q$：若投影满射，可消去任意参数向量的 $L$ 值，再用 $L$ 的总满射；反向对每个参数向量选择位置向量抵消其像即可。右侧正是 $F_a\pitchfork S$。$\square$

**命题 D2.3（度的计数公式）。** 用 $f_*[M]=d[N]$ 定义的同调度满足

$$
d=\sum_{x\in f^{-1}(y)}\operatorname{sgn}\det df_x
$$

对每个正则值 $y$ 成立，且在同伦下不变。

**证明。** 正则逆像是紧离散集合，故有限。取各点互不相交坐标球及目标小球，逆函数定理给局部微分同胚。比较绝对顶维同调到相对群 $H_n(N,N\setminus\{y\})$ 的映射；定义域的相对群由切除分解成各 $H_n(M,M\setminus\{x\})\cong\mathbb Z$ 的直和。基本类限制到每个局部定向生成元，每个局部同胚送出 $+1$ 或 $-1$，自然性给出总和。使用的基本类/局部定向兼容性是标准流形定向定理；对有限 PL 剖分它可由 Q2 的顶维循环直接核对。H1 的同伦不变性使整数 $d$ 与同伦无关。$\square$

若光滑同伦及其端点均横截一个值，其逆像是紧一维流形，边界的带符号总和为零，也给相同的计数不变性。这一论证需要同伦横截，可由相对横截逼近定理安排；不把一般同伦自动当成横截。

## 4. 正例与反例

**正例。** 圆周 $z\mapsto z^k$ 的度为 $k$（负数代表反向）。球面反足映射度为 $(-1)^{n+1}$，因为它延伸为 $\mathbb R^{n+1}$ 的线性映射 $-I$，比较球面边界定向得到行列式符号。

**反例。** $f(x)=x^2$ 与零值不横截，解集虽然在这个特例仍是一个点，却不能用满秩公式判断其维数。没有符号的正则逆像点数只在模 2 意义下稳定，一对相反局部度的解可在变形中产生或消失。

## 5. 练习

1. 求直线 $y=0$ 与抛物线 $y=x^2$ 在原点是否横截。
2. 证明度非零的闭定向同维流形映射必满射。
3. 求 $S^2$ 反足映射的度。

??? tip "提示 1"
    1：比较两个切线。2：不在像中的点也是正则值。
??? tip "提示 2 与核对"
    1：两切线重合，非横截。2：空逆像使度为零，取逆否。3：$-1$。

<div class="admonition question" data-exercise="differential-transversality-degree"></div>
<noscript>即时反馈需要 JavaScript；正文习题与分步提示仍可直接阅读。</noscript>

## 6. 参考书目

- John M. Lee. *Introduction to Smooth Manifolds*, 2nd ed., Springer, 2013.
- Victor Guillemin and Alan Pollack. *Differential Topology*, Prentice-Hall, 1974.
- John Milnor. *Morse Theory*, Princeton University Press, 1963.

本章以原创文字组织标准数学内容。标为“引用定理”的结果未在本章证明，不将其与已给出的证明混为一谈。
