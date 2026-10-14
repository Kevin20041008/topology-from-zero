# 本地运行与部署

## 本地环境

推荐 Python 3.12，命令在项目根目录执行。依赖安装需要网络；已构建站点的公式、图片与字体设置不依赖 CDN。

```powershell
# Windows
py -3.12 -m venv .venv
.venv\Scripts\Activate.ps1
python -m pip install -r requirements-validation.txt
node --test scripts/test_topology.mjs scripts/test_curriculum.mjs scripts/test_foundations.mjs scripts/test_ai_topology.mjs
python scripts/verify_independent.py
python scripts/verify_ai_independent.py
python scripts/verify_ai_examples.py
python scripts/verify_notebooks.py
python -m mkdocs build --strict
python scripts/verify_site.py
python -m mkdocs serve
```

macOS/Linux 用 `python3.12 -m venv .venv` 创建环境、`source .venv/bin/activate` 激活环境。打开 <http://127.0.0.1:8000> 预览。

如果 PowerShell 策略不允许激活，可直接执行 `.venv\Scripts\python.exe -m mkdocs serve`，其他 Python 命令同理，无须更改系统策略。

## GitHub Pages

1. 主仓库已经上线，维护时从现有 `main` 创建工作分支，不重新初始化项目。
2. 提交 Pull Request；自动化检查通过后，核对数学证明和[未完成审查项](math-review.md)。
3. 完成审阅后合并到 `main`，由 **Build textbook and deploy Pages** 工作流发布。PR 自身不会部署。
4. 若发布 Fork，才需要在自己的仓库 **Settings → Pages → Source** 选择 **GitHub Actions**；默认分支变化时同步修改工作流条件。

构建任务执行 JavaScript 算法测试、GUDHI 独立对照、Notebook、严格构建并校验站点。PR 只做构建检查，部署任务仅对 `main` 的非 PR 事件运行。工作流从 `actions/configure-pages` 获取实际站点地址，通过 `SITE_URL` 注入配置。v0.3 按先合并 P0、验证线上脚本，再将教学 PR 转向 `main` 的顺序发布。后续维护也应等待部署成功，并验证线上文件和交互行为，不能把分支检查通过当成正式站点已更新。

主仓库：[Kevin20041008/topology-from-zero](https://github.com/Kevin20041008/topology-from-zero)。站点地址：[在线教材](https://kevin20041008.github.io/topology-from-zero/)。每次提交的部署状态可在仓库的 Actions 页面查看。

## 文件与验证

- Markdown 正文放在 `docs/`；新章节同时加入 `mkdocs.yml` 的 `nav` 与 `scripts/curriculum.json`，并在练习库注册自检。
- 公式用 `$...$` 与独立行的 `$$...$$`。
- 修改 Notebook 后从新内核完整执行，保留与源码一致的输出。
- `python scripts/verify_notebooks.py` 在临时目录检查，不改写源 Notebook。
- `python -m mkdocs build --strict` 将警告视为错误。
- `python scripts/verify_site.py` 检查本地链接与片段、v0.2 与 v0.3 的旧 URL/锚点、课程清单中的全部正文和自检挂载、搜索索引、数学标记和本地 MathJax。
- `python scripts/verify_independent.py` 在同一双精度边出生值上，使用 GUDHI 独立构造和约化，严格比较区间；另对照三个曲面抽象复形。它不用于证明一般数学定理。
- `python scripts/verify_ai_independent.py` 使用 GUDHI 的立方复形对照 512 个三乘三掩膜，并对照 25 个下星路径滤过的 49 条区间；不以容差合并差异。
- `python scripts/verify_ai_examples.py` 在各自临时目录和新进程执行 A3、A5、A6、A7、A8 中登记的原创 Python 示例，验证解析参照、clDice 有效/无效骨架、矩阵与三维点云计算的代码断言。
- `node --test scripts/test_topology.mjs scripts/test_curriculum.mjs scripts/test_foundations.mjs scripts/test_ai_topology.mjs` 检查三角形、退化点云、持续区间、等距/尺度变换、边界平方为零及曲面网格不变量；需要 Node.js 22 或更新版本。
- 交互页面位于 `docs/labs/`；原三项实验和基础实验台保留，AI 实验页增加损失、分割、可微边界三个模型。AI 核心复用 `topology-core.mjs` 的约化和模 2 运算，UI 使用本地 SVG。Three.js 的版本和许可见 `THIRD_PARTY_NOTICES.md`。
- 浏览器中访问[公式检查页](math-check.md)，验证最终 SVG 排版、搜索与明暗主题。

`site/` 为可再生构建输出，已在 `.gitignore` 中忽略。`requirements.txt` 记录本次运行版本；添加依赖时同时维护 `requirements.in`，在新环境验证后更新锁定文件。

## v0.5完整验证入口

下面补充旧命令未包含的整数、学习路线、证明状态与浏览器检查。仍使用同一 MkDocs 框架；浏览器测试需要 Node.js 22+，仅构建教材无需 Node。

```text
python -m pip install -r requirements-validation.txt -r requirements-integer.txt
npm ci
npx playwright install chromium
npm test
python scripts/test_integer_homology.py
python scripts/verify_integer_independent.py
python scripts/verify_foundation_examples.py
python scripts/verify_independent.py
python scripts/verify_ai_independent.py
python scripts/verify_ai_examples.py
python scripts/verify_notebooks.py
python -m mkdocs build --strict
python scripts/verify_site.py
npm run test:browser
```

Linux CI使用 `npx playwright install --with-deps chromium`。Playwright自动启动临时静态服务器8123，并以 `/topology-from-zero/` 前缀验证桌面1280px与手机390px；已有服务占用该端口应先处理。覆盖公式真实SVG渲染、页内无溢出、四个入口、搜索、主题、学习记录/无存储、无JavaScript回退、习题反馈、原三实验与AI实验。键盘和可访问名称的检查不等于完整WCAG认证，也未覆盖所有浏览器引擎。

### 训练项目的独立环境

站点科学计算环境与项目固定NumPy版本不同，推荐单独环境。记录环境为Python3.14.3/NumPy2.5.2；代码没有深度学习框架或GPU要求：

```text
python3.14 -m venv .venv-project
# 激活后执行（Windows可用 py -3.14 创建环境）
python -m pip install -r projects/topology-optimization/requirements.txt
python projects/topology-optimization/test_project.py
python projects/topology-optimization/verify.py --rerun
python projects/topology-optimization/train.py --output project-results-local
python projects/topology-optimization/verify.py --results project-results-local/raw-results.json --rerun
```

首次验证仓库已存结果，如跨平台浮点差异导致精确重跑失败，保留失败证据并按后两条命令另存本环境的完整结果；不要覆盖历史结果或放宽拓扑断言。CI也运行完整20组训练、再在同一环境精确重跑，并上传全部结果。构建与训练两个作业都通过才能进入主分支部署。

构建钩子 `scripts/build_metadata.py` 输出 `build-info.json`；它记录构建源提交，不是数学认证或GitHub Release标签。发布现状见[版本证据](project/release-status.md)，长期续作见[实施状态](project/IMPLEMENTATION_STATUS.md)。
