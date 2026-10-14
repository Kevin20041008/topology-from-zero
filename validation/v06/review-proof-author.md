# 路线 A 三级证明训练：作者检查与执行记录

- 日期：2026-10-14；分支 `codex/v0.6-proof-learning`，工作树 `topology-v06-quality`，起始基线 `9a562ca`。
- 作者：`review_foundations`；根代理随后独立阅读八组数学题面与论证，反馈整体成立，包含 PRE1 满射反映包含、PS1 稠密相交、有限闭集粘合和连通夹心的假设核对。`audit_math` 又逐条检查八组任务、迁移证明与答案，未发现阻塞，实际运行6项核心测试通过；详见 `validation/v06/review-proof-training-math.md`。
- 状态：**Reviewed（非编写模型数学内容复核），待人类审阅**。作者检查、根代理模型复核和有限计算都不是人类同行审稿或形式化验证。
- 未提交、推送、合并或部署。全仓构建、导航和其他模块由根代理集成，本报告不代替发布批准。

## 实际交付

1. `docs/exercises/proof-workshop.md`：八章各三层训练、八项新迁移证明、两步提示、每题四项自核量规、完整论证和具体反例。纯静态内容在关闭 JavaScript 后仍可阅读。
2. `docs/javascripts/proof-training-bank.mjs`：全部原创题面、证明步骤依赖、错误反馈、迁移答案与参考定位。`scripts/build_proof_workshop.mjs` 从同一题库生成静态页，`--check` 可查漂移。
3. `docs/javascripts/proof-training-core.mjs`：依赖检查、排除错误步骤、稳定移动、受约束草稿解码。没有自由文字评分接口。
4. `docs/javascripts/proof-training-ui.mjs`、`docs/stylesheets/proof-training.css`：原生按钮/复选框/文本框、键盘排序、即时具体反馈、可选本机草稿；沿用网站颜色，没有新视觉特效。
5. 八个原章仅新增迁移任务和训练链接，保留原题与原 URL：
   - `docs/preliminaries/sets-maps-relations.md`
   - `docs/preliminaries/proofs-counterexamples.md`
   - `docs/preliminaries/metric-spaces.md`
   - `docs/introduction/01-spaces.md`
   - `docs/point-set/bases-subbases.md`
   - `docs/point-set/subspaces.md`
   - `docs/point-set/02-continuity.md`
   - `docs/point-set/connectedness.md`
6. `docs/project/LEARNER_STUDY.md`、`docs/project/HUMAN_REVIEW_PACKET.md`：准备5–10名真实学习者的流程、帮助等级、人工评价、具体数学审阅义务及可选延迟迁移题。明确目前尚未招募/执行、没有学习提升或人类审稿数据。
7. 四个可复用空模板：`docs/project/templates/learner-observation.csv`、`proof-rating.csv`、`learner-feedback.md`、`human-review-report.md`。CSV只有表头；Markdown只有待填问题，无伪造示例参与者。
8. `scripts/test_proof_training.mjs`、`tests/browser/proof-training.spec.mjs`：纯函数、有限数学输入与真实浏览器验证。

## 教学与数学自检

| 章 | 核心审查结果 |
|---|---|
| PRE1 | 像/逆像伴随包含两个方向完整；满射反映包含的逆向用遗漏点，空域/空陪域不被略过。 |
| PRE2 | 逆否和逆命题不同；平方和奇偶给一般整数代数论证，不能仅靠有限举例。 |
| PRE3 | 半径先依赖固定 x，后验证球内任意 y；无最近点或统一半径假设；A空及≤失败都处理。 |
| spaces | 拓扑交的空族环境是 P(X)；逆像生成族的任意并使用全部表示的集合，避免隐含同时选择无限表示；离散 iff 单射明确要求目标离散。 |
| bases | 覆盖、局部交与双向拓扑包含完整；显式引用有理数稠密性，不要求内部点有理。 |
| PS1 | cl_X(A∩U)=cl_X(U) 两向论证准确；开性用在 O∩U，闭包环境明确；非开单点反例有效。 |
| continuity | 紧集有限并无 Hausdorff 依赖；闭集粘合先良定义，再用闭集逆像及闭传递；无限单点闭覆盖反例成立。 |
| connectedness | 连续到离散空间只断言像至多一点以保留空域；夹心集合证明核对分离四条件，取消上界的两点反例成立。 |

