# topology-from-zero · 从零开始的拓扑学

中文开放教材网站，采用 MkDocs Material、Markdown、MathJax、JavaScript/SVG/Three.js 与 Python/Jupyter Notebook。当前版本 **v0.2：三篇原创示范章节 + 三个浏览器交互实验 + 两个已执行 Notebook**。

[在线教材](https://kevin20041008.github.io/topology-from-zero/) · [GitHub 仓库](https://github.com/Kevin20041008/topology-from-zero) · [部署状态](https://github.com/Kevin20041008/topology-from-zero/actions/workflows/pages.yml)

## 已有内容

1. 从距离到拓扑：开集、拓扑公理与度量诱导拓扑。
2. 连续映射与紧致性：逆像定义、连续像定理与必要假设。
3. 环、边界与同调：在二元域上证明边界的边界为零，手算与验证第一同调。

六个模块均有导读；未完成部分明确标为规划，不声称已经完成整本教材。

## 浏览器交互实验

1. **三角形的洞**：切换空心与填实，实时计算 β₀、β₁。
2. **点云与持续同调**：三组点云、球半径滑块、Rips 二维骨架和真实约化计算的 H₀/H₁ Barcode。
3. **三维拓扑曲面**：球面、环面、莫比乌斯带；拖动与键盘旋转、缩放、自动旋转、网格和边界高亮。

JavaScript 和 Three.js 均随站点分发。实验 2 使用球半径 ε，前文与 Notebook 使用距离阈值 r，两者满足 r=2ε。浏览器实验与 Notebook 互补，网站仍使用 MkDocs。

## 本地启动

推荐 Python 3.12。Windows 用 `py -3.12 -m venv .venv` 创建环境；其他系统用 `python3.12 -m venv .venv`。

```powershell
.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python scripts/verify_notebooks.py
python -m mkdocs build --strict
python scripts/verify_site.py
node --test scripts/test_topology.mjs
python -m mkdocs serve
```

macOS/Linux 激活命令为 `source .venv/bin/activate`。打开 <http://127.0.0.1:8000>。浏览器算法测试另需 Node.js 22 或更新版本；单独构建静态教材不需要 Node.js。

```sh
python -m jupyterlab docs/labs/notebooks
```

Notebook 含执行结果与断言；验证脚本在临时目录执行副本，不改写源文件。实验使用二元域上的精确消元，浮点数仅用于几何距离和阈值比较。

## 部署到 GitHub Pages

将本目录内容放到名为 `topology-from-zero` 的 GitHub 仓库根目录，默认分支使用 `main`。在 Settings → Pages → Build and deployment 中选择 **GitHub Actions**，随后推送或手动运行工作流。

`.github/workflows/pages.yml` 对 PR 执行 JavaScript 算法测试、Notebook、严格构建和站点检查；只有 `main` 的推送或手动运行会部署。正式 `site_url` 使用 GitHub Pages 返回的实际地址，支持项目子路径与自定义域名。主仓库为 `Kevin20041008/topology-from-zero`；Fork 后可按上述步骤发布到自己的账户。

## 项目结构

```text
docs/                       Markdown、样式、原创 SVG 与本地 MathJax
  introduction/             导论 + 示范章 01
  point-set/                点集拓扑 + 示范章 02
  algebraic/                代数拓扑 + 示范章 03
  computational/            计算拓扑导读
  persistence/              持续同调导读
  ai/                       拓扑与人工智能导读
  labs/notebooks/           两份可运行 .ipynb
scripts/                    可重复的内容与构建检查
.github/workflows/pages.yml 构建和部署
requirements.in             直接依赖范围
requirements.txt            本次验证的精确依赖版本
```

全文搜索支持中文分词；公式、字体设置和插图不依赖第三方 CDN。浏览器端公式的人工验收页位于 `/math-check/`。构建检查可以验证数学标记，实际 SVG 排版还需要浏览器检查。

## 许可与来源

原创教材文字、题目与插图：**CC BY 4.0**；项目代码与 Notebook 代码单元：**MIT**。Notebook 说明单元适用 CC BY 4.0。请阅读 `LICENSE.md`、`LICENSE-CODE` 和 `THIRD_PARTY_NOTICES.md`。参考书只列书目信息，不复制教材正文或插图。
