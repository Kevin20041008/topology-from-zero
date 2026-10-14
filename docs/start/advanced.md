# 路线 B · 数学专业进阶

先完成路线 A；掌握线性代数与证明写作。PRE4/PRE5在本路线提供集合和整数代数桥梁；流形节另需多元微积分。

预计 148 小时，按每周4–6小时安排；这是包含证明练习的编辑估计，不是实测或完成承诺。题目需要更久时放慢节奏，不能把阅读页面等同于掌握证明。

<div data-learning-route="B">下方课表可直接学习；启用 JavaScript 后可记录本机自评进度。</div>

## 连续课表

| 课次 | 章节 | 预计小时 | 完成时应能做什么 |
| --- | --- | --- | --- |
| 1 | [PRE4 · 可数性、选择与集合论工具](../preliminaries/countability-choice.md) | 5 | 辨别选择公理依赖 |
| 2 | [PRE5 · 群、模与整数商](../preliminaries/groups-modules.md) | 6 | 构造群与模的商 |
| 3 | [基础 D · 商空间](../point-set/quotient-spaces.md) | 4 | 使用商拓扑泛性质 |
| 4 | [基础 C · 同伦与基本群](../algebraic/homotopy-fundamental-group.md) | 5 | 建立环路同伦类 |
| 5 | [F1 · 基点变换、函子性与形变收缩](../algebraic/fundamental-group/functor-basepoint.md) | 4 | 处理基点与函子 |
| 6 | [P1 · 闭包、内部、边界与网](../point-set/closure-nets.md) | 5 | 用闭包与网表达极限 |
| 7 | [P2 · 分离公理与可数性](../point-set/separation-countability.md) | 5 | 核对分离与可数性假设 |
| 8 | [P3 · 任意积、箱拓扑与拓扑和](../point-set/products-sums.md) | 5 | 理解积拓扑及其基 |
| 9 | [P4 · 紧致性、有限交性质与度量判据](../point-set/compactness-metric.md) | 6 | 证明有限覆盖及Lebesgue数引理 |
| 10 | [C1 · 覆盖映射、提升与圆周基本群](../algebraic/covering/lifting-circle.md) | 6 | 提升道路并计算圆周 |
| 11 | [F2 · van Kampen、图与胞腔表示](../algebraic/fundamental-group/van-kampen.md) | 6 | 用粘合计算群 |
| 12 | [C2 · 提升判据、万有覆盖与覆盖分类](../algebraic/covering/classification.md) | 6 | 核对覆盖分类假设 |
| 13 | [代数预备 · 链群与线性商空间](../algebraic/linear-algebra-primer.md) | 4 | 理解核像与商空间 |
| 14 | [03 · 环、边界与同调](../algebraic/03-homology.md) | 5 | 从链算同调 |
| 15 | [H1 · 整数奇异链与同伦不变性](../algebraic/homology/singular-chains.md) | 6 | 区分奇异链和整数系数 |
| 16 | [H2 · 相对同调、切除与 Mayer–Vietoris](../algebraic/homology/exact-excision.md) | 7 | 使用正合列时核对条件 |
| 17 | [CT1 · Smith 标准形与整数同调](../computational/integer-homology.md) | 7 | 保留挠并核对基变换 |
| 18 | [H3 · 胞腔同调、挠与系数变换](../algebraic/homology/cellular-coefficients.md) | 7 | 应用有标记的胞腔与系数定理 |
| 19 | [Q1 · 上链、泛系数与杯积环](../algebraic/cohomology/cochains-products.md) | 7 | 理解杯积及系数 |
| 20 | [Q2 · 定向、帽积与 Poincaré 对偶](../algebraic/cohomology/duality.md) | 7 | 带着假设阅读对偶 |
| 21 | [P5 · 滤子、超滤子与 Tychonoff 定理](../point-set/filters-tychonoff.md) | 6 | 辨别Tychonoff的选择公理依赖 |
| 22 | [P6 · 局部紧致、紧化与适当映射](../point-set/local-compactness.md) | 6 | 建立局部紧致和紧化 |
| 23 | [P7 · Urysohn 引理、Tietze 延拓与度量化](../point-set/metrization-extension.md) | 8 | 证明分离函数与度量化 |
| 24 | [P9 · 局部连通、仿紧致与单位分解](../point-set/local-properties-partitions.md) | 7 | 建立局部性质及单位分解 |
| 25 | [D1 · 光滑流形、切空间与秩定理](../differential/manifolds-rank.md) | 8 | 衔接流形图册与微分 |

各章内容状态与学习进度分开：Reviewed 表示指定范围的审查，Advanced Outline 标明外引或概要；进度勾选是自评，不是数学认证。

## 先修知识诊断

下面题目用于选择回读位置，不阻止进入课程。未掌握时先阅读反馈所列章节。

<div data-route-assessment>启用 JavaScript 可即时检查；下方保留题目与解释。</div>

1. 商群 G/N 的群运算良定义通常需要什么？

??? tip "第 1 题核对"
    N 是正规子群。一般群需正规性；阿贝尔群每个子群正规。PRE5给证明。

2. 整数链 Z ─2→ Z 的低维余核是什么？

??? tip "第 2 题核对"
    Z/2Z。实数秩会丢失二阶挠；PRE5和CT1提供整数商的计算。

3. 覆盖空间分类能省掉局部道路连通和半局部单连通吗？

??? tip "第 3 题核对"
    不能无条件删去。C2的分类定理带这些标准假设，读证明前先核对对象。

## 阶段项目：同调不等于完整空间分类 {#project}

先用 CT1 计算两个基于整数自由链的例子：环面链群秩 $(1,2,1)$、边界全零；射影平面链群秩 $(1,1,1)$、$\partial_2=[2],\partial_1=[0]$。提供矩阵、$\partial^2=0$ 证书、整数同调及模2同调。再解释用胞腔链代表这些空间时引用了哪个定理。

??? success "核对与证明边界"
    环面整数同调为 $\mathbb Z,\mathbb Z^2,\mathbb Z$；射影平面为 $\mathbb Z,\mathbb Z/2,0$。模2后后者边界全零，三个次数各一维。两个空间的胞腔附加方式与 H3.1 是空间到链的桥梁；矩阵计算本身没有证明胞腔同调定理。Q2 的整数对偶不能套在不可定向射影平面；也不能从不同模型恰有相同Betti数就推同伦等价。

验收：提交精确整数输出、基变换证书、每个外引的适用条件；写出为何实数秩无法恢复挠。阅读[定理依赖台账](../project/proof-ledger.md)后列出一项尚未展开的证明义务，不能以程序通过代替它。

[更换学习路线](index.md) · [完整课程目录](../curriculum.md)
