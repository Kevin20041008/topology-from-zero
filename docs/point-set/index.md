# 点集拓扑

点集拓扑（point-set topology）按研究生通用基础课程组织：生成拓扑、闭包与网、分离与可数性、积与商、连通、紧致、滤子、度量化、完备化、Baire、仿紧致、单位分解和函数空间。基本内容均有正文入口，不以空白章节占位。集合论采用 ZFC；P5 明确使用 Zorn 引理，P7 证明有界与一般实值 Tietze，P9 引用 Stone 仿紧致性定理。

建议先读第一章、基础 A、第二章，再按下表推进。连通与商空间可在 P3 后阅读；P7 与 P8 是可并行学习的两个分支。每章的分析与代数先修单独写在页首。

| 正文章节 | 本站先修代码 |
| --- | --- |
| [基础 A · 拓扑基与子基](bases-subbases.md) | spaces |
| [02 · 连续映射与紧致性](02-continuity.md) | spaces, bases |
| [P1 · 闭包、内部、边界与网](closure-nets.md) | bases, continuity |
| [P2 · 分离公理与可数性](separation-countability.md) | P1 |
| [P3 · 任意积、箱拓扑与拓扑和](products-sums.md) | bases, P1 |
| [基础 B · 连通性](connectedness.md) | continuity |
| [基础 D · 商空间](quotient-spaces.md) | continuity, bases |
| [P4 · 紧致性、有限交性质与度量判据](compactness-metric.md) | continuity, P1, P2, P3 |
| [P5 · 滤子、超滤子与 Tychonoff 定理](filters-tychonoff.md) | P3, P4 |
| [P6 · 局部紧致、紧化与适当映射](local-compactness.md) | P2, P3, P4, P5, quotient |
| [P7 · Urysohn 引理、Tietze 延拓与度量化](metrization-extension.md) | P2, P3, P4 |
| [P8 · 完备化、Baire 空间与不动点](completion-baire.md) | P4, P6 |
| [P9 · 局部连通、仿紧致与单位分解](local-properties-partitions.md) | P2, P6, P7, connectedness |
| [P10 · 函数空间、紧开拓扑与 Arzelà–Ascoli](function-spaces.md) | P3, P4, P5, P6, P7, P8, P9 |

先修代码、整体顺序和引用定理范围见[研究生课程地图](../curriculum.md)；待独立审阅事项见[审查台账](../graduate-review.md)。
