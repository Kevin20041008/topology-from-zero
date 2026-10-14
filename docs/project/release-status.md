# 版本、部署与数学审查是三件事

<div data-build-info>本页静态构建标识由构建钩子填入。</div>

## 已核实的线上状态

以下为 **2026-10-14 09:48:46 UTC（北京时间17:48:46）的远端快照**，不把它写成永久有效的“最新版本”。

| 事项 | 证据 |
| --- | --- |
| GitHub 主分支 | `9a562cad901b72407c9261e2f69d4dad790cfc6d`；[PR #8](https://github.com/Kevin20041008/topology-from-zero/pull/8) 已合并 |
| Pages 部署 | [工作流 38543305406](https://github.com/Kevin20041008/topology-from-zero/actions/runs/38543305406) 成功；线上 `build-info.json` 指向同一提交 |
| 页面观察 | 首页已经返回55篇正文；课程索引、学习路线和整数同调页均HTTP 200，Last-Modified均为09:36:35 UTC |
| 缓存观察 | 响应为 `Cache-Control: max-age=600`；本次未复现旧51章首页，无法据此确定先前不一致的原因 |
| GitHub Release | 当时最新标签仍为 [v0.3](https://github.com/Kevin20041008/topology-from-zero/releases/tag/v0.3)，标签不是网站正文范围的计数 |
| 数学审查 | 有模型检查与有限计算证据；全书尚无人类同行签署或形式化验证 |

原始证据位于仓库 `validation/v06/release-audit-before.json`。v0.5旧实现仅从独立JSON显示版本；因此当时的观察并不能证明每一份HTML都来自该提交。本批补上下面的逐页检查。历史审计保留在 `validation/v05/` 与[实施状态](IMPLEMENTATION_STATUS.md)，历史“未发布”不用于描述今日线上状态。

## 本页如何记录版本

每页HTML在构建时写入 `topology-build-commit`、`topology-inventory-sha256` 、`topology-build-dirty` 与源文件路径 `topology-page-path` 元数据；首页同时包含无需JavaScript的可读SHA。构建开始只捕获一次来源身份。未提交工作树明确带“本地修改”，SHA不单独代表这些改动。

首页、课程索引与进度页的总量来自 `scripts/curriculum.json`、`scripts/master-plan.json` 和 `scripts/lab-inventory.json`。项目课程、证明工作坊与维护页面不计入正式章节；基础实验台按一个多控件教学实验计数，三项AI实验分别计数。README摘要从相同清单生成，CI拒绝过期摘要。

浏览器只用HTML内嵌SHA描述本页。另取 `build-info.json` 进行比较时，若不一致显示警告，绝不拿新JSON覆盖旧HTML身份。网络失败仍保留静态来源。

## 部署完成后的验收

主分支部署完成后，独立CI步骤请求**普通公开URL**，比较首页、课程索引、学习入口、整数同调、H3/Q1/Q2、证明工作坊、覆盖实验和项目D的SHA、页面身份与清单摘要。期望值来自该次工作流提交；不靠添加随机查询参数绕过普通读者遇到的缓存。响应的最终URL也被记录；即使错误路由返回同版本首页，源文件路径不匹配仍会失败。

检查最多尝试16次，间隔45秒，覆盖已观察到的10分钟缓存周期；每次保存响应头和不一致原因。超过窗口仍失败则工作流失败，保留 `deployment-consistency` 证据，不自动回滚或重发版本。对不同CDN地区的缓存状态仍不能作全球保证。

本批是 **v0.6质量升级候选**，不自动合并、打标签或发布。现有线上v0.5成功与候选版的本地/PR验证必须分别阅读。代码通过也不替代[定理依赖台账](proof-ledger.md)、[人工审阅包](HUMAN_REVIEW_PACKET.md)与[学习者测试](LEARNER_STUDY.md)。
