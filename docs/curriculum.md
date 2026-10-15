# 研究生课程地图

当前{{ course.chapters }}篇正文与{{ course.self_checks }}个分步自检；{{ course.template_chapters }}章采用十二项模板、共{{ course.template_exercises }}题完整答案，导论另有6题。先选[学习路线](start/index.md)，再按本页进入专题。页面存在不等于完整证明或人类审阅完成，见[证明状态](project/proof-ledger.md)。

## 建议学习顺序

1. **通用基础：** PRE1集合 → PRE2证明 → PRE3度量 → 导论 → 点集拓扑基础 A、第二章 → P1–P3 → 连通与商空间 → P4–P10。P5 用 ZFC，P7 与 P8 可作为并行支线。
2. **代数拓扑四单元：** 基本群基础 → F1 → 覆盖 C1 → F2 → C2；代数预备 → 第三章 → H1–H3 → Q1–Q2。G1 连接高阶同伦与谱序列。
3. **微分拓扑：** 先具备多元微积分、逆函数定理和 ODE，再从 D1 到 D5；D2 起需要 H3/Q2。
4. **几何拓扑：** 商空间、基本群与同调 → T1–T4；D4 为三维柄与配边的背景。
5. **计算与 AI 独立路线：** 代数预备与第三章 → K1 → R1–R2 → A1–A2；先做 Notebook 02，再做 03、04。需要证明细节时回接 H1–H3，不必先学全部微分几何。

这是一张有分支的依赖图，不要求先把所有点集拓扑读完才能动手实验。下面的先修代码对应具体正文；导航中的四个代数单元按主题分组，C1 是 F2 之前的明确桥梁。

## 正文与先修表

| 代码 | 正文 | 本站先修 |
| --- | --- | --- |
| PRE1 | [集合、映射与商集](preliminaries/sets-maps-relations.md) | 初等代数 |
| PRE2 | [证明与反例](preliminaries/proofs-counterexamples.md) | PRE1 |
| PRE3 | [度量空间](preliminaries/metric-spaces.md) | PRE1、PRE2、外部实分析 |
| spaces | [01 · 从距离到拓扑](introduction/01-spaces.md) | PRE3 |
| bases | [基础 A · 拓扑基与子基](point-set/bases-subbases.md) | spaces |
| continuity | [02 · 连续映射与紧致性](point-set/02-continuity.md) | spaces、bases |
| P1 | [P1 · 闭包、内部、边界与网](point-set/closure-nets.md) | bases、continuity |
| P2 | [P2 · 分离公理与可数性](point-set/separation-countability.md) | P1 |
| P3 | [P3 · 任意积、箱拓扑与拓扑和](point-set/products-sums.md) | bases、P1 |
| connectedness | [基础 B · 连通性](point-set/connectedness.md) | continuity |
| quotient | [基础 D · 商空间](point-set/quotient-spaces.md) | continuity、bases |
| P4 | [P4 · 紧致性、有限交性质与度量判据](point-set/compactness-metric.md) | continuity、P1、P2、P3 |
| P5 | [P5 · 滤子、超滤子与 Tychonoff 定理](point-set/filters-tychonoff.md) | P3、P4 |
| P6 | [P6 · 局部紧致、紧化与适当映射](point-set/local-compactness.md) | P2、P3、P4、P5、quotient |
| P7 | [P7 · Urysohn 引理、Tietze 延拓与度量化](point-set/metrization-extension.md) | P2、P3、P4 |
| P8 | [P8 · 完备化、Baire 空间与不动点](point-set/completion-baire.md) | P4、P6 |
| P9 | [P9 · 局部连通、仿紧致与单位分解](point-set/local-properties-partitions.md) | P2、P6、P7、connectedness |
| P10 | [P10 · 函数空间、紧开拓扑与 Arzelà–Ascoli](point-set/function-spaces.md) | P3、P4、P5、P6、P7、P8、P9 |
| homotopy | [基础 C · 同伦与基本群](algebraic/homotopy-fundamental-group.md) | bases、continuity、connectedness |
| F1 | [F1 · 基点变换、函子性与形变收缩](algebraic/fundamental-group/functor-basepoint.md) | homotopy |
| F2 | [F2 · van Kampen、图与胞腔表示](algebraic/fundamental-group/van-kampen.md) | F1、C1、quotient |
| C1 | [C1 · 覆盖映射、提升与圆周基本群](algebraic/covering/lifting-circle.md) | F1、P4 |
| C2 | [C2 · 提升判据、万有覆盖与覆盖分类](algebraic/covering/classification.md) | C1、connectedness |
| linear-quotient | [代数预备 · 链群与线性商空间](algebraic/linear-algebra-primer.md) | spaces、PRE1、PRE2 |
| homology | [03 · 环、边界与同调](algebraic/03-homology.md) | linear-quotient |
| H1 | [H1 · 整数奇异链与同伦不变性](algebraic/homology/singular-chains.md) | F1、linear-quotient |
| H2 | [H2 · 相对同调、切除与 Mayer–Vietoris](algebraic/homology/exact-excision.md) | H1、P4 |
| H3 | [H3 · 胞腔同调、挠与系数变换](algebraic/homology/cellular-coefficients.md) | H2、F2、PRE5、CT1 |
| Q1 | [Q1 · 上链、泛系数与杯积环](algebraic/cohomology/cochains-products.md) | H3 |
| Q2 | [Q2 · 定向、帽积与 Poincaré 对偶](algebraic/cohomology/duality.md) | Q1 |
| G1 | [G1 · 高阶同伦、纤维化与谱序列入口](algebraic/graduate-tools.md) | C2、Q2 |
| D1 | [D1 · 光滑流形、切空间与秩定理](differential/manifolds-rank.md) | P2、P6、P9 |
| D2 | [D2 · 横截性、交叉与映射度](differential/transversality-degree.md) | D1、H3、Q2 |
| D3 | [D3 · 微分形式、Stokes 与 de Rham 上同调](differential/forms-derham.md) | D1、Q1、Q2 |
| D4 | [D4 · Morse 函数、子水平集与柄](differential/morse-handles.md) | D1、D2、H3 |
| D5 | [D5 · 向量丛、截面与特征类入口](differential/bundles-characteristic.md) | D1、D3、C1、Q1 |
| T1 | [T1 · TOP、PL、DIFF 与三角剖分](geometric/categories-triangulations.md) | quotient、H3、D1 |
| T2 | [T2 · 紧曲面分类与多边形计算](geometric/surfaces.md) | T1、F2、Q2 |
| T3 | [T3 · 结、环境同痕与补空间群](geometric/knots.md) | T1、F2 |
| T4 | [T4 · 三维流形、Dehn 填充与配边](geometric/three-manifolds-surgery.md) | T2、T3、H2、D4 |
| K1 | [K1 · 有限复形、边界算法与可验证不变量](computational/boundary-algorithms.md) | homology、H3 |
| R1 | [R1 · 持续模、区间与矩阵约化](persistence/modules-reduction.md) | K1 |
| R2 | [R2 · 扰动、交错与稳定性范围](persistence/stability.md) | R1 |
| A1 | [A1 · 持续特征、稳定表示与可微边界](ai/features-learning.md) | R2 |
| A2 | [A2 · 拓扑学习实验、基线与泛化证据](ai/evaluation-protocol.md) | A1 |
| A3 | [拓扑损失：目标、梯度与约束的边界](ai/topological-loss.md) | A1, A2 |
| A4 | [图像分割：像素误差与拓扑错误](ai/segmentation-topology.md) | homology, K1, connectedness, A2 |
| A5 | [医学图像：骨架、拓扑先验与评价边界](ai/medical-topology.md) | A3, A4 |
| A6 | [高阶关系、Hodge 算子与神经网络](ai/higher-order-networks.md) | homology, K1, A2 |
| A7 | [点云学习：几何、持续同调与稳定性](ai/point-cloud-learning.md) | PRE3, A1, A2 |
| A8 | [可微持续同调：局部导数与配对切换](ai/differentiable-persistence.md) | A3, R1 |

