# T3 · 结、环境同痕与补空间群

<div class="chapter-meta">研究生课程 · 先修：F2、C1；T1；三维空间与球面<br>学习方式：先独立重构证明，再完成书面练习和即时自检。实验只检验指定有限输入。</div>

## 1. 直观解释

一条闭曲线作为抽象空间总是圆周，结理论研究的却是它嵌在三维空间中的方式。因此应观察嵌入及其补空间，而非只计算曲线自身的同调。

## 2. 严格定义

本章结（knot）指光滑嵌入 $S^1\hookrightarrow S^3$ 的像，排除野结。环境同痕（ambient isotopy）是从恒等开始的连续同胚族 $H_t:S^3\to S^3$；光滑范畴使用光滑微分同胚族。结群（knot group）为 $\pi_1(S^3\setminus K)$，基点改变只影响内自同构。

经向环（meridian）是绕结的小法向圆，优选纬向环（preferred longitude）位于管状邻域边界、与结平行且在补空间的一阶同调中为零。结外部（exterior）为 $S^3\setminus\operatorname{int}\nu K$；管状邻域存在性作为光滑子流形的标准定理引用。

## 3. 定理与证明

**命题 T3.1。** 环境同痕的结有同构结群。
**证明。** $H_1$ 限制为两个补空间的同胚，F1 的函子性给基本群同构。实际还有经纬系统这一额外信息，但仅群同构已是必要条件。$\square$

**命题 T3.2（平凡结）。** 平凡结的补空间基本群为 $\mathbb Z$。
**证明。** 写 $S^3=\{(z_1,z_2)\in\mathbb C^2:|z_1|^2+|z_2|^2=1\}$，取结 $K=\{z_2=0\}$。在补空间中 $z_2\ne0$，映射 $(z_1,z_2)\mapsto(z_1,z_2/|z_2|)$ 给到开单位盘乘圆周的同胚，逆为 $(w,u)\mapsto(w,\sqrt{1-|w|^2}u)$。它形变收缩到圆周，故群为 $\mathbb Z$。$\square$

**引用定理（Wirtinger 表示）。** 正则结图的每条从下穿到下穿的弧给经向生成元，每个交叉给关系 $c=aba^{-1}$ 或其反向约定；该表示给结群。证明通过分解投影面上下的补空间并使用 van Kampen，需要完整局部覆盖构造，本章引用该几何推导。

**命题 T3.3（三叶结非平凡）。** 标准三交叉图的三叶结群为 $\langle a,b\mid aba=bab\rangle$，它非交换，因此三叶结不与平凡结环境同痕。

**证明。** 选各弧方向一致的 Wirtinger 生成元 $a,b,c$，关系可写 $c=aba^{-1},a=bcb^{-1},b=cac^{-1}$。将第一式代入第二式并整理得到 $aba=bab$；第三式在这两式下冗余（代入后为 $b=ab ab^{-1}a^{-1}$，由 braid 关系化简），所以得所述表示。映射 $a\mapsto(12),b\mapsto(23)$ 满足关系，因为两边均为 $(13)$，且生成非交换群 $S_3$。因此原群非交换，与平凡结的 $\mathbb Z$ 不同构，应用 T3.1。$\square$

将关系阿贝尔化得到 $2a+b=a+2b$，所以 $a=b$，三叶结群的阿贝尔化仍为 $\mathbb Z$。使用标准定理 $H_1(X;\mathbb Z)\cong\pi_1(X)_{\mathrm{ab}}$（一维 Hurewicz 定理，本章引用），可见一阶同调在此不够。

## 4. 正例与反例

**正例。** 三叶结群的非交换商已经足够排除平凡结，不必求群中每个元素。

**反例。** 把闭曲线作为映射 $S^1\to S^3$ 做普通同伦时，因 $S^3$ 单连通，每个结都可缩。这个过程中允许自交，远弱于环境同痕。结群也是必要而非此处声称的完整不变量；不能从群同构直接推出结等价。

## 5. 练习

1. 手算 $(12)(23)(12)$ 与 $(23)(12)(23)$。
2. 求三叶结群的阿贝尔化。
3. 说明为什么实验中允许曲线穿过自身的动画不能证明两结环境同痕。

??? tip "提示 1"
    2：将乘法关系转成生成元的加法关系。3：环境同胚始终保持嵌入。
??? tip "提示 2 与核对"
    1：两者均为 $(13)$。2：关系只给 $a=b$，结果为 $\mathbb Z$。3：自交破坏单射性，不是环境同痕的中间态。

<div class="admonition question" data-exercise="geometric-knots"></div>
<noscript>即时反馈需要 JavaScript；正文习题与分步提示仍可直接阅读。</noscript>

## 6. 参考书目

- C. P. Rourke and B. J. Sanderson. *Introduction to Piecewise-Linear Topology*, Springer, 1972.
- Dale Rolfsen. *Knots and Links*, AMS Chelsea reprint, 2003.
- John Milnor. *Topology from the Differentiable Viewpoint*, Princeton University Press, 1997.

本章以原创文字组织标准数学内容。标为“引用定理”的结果未在本章证明，不将其与已给出的证明混为一谈。
