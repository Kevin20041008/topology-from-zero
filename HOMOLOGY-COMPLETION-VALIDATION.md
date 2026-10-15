# H2/H3 同调证明补全验收

日期：2026-10-15。分支 `codex/homology-proof-completion`，基线 `7580d391a78a2df42a428a0d3fbd3dde57dbae4b`。本批待PR审阅，未合并或发布；全书未完成。

## 实际教材交付

- [H2](docs/algebraic/homology/exact-excision.md)：十二节，增广仿射锥、细分与链同伦、参数域网格估计、普通/相对小链、切除、Mayer–Vietoris、球面及圆盘对。提供正反例、原创SVG、精确有理实验、两层提示和[八题完整答案](docs/exercises/h2-solutions.md)。
- [H3](docs/algebraic/homology/cellular-coefficients.md)：有限非正则CW骨架对与特征生成元、胞腔比较及自然性、附加度、任意阿贝尔系数版本；保留原代数证明和八题，增至[十二题答案](docs/exercises/h3-solutions.md)。
- 全站仍55篇正文；17章十二项模板，140题配套答案。8项浏览器实验与4份Notebook不变。新增精确仿射链是代码实验，不冒充新增浏览器交互。
- [证明台账](docs/project/proof-ledger.md)从JSON生成，现限8章42项；范围扩大不等于全书审核。旧页面URL、编号和锚点保留。

## 已执行检查

完整命令和退出码在[core-results.json](validation/homology-completion/core-results.json)、[numerical-results.json](validation/homology-completion/numerical-results.json)、[site-results.json](validation/homology-completion/site-results.json)及两个训练项目记录中。下列是实际执行结果。

| 检查 | 结果与证据 |
|---|---|
| 全部Node测试 | [73通过](validation/homology-completion/node.txt)，含旧P0 A/B短条、Mobius、退化及不变量断言 |
| 新细分实验 | [11通过](validation/homology-completion/test_subdivision_chains.txt)：整数/Fraction，无容差；120有序小单形、0–4维、16仿射映射含退化；独立排列旗标oracle |
| 新正文核查 | [H2代码/结构与H3带符号例题通过](validation/homology-completion/verify_homology_content.txt)；[H3/Q1/Q2三段代码、28题通过](validation/homology-completion/verify_algebra_chapter_examples.txt) |
| 构建身份与清单 | [7身份测试](validation/homology-completion/test_build_metadata.txt)；README清单、工作坊和42项台账生成一致 |
| 精确整数计算 | [9单测](validation/homology-completion/test_integer_homology.txt)；[SymPy186矩阵/120整数链](validation/homology-completion/verify_integer_independent.txt)精确一致 |
| 既有基础正文 | [四章Python实例通过](validation/homology-completion/verify_foundation_examples.txt) |
| GUDHI原计算 | [43点云、217区间及3曲面](validation/homology-completion/verify_independent.txt)精确一致 |
| GUDHI AI模型 | [512闭方格掩膜、25路径/49区间](validation/homology-completion/verify_ai_independent.txt)精确一致 |
| AI正文与Notebook | [五章Python](validation/homology-completion/verify_ai_examples.txt)；[4Notebook、13代码单元](validation/homology-completion/verify_notebooks.txt)新内核运行通过 |
| 既有项目C | [8单测](validation/homology-completion/project-c-tests.txt)；[20组参数/轨迹/预测精确重跑](validation/homology-completion/project-c-rerun.txt) |
| 既有项目D | [11单测](validation/homology-completion/project-d-tests.txt)；[6组100轮训练及24图证据精确重跑](validation/homology-completion/project-d-rerun.txt)，未改历史结果 |
| 网站 | [`mkdocs build --strict`](validation/homology-completion/build.txt)；[178HTML、内部链接/锚点、旧URL19/25页、搜索与公式标记](validation/homology-completion/site.txt)通过 |
| Chromium浏览器 | [76通过、0失败、0跳过](validation/homology-completion/browser-run.txt)，[逐项记录](validation/homology-completion/browser-results.json)；桌面1280/手机390，含新增8项公式、SVG、旧锚点及答案往返 |
| 已部署基线只读复查 | [10普通URL与manifest一致](validation/homology-completion/live-baseline-check.json)，属于已部署v0.6，不是新分支上线证据 |

环境：站点Python3.12，GUDHI3.11.0，SymPy1.14.0；训练Python3.14.3/NumPy2.5.2，BLAS单线程；Node24.14，Playwright1.64。CI还将独立在Linux/Node22运行。本次构建工作树带dirty，清楚标识；它不冒充基线提交的未修改构建。

细分实验处理实仿射空间中有理顶点的有序链；保留重复顶点，不取定向/退化商。对任意连续奇异单形的小链与切除结论由正文论证承担，有限测试不能证明开覆盖的一般存在性。

## 数学审查及修正

[H2作者记录](validation/homology-completion/review-h2-author.md)、[H3作者/根代理记录](validation/homology-completion/review-h3-author.md)与[非编写逐式复核](validation/homology-completion/review-independent.md)分别保留。复核覆盖两章和20题，未发现尚存阻塞；不等同于人类同行评审。

审查过程中修正：整数比较不能直接张量得到空间改系数，新增H3.6；附加圆盘同伦须证明商下降；相对单射须保留非零边界余项；实际生成元不能由秩计数代替；非循环道路不能直接称绝对同调类。H2/H3图均原创并已实际渲染核对。

## 尚未完成

- H3：无限CW、胞腔逼近、链同伦比较、Eilenberg–Zilber与空间Künneth。
- Q1：胞腔上链/奇异上同调与评价兼容、分次交换；Q2：对偶胞腔符号及奇异帽积比较。
- G1谱序列页核像、R1分解/配对、R2一般稳定性等原义务未关闭。
- 人类同行审阅、学习者试用、跨浏览器及完整无障碍验收未完成；没有新AI性能结论。
- 本批仅经PR提交，不自行合并、发布或修改主分支。

准确续作见[实施状态](docs/project/IMPLEMENTATION_STATUS.md)。下一批优先处理Q1有限CW上链比较与评价兼容，不能从本批同调群同构跳过该证明。
