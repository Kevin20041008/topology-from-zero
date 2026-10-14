# 项目 D：真实二维细胞核图像与期望 Euler 损失

真实数据、实际CPU训练、完整负结果。使用BBBC039v1的24幅真实显微图；数据许可与来源见 [DATA_LICENSE.md](DATA_LICENSE.md)。课程正文为 docs/ai/projects/image-topology.md。

## 运行

本地完整记录使用 Python 3.14.3、NumPy 2.5.2、Pillow 12.3.0、SciPy 1.17.1、scikit-image 0.26.0。推荐独立虚拟环境，不需GPU：

~~~text
python -m pip install -r projects/image-topology/requirements.txt
python projects/image-topology/test_project.py
python projects/image-topology/train.py --output projects/image-topology/results-rerun
python projects/image-topology/verify.py --results projects/image-topology/results-rerun/results.json --rerun
~~~

提交的数据已足以训练和测试，无须CI重新下载81MB归档。需要核对源数据与重新预处理时运行：

~~~text
python projects/image-topology/data.py
~~~

下载器只读取官方固定归档，检查精确字节数和SHA256；不解压任意路径，不静默接受内容改变。每幅图的来源哈希及处理参数见manifest。图像ID在原图层面互斥，**plate可能重叠**；这不是跨批次泛化验证。

轻量CI可先执行10项测试，然后在当前平台另存六组完整训练并核验。完整训练约27秒。只检查流程时：

~~~text
python projects/image-topology/train.py --smoke --output projects/image-topology/results-smoke
~~~

smoke只有2轮、1种子和每划分2幅图；不能替代完整实验。verify.py不接受smoke记录。

无参数verify.py校验提交的Windows存档；精确概率/轨迹比较针对记录环境。不同平台/BLAS可能产生浮点差异，CI应训练到新目录，再验证新目录，不能通过删除短条或放宽拓扑断言掩盖差异。加 --rerun 进一步重新训练所有六组，比较最终参数、100轮轨迹、监测记录和概率。NumPy导入前固定线程环境并记录设置。

## 固定协议与模型

官方划分分别取文件名排序前12/6/6张，8×8块粗化为65×87。标注第一通道非零取二值并，块内至少一半前景为粗化真值。每图先块平均，再以自身1%/99%分位数归一化，无需标签或跨图拟合统计量。24图粗化均改变Betti数，记录原始/粗化值，不伪称拓扑保持。

共享像素MLP有12输入特征、8隐藏tanh、1输出sigmoid，共113参数。特征是3×3邻域的9个强度，加7窗口均值、3窗口标准差、15窗口均值；边缘复制填充。没有预训练权重。

每次更新使用12幅训练图全部像素，Adam学习率0.02，100轮；种子11/23/37。基线为BCE + 0.5 softDice，对照加 λ=0.02 的期望Euler差平方项。验证每20轮监测，检查点固定第100轮，不挑种子、轮数、阈值或权重。测试数组仅在最终更新后进入评价。协议可审查，但不声称有独立时间戳证明的预注册历史。

## 数学语义

- 前景是**闭单位方格的并**；角点接触算连通，所以前景用8邻接。补集用4邻接，外加一圈背景后扣除外部连通分量来数洞。
- 期望Euler损失把每个方格看作独立Bernoulli占据变量，通过顶点/边/面的存在概率计算 Eχ。相邻胞腔并不独立；这里只对像素选择假设独立，利用期望线性性。
- Eχ是概率多项式，梯度直接反传到MLP。**训练损失不做持续配对，不是PH损失，不等价于同时约束β0与β1。**
- 辅助 h0_bars 演示二维灰度闭方格子水平集H0，采用8邻接elder合并，只删除真正零寿命条，保留最小正subnormal；不参与训练。
- clDice按骨架与另一掩膜交比例计算。细胞核不是管状目标，指标仅作附加描述，不援引血管拓扑保证。非空掩膜若骨架为空会明确拒绝，避免除零或伪造得分。

## 实测结果

以下是3个初始化在同一6幅测试图上的均值；不能称18幅独立图像：

| 目标 | Dice | clDice | β0绝对误差 | β1绝对误差 | Betti同时正确比例 |
|---|---:|---:|---:|---:|---:|
| BCE + 0.5 softDice | 0.906813 | 0.951401 | 2.944444 | 1.277778 | 0.166667 |
| 上述基线 + 0.02 Euler项 | 0.861300 | 0.918000 | 4.388889 | 1.333333 | 0.000000 |

Euler项在该固定协议下没有带来收益。不能把训练中代理损失下降解释成超过基线：有的种子最终代理值也更高。未重新调参或筛除失败运行。测试图全为多分量，简单“是否连通”一致率两组都为1，几乎无区分能力；同时报告β0/β1及最大分量占比误差。

results/results.json保留每次更新、最终权重、逐图指标及逐种子配对差。六个prediction NPZ保存各划分全部概率，summary.json保留样本标准差。该标准差只表示初始化变化，不估计换一批图或plate的泛化不确定性。

## 独立检查与文件

- topology.py：闭方格计数、Euler多项式/导数、flood-fill Betti、显式F2边界oracle、辅助H0。
- model.py：局部特征、真实MLP反传、指标及空骨架边界处理。
- data.py / sources.json / data/manifest.json：许可、固定URL、源字节哈希、官方划分与plate、预处理。
- train.py / protocol.json：固定六组运行、实际更新与全部证据。
- test_project.py：512二值复形、729灰度H0、梯度、短条、非法输入及数据完整性。
- verify.py：源/数据/概率哈希、全部指标、可选完整重训。
- plot_results.py：从存档生成原创新图；需要可选Matplotlib。固定首两测试ID公开，不以最优图替代全部数据。

目前只完成探索性小样本语义分割；无跨plate留出、外部分布、原分辨率实例指标、临床效能或一般优化收敛证明。
