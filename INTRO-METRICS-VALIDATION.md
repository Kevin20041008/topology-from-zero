# 导论度量基础补充：审查与验证

日期：2026-10-12。基线：`9b6cfbc`；分支：`codex/intro-metric-foundations`。本批从当前 `main` 独立提交 PR，不合并或发布。没有引入依赖、修改核心算法或重新初始化项目。

## 数学检查

作者和独立模型审查者分别复核三篇正文的本批差异，未发现阻塞性数学错误或证明缺口：

- 引理 1.4：球内点的剩余半径严格为正，三角估计给出严格球包含。
- 推论 1.5：开集等于所有包含于其中的球之并；覆盖空集、空空间和空并，无需同时为所有点任意选球。
- 命题 1.6：先证明截断函数的次可加性，再与单调性及绝对值三角不等式结合；半径恰为 1 时仍排除距离 1；两个方向分别以正的小半径证明开集族相同。
- 命题 1.7：两点 Sierpiński 集合族满足拓扑公理；任意度量均使两个单点开，产生直接矛盾，无分离公理先修。
- 六题完整解答：原四题的公理、闭集和反例论证；三个指定半径；有限度量空间的空、单点、至少两点情形与无限反例。
- 基础 A 练习同时验证基的覆盖、局部交和生成拓扑等式；PRE3 的链接是可选复习，不造成证明循环。

这是独立模型的书面数学复核，不是人类同行评审或形式化证明验证。参考书目保留已有真实教材，新增正文为原创证明组织；本批没有声称逐页查阅原书。

## 命令与结果

| 检查 | 结果 | 输出 |
| --- | --- | --- |
| `node --test scripts/test_topology.mjs scripts/test_curriculum.mjs scripts/test_foundations.mjs` | 43 通过、0 失败；P0 A/B 及固定量化回归保留 | [javascript.txt](validation/intro-metrics/javascript.txt) |
| `python scripts/verify_independent.py` | GUDHI 3.11.0：43 点云、217 条 H0/H1 区间逐值相等、3 个抽象曲面 | [independent.txt](validation/intro-metrics/independent.txt) |
| `python scripts/verify_notebooks.py` | 4 份 Notebook 各用新内核，分别执行 2/5/3/3 代码单元 | [notebooks.txt](validation/intro-metrics/notebooks.txt) |
| `python -m mkdocs build --strict` | 成功 | [build.txt](validation/intro-metrics/build.txt) |
| `python scripts/verify_site.py` | 126 页；旧 v0.2 的 19 路径、v0.3 的 25 路径及锚点、中文搜索、45 章、自检和导航通过 | [site.txt](validation/intro-metrics/site.txt) |
| `git diff --check` | 无空白错误 | 提交前执行 |

GUDHI 对照仅验证指定有限输入及共享 binary64 边值下的组合计算。它不证明所有点云的数值精度，也不验证新增纯理论命题。本次无需为文字论证增加模拟证明的测试，既有严格断言未变。

## 浏览器呈现检查

在本批 `site/` 的本地预览上检查，非线上发布环境；[browser.json](validation/intro-metrics/browser.json) 记录 DOM 观察。

| 页面 | 公式标记 / MathJax 渲染 | MathJax 错误 |
| --- | --- | --- |
| `introduction/01-spaces/` | 227 / 227 | 0 |
| `preliminaries/metric-spaces/` | 296 / 296 | 0 |
| `point-set/bases-subbases/` | 122 / 122 | 0 |

另已点击展开六题完整答案、点击目录中的新引理和截断度量锚点，目视确认正文与多行推导排版。检查 PRE3、基础 A 指回导论的实际链接。沿用现有主题和样式。本批没有重测全站每个实验的浏览器交互；计算回归由上表既有套件覆盖。

## 文件级变更

| 文件 | 本批修改 |
| --- | --- |
| `docs/introduction/01-spaces.md` | 新引理 1.4、推论 1.5、命题 1.6–1.7；六题与完整解答；学习目标与阅读时长 |
| `docs/preliminaries/metric-spaces.md` | 链接导论截断度量例题，接入既有一致等价练习 |
| `docs/point-set/bases-subbases.md` | 第一题引用开球引理，完整提示覆盖条件和局部交条件 |
| `docs/project/reviews/spaces.md` | 新命题逐项复核、明确局部审查与整章 Draft 的边界 |
| `docs/project/IMPLEMENTATION_STATUS.md` | 当前批次、远端分支归属、验证与续作；旧状态保留为历史记录 |
| `CHANGELOG.md` | 未发布的导论增补条目 |
| `INTRO-METRICS-VALIDATION.md` | 本审查报告与逐文件清单 |
| `validation/intro-metrics/javascript.txt` | Node 原始结果 |
| `validation/intro-metrics/independent.txt` | GUDHI 原始结果 |
| `validation/intro-metrics/notebooks.txt` | Notebook 原始结果 |
| `validation/intro-metrics/build.txt` | 严格构建结果，本机用户目录脱敏 |
| `validation/intro-metrics/site.txt` | 静态站点验证结果 |
| `validation/intro-metrics/browser.json` | 三页公式、答案展开、新锚点与链接观察 |

## 仍未完成

整章仍为 Draft：十二节写作模板、分项学习目标、适用原创图解和原有命题的第二轮逐项签署尚未完成。本批三个主题与六题已做局部书面复核，不将这一结论外推为全书数学认证。人类同行审稿、完整课程建设及既有高级证明义务继续保留在实施状态中。旧微分拓扑 PR #5 的 D1/D2 增补尚未进入本批基线，未在此重写或合并。
