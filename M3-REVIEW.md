# M3 Differential Foundations：可审查批次

本批在原仓库/路径上深化D1、D2；16题完整答案、2原创SVG、非作者模型复核，用户要求暂不发布。分支`codex/m3-differential-foundations`，base为PR #4分支`codex/m1-foundations-batch-1`。不合并、不触发Pages部署。

两章已写核心标Reviewed；全书仍45篇候选正文，其中5章40题达到新结构。没有把两章写成整个微分拓扑课程完成。

## 逐文件修改

| 文件 | 修改目的 |
| --- | --- |
| `CHANGELOG.md` | 新增本批未发布变更记录。 |
| `M3-REVIEW.md` | 本批逐文件清单、交付范围与后续义务。 |
| `README.md` | 更新5章40题、当前批次与PR依赖说明。 |
| `VALIDATION.md` | 追加本批实际自动化、浏览器和数学复核范围，保留历史。 |
| `docs/assets/d1-rank-charts.svg` | 原创常秩投影/包含图；三轴共点。 |
| `docs/assets/d2-transverse-degree.svg` | 原创横截、相切和有符号交点图。 |
| `docs/differential/index.md` | 明确微分路线、两章答案与外引范围。 |
| `docs/differential/manifolds-rank.md` | 扩写曲线切空间/秩/单位分解，12节8题，保留D1.1–4及旧锚点。 |
| `docs/differential/transversality-degree.md` | 扩写横截/法商/条件度证明与边界反例，12节8题，保留旧编号锚点。 |
| `docs/exercises/d1-solutions.md` | D1八题完整论证。 |
| `docs/exercises/d2-solutions.md` | D2八题完整论证。 |
| `docs/exercises/index.md` | 加入D1/D2答案导航，明确其余40章待升级。 |
| `docs/index.md` | 更新当前未发布批次提示，保持原设计。 |
| `docs/progress.md` | 七个方向逐项区分线上、候选与未建内容。 |
| `docs/project/COURRICULUM_MASTER_PLAN.md` | 更新D1/D2局部完成范围与用户优先顺序，不标整卷完成。 |
| `docs/project/IMPLEMENTATION_STATUS.md` | 分支/发布状态、证据、未尽证明及准确续作。 |
| `docs/project/M3_REVIEW.md` | 非作者模型逐命题、16题及SVG复核与整改记录。 |
| `docs/project/reviews/D1.md` | D1逐项检查、零维整改、外引和未建义务。 |
| `docs/project/reviews/D2.md` | D2逐项检查、基本类依赖、非紧反例与未建义务。 |
| `docs/project/reviews/index.md` | 更新D1/D2核心Reviewed的具体范围。 |
| `mkdocs.yml` | 加入答案和本批复核入口，更新候选标记。 |
| `scripts/curriculum.json` | 登记D1/D2十二节模板、8题答案与审查记录。 |
| `scripts/differential-baseline.json` | 从78c0a2e固定两章原URL/标题/六节锚点，不随新稿重生成。 |
| `scripts/master-plan.json` | 仅更新D1/D2状态和审查入口，82目标单元仍保留。 |
| `scripts/test_curriculum.mjs` | 严格模板契约扩为PRE1–3/D1/D2精确集合。 |
| `scripts/verify_site.py` | 校验D1/D2旧锚点语义，检查独立题解页未解析公式。 |
| `validation/m3-differential/browser.json` | 本批实际验证证据：浏览器观测与范围。 |
| `validation/m3-differential/build.txt` | 本批实际验证证据：命令、输出或退出码；不替代数学证明。 |
| `validation/m3-differential/diff.txt` | 本批实际验证证据：命令、输出或退出码；不替代数学证明。 |
| `validation/m3-differential/independent.txt` | 本批实际验证证据：命令、输出或退出码；不替代数学证明。 |
| `validation/m3-differential/javascript.txt` | 本批实际验证证据：命令、输出或退出码；不替代数学证明。 |
| `validation/m3-differential/notebooks.txt` | 本批实际验证证据：命令、输出或退出码；不替代数学证明。 |
| `validation/m3-differential/results.json` | 本批实际验证证据：命令、输出或退出码；不替代数学证明。 |
| `validation/m3-differential/site.txt` | 本批实际验证证据：命令、输出或退出码；不替代数学证明。 |

## 验证与限制

43项Node、GUDHI43点云/217区间/3曲面、四Notebook、严格构建及129页站点检查通过。四页911处公式与两个自检全流程经过实际浏览器验收，详见[验证记录](VALIDATION.md)。旧URL、锚点、设计与既有算法保留。

数学复核由未编写正文的模型进行，主代理又阅读两章及16题；[具体发现与修正](docs/project/M3_REVIEW.md)可逐条复查。这不是人类同行审阅或形式化认证。

## 仍未完成

- IFT为外部分析先修；Whitney与Sard完整证明未展开。
- 一般整数/模2基本类、局部定向比较与边界横截仍外引，度求和为这些工具下的条件证明。
- 导子定义等价、切丛/余切丛与带边界版本仍需建设；D3–D5及几何、纽结、高阶同伦、维数、计算TDA和AI各路径未全部完成。
- 仍需维护者人类数学审阅。下一批接D3微分形式与D4 Morse基础，继续保留原章节与原创设计。

恢复步骤见[IMPLEMENTATION_STATUS](docs/project/IMPLEMENTATION_STATUS.md)，不得因构建通过或本批结束自动发布。
