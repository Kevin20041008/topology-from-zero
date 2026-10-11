# 持续同调

持续同调（persistent homology）把尺度上的群与包含诱导映射一同记录。R1 从持续模到约化不变量，R2 从点位移证明半径尺度交错，再明确引用代数稳定性完成条形码结论。

## 目前可读与可运行

[Notebook 02](../labs/index.md#homology) 沿用边长阈值 r，方形环的条为 [1,√2)。[Notebook 04](../labs/index.md#learning) 使用 GUDHI 真正计算区间，并除以二转换为半径尺度。有限输入对照不是一般分解定理的证明。

## 浏览器交互实验

[点云与持续同调](../labs/point-cloud.md) 使用球半径 ε，r=2ε。端点采用 [出生,死亡)，所有正长度条保留。读取距离标签的小数位与核心计算严格分开。

| 正文章节 | 本站先修代码 |
| --- | --- |
| [R1 · 持续模、区间与矩阵约化](modules-reduction.md) | K1 |
| [R2 · 扰动、交错与稳定性范围](stability.md) | R1 |

先修代码、整体顺序和引用定理范围见[研究生课程地图](../curriculum.md)；待独立审阅事项见[审查台账](../graduate-review.md)。
