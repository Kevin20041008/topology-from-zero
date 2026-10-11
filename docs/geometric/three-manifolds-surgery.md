# T4 · 三维流形、Dehn 填充与配边

<div class="chapter-meta">研究生课程 · 先修：T2–T3、F2、H2–H3、D4<br>学习方式：先独立重构证明，再完成书面练习和即时自检。实验只检验指定有限输入。</div>

## 1. 直观解释

三维流形可由带边界块粘合而成。粘合映射携带重要信息：两个相同的实体环面，沿不同斜率粘合，会产生不同闭流形。柄和手术提供系统操作，但分类需要更深的工具。

## 2. 严格定义

实体环面（solid torus）$V=D^2\times S^1$ 的边界基为经线 $\mu=\partial D^2\times\{1\}$、纬线 $\lambda=\{1\}\times S^1$。本原斜率（primitive slope）为互素整数系数的无向类 $a\mu+b\lambda$，整体变号视为同一斜率。

Dehn 填充（Dehn filling）把实体环面粘到环面边界，使新经线映到指定斜率。Heegaard 分解（Heegaard splitting）将闭定向三维流形写成两个同亏格把手体沿边界的粘合。定向配边（oriented cobordism）要求紧定向 $(n+1)$ 流形 $W$ 的边界为 $M\sqcup(-N)$。

## 3. 定理与证明

**命题 T4.1（双实体环面的一阶同调）。** 将 $V_2$ 的经线粘到 $V_1$ 边界的 $q\mu_1+p\lambda_1$，其中 $\gcd(p,q)=1$，所得闭流形 $M$ 满足 $H_1(M;\mathbb Z)\cong\mathbb Z/p\mathbb Z$，其中 $p=0$ 时按 $\mathbb Z$ 解释。

**证明。** 设另一边界基映成 $r\mu_1+s\lambda_1$，矩阵行列式 $qs-pr=\pm1$。Mayer–Vietoris 在一阶给两实体环面一阶群的直和，商去边界像；连通的交集使后续 $H_0$ 映射单射，故此商正是 $H_1(M)$。在 $V_1$ 中 $\mu_1=0,\lambda_1=x$，在 $V_2$ 中 $\mu_2=0,\lambda_2=y$，两个关系是 $px=0,sx=y$（选择一致符号后），消去 $y$ 即得结果。$\square$

**命题 T4.2（填充的群）。** 对环面边界的连通三维流形 $E$，按斜率 $\gamma$ 填充后，$\pi_1$ 为 $\pi_1(E)$ 商去边界环路 $\gamma$ 的正规闭包。
**证明。** 使用边界领圈把粘合变成开覆盖，交集形变收缩到环面，附加实体环面基本群由其纬线生成，经线为零。van Kampen 的推挤将经线对应的 $\gamma$ 置一，并将新纬线生成元识别为原边界中的另一基，所以可消去新生成元，只留下该正规关系。$\square$

**命题 T4.3。** 若 $M$ 为闭定向 $n$ 流形，则 $M\sqcup(-M)$ 是一个定向边界。
**证明。** 取乘积定向的 $M\times[0,1]$，边界诱导方向在两端相反；故它给 $M$ 与自身的配边，也给其与反向副本之并的零配边。$\square$

**引用结果及界限。** 每个闭连通定向三维流形有 Heegaard 分解；这可由三维三角剖分或 Morse 柄分解建立。Dehn 手术表示定理说明它也可由 $S^3$ 中带框链环手术得到。素分解、JSJ 分解与几何化定理是进一步分类的核心，均不在这里冒充已证明。定向配边群、手术障碍和高维 $h$-配边还需要额外课程；当前只建立操作与可检验的首批不变量。

## 4. 正例与反例

**正例。** $p=1$ 时上述构造的一阶同调为零；$p=5$ 时为 $\mathbb Z/5$。$p=0,q=1$ 的标准双环面粘合给 $S^2\times S^1$。

**反例。** $H_1=0$ 本身不推出流形为三维球面。例如 Poincaré 同调球面的基本群是非平凡的二元二十面体群；这个例子的存在及群计算作为文献事实引用。仅有同调列表无法替代基本群、链接形式或几何分解。

## 5. 练习

1. 对 $p=7,q=2$，找 $r,s$ 使 $2s-7r=1$。
2. 在此填充中写出消去 $y$ 后的群阿贝尔化关系。
3. 解释定向配边为何比同胚弱：每个闭定向曲面都界定一个三维把手体。

??? tip "提示 1"
    1：解 Bezout 等式。3：属 $g$ 曲面是有 $g$ 个柄的把手体边界。
??? tip "提示 2 与核对"
    1：$r=1,s=4$。2：$7x=0$，得 $\mathbb Z/7$。3：不同亏格曲面同胚类型不同，却都零配边。

<div class="admonition question" data-exercise="geometric-three-manifolds-surgery"></div>
<noscript>即时反馈需要 JavaScript；正文习题与分步提示仍可直接阅读。</noscript>

## 6. 参考书目

- C. P. Rourke and B. J. Sanderson. *Introduction to Piecewise-Linear Topology*, Springer, 1972.
- Dale Rolfsen. *Knots and Links*, AMS Chelsea reprint, 2003.
- John Milnor. *Topology from the Differentiable Viewpoint*, Princeton University Press, 1997.
- John Hempel. *3-Manifolds*, Princeton University Press, 1976.

本章以原创文字组织标准数学内容。标为“引用定理”的结果未在本章证明，不将其与已给出的证明混为一谈。