每组引导材料含四个有效步骤和一条错误步骤。检查按依赖有向图工作，PRE1的两个证明方向、紧并中的两个覆盖选择可以交换顺序。它只评估给定材料，不声称涵盖所有可行证明。层1通过展开核对反思量词；层3通过写作、提示和人工/自核量规，不添加大量单选，也不以字符串相似度判断理解。

参考均为原有章节或真实标准教材章节定位，没有新编 DOI 或页码。本轮没有逐页访问原书，不声称完成外部文献全文核查。

## 实际自动化验证

### 纯核心与有限数学核对

`node --test scripts/test_proof_training.mjs`：**6项通过，0失败**。最近一次在正文的无限代表构造说明更新并重新生成后通过。

- 八章路径、题面/解答静态同源、章节入口、错误步骤与依赖引用完整。
- 保留错误步骤、排除必要步骤、颠倒每条依赖均被拒绝；合法独立步骤交换被接受。
- 移动不丢失/重复/变异原数组；损坏状态、未知ID、非文字草稿、自核越界、长度边界均处理。
- 独立穷举大小不超过3的集合间全部60个映射，核对伴随包含与满射反映包含判据，包含空集合映射。
- 独立穷举三点标号空间全部29个拓扑，逐个稠密子集与开集检查闭包等式；另在 Sierpiński 空间保留取消开性后的失败对照。

有限穷举只验证列出的有限输入，通用数学结论依据书面证明；测试本身不是学生证明或形式化验证。

### 真实浏览器

`npx playwright test tests/browser/proof-training.spec.mjs`：**10项通过，0失败，46.2秒**。使用项目原有 Chromium 桌面1280×900和移动390×844配置，实际站点前缀 `/topology-from-zero/`。

每种视口检查五组行为：

1. 八个挂载都出现五条步骤；错误有具体反馈；修复顺序并排错后通过，保留“不代表独立掌握”的边界；页面无脚本异常、无横向溢出。
2. 键盘移动后焦点仍在同一步可操作按钮；恢复排序不清空独立写作草稿。
3. 默认不存储；主动保存/刷新恢复；恶意标签只作为文字；删除一题不删除另一题；未观察到包含草稿的网络请求正文。
4. 损坏或禁用存储仍可写作；保存/删除失败准确提示，不虚报保存成功或已删除。
5. 八章旧URL中的新增入口抵达相应锚点；关闭JavaScript仍可阅读并展开完整答案。

浏览器通过后只更新状态说明与 spaces 的静态论证措辞，未改变UI代码或选择器。最终集成需要重新构建这些文字；根代理负责全仓验收。测试服务随进程退出释放8123端口。

## 数据、可访问性与尚未完成项

- 草稿只在主动点击保存时进入 localStorage；不发送、不自动计时、不采集研究数据、不与路线完成进度绑定。用户可选择纸笔，仍有完整任务与答案。
- 当前以原生HTML、焦点、标签、fieldset/legend、status/live反馈和两种视口验证。尚未做真实屏幕阅读器用户测试，不把源码属性称为全面可访问性认证。
- 多标签不实时同步；同题最后保存覆盖前一次。删除按钮只删除本题已保存记录，保留当前输入并准确说明行为。
- 人类审稿、5–10人试用、延迟迁移和学习效果研究均未执行。不能把这份准备材料写成已收到人类认可或证明能力提升。
- H3/Q1/Q2未闭合内容在人工包列明，后续独立复核另记；本作者报告不提前认可仍在编写的UCT证明。
