# 版本、部署与数学审查是三件事

<div data-build-info>启用 JavaScript 后显示本页构建来源；构建文件同时提供 build-info.json。</div>

## 已核实的线上状态

以下为 **2026-10-14 的远端审计快照**，不是永久不变的“最新版本”。

| 事项 | 核查结果与证据 |
| --- | --- |
| GitHub 主分支 | `f341101a686fcc3a8dd22d0587a29514a835cefd`，A3–A8 的 [PR #7](https://github.com/Kevin20041008/topology-from-zero/pull/7) 已合并 |
| Pages | 对应提交的 [工作流 38226931978](https://github.com/Kevin20041008/topology-from-zero/actions/runs/38226931978) 成功，线上首页/A3/A8 返回成功 |
| 核心脚本 | 线上两个核心模块与该提交逐字节一致；持续约化保留所有正长度区间，无12位小数量化 |
| GitHub Release | 审计时最新标签仍为 [v0.3](https://github.com/Kevin20041008/topology-from-zero/releases/tag/v0.3)，标签不等于网站当前正文范围 |
| 数学审查 | A3–A8 有独立模型审查记录；部分重要定理外引。全书没有人类同行签署或形式化验证 |

历史 README/页脚的“候选、尚未发布”曾沿用到已部署内容，现以此表纠正。原始证据保存在仓库 `validation/v05/release-audit.json`；[实施状态](IMPLEMENTATION_STATUS.md)下的旧批次只描述当时操作，不能用于推断今日发布状态。

## v0.5 教学与质量升级

本批通过独立分支与 PR 审查交付。是否已部署以对应提交的工作流和线上 `build-info.json` 为准；“v0.5”是本批工作名称，不宣称已创建同名 Release。PR 检查只构建，部署仍限于主分支工作流，合并由维护者审阅决定。

今后的页面构建记录源提交、是否含未提交修改、构建类别与工作流链接。它证明源码身份，不证明部署成功，也不替代[定理依赖台账](proof-ledger.md)和[逐章审查](reviews/index.md)。
