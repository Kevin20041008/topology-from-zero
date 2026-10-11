# Q1 · 上链、泛系数与杯积环

<div class="chapter-meta">研究生课程 · 先修：H1–H3；Hom、张量积与对偶空间<br>学习方式：先独立重构证明，再完成书面练习和即时自检。实验只检验指定有限输入。</div>

## 1. 直观解释

上链给链赋值，上同调记录哪些赋值只依赖同调类。杯积进一步记录不同维度的类如何相互作用，因此仅有各维群的列表还不够。

## 2. 严格定义

整数奇异上链 $C^n(X;G)=\operatorname{Hom}(C_n(X;\mathbb Z),G)$，余边界（coboundary）$\delta\varphi=\varphi\partial$，$H^n=\ker\delta/\operatorname{im}\delta$。若系数为交换环 $R$，定义杯积（cup product）

$$
(\varphi\smile\psi)(\sigma)=\varphi(\sigma|[v_0,\ldots,v_p])\,\psi(\sigma|[v_p,\ldots,v_{p+q}]).
$$

这里 $|\varphi|=p,|\psi|=q$，共享顶点 $v_p$ 不能遗漏。

## 3. 定理与证明

**命题 Q1.1。** $\delta^2=0$，并且

$$
\delta(\varphi\smile\psi)=\delta\varphi\smile\psi+(-1)^p\varphi\smile\delta\psi.
$$

**证明。** 第一式由 $\partial^2=0$。第二式在一个 $(p+q+1)$ 单形上展开交错面和：删除共享点之前的顶点给第一项，之后的给第二项；两次展开中跨越前后面分界的项出现两次，符号相反。其余项恰等于左式按删点位置划分的全部项。故循环的杯积仍为循环。若把闭上链 $\varphi$ 换为 $\varphi+\delta a$，杯积变化为 $\delta(a\smile\psi)$；若换第二个代表，变化为 $(-1)^p\delta(\varphi\smile b)$。所以杯积降到上同调，结合律由连续切取前、中、后三段顶点直接成立。$\square$

**命题 Q1.2（域上的对偶）。** 对域 $k$ 上链复形，评价给自然同构 $H^n(\operatorname{Hom}(C,k))\cong\operatorname{Hom}(H_n(C),k)$。

**证明。** 闭上链恰在 $B_n$ 上消失，因此限制到 $Z_n$ 给同调上的线性泛函。任一这样的泛函先定义在 $Z_n$ 上，再选补空间延拓到 $C_n$，故满射。若它在 $Z_n$ 上也零，则经 $C_n/Z_n\cong B_{n-1}$ 分解；延拓此泛函到 $C_{n-1}$ 得 $\varphi=\psi\partial=\delta\psi$，核正是余边界。$\square$

**命题 Q1.3（有限自由整数链的上同调泛系数）。**

$$
0\to\operatorname{Ext}(H_{n-1}(C),G)\to H^n(\operatorname{Hom}(C,G))\to\operatorname{Hom}(H_n(C),G)\to0,
$$

其中 $\operatorname{Ext}(\mathbb Z/m,G)=G/mG$，自由项的 Ext 为零。

**证明。** 使用 H3.2 的单项及二项块分解；$\operatorname{Hom}(-,G)$ 将 $\mathbb Z\xrightarrow m\mathbb Z$ 变成反向上链 $G\xrightarrow{m}G$，低次群为 $G[m]=\operatorname{Hom}(\mathbb Z/m,G)$，高次群为 $G/mG$。合并得到结论与非自然分裂；评价给右侧的自然映射。$\square$

**引用定理（分次交换性）。** 在上同调上 $a\smile b=(-1)^{pq}b\smile a$。证明需要比较前后面对角近似的链同伦（可用 cup-one 操作），本章不把链级杯积误称为严格交换。空间乘积的杯积与外积的兼容性也采用标准 Eilenberg–Zilber 比较定理。

## 4. 正例与反例

**正例。** 环面 $T^2=S^1\times S^1$ 有一维类 $a,b$，$a^2=b^2=0$，$ab$ 是二阶生成元，$ba=-ab$；这是 $\Lambda_{\mathbb Z}(a,b)$。平方为零也可由拉回圆周上的 $H^2=0$ 证明，不必从 $2a^2=0$ 猜测。

**反例。** $S^1\vee S^1\vee S^2$ 与 $T^2$ 的各维整数同调群相同，却杯积不同：楔和的 $H^2$ 限制到 $S^2$ 为同构，而所有一阶类限制到 $S^2$ 为零，故所有一阶杯积为零。因而二者不可能同伦等价。$\mathbb{RP}^2$ 的 $H^1(-;\mathbb Z)=0,H^2(-;\mathbb Z)=\mathbb Z/2$，显示不能只把整数同调机械地取对偶。

## 5. 练习

1. 检查 $p=q=1$ 时杯积 Leibniz 式中的负号。
2. 用 Q1.3 计算 $\mathbb{RP}^2$ 的整数上同调。
3. 说明为什么奇数次类的平方在特征 2 中不被分次交换性强迫为零。

??? tip "提示 1"
    2：二次上同调接收 $\operatorname{Ext}(\mathbb Z/2,\mathbb Z)$。3：先只推出 $2a^2=0$。
??? tip "提示 2 与核对"
    1：$\delta(\varphi\smile\psi)=\delta\varphi\smile\psi-\varphi\smile\delta\psi$。2：$H^0=\mathbb Z,H^1=0,H^2=\mathbb Z/2$。3：特征 2 中该等式不施加新限制。

<div class="admonition question" data-exercise="algebraic-cohomology-cochains-products"></div>
<noscript>即时反馈需要 JavaScript；正文习题与分步提示仍可直接阅读。</noscript>

## 6. 参考书目

- Allen Hatcher. *Algebraic Topology*, Cambridge University Press, 2002.
- Glen E. Bredon. *Topology and Geometry*, Springer, 1993.

本章以原创文字组织标准数学内容。标为“引用定理”的结果未在本章证明，不将其与已给出的证明混为一谈。
