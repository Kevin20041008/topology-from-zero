# A3–A8 拓扑与 AI 教学增补：验收记录

日期：2026-10-12。分支：`codex/ai-topology-learning`；基线：`e6e80cd`（`origin/main`）。本批为审阅候选，未合并、未发布；不表示全书或 M6 全部完成。

## 实际交付

六章各按十二节组织，合计48道分层习题及完整论证式解答、两级提示、六个即时自检、四幅原创SVG。正文覆盖 A3 拓扑损失、A4 图像分割、A5 医学拓扑、A6 高阶网络、A7 三维点云、A8 可微持续同调。三组本地 SVG 实验分别核对硬 Betti 损失与寿命损失、相同 Dice 不同拓扑、配对分支切换与不可微位置。

旧页面、旧锚点、原创设计、既有三个拓扑实验、基础实验台和四份 Notebook 保留；`topology-core.mjs`、`surfaces.mjs` 与依赖锁未改写。原P0 A/B回归保留严格断言。新核心复用持续约化，不增加神经网络框架。

## 数学审查

状态为 **Reviewed（独立模型）**：编写者之外的代理逐项核对定义、主要命题、反例及全部48题；不是人类同行评审或形式化验证。A3/A8 由 `audit_engineering`，A4/A5 由 `audit_math`，A6/A7 由 `review_foundations` 复核，维护者代理统一整合。单章记录在 `docs/project/reviews/A3.md` 至 `A8.md`。

交叉审查已修正三项具体问题：A5 在单方掩膜为空时也必须先拒绝另一非空掩膜的空骨架，两方向回归修复前失败、修复后通过；A7 最大池化补非空输入条件；A8 在 `(1,1)` 的右侧导数明确来自定义域外的公式延拓。A4/A5补齐第二层书面提示。

参考资料按实际可访问范围记录：题名/作者页核验与完整论文阅读分开；clDice 官方正文 §2–4 已读取，但完整附录未独立复核。所有新增文字、题目、代码与SVG为原创，没有复制教材正文或图片。

## 自动化结果

本地 Node.js v24.14.0、Python 3.12.0rc3、GUDHI 3.11.0。CI使用既有Node 22 / Python 3.12配置。全部命令退出码为0，原始输出及命令表见 `validation/ai-learning/`。

| 验证 | 实际结果 |
| --- | --- |
| `node --test scripts/test_topology.mjs scripts/test_curriculum.mjs scripts/test_foundations.mjs scripts/test_ai_topology.mjs` | 51项通过；含既有精度/网格/课程/基础测试与8项AI测试 |
| `python scripts/verify_independent.py` | 43组点云、217条H0/H1区间、3种抽象曲面对照通过 |
| `python scripts/verify_ai_independent.py` | 全部512个3×3闭方块掩膜与GUDHI立方同调相符；25条下星路径、49个持续区间逐值相同 |
| `python scripts/verify_ai_examples.py` | A3、A5、A6、A7、A8各一段Python示例在新进程/临时目录运行通过 |
| `python scripts/verify_notebooks.py` | 四份原Notebook各用新内核执行，分别2/5/3/3个代码单元 |
| `python -m mkdocs build --strict` | 严格构建通过 |
| `python scripts/verify_site.py` | 145个HTML页面，旧v0.2/v0.3的19/25路径清单、锚点、51章、自检、中文搜索、数学标记与模块挂载通过 |
| `git diff --check` | 通过 |

新AI测试包含最小正binary64寿命、半开死亡端点、全零/并列值、光滑分支精确差商、不等单侧导数、空掩膜、对角角接触、非法/稀疏输入。512个掩膜另与独立8/4邻接算法比较，逐个验证边界复合为零和Euler关系。没有使用容差掩盖非零同调类；平方下溢仅作为损失数值限制记录。

初次运行的汇总打印遇到Windows控制台编码问题；所有子命令已运行，但汇总文件未写完。已修复工作区辅助运行器的UTF-8输出，并完成上述全套重跑。最终Notebook日志无首次运行出现的ZeroMQ关闭连接提示。构建输出含Material上游关于未来MkDocs 2.0的提示；当前锁定版本的严格构建成功。

## 浏览器验收

