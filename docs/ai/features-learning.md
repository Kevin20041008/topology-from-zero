# A1 · 持续特征、稳定表示与可微边界

<div class="chapter-meta">研究生课程 · 先修：R1–R2；范数、概率与基础机器学习<br>学习方式：先独立重构证明，再完成书面练习和即时自检。实验只检验指定有限输入。</div>

## 1. 直观解释

条形码不是定长向量，送入模型之前必须选择表示。表示的稳定性、区分能力和计算开销是不同问题；压缩为几个数字也可能丢掉关键结构。

## 2. 严格定义

对有限条 $[b,d)$ 定义帐篷函数 $f_{b,d}(t)=\max\{0,\min(t-b,d-t)\}$。持续景观（persistence landscape）$\lambda_k(t)$ 为全部帐篷值中的第 $k$ 大，不足时补零。本章对无限条单独记录，不将 $+\infty$ 人为裁剪后混入景观。

持续图像（persistence image）先将条转为出生—寿命坐标，再用权函数加权核密度并积分到固定网格。网格、核宽和权函数都是表示参数，需要由训练集或事先方案确定。

简单统计特征可用有限 $H_1$ 条的最大寿命、寿命和、条数；它们的意义与景观不同。

## 3. 定理与证明

**命题 A1.1（景观的无穷范数稳定性）。** 两个有限条形码存在代价至多 $\eta$ 的瓶颈匹配，则所有 $k$ 有 $\|\lambda_k-\lambda'_k\|_\infty\le\eta$。

**证明。** 匹配的两个非对角区间端点分别相差至多 $\eta$；$\min$ 与 $\max$ 对无穷范数为 1-Lipschitz，所以两个帐篷的逐点差至多 $\eta$。匹配到对角线的条高度为半寿命，也至多 $\eta$，可与零函数配对。补齐后得到两组逐项差至多 $\eta$ 的有限数列。若第一组第 $k$ 大为 $a$，至少 $k$ 个对应的第二组数值不小于 $a-\eta$，故其第 $k$ 大不小于 $a-\eta$；反向同理。对每个 $t$ 应用并取上确界即可。$\square$

**命题 A1.2（总寿命的条件界）。** 若补对角匹配后一共 $m$ 对条，端点匹配代价至多 $\eta$，则有限条总寿命的差至多 $2m\eta$。
**证明。** 非对角对由 R2.3 得每对寿命差至多 $2\eta$；匹配到对角线的寿命也至多 $2\eta$。三角不等式求和即得。$\square$

这不是与条数无关的 Lipschitz 界：很多短条累积可改变总寿命。持续图像在适当权重、核正则性和图距离下有稳定性定理；具体假设见所引论文，不能对任意直方图宣称同样结论。

**命题 A1.3（固定组合区域上的可微性）。** 若点坐标变化区域内距离非零、所有决定出生的最大边唯一且持续配对固定，则每个有限区间端点作为点坐标函数光滑。
**证明。** 非零欧氏距离光滑；唯一最大边在一个足够小邻域仍唯一，端点等于该距离的一半；固定配对只选择固定两个出生函数，故光滑。$\square$

在距离相等、最大边切换、配对改变或点重合时，上述证明不适用。不能把在自动微分软件中得到一个梯度，等同于全局可微定理。

## 4. 正例与反例

**正例。** 景观在固定网格取值后，用最大坐标范数比较，仍保留 A1.1 的界；但有限采样会遗漏网格之间的细节。

**反例。** 取 $m$ 个寿命 $2\eta$ 的条，它们全可在代价 $\eta$ 内匹配到空图的对角线，而总寿命为 $2m\eta$。条数更是对任意短条不连续的摘要。两个对称边长的最大值在交叉处可产生不可微折点。

## 5. 练习

1. 画出条 $[0,2),[1,3)$ 的前两层景观，求 $t=1.5$ 处的值。
2. 说明景观最大值与最长条寿命的关系。
3. 为“条数作为输入特征”设计一个抗微小噪声的评价实验，但不要从核心条形码删条。

??? tip "提示 1"
    1：分别计算两个帐篷后排序。3：显示完整条，再将特征工程规则作为独立、可记录的步骤。
??? tip "提示 2 与核对"
    1：两层均为 0.5。2：最大值等于最长有限条寿命的一半。3：固定扰动规模与随机种子，报告特征及预测的变化，不把特征过滤回写同调核心。

<div class="admonition question" data-exercise="ai-features-learning"></div>
<noscript>即时反馈需要 JavaScript；正文习题与分步提示仍可直接阅读。</noscript>

## 6. 参考书目

- Peter Bubenik. “Statistical Topological Data Analysis using Persistence Landscapes.” *Journal of Machine Learning Research* 16, 2015, 77–102.
- Henry Adams et al. “Persistence Images: A Stable Vector Representation of Persistent Homology.” *Journal of Machine Learning Research* 18(8), 2017, 1–35.
- Frédéric Chazal and Bertrand Michel. “An Introduction to Topological Data Analysis: Fundamental and Practical Aspects for Data Scientists.” *Frontiers in Artificial Intelligence* 4, 2021, article 667963.

本章以原创文字组织标准数学内容。标为“引用定理”的结果未在本章证明，不将其与已给出的证明混为一谈。
