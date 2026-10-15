# 版本、部署与数学审查是三件事

<div data-build-info>本页静态构建标识由构建钩子填入。</div>

## 已核实的线上状态

以下为 **2026-10-15 11:44:03 UTC（北京时间19:44:03）的只读远端快照**。这不是永久有效的“最新版本”。

| 事项 | 证据 |
|---|---|
| GitHub主分支 | `7580d391a78a2df42a428a0d3fbd3dde57dbae4b`；[PR #9](https://github.com/Kevin20041008/topology-from-zero/pull/9) 已由维护者于2026-10-14 12:12:27 UTC合并 |
| Pages部署 | [工作流38562088381](https://github.com/Kevin20041008/topology-from-zero/actions/runs/38562088381) 成功；线上manifest指向同一提交，dirty=false |
| 页面一致性 | 首页、课程索引、学习入口、CT1、H3/Q1/Q2、证明工作坊、覆盖实验、项目D共10个普通URL均通过；逐页SHA、页面身份、清单摘要一致 |
| 在线清单 | 55篇正文、16章十二项模板、128题、8项浏览器实验、4份Notebook；这是快照的已部署清单 |
| 响应记录 | Last-Modified为2026-10-14 12:17:33 GMT；本次检查没有发现旧首页混入，不对其他CDN地区作全局保证 |
| 数学审查 | 模型复核和有限验证不等于全书人类同行签署；新同调补全分支尚未发布 |

原始证据在仓库 `validation/homology-completion/release-audit.json`、`live-baseline-check.json`。历史v0.5/v0.6审计保留，不重写过去的观测。当前分支扩充H2/H3后，源码清单为{{ course.template_chapters }}章模板、{{ course.template_exercises }}题；未以它冒充上述线上快照。

## 本页如何记录版本

每页HTML在构建时写入 `topology-build-commit`、`topology-inventory-sha256` 、`topology-build-dirty` 与源文件路径 `topology-page-path` 元数据；首页同时包含无需JavaScript的可读SHA。构建开始只捕获一次来源身份。未提交工作树明确带“本地修改”，SHA不单独代表这些改动。

首页、课程索引与进度页的总量来自 `scripts/curriculum.json`、`scripts/master-plan.json` 和 `scripts/lab-inventory.json`。项目课程、证明工作坊与维护页面不计入正式章节；基础实验台按一个多控件教学实验计数，三项AI实验分别计数。README摘要从相同清单生成，CI拒绝过期摘要。

浏览器只用HTML内嵌SHA描述本页。另取 `build-info.json` 进行比较时，若不一致显示警告，绝不拿新JSON覆盖旧HTML身份。网络失败仍保留静态来源。

## 部署完成后的验收

主分支部署完成后，独立CI步骤请求**普通公开URL**，比较首页、课程索引、学习入口、整数同调、H3/Q1/Q2、证明工作坊、覆盖实验和项目D的SHA、页面身份与清单摘要。期望值来自该次工作流提交；不靠添加随机查询参数绕过普通读者遇到的缓存。响应的最终URL也被记录；即使错误路由返回同版本首页，源文件路径不匹配仍会失败。

检查最多尝试16次，间隔45秒，覆盖已观察到的10分钟缓存周期；每次保存响应头和不一致原因。超过窗口仍失败则工作流失败，保留 `deployment-consistency` 证据，不自动回滚或重发版本。对不同CDN地区的缓存状态仍不能作全球保证。

本批是 **H2/H3同调证明补全候选**，不自动合并、打标签或发布。已部署v0.6与本批本地/PR验证分别记录。代码通过也不替代[定理依赖台账](proof-ledger.md)、[人工审阅包](HUMAN_REVIEW_PACKET.md)与[学习者测试](LEARNER_STUDY.md)。
