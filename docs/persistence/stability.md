# R2 · 扰动、交错与稳定性范围

<div class="chapter-meta">研究生课程 · 先修：R1；度量空间；有限维持续模<br>学习方式：先独立重构证明，再完成书面练习和即时自检。实验只检验指定有限输入。</div>

## 1. 直观解释

稳定性把“输入有多大误差”转换成“拓扑摘要最多变化多少”的可证明界。它不保证每条短条都是噪声，也不保证用条形码做出的分类器一定稳定。

## 2. 严格定义

对同标号点云 $X=(x_i),Y=(y_i)$，设 $\|x_i-y_i\|\le\delta$。两个实参数持续模的 $\eta$ 交错（interleaving）由 $V_t\to W_{t+\eta}$ 与 $W_t\to V_{t+\eta}$ 构成，要求与结构映射交换且两次复合等于偏移 $2\eta$ 的结构映射。

条形码瓶颈距离（bottleneck distance）为将区间端点按 $\ell_\infty$ 代价匹配并允许匹配到对角线时的最小最大代价。有限条 $[b,d)$ 到对角线的代价为 $(d-b)/2$；无限条必须与无限条匹配。

## 3. 定理与证明

<div class="proof-status" id="proof-r2-1" markdown>
**完整证明（所列依赖下）** · [依赖与审查义务](../project/proof-ledger.md#proof-r2-1)
</div>

**命题 R2.1（半径尺度 Rips 扰动）。** 上述点云的 Rips 过滤按本站半径参数有 $\delta$ 交错。
**证明。** 三角不等式给 $|\|x_i-x_j\|-\|y_i-y_j\||\le2\delta$。若 $X$ 的一条边在 $\epsilon$ 出现，即距离不超过 $2\epsilon$，则相同标号的 $Y$ 边在 $\epsilon+\delta$ 出现。对任意单形逐边应用，得到包含 $\mathrm{Rips}_\epsilon(X)\subset\mathrm{Rips}_{\epsilon+\delta}(Y)$；反向同理。两个顶点映射都是标号恒等，复合就是偏移包含，取同调即得交错。$\square$

<div class="proof-status" id="proof-r2-stability" markdown>
**引用定理** · [依赖与审查义务](../project/proof-ledger.md#proof-r2-stability)
</div>

**引用定理（代数稳定性）。** 对这里有限构造、区间可分解的持续模，$\eta$ 交错推出条形码瓶颈距离至多 $\eta$。这一步需要区间匹配定理，不由边长不等式单独推出。结合命题得 $d_B\le\delta$。若改用最大边长作为过滤参数，则界变成 $2\delta$；不得把两种尺度混用。

<div class="proof-status" id="proof-r2-2" markdown>
**完整证明（所列依赖下）** · [依赖与审查义务](../project/proof-ledger.md#proof-r2-2)
</div>

**命题 R2.2（长条存在保证）。** 若两个图的瓶颈距离至多 $\eta$，原图一条寿命严格大于 $2\eta$ 的条，在任何代价至多 $\eta$ 的匹配中都必须对应另一条非对角条。
**证明。** 该条匹配到对角线的最小代价为半寿命，大于 $\eta$，故不允许。对应条的出生与死亡端点误差各不超过 $\eta$。对只知下确界的情形，可先使用任意 $\eta'>d_B$；有限条形码的最优匹配可达到下确界。$\square$

<div class="proof-status" id="proof-r2-3" markdown>
**完整证明（所列依赖下）** · [依赖与审查义务](../project/proof-ledger.md#proof-r2-3)
</div>

**命题 R2.3（有限条的寿命误差）。** 匹配端点误差至多 $\eta$ 时，寿命误差至多 $2\eta$。
**证明。** $|(d-b)-(d'-b')|\le|d-d'|+|b-b'|\le2\eta$。$\square$

## 4. 正例与反例

**正例。** 每点移动至多 0.01，半径尺度的条形码瓶颈距离至多 0.01；长度大于 0.02 的条不能全被匹配到对角线。

**反例。** 这并不说长度 0.019 的条应被程序删除，只说该噪声界无法保证它保持可辨认。不同标号、不同点数的点云不能直接应用 R2.1 的配对假设，应另用对应关系或 Hausdorff/Gromov–Hausdorff 稳定性定理并核对常数。

## 5. 练习

1. 推导一条边出生时间的扰动界。
2. 若条为 $[1,1.1)$ 且 $\eta=0.06$，能否保证它匹配到另一条非对角条？
3. 解释独立 GUDHI 对照为何不能证明 R2.1 对所有实数输入成立。

??? tip "提示 1"
    1：本站边出生为距离的一半。2：比较寿命与 $2\eta$。
??? tip "提示 2 与核对"
    1：至多 $\delta$。2：不能保证，但也不能断言它必消失。3：对照只验证指定浮点输入；一般界依赖三角不等式证明。

<div class="admonition question" data-exercise="persistence-stability"></div>
<noscript>即时反馈需要 JavaScript；正文习题与分步提示仍可直接阅读。</noscript>

## 6. 参考书目

- Herbert Edelsbrunner and John Harer. *Computational Topology: An Introduction*, AMS, 2010.
- Tamal K. Dey and Yusu Wang. *Computational Topology for Data Analysis*, Cambridge University Press, 2022.
- Frédéric Chazal, Vin de Silva, Marc Glisse and Steve Oudot. *The Structure and Stability of Persistence Modules*, Springer, 2016.

本章以原创文字组织标准数学内容。标为“引用定理”的结果未在本章证明，不将其与已给出的证明混为一谈。