本地静态站点 `http://127.0.0.1:8016`：六章、六页答案及实验页共1312个数学标记均生成MathJax容器，0个数学错误节点；四幅SVG成功加载。六道即时题分别验证未选择提交、两次提示、错误/正确反馈与重置。实验验证 `t=0,0.5,1`、一步梯度下降、六种掩膜、`a=b=0.5`、`(1,1)`边界及原点。

观察值包括：中心洞与边缘凹口的Dice同为48/49，而Betti分别为(1,1)/(1,0)；删窄桥后的Dice为24/25且β0=2。390×844视口下实验页及A6页面无整页横向溢出，结束后恢复默认视口。观察到的控制台错误/警告为空。详细观察存于 `validation/ai-learning/browser.json`；浏览器检查是本地验收，不冒称CI包含浏览器测试。

## 仍未解决的问题

1. 人类拓扑学/医学专家审阅和形式化验证尚未完成；全局持续稳定性、配对切换的一般非光滑理论及随机优化收敛未在本批证明。
2. A4保留平面Jordan与胞腔/奇异同调比较外引；A5保留完整clDice论文附录条件和具体骨架算法的拓扑保持义务。
3. A6证明针对已声明的实内积、线性层、符号特征和奇激活；加权、归一化或学习边界须重新审查。A7固定同标签扰动不覆盖任意点数或任意采样重建。
4. 没有新增临床数据、网络训练、真实点云基准、多种子统计或分布外验证；没有宣称Dice/IoU/Accuracy提升。新浏览器模型是数学教学实验。
5. 全书其它卷的先修缺口、高级外引和未完成实验仍按总计划保留，本批不替代这些工作。

有限对照只证明所列输入和共享数值约定下的一致性；书面证明、有限测试、一般算法正确性与真实任务性能是不同证据。

## 逐文件修改清单

以下以本批基线为参照；不包含可再生成的 `site/` 或其它工作树。

