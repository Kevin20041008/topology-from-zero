# 项目 C：实际训练一个带持续同调项的 NumPy 网络

这是原创的合成路径分割实验，实际反向传播训练 612 个参数；不是医疗任务、PointNet 训练或任何论文的实验复现。课程解释、八题和完整答案见 `docs/ai/projects/topology-optimization.md`。

## 从零运行

在仓库根目录运行（推荐单独虚拟环境）：

```powershell
python -m venv projects/topology-optimization/.venv
projects/topology-optimization/.venv/Scripts/python -m pip install -r projects/topology-optimization/requirements.txt
projects/topology-optimization/.venv/Scripts/python projects/topology-optimization/test_project.py
projects/topology-optimization/.venv/Scripts/python projects/topology-optimization/train.py --output projects/topology-optimization/results-rerun
projects/topology-optimization/.venv/Scripts/python projects/topology-optimization/verify.py --results projects/topology-optimization/results-rerun/raw-results.json
```

Linux/macOS 将解释器路径换为 `projects/topology-optimization/.venv/bin/python`。已有兼容 NumPy 的环境也可直接 `python ...`。实际提交结果的运行环境为 CPython 3.14.3、NumPy 2.5.2、Windows x86_64；完整环境与线程设置写入 JSON。没有 GPU、数据下载、账号或训练框架。

## 三种不同验证

```text
python projects/topology-optimization/test_project.py
python projects/topology-optimization/train.py --smoke --output projects/topology-optimization/results-smoke
python projects/topology-optimization/verify.py
python projects/topology-optimization/verify.py --rerun
```

- 单测核对数学运算、输入校验、梯度和最小真实训练，不要求更高 Dice。
- `--smoke` 只做 2 轮、1 个初始化种子、小划分，结果显式标记 smoke；不能用它替代完整课程结果。
- `verify.py` 从已存最终权重重新计算各划分指标、测试概率、数据/源码哈希和摘要，通常不到一秒。
- `verify.py --rerun` 重新训练完整 20 组，逐项精确比较最终参数、每轮轨迹及全部结果；本记录环境中已通过。跨 NumPy/BLAS/平台不承诺逐位一致，若不同需保存新结果及差异说明，不通过放宽拓扑断言隐藏差异。

绘图是可选步骤，需要仓库已有 Matplotlib：

```text
python projects/topology-optimization/plot_results.py
```

它读取已存 JSON，生成网页 SVG 和预览 PNG，不训练模型或选择种子。训练只依赖 NumPy。

## 数据与预登记协议

`protocol.json` 在第一次完整运行前锁定：12→24→12 tanh MLP，160 个 full-batch Adam 更新，学习率 0.02；初始化种子 11、23、37、51、71；比较 λ=0 和 λ=1；固定最终轮，不作最佳验证检查点选择。

该 JSON 是固定实验协议记录，不是通用配置接口：`threshold=0.5` 对应 `evaluate` 内固定的0.5阈值，`data.py` 固定生成12顶点数据。更改这些字段必须同步修改实现、数学范围和测试，再生成一套新结果；只改 JSON 不会正确运行新的阈值或数据维度协议。

每任务独立生成 96/32/64 个训练/验证/测试样本。connected 的数据种子依次为 7301/7302/7303，disconnected 为 7401/7402/7403。每个 ID 的形式为 `任务/划分/序号`；生成样本的原始随机过程彼此独立，没有一份干净输入产生的相关副本跨划分。固定的验证集只监测，不调参；测试数据在完成固定轮数后才进入指标计算。

目标是12节点路径中随机长度5至9的一段前景；双分支任务在区间内部再删一个非端点像素。观测为 `0.1+0.8*y+N(0,0.24²)`，随机压低一个内部前景0.65、抬高一个背景0.45，再加样本级 `Uniform(-0.08,0.08)` 偏移并截到[0,1]。准确边界和 RNG 顺序以 `data.py` 为准。完整观测、目标、ID和种子均保存于 `results/data/`，manifest记录SHA256。

测试不是外部分布数据；五个种子共享同一数据集。种子标准差仅反映初始化/优化差异，不能当独立患者或不同数据集的置信区间。

## 计算约定

对网络前景概率 `p` 取 `q=1-p`。固定路径的下星 H0 滤过用 union-find elder 规则，边的值是两端最大值。相同顶点值按 ID 决定分支。只排除 `death == birth`，所有 `death > birth` 条保留，无数值寿命容差。无限条单独返回，不裁剪。

总损失为逐像素平均 BCE + λ×逐样本平均的有限正条寿命平方和。PH 对顶点值的分支梯度经 sigmoid、tanh 和全部权重反传。该项压制有限条，不保证在阈值0.5恰有一个分支；空预测也可能有零有限条损失。相等值处可能不可微，确定性分支不是经典导数的证明。极小平方可能浮点下溢，但区间仍保留。

## 结果与限制

提交的完整原始结果在 `results/raw-results.json`（约1.5MB），包括20组最终权重、160轮训练记录、验证轨迹、全部测试概率与指标、配对身份变化数。`summary.json` 提供所有种子的均值、样本标准差和逐种子配对差值，不只保留最好结果。

| 目标 | 损失 | 测试 Dice均值 | 测试 β0绝对误差均值 |
|---|---|---:|---:|
| 一个分支 | BCE | 0.942954 | 0.037500 |
| 一个分支 | BCE+PH | 0.944002 | 0.021875 |
| 两个分支，先验不兼容 | BCE | 0.864197 | 0.296875 |
| 两个分支，先验不兼容 | BCE+PH | 0.854629 | 0.871875 |

完整运行约13秒；实际时间依硬件变化。第二个任务表明较小代理损失可以伴随更差的目标拓扑。没有多数据种子、真实图像、临床外部验证或论文方法复现，也未证明优化收敛。

## 文件责任

- `core.py`：路径H0、分支梯度、MLP、Adam与评价。
- `data.py` / `protocol.json`：独立划分、可复现生成与固定实验协议。
- `train.py`：完整/冒烟运行，真实轨迹、最终权重与结果。
- `test_project.py`：243种小路径与独立F2矩阵对照，梯度、短条、ties、分组与真实训练。
- `verify.py`：保存结果核查和完整确定性重跑。
- `plot_results.py`：从观测记录生成原创结果图。
- `results/`：完整数据、原始结果、摘要和预览。不得用smoke覆盖该记录。
