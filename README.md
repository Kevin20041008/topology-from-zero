# topology-from-zero · 从零开始的拓扑学

中文开放教材网站，采用 MkDocs Material、Markdown、MathJax、JavaScript/SVG/Three.js 与 Python/Jupyter Notebook。**v0.4 Graduate Courses 审阅候选：42 篇正文及分步自检 + 三个浏览器交互实验 + 四个已执行 Notebook**。P0 短区间热修复通过 [PR #2](https://github.com/Kevin20041008/topology-from-zero/pull/2) 先行合并；教学与数值改进通过 [PR #1](https://github.com/Kevin20041008/topology-from-zero/pull/1) 审查发布。变更见 [CHANGELOG.md](CHANGELOG.md)，前置依赖与待审数学项见 [数学审查](docs/math-review.md)。

[在线教材](https://kevin20041008.github.io/topology-from-zero/) · [GitHub 仓库](https://github.com/Kevin20041008/topology-from-zero) · [部署状态](https://github.com/Kevin20041008/topology-from-zero/actions/workflows/pages.yml)

## 已有内容

1. 从距离到拓扑：开集、拓扑公理与度量诱导拓扑。
2. 连续映射与紧致性：逆像定义、连续像定理与必要假设。
3. 环、边界与同调：在二元域上证明边界的边界为零，手算与验证第一同调。

新增基础 A（拓扑基与子基）、基础 B（连通性）、基础 C（同伦与基本群）、基础 D（商空间）与代数预备（链群与线性商空间）。原有章号与 URL 不变；建议按 01 → A → 02 → B → C 阅读，D 为粘合支线，代数预备 → 03 为有限计算支线。每篇新增章均含定义、严格证明、正反例、习题与参考书目；原八章均提供两级提示和按选项解释的即时反馈。

八个方向按研究生深度组织；代数拓扑拆为基本群、覆盖、同调、上同调四单元，新增微分与几何拓扑。完整清单见 [课程地图](docs/curriculum.md)，逐章证明范围与引用边界见 [研究生审查台账](docs/graduate-review.md)。本候选版未发布，不声称全部深定理已自包含证明。

## 浏览器交互实验

1. **三角形的洞**：切换空心与填实，实时计算 β₀、β₁。
2. **点云与持续同调**：三组点云、球半径滑块、Rips 二维骨架和真实约化计算的 H₀/H₁ Barcode。
3. **三维拓扑曲面**：球面、环面、莫比乌斯带；拖动与键盘旋转、缩放、自动旋转、网格和边界高亮。

JavaScript 和 Three.js 均随站点分发。实验 2 使用球半径 ε，前文与 Notebook 02 使用距离阈值 r，两者满足 r=2ε。浏览器实验与 Notebook 互补，网站仍使用 MkDocs。

## 本地启动

推荐 Python 3.12。Windows 用 `py -3.12 -m venv .venv` 创建环境；其他系统用 `python3.12 -m venv .venv`。

```powershell
.venv\Scripts\Activate.ps1
python -m pip install -r requirements-validation.txt
python scripts/verify_independent.py
python scripts/verify_notebooks.py
python -m mkdocs build --strict
python scripts/verify_site.py
node --test scripts/test_topology.mjs scripts/test_curriculum.mjs
python -m mkdocs serve
```

macOS/Linux 激活命令为 `source .venv/bin/activate`。打开 <http://127.0.0.1:8000>。浏览器算法测试另需 Node.js 22 或更新版本；单独构建静态教材不需要 Node.js。

```sh
python -m jupyterlab docs/labs/notebooks
```

Notebook 含执行结果与断言；验证脚本在临时目录执行副本，不改写源文件。实验使用二元域上的精确消元，浮点数仅用于几何距离和阈值比较。

## 部署到 GitHub Pages

主仓库已上线，后续维护不需要重新初始化。创建工作分支并提交 Pull Request，等待全部检查与数学审阅后再合并到 `main`。只有发布自己的 Fork 时，才需要在 Settings → Pages → Build and deployment 中选择 **GitHub Actions**。

`.github/workflows/pages.yml` 对 PR 执行 JavaScript 算法测试、Notebook、严格构建和站点检查；只有 `main` 的推送或手动运行会部署。正式 `site_url` 使用 GitHub Pages 返回的实际地址，支持项目子路径与自定义域名。主仓库为 `Kevin20041008/topology-from-zero`；Fork 后可按上述步骤发布到自己的账户。

## 项目结构

```text
docs/                       Markdown、样式、原创 SVG 与本地 MathJax
  introduction/             导论 + 示范章 01
  point-set/                点集拓扑 + 示范章 02 + 基础 A/B/D
  algebraic/                代数拓扑 + 示范章 03 + 基础 C + 代数预备
  differential/             光滑、横截、形式、Morse、向量丛
  geometric/                PL、曲面、结与三维粘合
  computational/            有限边界算法
  persistence/              持续同调导读
  ai/                       拓扑与人工智能导读
  labs/notebooks/           四份已执行 .ipynb
scripts/                    可重复的内容与构建检查
.github/workflows/pages.yml 构建和部署
.github/ISSUE_TEMPLATE/     数学问题反馈表单
CHANGELOG.md                发布变更记录
requirements.in             直接依赖范围
requirements.txt            本次验证的精确依赖版本
requirements-validation.txt 独立 GUDHI 对照依赖
```

全文搜索支持中文分词；公式、字体设置和插图不依赖第三方 CDN。浏览器端公式的人工验收页位于 `/math-check/`。构建检查可以验证数学标记，实际 SVG 排版还需要浏览器检查。

JavaScript 测试覆盖退化/随机点云、尺度与等距变换、持续区间临界值、边界平方为零、欧拉关系和三种曲面的精确参数识别复形。GUDHI 对照共享浮点边长，逐值比较 43 组点云的正持续区间，不以容差隐藏差异。渲染几何、数学曲面和计算复形在教材中分别说明。旧 URL 与正文锚点由 `scripts/legacy_urls.json` 和 `scripts/legacy_urls_v03.json` 双重保护。仅构建站点仍可安装 `requirements.txt`；完整验证需安装 `requirements-validation.txt`。运行记录见 [VALIDATION.md](VALIDATION.md)；自动化通过不代表已完成独立数学审阅。

## 许可与来源

原创教材文字、题目与插图：**CC BY 4.0**；项目代码与 Notebook 代码单元：**MIT**。Notebook 说明单元适用 CC BY 4.0。请阅读 `LICENSE.md`、`LICENSE-CODE` 和 `THIRD_PARTY_NOTICES.md`。参考书只列书目信息，不复制教材正文或插图。
