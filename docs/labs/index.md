# 拓扑实验室

先在浏览器中改变一个条件、观察拓扑变化，再用 Notebook 复现与扩展计算。理论推导位于课程正文，实验不代替一般性证明。

## 无需安装的交互实验

<div class="chapter-grid" markdown>
<div class="chapter-card" markdown>
<span class="number">01</span>

### 三角形的洞
在空心与填实之间切换，观察同一个循环何时变成边界。

[打开实验 →](triangle.md)
</div>
<div class="chapter-card" markdown>
<span class="number">02</span>

### 点云与持续同调
拖动球半径滑块，看连通分支合并、环出现与消失，并阅读真实计算的 Barcode。

[打开实验 →](point-cloud.md)
</div>
<div class="chapter-card" markdown>
<span class="number">03</span>

### 三维中的拓扑曲面
旋转球面、环面与莫比乌斯带，对比边界、可定向性和 Betti 数。

[打开实验 →](surfaces.md)
</div>
</div>

浏览器实验使用本地 JavaScript、SVG 与 Three.js，不需要运行 Python。下面的 Notebook 保留完整代码、执行结果与可修改的数据输入，用于更深入的计算探索。

## Python Notebook 运行方式

按[本地运行指南](../development.md)安装依赖后执行：

```sh
python -m jupyterlab docs/labs/notebooks
```

选择 Python 3 内核，使用 **Restart Kernel and Run All Cells** 从头运行。文件已经附带一次完整执行的输出，也可以下载后本地打开。实验无网络请求或外部数据下载。Notebook 04 使用明确记录的固定随机种子；其他 Notebook 不使用随机抽样。完整运行需安装 requirements-validation.txt，其中含 GUDHI。

## 01 · 有限拓扑与连续映射 {#finite}

[下载 Notebook 01](notebooks/01-finite-topology.ipynb){ .md-button .md-button--primary }

- **对应章节：** [第一章](../introduction/01-spaces.md)、[第二章](../point-set/02-continuity.md)。
- **可运行部分：** 枚举子集，检查拓扑公理，检查映射的全部开集逆像；验证连续双射不一定同胚。
- **理论推导：** 任意有限空间紧致的证明仍以第二章为准。有限穷举并不解决一般空间的紧致性。
- **预期结果：** 三个合法拓扑通过检查；缺少二元并的集合族失败；两点恒等对应正向连续，反向不连续。
- **依赖：** 代码仅使用 Python 标准库，运行环境使用 Jupyter。

## 02 · 从方环到填充：模 2 同调 {#homology}

[下载 Notebook 02](notebooks/02-square-homology.ipynb){ .md-button .md-button--primary }

- **对应章节：** [第三章](../algebraic/03-homology.md)，以及[计算拓扑](../computational/index.md)、[持续同调](../persistence/index.md)。
- **可运行部分：** 二元域消元、边界矩阵、正方形的 Vietoris–Rips 二维骨架、三个代表尺度的检查、Betti 曲线和复形图。
- **预期结果：** $r=0.9,1.0,\sqrt2$ 时的 $(\beta_0,\beta_1)$ 分别为 $(4,0),(1,1),(1,0)$。
- **理论推导：** $\partial^2=0$、维数公式与唯一一维区间的论证位于第三章。此 Notebook 不是通用持续条形码算法。
- **依赖：** NumPy 用于数组，Matplotlib 用于图形；矩阵秩自行在 $\mathbb F_2$ 上计算。

!!! warning "尺度约定"
    Notebook 02 用边长阈值 $r$：$d(x_i,x_j)\le r$。浏览器与 Notebook 04 用球半径 $\epsilon$：$d(x_i,x_j)\le2\epsilon$，故 $r=2\epsilon$。比较数值前应先核对约定。二维骨架足以计算 $H_0,H_1$；不要直接把它的 $H_2$ 当成完整 Rips 复形的 $H_2$。

## 03 · 同调相同，上同调环不同 {#cohomology}

[下载 Notebook 03](notebooks/03-cohomology-cup-products.ipynb){ .md-button .md-button--primary }

- **对应：** Q1–Q2、K1。有限周期环面与两个圆和球面的楔和均有 Betti 数 (1,2,1)。
- **可运行：** 整数边界复合为零、模 2 上链核/像、基本二循环上的杯积配对。环面配对矩阵为 `[[0,1],[1,0]]`，楔和全零。
- **理论边界：** 指定复形的精确代数验证，不替代一般杯积与同伦不变性证明。依赖 NumPy。

## 04 · 拓扑学习与几何基线 {#learning}

[下载 Notebook 04](notebooks/04-topology-learning-baselines.ipynb){ .md-button .md-button--primary }

- **对应：** R1–R2、A1–A2。固定种子 `20261012`，96 个独立点云，64/32 训练测试划分。
- **可运行：** GUDHI 在模 2 上求完整有限 H₁ 区间，转换为半径参数；相同最近质心分类器比较几何、拓扑、联合特征，标准化只拟合训练集。
- **实际结果：** 准确率分别为 30/32、31/32、31/32。全部正长度条参与计算，没有以容差删除短条。
- **理论边界：** 一次合成数据划分，没有真实任务、多种子或显著性优势结论。依赖 NumPy、Matplotlib、GUDHI 3.11.0。

## 复现检查

```sh
python scripts/verify_notebooks.py
```

该命令先验证 Notebook 格式，再在新内核和临时目录中逐个执行全部代码单元。任何断言失败或代码异常都会令检查失败，GitHub Actions 使用同一入口。