## 证明与实验的边界

| 范围 | 本版证明与计算 | 明确引用或后续深化 |
| --- | --- | --- |
| 点集 | 网、紧致等价、Tychonoff、Urysohn、完备化、Baire、单位分解、Arzelà–Ascoli | Zorn 等集合/分析先修；Stone；更广集合拓扑专题 |
| 代数 | 覆盖分类、van Kampen、奇异链、切除、有限非正则CW比较与任意阿贝尔系数、有限自由链UCT、杯积、PL对偶概要 | 无限CW、胞腔逼近、上链比较、Eilenberg–Zilber、杯积分次交换性、一般流形对偶、Hurewicz/Serre 几何构造 |
| 微分 | 常秩与正则原像、参数横截推导、Stokes、同伦算子、Morse 不等式、球面线丛计算 | Sard、Whitney、de Rham 全局比较、Morse 引理/柄附加、一般特征类 |
| 几何 | 链接充分判据、曲面不变量、三叶结非平凡、Dehn 填充群与同调 | 曲面分类的边词规约、Wirtinger 几何证明、三维分解/几何化与高维手术 |
| 计算/AI | 有限边界证书、精确端点语义、半径交错界、景观稳定性、固定测试误差界、两份新计算实验 | 完整持续分解/配对与代数稳定性证明、大规模性能及真实任务泛化 |

所有这些“引用”都在正文使用处再次标记。[研究生审查台账](graduate-review.md)记录尚未完成的独立复核；[实验室](labs/index.md)区分浏览器探索、Notebook 计算与一般定理证明。


!!! info "AI 增补：持续建设中"
    新增A3–A8六章、48题完整答案与三项交互。当前{{ course.chapters }}章；原有章节仍按各自审查义务升级。{{ course.planned_parts }}部分{{ course.planned_units }}单元是长期计划，不代表已完成。见[实施状态](project/IMPLEMENTATION_STATUS.md)与[完整依赖图](project/PREREQUISITE_GRAPH.md)。

## v0.5补全与项目

- [PRE4：可数性与选择](preliminaries/countability-choice.md)；[PS1：子空间](point-set/subspaces.md)。
- [PRE5：群、模与整数商](preliminaries/groups-modules.md)；[CT1：整数同调与SNF](computational/integer-homology.md)。
- [项目C：可复现网络优化](ai/projects/topology-optimization.md)，含固定协议、实际轨迹与失败案例。


## v0.6 质量深化（已部署批次）

已有章节的数量不变。H3/Q1/Q2补自然映射、证明边界与24题完整解答；路线A加入[八课三级证明训练](exercises/proof-workshop.md)。[覆盖提升](labs/covering-space.md)将圆周路径连接到C1；[真实二维图像项目D](ai/projects/image-topology.md)公开固定协议、全部预测和负结果。人工审阅与学习者试用尚未执行，见[实施状态](project/IMPLEMENTATION_STATUS.md)。

## 同调证明补全（当前审查分支）

[H2](algebraic/homology/exact-excision.md)从有序仿射锥展开细分、小链、切除与 Mayer–Vietoris，提供八题完整答案；[H3](algebraic/homology/cellular-coefficients.md)补有限非正则 CW 的比较、附加度及任意阿贝尔系数，扩至十二题。先由 H2 计算球面和盘对，再进入 H3，避免证明循环。本批尚未发布，模型复核范围与剩余外引见[证明台账](project/proof-ledger.md)。