| 文件 | 修改内容 |
| --- | --- |
| `.github/workflows/pages.yml` | 增加AI算法/GUDHI/正文Python检查；保留仅main部署条件。 |
| `AI-LEARNING-VALIDATION.md` | 本批审查、结果、未尽义务与逐文件清单。 |
| `CHANGELOG.md` | 登记A3–A8未发布批次。 |
| `README.md` | 课程范围、复现命令与本批分支说明。 |
| `docs/ai/differentiable-persistence.md` | A8 · 可微持续同调：局部导数与配对切换；十二节、八题及引用。 |
| `docs/ai/higher-order-networks.md` | A6 · 高阶关系、Hodge 算子与神经网络；十二节、八题及引用。 |
| `docs/ai/index.md` | A3–A8先修、学习支线与证据边界。 |
| `docs/ai/medical-topology.md` | A5 · 医学图像：骨架、拓扑先验与评价边界；十二节、八题及引用。 |
| `docs/ai/point-cloud-learning.md` | A7 · 点云学习：几何、持续同调与稳定性；十二节、八题及引用。 |
| `docs/ai/segmentation-topology.md` | A4 · 图像分割：像素误差与拓扑错误；十二节、八题及引用。 |
| `docs/ai/topological-loss.md` | A3 · 拓扑损失：目标、梯度与约束的边界；十二节、八题及引用。 |
| `docs/assets/ai-a4-pixels.svg` | 原创、可维护SVG示意图。 |
| `docs/assets/ai-a5-graphs.svg` | 原创、可维护SVG示意图。 |
| `docs/assets/ai-a6-hodge.svg` | 原创、可维护SVG示意图。 |
| `docs/assets/ai-a7-pipelines.svg` | 原创、可维护SVG示意图。 |
| `docs/curriculum.md` | 添加六章及跨章先修。 |
| `docs/development.md` | 完整本地检查命令与新模型语义。 |
| `docs/exercises/a3-solutions.md` | 对应章八题完整论证与边界情况解答。 |
| `docs/exercises/a4-solutions.md` | 对应章八题完整论证与边界情况解答。 |
| `docs/exercises/a5-solutions.md` | 对应章八题完整论证与边界情况解答。 |
| `docs/exercises/a6-solutions.md` | 对应章八题完整论证与边界情况解答。 |
| `docs/exercises/a7-solutions.md` | 对应章八题完整论证与边界情况解答。 |
| `docs/exercises/a8-solutions.md` | 对应章八题完整论证与边界情况解答。 |
| `docs/exercises/index.md` | 六组新解答入口。 |
| `docs/index.md` | 更新正文/实验数和学习入口。 |
| `docs/javascripts/ai-exercises.mjs` | 六题两级提示、选项与即时反馈。 |
| `docs/javascripts/ai-topology-core.mjs` | 下星路径、寿命损失、闭像素复形、Betti/Euler与Dice。 |
| `docs/javascripts/ai-topology-lab.mjs` | 三组SVG可视化及边界反馈。 |
| `docs/javascripts/exercise-bank.mjs` | 注册新题库，保持旧题键。 |
| `docs/labs/ai-topology.md` | 三个实验的定义、控制器、计算方法与限制。 |
| `docs/labs/index.md` | AI实验入口和范围。 |
| `docs/progress.md` | 真实候选状态和未完成范围。 |
| `docs/project/COURRICULUM_MASTER_PLAN.md` | 保留长期82单元并细化新增6章。 |
| `docs/project/IMPLEMENTATION_STATUS.md` | 批次状态、审查、续作与历史记录。 |
| `docs/project/PREREQUISITE_GRAPH.md` | 更新88单元依赖表与AI学习支线。 |
| `docs/project/reviews/A3.md` | 逐项定义/命题/题解复核、来源访问范围及未尽义务。 |
| `docs/project/reviews/A4.md` | 逐项定义/命题/题解复核、来源访问范围及未尽义务。 |
| `docs/project/reviews/A5.md` | 逐项定义/命题/题解复核、来源访问范围及未尽义务。 |
| `docs/project/reviews/A6.md` | 逐项定义/命题/题解复核、来源访问范围及未尽义务。 |
| `docs/project/reviews/A7.md` | 逐项定义/命题/题解复核、来源访问范围及未尽义务。 |
| `docs/project/reviews/A8.md` | 逐项定义/命题/题解复核、来源访问范围及未尽义务。 |
| `docs/project/reviews/index.md` | 六章审查入口。 |
| `mkdocs.yml` | 新增导航、答案和实验模块，保持主题与URL。 |
| `scripts/curriculum.json` | 新增六章、答案、审查文件与依赖注册。 |
| `scripts/export_ai_cases.mjs` | 导出共享数值输入及实际JS结果供独立比较。 |
| `scripts/master-plan.json` | 新增A3–A8计划节点，保留原长期包。 |
| `scripts/search-dictionary.txt` | 新增中文AI拓扑术语。 |
| `scripts/test_ai_topology.mjs` | 八项回归，包括穷举512掩膜、精确链/Euler、短条及梯度。 |
| `scripts/test_curriculum.mjs` | 精确更新51章/88单元/9个新版模板数量，保留旧基线断言。 |
| `scripts/verify_ai_examples.py` | 在独立进程执行五章登记的Python示例。 |
| `scripts/verify_ai_independent.py` | GUDHI立方同调和下星路径的精确对照。 |
| `scripts/verify_site.py` | 保留旧检查并增加AI中文检索和实验挂载/锚点检查。 |
| `validation/ai-learning/ai-examples.txt` | 对应命令原始输出、退出码或实际浏览器验收记录。 |
| `validation/ai-learning/ai-independent.txt` | 对应命令原始输出、退出码或实际浏览器验收记录。 |
| `validation/ai-learning/browser.json` | 对应命令原始输出、退出码或实际浏览器验收记录。 |
| `validation/ai-learning/build.txt` | 对应命令原始输出、退出码或实际浏览器验收记录。 |
| `validation/ai-learning/diff.txt` | 对应命令原始输出、退出码或实际浏览器验收记录。 |
| `validation/ai-learning/independent.txt` | 对应命令原始输出、退出码或实际浏览器验收记录。 |
| `validation/ai-learning/javascript.txt` | 对应命令原始输出、退出码或实际浏览器验收记录。 |
| `validation/ai-learning/notebooks.txt` | 对应命令原始输出、退出码或实际浏览器验收记录。 |
| `validation/ai-learning/results.json` | 对应命令原始输出、退出码或实际浏览器验收记录。 |
| `validation/ai-learning/site.txt` | 对应命令原始输出、退出码或实际浏览器验收记录。 |
