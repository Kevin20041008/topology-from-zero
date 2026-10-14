# v0.5 教学与质量升级：验收与逐文件清单

日期：2026-10-14。基线 `f341101a686fcc3a8dd22d0587a29514a835cefd`；独立分支 `codex/v0.5-learning-quality`。本批通过PR审查，未直接合并、未发布。部署审计快照见 `validation/v05/release-audit.json`：A3–A8的PR #7已合并、对应Pages成功，审计时最新Release标签仍v0.3。

## 实际交付

- 三条路线：A 8课/29小时、B 25课/148小时、C 10课/54小时；时间为编辑估计。入口诊断、静态连续课表、本机自评记录、上一/下一课、可切完整导航与阶段项目。
- PRE4、PS1、PRE5、CT1整数同调/SNF四章，32题完整答案、四张原创SVG、四个即时自检。CT2保留原离散Morse计划，CT1的立方复形内容仍未完成。
- 重点七章28项定理/引用台账；补Q1.1和Q2.1逐项符号证明，不把自然UCT、PL对偶及谱序列概要标成全证。
- 原创合成网络项目C实际训练20组，保存数据、权重、测试概率、160轮轨迹、固定协议及失败样本。它不是医学图像或论文完整复现。
- 四大网站入口、构建源标识、Playwright及独立训练CI；保留原页面URL、核心算法与Notebook。

## 测试结果

| 检查 | 实际结果 | 证据 |
| --- | --- | --- |
| Node全部测试 | 58项通过，含P0 A/B、路线先修、台账、88个符号恒等式 | `validation/v05/node.log` |
| 精确整数算法 | 9项通过；SymPy186矩阵、120链复形一致 | `integer.log`, `integer-independent.json` |
| GUDHI旧算法 | 43点云、217条区间逐值相等，3曲面 | `gudhi.log` |
| GUDHI AI模型 | 512掩膜、25路径、49区间逐值相等 | `ai-gudhi.log` |
| 正文Python | 四新章及既有五AI章节执行通过 | `foundation-examples.log`, `ai-examples.log` |
| Notebook | 四份新内核执行通过，源文件不改 | `notebooks.log` |
| 网络项目 | 8单测；243路径、180顶点偏导、49参数差分；20组完整精确重跑 | `project-tests.log`, `project-verify.log` |
| MkDocs | `build --strict`通过 | `strict-build.log` |
| 站点 | 165 HTML，旧URL清单19/25页、链接/片段/搜索/55章挂载通过 | `site.log` |
| Chromium | 36项通过：桌面1280px、手机390px；公式、无溢出、路线、习题、无JS、实验、搜索与主题 | `browser.json` |

站点/数学环境为现有Python3.12环境；训练记录环境Python3.14.3/NumPy2.5.2。非编写代理又在Python3.12.14/NumPy2.3.5独立复算20组并一致，但不据此保证任意平台逐位相同。CI对自己的完整结果作同环境精确重跑并上传结果。

测试开发中曾因移动菜单选择到隐藏遮罩、搜索按钮选择不唯一而失败，已改成实际标题栏按钮定位；没有削弱输出断言。第一次项目测试误用未安装NumPy的解释器，换成记录环境后通过。首次严格构建等待并行作者补齐文件后通过。所有这些问题与数学断言分开，没有通过删短条、舍入或降低期望修测试。

## 实际训练结果与限制

五个初始化种子共享同一固定测试集，下表是种子均值，不是外部泛化保证。

| 任务 | BCE Dice → BCE+PH Dice | β0绝对误差：BCE → BCE+PH |
| --- | --- | --- |
| 单分支目标 | 0.942954 → 0.944002 | 0.037500 → 0.021875 |
| 双分支目标，故意不兼容先验 | 0.864197 → 0.854629 | 0.296875 → 0.871875 |

错误先验明显损伤目标拓扑；正任务的均值变化也不是逐样本保证。没有真实医学数据、多数据划分/临床外部验证或论文方法复现。全部种子与失败案例已保留，未以性能优势为测试断言。

## 独立模型审查与仍未解决事项

`validation/v05/review-pre4-ps1.md`、`review-integer.md`、`review-ai-project.md`、`review-cochain-signs.md`、`review-integration.md`记录非编写代理的检查范围；这不是人类同行评审或形式化验证。

