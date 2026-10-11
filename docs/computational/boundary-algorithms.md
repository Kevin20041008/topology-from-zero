# K1 · 有限复形、边界算法与可验证不变量

<div class="chapter-meta">研究生课程 · 先修：链群与商空间、H1、H3；线性代数与基本算法<br>学习方式：先独立重构证明，再完成书面练习和即时自检。实验只检验指定有限输入。</div>

## 1. 直观解释

理论定义给出要算的对象，数据结构决定实际算到哪个对象。顶点编号、面闭包、系数域和过滤时间都必须成为输入契约；浮点坐标本身不是拓扑复形。

## 2. 严格定义

有限抽象单纯复形（finite abstract simplicial complex）是有限顶点集的非空子集族，且对非空子集封闭。有序顶点给整数定向边界；在 $\mathbb F_2$ 上符号可省略。令 $D_k$ 为从 $k$ 单形列到 $(k-1)$ 单形行的关联矩阵。

Rips 复形在本站采用**半径参数** $\epsilon$：当所有顶点对距离 $d_{ij}\le2\epsilon$ 时加入单形。浏览器仅构造到二维骨架，足够算 $H_0,H_1$，但不能据此给出完整高维 Rips 同调。

## 3. 定理与证明

**命题 K1.1。** 对有限复形，$D_{k-1}D_k=0$，且

$$
\beta_k=f_k-\operatorname{rank}D_k-\operatorname{rank}D_{k+1}.
$$

**证明。** 有序边界删去两顶点时各出现两次且符号相反，故复合为零；模 2 时两次相加为零。由秩零度定理，循环空间维数为 $f_k-\operatorname{rank}D_k$；边界空间包含其中，商维数再减去 $\operatorname{rank}D_{k+1}$。$\square$

**命题 K1.2（二维骨架的范围）。** 复形的二维骨架到全复形的包含在 $H_0,H_1$ 上诱导同构。
**证明。** 计算这些群只需要 $C_0,C_1,C_2$ 以及 $D_1,D_2$，包含映射在这些数据上完全相同。$H_2$ 还需要 $D_3$，故不能扩展该断言。$\square$

**命题 K1.3（边界证书）。** 若消元输出矩阵 $R=DV$，$V$ 可逆，则 $\operatorname{rank}R=\operatorname{rank}D$。若 $R$ 的非零列具有不同最高非零行，这些列线性无关。
**证明。** 右乘可逆矩阵保持列空间。若不同最高行列的非平凡组合为零，取参与列的最高 pivot，该行只有一列贡献，矛盾。因此非零列数给秩。$\square$

边界复合为零、Euler 等式、连通分支计数、标签置换不变性是不同层次的交叉检查。它们是必要一致性条件，不是“算法对全部输入正确”的替代证明。朴素二维 Rips 构造至多有 $n+\binom n2+\binom n3$ 个单形；朴素稠密消元对 $m$ 个单形有立方级最坏运算数，不能对大点云无条件承诺浏览器实时计算。

## 4. 正例与反例

**正例。** 三条边组成的三角环 $f=(3,3,0)$，$\operatorname{rank}D_1=2$，所以 $(\beta_0,\beta_1)=(1,1)$。填入一个面后 $\operatorname{rank}D_2=1$，第一 Betti 数变为零。

**反例。** 相同坐标但不同索引的重复点在 $\epsilon=0$ 就有零长度边；若输入要求把它们作为不同顶点，必须让这些零边按过滤出现，不能私自去重。四面体的二维边界有非零 $H_2$，填入三维体后消失。

## 5. 练习

1. 对四面体边界核对 $f=(4,6,4)$ 与 $\chi=2$。
2. 给一个包含三角面却缺一条边的错误输入，说明为何应拒绝。
3. 说明 D²=0 与 Euler 等式同时通过为何仍不保证模型代表目标曲面。

??? tip "提示 1"
    2：链边界必须仍落在链群中。3：一个完全不同的合法复形也满足这些恒等式。
??? tip "提示 2 与核对"
    1：$4-6+4=2$，Betti 数为 $(1,0,1)$。2：违反面闭包。3：这些验证模型内部一致性，仍需核对商识别与几何语义。

<div class="admonition question" data-exercise="computational-boundary-algorithms"></div>
<noscript>即时反馈需要 JavaScript；正文习题与分步提示仍可直接阅读。</noscript>

## 6. 参考书目

- Herbert Edelsbrunner and John Harer. *Computational Topology: An Introduction*, AMS, 2010.
- Tamal K. Dey and Yusu Wang. *Computational Topology for Data Analysis*, Cambridge University Press, 2022.

本章以原创文字组织标准数学内容。标为“引用定理”的结果未在本章证明，不将其与已给出的证明混为一谈。
