# v0.6 · 数学审查与证明教学验收

日期：2026-10-14。基线为 `9a562cad901b72407c9261e2f69d4dad790cfc6d`，分支 `codex/v0.6-proof-learning`。这是可审阅的候选批次，未合并或发布；不是全书数学正确性认证。

## 本批实际交付

- H3/Q1/Q2三章按十二节重编，补充有限自由链上Tor/Ext自然映射、UCT正合性和自然性、无自然分裂反例、帽积自然性，配24题完整答案和原创圆周帽积图。
- 路线A八课加入量词/假设、步骤排错与独立迁移证明三层训练。步骤题按依赖关系接受不同有效顺序；自由文字仅提供量规和参考证明，不自动判为正确。草稿只有主动保存才留在本机。
- 覆盖空间实验采用明确的相邻短弧路径模型；整数层与圆周样本分开，精确比较所存binary64样本，拒绝真实对径和不能可靠规范化的负极小角。保留原三个实验、原URL和持续同调P0断言。
- 构建时静态嵌入SHA、dirty、清单摘要和页面身份；首页和README统计同源。部署后检查10个普通URL，检测旧HTML/新JSON及错误页面替代；本批未触发线上部署。
- 项目D实际训练真实CC0二维BBBC039图像，公开六组完整结果、负结果及粗化/plate限制。准备人类审阅与5–10名学习者试用材料，但未招募或执行。

## 已执行检查

完整命令及退出码在[final-results.json](validation/v06/final-results.json)和[core-results.json](validation/v06/core-results.json)，日志不以命令清单代替运行证据。

| 检查 | 实际结果 | 证据 |
|---|---|---|
| 全部Node测试 | 73通过、0失败；包括旧P0短条、曲面不变量、6项证明训练和9项覆盖测试 | [final-01](validation/v06/final-01.txt) |
| 构建身份回归 | 7通过；旧HTML/新JSON、重复身份、dirty及同首页冒充章节均拒绝 | [final-02](validation/v06/final-02.txt) |
| 整数同调 | 9通过；SymPy独立核对186个Smith矩阵、120个整数链复形 | [final-03](validation/v06/final-03.txt)、[final-04](validation/v06/final-04.txt) |
| 正文代码及清单 | 四章基础Python、H3/Q1/Q2三段Python、三章结构与24题、README同源统计及工作坊生成一致性通过 | [final-05](validation/v06/final-05.txt)、[final-06](validation/v06/final-06.txt)、[final-07](validation/v06/final-07.txt)、[final-10](validation/v06/final-10.txt) |
| GUDHI原计算 | 43点云、217区间及3曲面精确一致 | [core-01](validation/v06/core-01.txt) |
| GUDHI AI模型 | 512闭方格掩膜、25路径/49区间精确一致 | [core-02](validation/v06/core-02.txt) |
| 原AI正文与Notebook | 五章Python示例；四份Notebook在新内核执行13个代码单元，通过 | [core-03](validation/v06/core-03.txt)、[core-04](validation/v06/core-04.txt) |
| 原项目C | 8单测；20组固定训练参数/轨迹/概率精确重跑通过 | [tests](validation/v06/project-c-tests.txt)、[rerun](validation/v06/project-c-rerun.txt) |
| 新项目D | 11单测；512二值复形、729灰度输入、梯度与Git字节证据；6组100轮训练精确重跑通过 | [tests](validation/v06/project-d-tests.txt)、[rerun](validation/v06/project-d-rerun.txt)、[完整记录](projects/image-topology/results/results.json) |
| 严格构建及页面 | `mkdocs build --strict`通过；177个HTML、旧URL清单19/25页、中文搜索、公式标记与内部链接检查通过 | [build](validation/v06/final-08.txt)、[site](validation/v06/final-09.txt) |
| Chromium浏览器 | 68通过、0失败、0跳过；桌面1280与手机390视口、MathJax SVG、证明训练、覆盖输入、静态来源与无JS回退 | [逐测试结果](validation/v06/browser-results.json)、[完整输出](validation/v06/browser-run.txt) |
| 部署检查器本地验收 | 10个普通页面URL及manifest一致；本地dirty显式允许，非线上验收 | [local-deployment-check](validation/v06/local-deployment-check.json) |

本地环境：站点Python3.12，GUDHI3.11.0、SymPy1.14.0；训练Python3.14.3、NumPy2.5.2、单线程BLAS；Node24.14、Playwright1.64。CI另在Linux及Node22运行同一检查，训练作业先生成本平台结果再精确重跑，不声称跨BLAS逐位相同。

首轮浏览器64通过/4失败的日志保存在[browser-first-run.txt](validation/v06/browser-first-run.txt)：两处定位器未匹配实际可访问名称（选择器标签、标题锚点符号），桌面与移动各失败一次。改用精确角色名称并检查静态数据表后，全量68通过，没有降低数学断言。

项目D归档发现CRLF到LF会改变来源字节哈希，已修正写出方式并重训六组。新旧全部参数、100轮轨迹、逐图指标及预测哈希严格相同；[迁移记录](validation/v06/artifact-lf-migration.json)与[重训日志](validation/v06/project-d-lf-training.txt)保留证据。

## 数学审查与实际边界

[非编写数学复核](validation/v06/review-math-independent.md)逐段检查三章及24题；[证明训练复核](validation/v06/review-proof-training-math.md)覆盖八组；[工程复核](validation/v06/review-engineering-independent.md)另用Python有理数核对4205个边界案例；[项目D复核](validation/v06/review-image-independent.md)检查模型、导数、许可及全部结果。这些都是模型检查，没有人类签署或形式证明器认证。

| 仍未完成 | 处理结论 |
|---|---|
| H3非正则CW骨架对集中引理、附加度、Eilenberg–Zilber | 外引，未以正则胞腔直观冒充一般证明 |
| Q1胞腔上链/奇异上同调比较、cup-one分次交换 | 外引；不能从同调群同构直接推上同调环结论 |
| Q2对偶胞腔关联数符号、次数重标号与奇异帽积比较 | Advanced Outline；保持有限组合三角剖分、闭、定向假设 |
| G1/R1/R2等原义务 | 本批未关闭；32项台账只覆盖七章，不代表55章全部审查 |
| 原书核查 | 记录实际可访问来源，不声称逐页核验标准教材 |
| 人类审阅与学习者试用 | 只有流程、题目、量规及空表；没有招募、参与者或学习收益数据 |
| 浏览器及发布 | Chromium两种视口；未完成跨浏览器、全面无障碍或本候选线上部署检查 |

项目D的24图均经8倍块粗化且Betti改变，图像ID划分互斥但plate重叠；三个种子共享同六幅测试图。Dice均值从0.906813降到0.861300、clDice从0.951401降到0.918000，Betti误差亦未改善。Euler期望项不是PH损失，也不分别约束β₀与β₁；本结果不外推至原分辨率、临床、跨plate或所有拓扑损失。

准确续作见[实施状态](docs/project/IMPLEMENTATION_STATUS.md)。通过PR检查后仍需维护者审阅；本批不自行合并、改主分支或发布。
