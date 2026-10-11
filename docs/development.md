# 本地运行与部署

## 本地环境

推荐 Python 3.12，命令在项目根目录执行。依赖安装需要网络；已构建站点的公式、图片与字体设置不依赖 CDN。

```powershell
# Windows
py -3.12 -m venv .venv
.venv\Scripts\Activate.ps1
python -m pip install -r requirements-validation.txt
node --test scripts/test_topology.mjs
python scripts/verify_independent.py
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

构建任务执行 JavaScript 算法测试、GUDHI 独立对照、Notebook、严格构建并校验站点。PR 只做构建检查，部署任务仅对 `main` 的非 PR 事件运行。工作流从 `actions/configure-pages` 获取实际站点地址，通过 `SITE_URL` 注入配置。P0 热修复 PR 应先审查，后续教学 PR 以它为基线；热修复合并后再将教学 PR 的目标分支调整为 `main`。

主仓库：[Kevin20041008/topology-from-zero](https://github.com/Kevin20041008/topology-from-zero)。站点地址：[在线教材](https://kevin20041008.github.io/topology-from-zero/)。每次提交的部署状态可在仓库的 Actions 页面查看。

## 文件与验证

- Markdown 正文放在 `docs/`；新章节同时加入 `mkdocs.yml` 的 `nav`。
- 公式用 `$...$` 与独立行的 `$$...$$`。
- 修改 Notebook 后从新内核完整执行，保留与源码一致的输出。
- `python scripts/verify_notebooks.py` 在临时目录检查，不改写源 Notebook。
- `python -m mkdocs build --strict` 将警告视为错误。
- `python scripts/verify_site.py` 检查本地链接与片段、旧 URL/锚点、八篇章节和自检挂载、搜索索引、数学标记和本地 MathJax。
- `python scripts/verify_independent.py` 在同一双精度边出生值上，使用 GUDHI 独立构造和约化，严格比较区间；另对照三个曲面抽象复形。它不用于证明一般数学定理。
- `node --test scripts/test_topology.mjs` 检查三角形、退化点云、持续区间、等距/尺度变换、边界平方为零及曲面网格不变量；需要 Node.js 22 或更新版本。
- 三个交互页面位于 `docs/labs/`，浏览器算法位于 `docs/javascripts/topology-core.mjs`，Three.js 的版本和许可见 `THIRD_PARTY_NOTICES.md`。
- 浏览器中访问[公式检查页](math-check.md)，验证最终 SVG 排版、搜索与明暗主题。

`site/` 为可再生构建输出，已在 `.gitignore` 中忽略。`requirements.txt` 记录本次运行版本；添加依赖时同时维护 `requirements.in`，在新环境验证后更新锁定文件。
