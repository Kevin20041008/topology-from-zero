# M0 / M1 第一批逐文件交付记录

日期：2026-10-12。基线：PR #3 的 `2ef21556cce4f614e6ddd0f572a9fb9b5d4ce4ba`；独立分支 `codex/m1-foundations-batch-1`。本批PR以 `codex/v0.4-graduate-courses` 为目标，依赖既有PR #3。没有重新初始化、合并PR、强推main或发布候选版本。

## 本批实际成果

完成M0审计与局部修正；实际补写M1首批PRE1集合/映射/等价类、PRE2证明/反例、PRE3度量空间，24题完整答案、3幅正文原创SVG、1幅先修概览、新基础实验台及3道分步自检。每篇新章按十二节模板编写并经非编写模型逐项复核。原42篇正文保留，独立审查记录共45份；11部分82单元是长期目标，不能当作82篇已写正文。

验证：43项Node通过；GUDHI43点云/217区间与3曲面对照；4Notebook新内核；严格构建；126页面链接/中文搜索/公式标记及旧URL检查；浏览器11页1440公式渲染与3题/实验全流程。生产Pages前缀配置缺失先失败、修复后通过。详细范围和原始日志见 [VALIDATION.md](VALIDATION.md)。有限测试不是一般数学证明；模型复核不是人类同行评审。

## 未完成的数学审查与后续批次

1. H3：一般有限CW骨架对相对同调桥梁、UCT的自然Tor映射；Q2：对偶关联数符号与帽积比较。正文已明确标“证明思路/条件推导”，尚未全证。
2. H2细分低维/支撑、G1过滤页核像、D1单位分解穷竭、T2脊柱、T3带方向编号结图仍需展开；逐章条目见 [审查索引](docs/project/reviews/index.md)。
3. M1整体未完成。下一批：PRE4可数性/选择工具、PS1完整子空间课程，并升级导论/基/连续性章节的6–12题与完整答案。
4. 全课程纽结交互、现代同伦、集合拓扑/维数、SNF/离散Morse/Mapper实验及真实AI论文复现未完成。没有新增真实性能优势声明。
5. 全书人类同行评审与形式化验证未完成。CI尚无真实浏览器验收；原Notebook02不是任意浮点输入API。

恢复工作先读 [实施状态](docs/project/IMPLEMENTATION_STATUS.md)，检查工作区和远程PR；不要重跑旧生成器。如果依赖PR #3合并，需重定本批base为main后重新审差异/CI；合并及发布另需授权。

## 本批全部文件

下表仅列相对上述基线的本批变化，不把PR #3已有文件计为本批新增。`A`新增，`M`修改；没有删除文件。审查台账较多，每个章节独立保留一份。

