# A2 · 拓扑学习实验、基线与泛化证据

<div class="chapter-meta">研究生课程 · 先修：A1、R2；期望、方差与独立抽样；Python 基础<br>学习方式：先独立重构证明，再完成书面练习和即时自检。实验只检验指定有限输入。</div>

## 1. 直观解释

拓扑特征是否有用是需要实验回答的问题。只有与几何基线在相同划分和模型容量下比较，才知道收益来自拓扑表示、数据捷径还是参数选择。

## 2. 严格定义

训练集（training set）用于拟合参数；验证集（validation set）用于选择表示和超参数；测试集（test set）仅作最终评价。数据泄漏（data leakage）是评价样本的信息进入拟合或选择过程。预处理的均值、方差、网格范围同样是需拟合的参数。

对已训练分类器 $h$，总体准确率 $p=\Pr(h(X)=Y)$，独立测试样本的经验准确率 $\widehat p=N^{-1}\sum_i\mathbf1\{h(X_i)=Y_i\}$。精确的比较还需要说明抽样单位：同一个原始物体的多次扰动应按物体分组划分。

## 3. 定理与证明

**命题 A2.1（固定分类器的测试误差界）。** 在独立同分布测试样本、且 $h$ 不依赖这些样本时，$E\widehat p=p$，$\operatorname{Var}(\widehat p)=p(1-p)/N\le1/(4N)$，因而

$$
\Pr(|\widehat p-p|\ge a)\le\frac{1}{4Na^2}.
$$

**证明。** 每个正确性指示量为均值 $p$、方差 $p(1-p)$ 的 Bernoulli 变量；独立性消去协方差。对平方偏差用 Markov 不等式，即 Chebyshev 不等式，得到所述界。若训练本身随机，可先条件于训练集和已选模型，再使用同一论证。$\square$

**命题 A2.2（训练标准化避免测试参与拟合）。** 以训练集计算 $\mu_j,s_j$，再将同一映射 $x_j\mapsto(x_j-\mu_j)/s_j$ 用于测试，不会由该步骤引入测试数据泄漏；零方差坐标约定 $s_j=1$。
**证明。** 给定训练集后该变换是固定函数，测试样本未用于决定它，故保持上一命题的条件结构。反之，使用全数据均值时变换依赖测试样本，已无法直接用上述“给定训练后独立测试”的推导。该命题不表示其他步骤就自动没有泄漏。$\square$

**实验协议。** 配套 Notebook 04 使用固定种子的独立环状/圆盘点云，比较距离统计基线、有限 $H_1$ 持续特征及二者拼接。三者使用同一训练/测试划分和同一最近质心分类器；标准化只在训练集拟合。无超参数搜索，因此本教学实验不另使用验证集；若改变表示、调核宽或选模型，应先引入验证集，保留新的最终测试集。

精度差只描述这批合成数据。要主张实际任务收益，还需多次独立数据划分、域外扰动、消融、计算成本和真实任务测试。随机化实验也不是 R2 稳定性定理或任何一般分类定理的证明。

## 4. 正例与反例

**正例。** 按生成点云而非单个点划分数据，独立生成测试点云，并记录随机种子、系数域、半径尺度、特征定义和模型，使实验可重跑。

**反例。** 对同一物体生成 100 个噪声副本后随机分到训练与测试，模型可能记住物体。看过测试结果再挑最好的持续阈值也是测试泄漏。若几何基线已经达到相同准确率，就不能只凭拓扑图好看宣称优势。

## 5. 练习

1. $N=100,p=0.5$ 时经验准确率标准差是多少？
2. 说明“将全数据归一化后再切分”有哪些信息可能泄漏。
3. 为 Notebook 04 增加独立的噪声级别测试，事先固定方案，并同时报告全部三组特征结果。

??? tip "提示 1"
    1：用方差公式。3：不可根据测试结果挑选最佳噪声级别。
??? tip "提示 2 与核对"
    1：0.05。2：均值、方差、范围或主成分方向都可能使用了测试分布。3：保留基线、相同划分和模型，报告有限样本不确定性。

<div class="admonition question" data-exercise="ai-evaluation-protocol"></div>
<noscript>即时反馈需要 JavaScript；正文习题与分步提示仍可直接阅读。</noscript>

## 6. 参考书目

- Peter Bubenik. “Statistical Topological Data Analysis using Persistence Landscapes.” *Journal of Machine Learning Research* 16, 2015, 77–102.
- Henry Adams et al. “Persistence Images: A Stable Vector Representation of Persistent Homology.” *Journal of Machine Learning Research* 18(8), 2017, 1–35.
- Frédéric Chazal and Bertrand Michel. “An Introduction to Topological Data Analysis: Fundamental and Practical Aspects for Data Scientists.” *Frontiers in Artificial Intelligence* 4, 2021, article 667963.
- Trevor Hastie, Robert Tibshirani and Jerome Friedman. *The Elements of Statistical Learning*, 2nd ed., Springer, 2009.

本章以原创文字组织标准数学内容。标为“引用定理”的结果未在本章证明，不将其与已给出的证明混为一谈。
