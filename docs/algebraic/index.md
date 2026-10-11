# 代数拓扑

代数拓扑（algebraic topology）现在分为**基本群、覆盖空间、同调、上同调**四个连续单元，附高阶同伦和谱序列入口。基础 C 与第三章保留原地址，成为预备入口。

实际先修顺序为 **基础 C → F1 → C1 → F2 → C2**：先用覆盖提升算圆周基本群，再用 van Kampen 计算图和胞腔表示，因此导航分组不等于唯一阅读顺序。同调路线为**代数预备 → 第三章 → H1 → H2 → H3 → Q1 → Q2 → G1**。H3 的群表示例子用 F2。

主线默认整数系数；改用域或模 2 时明确标注。原实验始终是模 2 有限计算。分解定理、一般空间比较定理和深层对偶的引用边界见各章及审查台账。

| 正文章节 | 本站先修代码 |
| --- | --- |
| [基础 C · 同伦与基本群](homotopy-fundamental-group.md) | bases, continuity, connectedness |
| [F1 · 基点变换、函子性与形变收缩](fundamental-group/functor-basepoint.md) | homotopy |
| [F2 · van Kampen、图与胞腔表示](fundamental-group/van-kampen.md) | F1, C1, quotient |
| [C1 · 覆盖映射、提升与圆周基本群](covering/lifting-circle.md) | F1, P4 |
| [C2 · 提升判据、万有覆盖与覆盖分类](covering/classification.md) | C1, connectedness |
| [代数预备 · 链群与线性商空间](linear-algebra-primer.md) | spaces |
| [03 · 环、边界与同调](03-homology.md) | linear-quotient |
| [H1 · 整数奇异链与同伦不变性](homology/singular-chains.md) | F1, linear-quotient |
| [H2 · 相对同调、切除与 Mayer–Vietoris](homology/exact-excision.md) | H1, P4 |
| [H3 · 胞腔同调、挠与系数变换](homology/cellular-coefficients.md) | H2, F2 |
| [Q1 · 上链、泛系数与杯积环](cohomology/cochains-products.md) | H3 |
| [Q2 · 定向、帽积与 Poincaré 对偶](cohomology/duality.md) | Q1 |
| [G1 · 高阶同伦、纤维化与谱序列入口](graduate-tools.md) | C2, Q2 |

先修代码、整体顺序和引用定理范围见[研究生课程地图](../curriculum.md)；待独立审阅事项见[审查台账](../graduate-review.md)。