| 状态 | 文件 | 本批用途/变化 |
| --- | --- | --- |
| M | [.github/workflows/pages.yml](.github/workflows/pages.yml) | 纳入基础实验测试；构建与链接验证共用SITE_URL；PR仍不部署。 |
| M | [CHANGELOG.md](CHANGELOG.md) | 记录本批正文、数学修正、实验和部署前缀修复，标Unreleased。 |
| A | [CONTRIBUTING.md](CONTRIBUTING.md) | 根目录贡献入口与章节/审查/版权/PR规则。 |
| A | [M1-REVIEW.md](M1-REVIEW.md) | 本批逐文件清单、验收范围、未尽证明义务与续作说明。 |
| M | [README.md](README.md) | 更新候选范围、课程数量、审查入口与测试命令。 |
| M | [VALIDATION.md](VALIDATION.md) | 本批验证总表与浏览器实测范围；保留历史记录。 |
| M | [docs/algebraic/cohomology/duality.md](docs/algebraic/cohomology/duality.md) | Q2.2在论证前标对偶符号/帽积比较未展开，取消完整证明外观。 |
| M | [docs/algebraic/graduate-tools.md](docs/algebraic/graduate-tools.md) | 补Hurewicz、Serre谱序列的版本假设与收敛范围，保留外引界限。 |
| M | [docs/algebraic/homology/cellular-coefficients.md](docs/algebraic/homology/cellular-coefficients.md) | H3.1相对CW桥梁、H3.2自然Tor映射标明确条件推导/证明思路。 |
| M | [docs/algebraic/homotopy-fundamental-group.md](docs/algebraic/homotopy-fundamental-group.md) | 修复过时的跨章未证明说明，链接F1/C1/H1；Hurewicz仍外引。 |
| A | [docs/assets/pre1-fibres.svg](docs/assets/pre1-fibres.svg) | 原创四点映射纤维、商集与未命中陪域点示意。 |
| A | [docs/assets/pre2-quantifiers.svg](docs/assets/pre2-quantifiers.svg) | 原创量词见证矩阵，区分逐行见证与统一见证。 |
| A | [docs/assets/pre3-metric-balls.svg](docs/assets/pre3-metric-balls.svg) | 原创菱形/方形开球包含及arctan端点示意。 |
| A | [docs/assets/prerequisite-overview.svg](docs/assets/prerequisite-overview.svg) | 原创课程方向总览；精确依赖另见82节点邻接表。 |
| M | [docs/contributing.md](docs/contributing.md) | 接入统一章节模板、审查协议和阶段提交要求。 |
| M | [docs/curriculum.md](docs/curriculum.md) | 加入PRE1–PRE3与先修，分清现有课程和长期课程计划。 |
| M | [docs/development.md](docs/development.md) | 更新完整验证命令和浏览器/数学审阅界限。 |
| M | [docs/differential/forms-derham.md](docs/differential/forms-derham.md) | 星形收缩改为以a为中心，覆盖非原点星形域。 |
| M | [docs/differential/morse-handles.md](docs/differential/morse-handles.md) | 补光滑、无边界、阈值a≤b及Morse习题假设，处理a=b与n=0。 |
| A | [docs/exercises/index.md](docs/exercises/index.md) | 新章完整题解和旧章提示之间的区别及学习入口。 |
| A | [docs/exercises/pre1-solutions.md](docs/exercises/pre1-solutions.md) | 8题逐步解答：像/逆像、单满射、划分和商泛性质。 |
| A | [docs/exercises/pre2-solutions.md](docs/exercises/pre2-solutions.md) | 8题逐步解答：量词、归纳、左逆、对角与有限验证。 |
| A | [docs/exercises/pre3-solutions.md](docs/exercises/pre3-solutions.md) | 8题逐步解答：矩阵、完备性、距离函数、伪度量商。 |
| M | [docs/graduate-review.md](docs/graduate-review.md) | 保留历史审查并链接当前逐章记录及已修问题。 |
| M | [docs/index.md](docs/index.md) | 保留原创首页设计，增加预备路线与本批候选进度。 |
| M | [docs/javascripts/exercise-bank.mjs](docs/javascripts/exercise-bank.mjs) | 接入3新自检，不改变原42题键及反馈。 |
| A | [docs/javascripts/foundations-core.mjs](docs/javascripts/foundations-core.mjs) | 精确有限集合位掩码、拓扑闭包、整数度量/伪度量、严格开球。 |
| A | [docs/javascripts/foundations-exercises.mjs](docs/javascripts/foundations-exercises.mjs) | 3道自检的选项、两级提示和针对性反馈。 |
| A | [docs/javascripts/foundations-lab.mjs](docs/javascripts/foundations-lab.mjs) | 新实验界面绑定、输入错误反馈、失效结果清除。 |
| A | [docs/labs/foundations.md](docs/labs/foundations.md) | 映射/最小拓扑/整数距离矩阵/严格开球实验与定义、算法、限制。 |
| M | [docs/labs/index.md](docs/labs/index.md) | 保留三旧实验并增加基础实验入口。 |
| A | [docs/notebooks.md](docs/notebooks.md) | 四Notebook内容、运行方式与数学/浮点范围。 |
| A | [docs/preliminaries/metric-spaces.md](docs/preliminaries/metric-spaces.md) | PRE3完整十二节、序列/连续/完备证明与反例、8题两级提示。 |
| A | [docs/preliminaries/proofs-counterexamples.md](docs/preliminaries/proofs-counterexamples.md) | PRE2完整十二节、量词/反证/对角证明、8题两级提示。 |
| A | [docs/preliminaries/sets-maps-relations.md](docs/preliminaries/sets-maps-relations.md) | PRE1完整十二节、编号定义/证明、正反例、8题两级提示。 |
| M | [docs/progress.md](docs/progress.md) | 准确标记本批、原42章候选、未完成模块。 |
| A | [docs/project/AUDIT_M0.md](docs/project/AUDIT_M0.md) | 原42章、核心算法、网格、Notebook、CI及线上状态审计。 |
| A | [docs/project/COURRICULUM_MASTER_PLAN.md](docs/project/COURRICULUM_MASTER_PLAN.md) | 11部分82教学单元、先修、证明/例题/实验目标与阶段验收。 |
| A | [docs/project/IMPLEMENTATION_STATUS.md](docs/project/IMPLEMENTATION_STATUS.md) | 实际完成、验证、未尽问题、分支依赖与准确续作指令。 |
| A | [docs/project/M1_REVIEW.md](docs/project/M1_REVIEW.md) | 非编写模型逐项复核3章24题与实验的发现、反例、整改复查。 |
| A | [docs/project/MATH_REVIEW_PROTOCOL.md](docs/project/MATH_REVIEW_PROTOCOL.md) | 定义/定理/证明/计算/习题核查、状态语义及模板。 |
| A | [docs/project/PREREQUISITE_GRAPH.md](docs/project/PREREQUISITE_GRAPH.md) | 方向图、可维护源文本、82节点完整先修/后继表。 |
| A | [docs/project/reviews/A1.md](docs/project/reviews/A1.md) | A1 · 持续特征、稳定表示与可微边界：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/A2.md](docs/project/reviews/A2.md) | A2 · 拓扑学习实验、基线与泛化证据：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/C1.md](docs/project/reviews/C1.md) | C1 · 覆盖映射、提升与圆周基本群：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/C2.md](docs/project/reviews/C2.md) | C2 · 提升判据、万有覆盖与覆盖分类：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/D1.md](docs/project/reviews/D1.md) | D1 · 光滑流形、切空间与秩定理：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/D2.md](docs/project/reviews/D2.md) | D2 · 横截性、交叉与映射度：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/D3.md](docs/project/reviews/D3.md) | D3 · 微分形式、Stokes 与 de Rham 上同调：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/D4.md](docs/project/reviews/D4.md) | D4 · Morse 函数、子水平集与柄：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/D5.md](docs/project/reviews/D5.md) | D5 · 向量丛、截面与特征类入口：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/F1.md](docs/project/reviews/F1.md) | F1 · 基点变换、函子性与形变收缩：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/F2.md](docs/project/reviews/F2.md) | F2 · van Kampen、图与胞腔表示：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/G1.md](docs/project/reviews/G1.md) | G1 · 高阶同伦、纤维化与谱序列入口：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/H1.md](docs/project/reviews/H1.md) | H1 · 整数奇异链与同伦不变性：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/H2.md](docs/project/reviews/H2.md) | H2 · 相对同调、切除与 Mayer–Vietoris：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/H3.md](docs/project/reviews/H3.md) | H3 · 胞腔同调、挠与系数变换：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/K1.md](docs/project/reviews/K1.md) | K1 · 有限复形、边界算法与可验证不变量：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/P1.md](docs/project/reviews/P1.md) | P1 · 闭包、内部、边界与网：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/P10.md](docs/project/reviews/P10.md) | P10 · 函数空间、紧开拓扑与 Arzelà–Ascoli：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/P2.md](docs/project/reviews/P2.md) | P2 · 分离公理与可数性：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/P3.md](docs/project/reviews/P3.md) | P3 · 任意积、箱拓扑与拓扑和：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/P4.md](docs/project/reviews/P4.md) | P4 · 紧致性、有限交性质与度量判据：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/P5.md](docs/project/reviews/P5.md) | P5 · 滤子、超滤子与 Tychonoff 定理：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/P6.md](docs/project/reviews/P6.md) | P6 · 局部紧致、紧化与适当映射：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/P7.md](docs/project/reviews/P7.md) | P7 · Urysohn 引理、Tietze 延拓与度量化：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/P8.md](docs/project/reviews/P8.md) | P8 · 完备化、Baire 空间与不动点：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/P9.md](docs/project/reviews/P9.md) | P9 · 局部连通、仿紧致与单位分解：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/PRE1.md](docs/project/reviews/PRE1.md) | PRE1 · 集合、映射与等价类：逐章定义/证明/题解/来源与待尽义务；记录非编写模型复核及整改。 |
| A | [docs/project/reviews/PRE2.md](docs/project/reviews/PRE2.md) | PRE2 · 量词、证明方法与反例构造：逐章定义/证明/题解/来源与待尽义务；记录非编写模型复核及整改。 |
| A | [docs/project/reviews/PRE3.md](docs/project/reviews/PRE3.md) | PRE3 · 度量空间：从距离到拓扑：逐章定义/证明/题解/来源与待尽义务；记录非编写模型复核及整改。 |
| A | [docs/project/reviews/Q1.md](docs/project/reviews/Q1.md) | Q1 · 上链、泛系数与杯积环：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/Q2.md](docs/project/reviews/Q2.md) | Q2 · 定向、帽积与 Poincaré 对偶：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/R1.md](docs/project/reviews/R1.md) | R1 · 持续模、区间与矩阵约化：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/R2.md](docs/project/reviews/R2.md) | R2 · 扰动、交错与稳定性范围：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/T1.md](docs/project/reviews/T1.md) | T1 · TOP、PL、DIFF 与三角剖分：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/T2.md](docs/project/reviews/T2.md) | T2 · 紧曲面分类与多边形计算：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/T3.md](docs/project/reviews/T3.md) | T3 · 结、环境同痕与补空间群：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/T4.md](docs/project/reviews/T4.md) | T4 · 三维流形、Dehn 填充与配边：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/bases.md](docs/project/reviews/bases.md) | 基础 A · 拓扑基与子基：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/connectedness.md](docs/project/reviews/connectedness.md) | 基础 B · 连通性：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/continuity.md](docs/project/reviews/continuity.md) | 02 · 连续映射与紧致性：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/homology.md](docs/project/reviews/homology.md) | 03 · 环、边界与同调：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/homotopy.md](docs/project/reviews/homotopy.md) | 基础 C · 同伦与基本群：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/index.md](docs/project/reviews/index.md) | 45章审查记录入口，按内容状态说明证据范围。 |
| A | [docs/project/reviews/linear-quotient.md](docs/project/reviews/linear-quotient.md) | 代数预备 · 链群与线性商空间：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/quotient.md](docs/project/reviews/quotient.md) | 基础 D · 商空间：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/project/reviews/spaces.md](docs/project/reviews/spaces.md) | 01 · 从距离到拓扑：逐章定义/证明/题解/来源与待尽义务；不把旧作者检查自动升级为新标准。 |
| A | [docs/references.md](docs/references.md) | 真实书目、已访问来源、目录核验范围与引用边界。 |
| M | [mkdocs.yml](mkdocs.yml) | 18类导航、审查索引与新实验脚本；保留旧路径/主题。 |
| M | [scripts/curriculum.json](scripts/curriculum.json) | 45章正式内容清单，新增模板/题解/审查字段及先修。 |
| A | [scripts/graduate-baseline.json](scripts/graduate-baseline.json) | 固定旧候选42章代码、路径、题键，防止重排破坏链接。 |
| A | [scripts/master-plan.json](scripts/master-plan.json) | 11部分82单元可检查课程计划。 |
| M | [scripts/search-dictionary.txt](scripts/search-dictionary.txt) | 补伪度量、等价关系、逆像、商集完整中文词。 |
| M | [scripts/test_curriculum.mjs](scripts/test_curriculum.mjs) | 6项课程检查：DAG、历史路径、计划、十二节/8题答案、题库。 |
| A | [scripts/test_foundations.mjs](scripts/test_foundations.mjs) | 8项精确有限模型测试，独立29拓扑、60映射、216矩阵等对照。 |
| M | [scripts/verify_site.py](scripts/verify_site.py) | 兼容新十二节模板，检查新实验/中文搜索及站点前缀根路径链接。 |
| A | [validation/m1/browser.json](validation/m1/browser.json) | 逐页MathJax计数、实际交互、搜索、主题及手机验收范围。 |
| A | [validation/m1/build.txt](validation/m1/build.txt) | 最终本地严格构建的实际输出。 |
| A | [validation/m1/diff.txt](validation/m1/diff.txt) | git差异空白检查成功输出（空文件是正常结果）。 |
| A | [validation/m1/independent.txt](validation/m1/independent.txt) | GUDHI点云/区间与曲面独立对照日志。 |
| A | [validation/m1/javascript.txt](validation/m1/javascript.txt) | 43项Node测试逐项结果。 |
| A | [validation/m1/notebooks.txt](validation/m1/notebooks.txt) | 四Notebook在新内核执行的实际日志。 |
| A | [validation/m1/pages-prefix-after.txt](validation/m1/pages-prefix-after.txt) | 保持原断言、传相同SITE_URL后生产前缀验证通过。 |
| A | [validation/m1/pages-prefix-before.txt](validation/m1/pages-prefix-before.txt) | 预期失败证据：生产前缀构建后验证遗漏SITE_URL。 |
| A | [validation/m1/results.json](validation/m1/results.json) | 执行命令、退出码、耗时及前缀失败的修复关系。 |
| A | [validation/m1/site.txt](validation/m1/site.txt) | 126页面静态站点、旧URL/锚点、搜索/结构验证结果。 |

共 107 个文件，含证据日志和本清单。
