# G1 · 高阶同伦、纤维化与谱序列入口

<div class="chapter-meta">研究生课程 · 先修：F1–F2、C1–C2、H1–H3、Q1–Q2；过滤链复形<br>学习方式：先独立重构证明，再完成书面练习和即时自检。实验只检验指定有限输入。</div>

## 1. 直观解释

前面四个单元构成可连续学习的主线。研究生后续计算还需要区分高阶同伦与同调，并理解谱序列只是逐步读取一个过滤对象，而不是“自动给出答案”的表格。

## 2. 严格定义

高阶同伦群（higher homotopy group）$\pi_n(X,x_0)$ 为 $(I^n,\partial I^n)\to(X,x_0)$ 的相对边界同伦类。Serre 纤维化（Serre fibration）具有对所有圆盘 $D^k$ 的同伦提升性质。

链复形的有限递增过滤 $0=F_{-1}C\subset F_0C\subset\cdots\subset F_NC=C$ 满足 $dF_p\subset F_p$。谱序列（spectral sequence）是一列双分次群与微分，$E_{r+1}=H(E_r,d_r)$。本章用同调型指标，$d_r:E_r^{p,q}\to E_r^{p-r,q+r-1}$。

## 3. 定理与证明

**命题 G1.1。** $n\ge2$ 时 $\pi_n$ 是阿贝尔群。
**证明。** 沿第一坐标和第二坐标拼接给两种运算，常值映射是共同单位。把方块分为四个小块可直接验证交换律的前提：$(a\circ b)*(c\circ d)=(a*c)\circ(b*d)$，参数重标定给端点固定同伦。于是 $a*b=(a\circ e)*(e\circ b)=(a*e)\circ(e*b)=a\circ b$，再用 $(e\circ a)*(b\circ e)$ 得 $a*b=b*a$。这是 Eckmann–Hilton 论证。$\square$

**命题 G1.2（有限过滤构造）。** 令 $n=p+q$，$Z_r^p(C_n)=\{x\in F_pC_n:dx\in F_{p-r}C_{n-1}\}$。对 $r\ge1$ 定义

$$
E_r^{p,q}=Z_r^p(C_n)\big/\bigl(Z_{r-1}^{p-1}(C_n)+dZ_{r-1}^{p+r-1}(C_{n+1})\bigr).
$$

过滤超出范围按零或全体延拓，$Z_0^p=F_pC$。则 $[x]\mapsto[dx]$ 定义 $d_r$，且 $E_{r+1}=H(E_r,d_r)$；最终稳定页为过滤同调的关联分次群。

**证明。** 分母第一项的微分落在 $F_{p-r}$ 并在目标成为边界型分母，第二项微分为零，故良定义且平方零。若 $d_r[x]=0$，写 $dx=u+dv$，其中 $u\in Z_{r-1}^{p-r-1}$、$v\in Z_{r-1}^{p-1}$；用同一页等价的 $x-v$ 代替 $x$ 后，其微分落在 $F_{p-r-1}$，即来自 $Z_{r+1}^p$。反过来这种代表显然在核中。模掉 $d_r$ 的像恰将分母扩大为 $Z_r^{p-1}+dZ_r^{p+r}$，得下一页公式。$r>N+1$ 时，分子为 $F_pC_n$ 中真循环，第二类分母为落在 $F_p$ 中的全部边界，第一类分母为 $F_{p-1}$ 中循环；商即 $F_pH_n/F_{p-1}H_n$。$\square$

**引用定理与使用边界。** 带基点 Serre 纤维化有同伦长正合列，低维端项须作为带作用的带基点集合处理。若 CW 复形 $X$ 为 $(n-1)$ 连通且 $n\ge2$，Hurewicz 定理给 $\widetilde H_i(X;\mathbb Z)=0$（$i<n$）及 $\pi_n(X)\cong H_n(X;\mathbb Z)$。

这里使用如下明确的 Serre 同调谱序列版本：$F\to E\to B$ 为 Serre 纤维化，$B$ 是单连通 CW 复形，纤维 $F$ 道路连通且有 CW 同伦型，取域系数 $k$。存在第一象限谱序列 $E^2_{p,q}=H_p(B;H_q(F;k))$，收敛到 $H_{p+q}(E;k)$；单连通性使此处局部系数作用平凡。对每个总次数 $n$，稳定项给 $H_n(E;k)$ 有限过滤的关联分次项，不自动给出规范分裂。完整几何构造未在本教材展开；参考 [Hatcher, *Spectral Sequences in Algebraic Topology*, 第1章第1节](https://pi.math.cornell.edu/~hatcher/SSAT/SSATpage.html)。本章已写的是过滤的代数机制，不能据此宣称证明了这些几何定理或任意基空间下的一般收敛版本。

**条件推导。** 使用纤维化长正合列，Hopf 纤维化 $S^1\to S^3\to S^2$ 给 $\pi_2(S^2)\cong\pi_1(S^1)=\mathbb Z$：$\pi_2(S^3)=0$（由胞腔逼近定理），$\pi_1(S^3)=0$。这里纤维化长正合列和胞腔逼近均为明确引用；不能把这段应用误读为从零建立的独立证明。

## 4. 正例与反例

**正例。** 过滤中只有一个非零列时，全部后续微分为零，稳定页就是同调。

**反例。** 稳定页只给关联分次群：过滤 $\mathbb Z/4$ 的子群 $2\mathbb Z/4$，以及 $\mathbb Z/2\oplus\mathbb Z/2$ 的第一因子，都给两层 $\mathbb Z/2$，总群却不同。因此“谱序列塌缩”不等于已经解决群扩张问题。

## 5. 练习

1. 用 G1.1 的论证指出为什么不能用于一般基本群。
2. 构造只有一个非零微分的两列过滤链复形并计算两页。
3. 证明上述两个阶为四的群不同构。

??? tip "提示 1"
    1：一维区间没有两个独立拼接方向。2：取 $C_1=C_0=\mathbb Z,d=1$，生成元过滤次数分别为 1 和 0。
??? tip "提示 2 与核对"
    2：$E_1^{1,0}=E_1^{0,0}=\mathbb Z$，$d_1=1$，$E_2=0$。3：前者有四阶元素，后者没有。

<div class="admonition question" data-exercise="algebraic-graduate-tools"></div>
<noscript>即时反馈需要 JavaScript；正文习题与分步提示仍可直接阅读。</noscript>

## 6. 参考书目

- Allen Hatcher. *Algebraic Topology*, Cambridge University Press, 2002.
- Glen E. Bredon. *Topology and Geometry*, Springer, 1993.
- John McCleary. *A User’s Guide to Spectral Sequences*, 2nd ed., Cambridge University Press, 2001.

本章以原创文字组织标准数学内容。标为“引用定理”的结果未在本章证明，不将其与已给出的证明混为一谈。