1. H3非正则CW相对群比较、自然Tor映射；Q1自然Ext嵌入；Q2对偶胞腔符号及奇异帽积比较；G1下一页核像识别，仍需完整展开/人工复核。
2. R1一般分解与配对、R2代数稳定性及A8一般非光滑优化仍按外引处理。有限软件一致性不证明一般定理。
3. 原42章尚未全部统一十二项模板及完整题解；H2细分、D1单位分解、T2分类、纽结图等旧义务未被本批清除。
4. CT1立方复形、CT2离散Morse等长期主题仍待建设；11部分89节点不是完成数量。
5. 浏览器限Chromium两视口；键盘、标签与布局检查不等于全面WCAG/多引擎审计。进度按章节共享，清一路线会影响共享章节；没有跨标签页实时同步。
6. 全书未有人类领域审阅签署；发布仍需维护者审查。本批不合并、不重初始化、不覆盖既有工作树。

## 逐文件修改清单

下列文件均在本批工作分支；完整路径以仓库根目录为准。所有代码/教材均原创增补，既有正确内容与旧URL保持。

| 文件 | 作用 |
| --- | --- |
| [.github/workflows/pages.yml](.github/workflows/pages.yml) | 扩充PR检查；主分支部署依赖构建及训练验证 |
| [.gitignore](.gitignore) | 维护说明、样式或本批验收清单 |
| [CHANGELOG.md](CHANGELOG.md) | 维护说明、样式或本批验收清单 |
| [README.md](README.md) | 维护说明、样式或本批验收清单 |
| [V05-VALIDATION.md](V05-VALIDATION.md) | 维护说明、样式或本批验收清单 |
| [docs/ai/differentiable-persistence.md](docs/ai/differentiable-persistence.md) | 数学正文、依赖修正、教学入口或实际项目说明 |
| [docs/ai/index.md](docs/ai/index.md) | 数学正文、依赖修正、教学入口或实际项目说明 |
| [docs/ai/projects/topology-optimization-trajectories.svg](docs/ai/projects/topology-optimization-trajectories.svg) | 维护说明、样式或本批验收清单 |
| [docs/ai/projects/topology-optimization.md](docs/ai/projects/topology-optimization.md) | 数学正文、依赖修正、教学入口或实际项目说明 |
| [docs/algebraic/cohomology/cochains-products.md](docs/algebraic/cohomology/cochains-products.md) | 数学正文、依赖修正、教学入口或实际项目说明 |
| [docs/algebraic/cohomology/duality.md](docs/algebraic/cohomology/duality.md) | 数学正文、依赖修正、教学入口或实际项目说明 |
| [docs/algebraic/graduate-tools.md](docs/algebraic/graduate-tools.md) | 数学正文、依赖修正、教学入口或实际项目说明 |
| [docs/algebraic/homology/cellular-coefficients.md](docs/algebraic/homology/cellular-coefficients.md) | 数学正文、依赖修正、教学入口或实际项目说明 |
| [docs/assets/ct1-kernel-coordinates.svg](docs/assets/ct1-kernel-coordinates.svg) | 原创数学图解或路线配置 |
| [docs/assets/learning-paths.json](docs/assets/learning-paths.json) | 连续学习路线、诊断及本机自评进度 |
| [docs/assets/pre4-diagonal.svg](docs/assets/pre4-diagonal.svg) | 原创数学图解或路线配置 |
| [docs/assets/pre5-integer-quotient.svg](docs/assets/pre5-integer-quotient.svg) | 原创数学图解或路线配置 |
| [docs/assets/ps1-relative-open.svg](docs/assets/ps1-relative-open.svg) | 原创数学图解或路线配置 |
| [docs/computational/boundary-algorithms.md](docs/computational/boundary-algorithms.md) | 数学正文、依赖修正、教学入口或实际项目说明 |
| [docs/computational/integer-homology.md](docs/computational/integer-homology.md) | 数学正文、依赖修正、教学入口或实际项目说明 |
| [docs/curriculum.md](docs/curriculum.md) | 数学正文、依赖修正、教学入口或实际项目说明 |
| [docs/development.md](docs/development.md) | 数学正文、依赖修正、教学入口或实际项目说明 |
| [docs/exercises/ct1-solutions.md](docs/exercises/ct1-solutions.md) | 书面习题完整解答与入口 |
| [docs/exercises/index.md](docs/exercises/index.md) | 书面习题完整解答与入口 |
| [docs/exercises/pre4-solutions.md](docs/exercises/pre4-solutions.md) | 书面习题完整解答与入口 |
| [docs/exercises/pre5-solutions.md](docs/exercises/pre5-solutions.md) | 书面习题完整解答与入口 |
| [docs/exercises/ps1-solutions.md](docs/exercises/ps1-solutions.md) | 书面习题完整解答与入口 |
| [docs/index.md](docs/index.md) | 数学正文、依赖修正、教学入口或实际项目说明 |
| [docs/javascripts/build-info.mjs](docs/javascripts/build-info.mjs) | 教学交互、题库或构建身份展示 |
| [docs/javascripts/exercise-bank.mjs](docs/javascripts/exercise-bank.mjs) | 教学交互、题库或构建身份展示 |
| [docs/javascripts/learning-core.mjs](docs/javascripts/learning-core.mjs) | 连续学习路线、诊断及本机自评进度 |
| [docs/javascripts/learning-paths.mjs](docs/javascripts/learning-paths.mjs) | 连续学习路线、诊断及本机自评进度 |
| [docs/javascripts/v05-foundation-exercises.mjs](docs/javascripts/v05-foundation-exercises.mjs) | 教学交互、题库或构建身份展示 |
| [docs/javascripts/v05-integer-exercises.mjs](docs/javascripts/v05-integer-exercises.mjs) | 教学交互、题库或构建身份展示 |
| [docs/persistence/modules-reduction.md](docs/persistence/modules-reduction.md) | 数学正文、依赖修正、教学入口或实际项目说明 |
| [docs/persistence/stability.md](docs/persistence/stability.md) | 数学正文、依赖修正、教学入口或实际项目说明 |
| [docs/point-set/subspaces.md](docs/point-set/subspaces.md) | 数学正文、依赖修正、教学入口或实际项目说明 |
| [docs/preliminaries/countability-choice.md](docs/preliminaries/countability-choice.md) | 数学正文、依赖修正、教学入口或实际项目说明 |
| [docs/preliminaries/groups-modules.md](docs/preliminaries/groups-modules.md) | 数学正文、依赖修正、教学入口或实际项目说明 |
| [docs/progress.md](docs/progress.md) | 数学正文、依赖修正、教学入口或实际项目说明 |
| [docs/project/COURRICULUM_MASTER_PLAN.md](docs/project/COURRICULUM_MASTER_PLAN.md) | 当前课程状态、发布证据与后续建设记录 |
| [docs/project/IMPLEMENTATION_STATUS.md](docs/project/IMPLEMENTATION_STATUS.md) | 当前课程状态、发布证据与后续建设记录 |
| [docs/project/MATH_REVIEW_PROTOCOL.md](docs/project/MATH_REVIEW_PROTOCOL.md) | 当前课程状态、发布证据与后续建设记录 |
| [docs/project/PREREQUISITE_GRAPH.md](docs/project/PREREQUISITE_GRAPH.md) | 当前课程状态、发布证据与后续建设记录 |
| [docs/project/proof-ledger.md](docs/project/proof-ledger.md) | 逐定理假设、依赖、参考与证明状态 |
| [docs/project/release-status.md](docs/project/release-status.md) | 当前课程状态、发布证据与后续建设记录 |
| [docs/project/reviews/AI-PROJECT-C.md](docs/project/reviews/AI-PROJECT-C.md) | 章节审查范围与未尽义务 |
| [docs/project/reviews/CT1.md](docs/project/reviews/CT1.md) | 章节审查范围与未尽义务 |
| [docs/project/reviews/PRE4.md](docs/project/reviews/PRE4.md) | 章节审查范围与未尽义务 |
| [docs/project/reviews/PRE5.md](docs/project/reviews/PRE5.md) | 章节审查范围与未尽义务 |
| [docs/project/reviews/PS1.md](docs/project/reviews/PS1.md) | 章节审查范围与未尽义务 |
| [docs/project/reviews/index.md](docs/project/reviews/index.md) | 章节审查范围与未尽义务 |
| [docs/start/advanced.md](docs/start/advanced.md) | 连续学习路线、诊断及本机自评进度 |
| [docs/start/beginner.md](docs/start/beginner.md) | 连续学习路线、诊断及本机自评进度 |
| [docs/start/computational.md](docs/start/computational.md) | 连续学习路线、诊断及本机自评进度 |
| [docs/start/index.md](docs/start/index.md) | 连续学习路线、诊断及本机自评进度 |
| [docs/stylesheets/learning.css](docs/stylesheets/learning.css) | 维护说明、样式或本批验收清单 |
| [mkdocs.yml](mkdocs.yml) | 四入口导航及本地教学脚本；页面路径不变 |
| [package-lock.json](package-lock.json) | 固定测试依赖与桌面/移动浏览器配置 |
| [package.json](package.json) | 固定测试依赖与桌面/移动浏览器配置 |
| [playwright.config.mjs](playwright.config.mjs) | 固定测试依赖与桌面/移动浏览器配置 |
| [projects/topology-optimization/.gitignore](projects/topology-optimization/.gitignore) | 固定协议合成网络训练、验证与复现说明 |
| [projects/topology-optimization/README.md](projects/topology-optimization/README.md) | 固定协议合成网络训练、验证与复现说明 |
| [projects/topology-optimization/core.py](projects/topology-optimization/core.py) | 固定协议合成网络训练、验证与复现说明 |
| [projects/topology-optimization/data.py](projects/topology-optimization/data.py) | 固定协议合成网络训练、验证与复现说明 |
| [projects/topology-optimization/plot_results.py](projects/topology-optimization/plot_results.py) | 固定协议合成网络训练、验证与复现说明 |
| [projects/topology-optimization/protocol.json](projects/topology-optimization/protocol.json) | 固定协议合成网络训练、验证与复现说明 |
| [projects/topology-optimization/requirements.txt](projects/topology-optimization/requirements.txt) | 固定协议合成网络训练、验证与复现说明 |
| [projects/topology-optimization/results/data/connected-test.json](projects/topology-optimization/results/data/connected-test.json) | 实际训练原始数据、完整结果或结果图 |
| [projects/topology-optimization/results/data/connected-train.json](projects/topology-optimization/results/data/connected-train.json) | 实际训练原始数据、完整结果或结果图 |
| [projects/topology-optimization/results/data/connected-validation.json](projects/topology-optimization/results/data/connected-validation.json) | 实际训练原始数据、完整结果或结果图 |
| [projects/topology-optimization/results/data/disconnected-test.json](projects/topology-optimization/results/data/disconnected-test.json) | 实际训练原始数据、完整结果或结果图 |
| [projects/topology-optimization/results/data/disconnected-train.json](projects/topology-optimization/results/data/disconnected-train.json) | 实际训练原始数据、完整结果或结果图 |
| [projects/topology-optimization/results/data/disconnected-validation.json](projects/topology-optimization/results/data/disconnected-validation.json) | 实际训练原始数据、完整结果或结果图 |
| [projects/topology-optimization/results/data/manifest.json](projects/topology-optimization/results/data/manifest.json) | 实际训练原始数据、完整结果或结果图 |
| [projects/topology-optimization/results/locked-protocol.json](projects/topology-optimization/results/locked-protocol.json) | 实际训练原始数据、完整结果或结果图 |
| [projects/topology-optimization/results/raw-results.json](projects/topology-optimization/results/raw-results.json) | 实际训练原始数据、完整结果或结果图 |
| [projects/topology-optimization/results/summary.json](projects/topology-optimization/results/summary.json) | 实际训练原始数据、完整结果或结果图 |
| [projects/topology-optimization/results/trajectories.png](projects/topology-optimization/results/trajectories.png) | 实际训练原始数据、完整结果或结果图 |
| [projects/topology-optimization/test_project.py](projects/topology-optimization/test_project.py) | 固定协议合成网络训练、验证与复现说明 |
| [projects/topology-optimization/train.py](projects/topology-optimization/train.py) | 固定协议合成网络训练、验证与复现说明 |
| [projects/topology-optimization/verify.py](projects/topology-optimization/verify.py) | 固定协议合成网络训练、验证与复现说明 |
| [requirements-integer.txt](requirements-integer.txt) | 固定测试依赖与桌面/移动浏览器配置 |
| [scripts/build_metadata.py](scripts/build_metadata.py) | 课程元数据、精确算法或构建/测试支持 |
| [scripts/curriculum.json](scripts/curriculum.json) | 课程元数据、精确算法或构建/测试支持 |
| [scripts/integer_homology.py](scripts/integer_homology.py) | 课程元数据、精确算法或构建/测试支持 |
| [scripts/master-plan.json](scripts/master-plan.json) | 课程元数据、精确算法或构建/测试支持 |
| [scripts/proof-ledger.json](scripts/proof-ledger.json) | 逐定理假设、依赖、参考与证明状态 |
| [scripts/serve_test_site.mjs](scripts/serve_test_site.mjs) | 课程元数据、精确算法或构建/测试支持 |
| [scripts/test_cochain_identities.mjs](scripts/test_cochain_identities.mjs) | 保留严格断言的自动化回归检查 |
| [scripts/test_curriculum.mjs](scripts/test_curriculum.mjs) | 保留严格断言的自动化回归检查 |
| [scripts/test_integer_homology.py](scripts/test_integer_homology.py) | 保留严格断言的自动化回归检查 |
| [scripts/test_learning.mjs](scripts/test_learning.mjs) | 保留严格断言的自动化回归检查 |
| [scripts/verify_foundation_examples.py](scripts/verify_foundation_examples.py) | 独立对照或可复现实例执行 |
| [scripts/verify_integer_independent.py](scripts/verify_integer_independent.py) | 独立对照或可复现实例执行 |
| [tests/browser/course.spec.mjs](tests/browser/course.spec.mjs) | 保留严格断言的自动化回归检查 |
| [validation/v05/ai-examples.log](validation/v05/ai-examples.log) | 审计、实际测试或独立模型审查证据 |
| [validation/v05/ai-gudhi.log](validation/v05/ai-gudhi.log) | 审计、实际测试或独立模型审查证据 |
| [validation/v05/browser.json](validation/v05/browser.json) | 审计、实际测试或独立模型审查证据 |
| [validation/v05/foundation-examples.log](validation/v05/foundation-examples.log) | 审计、实际测试或独立模型审查证据 |
| [validation/v05/gudhi.log](validation/v05/gudhi.log) | 审计、实际测试或独立模型审查证据 |
| [validation/v05/integer-content-check.json](validation/v05/integer-content-check.json) | 审计、实际测试或独立模型审查证据 |
| [validation/v05/integer-independent.json](validation/v05/integer-independent.json) | 审计、实际测试或独立模型审查证据 |
| [validation/v05/integer-independent.log](validation/v05/integer-independent.log) | 审计、实际测试或独立模型审查证据 |
| [validation/v05/integer.log](validation/v05/integer.log) | 审计、实际测试或独立模型审查证据 |
| [validation/v05/node.log](validation/v05/node.log) | 审计、实际测试或独立模型审查证据 |
| [validation/v05/notebooks.log](validation/v05/notebooks.log) | 审计、实际测试或独立模型审查证据 |
| [validation/v05/project-tests.log](validation/v05/project-tests.log) | 审计、实际测试或独立模型审查证据 |
| [validation/v05/project-verify.log](validation/v05/project-verify.log) | 审计、实际测试或独立模型审查证据 |
| [validation/v05/release-audit.json](validation/v05/release-audit.json) | 审计、实际测试或独立模型审查证据 |
| [validation/v05/review-ai-project.md](validation/v05/review-ai-project.md) | 审计、实际测试或独立模型审查证据 |
| [validation/v05/review-cochain-signs.md](validation/v05/review-cochain-signs.md) | 审计、实际测试或独立模型审查证据 |
| [validation/v05/review-integer.md](validation/v05/review-integer.md) | 审计、实际测试或独立模型审查证据 |
| [validation/v05/review-integration.md](validation/v05/review-integration.md) | 审计、实际测试或独立模型审查证据 |
| [validation/v05/review-pre4-ps1.md](validation/v05/review-pre4-ps1.md) | 审计、实际测试或独立模型审查证据 |
| [validation/v05/site.log](validation/v05/site.log) | 审计、实际测试或独立模型审查证据 |
| [validation/v05/strict-build.log](validation/v05/strict-build.log) | 审计、实际测试或独立模型审查证据 |
| [validation/v05/tests.json](validation/v05/tests.json) | 审计、实际测试或独立模型审查证据 |
