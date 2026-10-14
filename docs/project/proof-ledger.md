# 逐定理证明与依赖台账

本批覆盖 H3、Q1、Q2、G1、R1、R2、A8 的主要编号结论与显式引用，共32项。没有把它称作全书定理审计。其他章节仍以[逐章记录](reviews/index.md)为准，未进入此表不等于已验证。

“完整证明”描述本地论证的展开范围，**允许依赖已精确声明的外引**；它不表示形式化认证或人类签署。“引用定理”把完整证明责任交给文献；“证明概要”保留尚未展开的步骤；“待审”标记尚不能认可的陈述。每项都列假设、依赖与人工复核义务，构建测试只检查台账和页面一致。

本批在 H3.0/H3.2 与 Q1.0/Q1.3 构造有限自由链的自然 Tor/Ext 序列及无自然分裂反例，补 Q2.3 帽积自然性；H3.1 的几何输入与 Q2.2 的对偶比较仍外引。Q2.euler 的代数推导完整，但继承对偶依赖。G1.2 的下一页核像识别仍为概要。没有用有限测试替代任何一般定理的证明。

参考链接定位到真实书籍/论文入口；本批没有逐页读取这些原书，不虚报外部核查范围。H3/Q1/Q2 已由作者、根代理及非编写 review_foundations 模型逐式复核；其他条目按各自记录。全部内容仍需独立人类复核，不是形式化认证。

## H3.0 {#proof-h3-0}

[H3 正文位置](../algebraic/homology/cellular-coefficients.md#proof-h3-0) · **完整证明（所列依赖下）**

- 假设与基础：有限生成阿贝尔第一变量；有限自由表示；任意阿贝尔系数；PRE5 自由子群。
- 依赖：本章定义与所列基础工具。
- 审查范围/未尽义务：自由表示提升、提升无关性、表示无关性与双变量协变已证明；仅有限生成第一变量的本章范围。
- 参考定位：[Hatcher, Algebraic Topology, §3.A Universal Coefficients for Homology](https://pi.math.cornell.edu/~hatcher/AT/ATpage.html)。
- 审查状态：2026-10-14 作者、根代理及非编写 review_foundations 模型逐式复核；尚无人类同行签署或形式化验证。

## H3.1 {#proof-h3-1}

[H3 正文位置](../algebraic/homology/cellular-coefficients.md#proof-h3-1) · **证明概要 / Advanced Outline**

- 假设与基础：有限 CW；整数系数；非正则骨架对相对群集中引理外引。
- 依赖：本章定义与所列基础工具。
- 审查范围/未尽义务：接受外引引理后的长正合列推导完整，含 n=0；骨架对引理、附加映射度公式与一般无限 CW 比较仍未证明。
- 参考定位：[Hatcher, Algebraic Topology (2002), §2.2 Cellular Homology](https://pi.math.cornell.edu/~hatcher/AT/ATpage.html)。
- 审查状态：2026-10-14 作者、根代理及非编写 review_foundations 模型逐式复核；尚无人类同行签署或形式化验证。

## H3.2 {#proof-h3-2}

[H3 正文位置](../algebraic/homology/cellular-coefficients.md#proof-h3-2) · **完整证明（所列依赖下）**

- 假设与基础：非负有界且逐次有限秩自由整数链；任意阿贝尔系数 G；PRE5 自由子群与张量商公式。
- 依赖：[H3.0](#proof-h3-0)。
- 审查范围/未尽义务：已构造 alpha/beta、正合性、分裂、对整数链映射和任意系数同态的交换图；剪切反例证明无自然分裂。待非编写及人类逐式复核。
- 参考定位：[Hatcher, Algebraic Topology, §3.A Universal Coefficients for Homology](https://pi.math.cornell.edu/~hatcher/AT/ATpage.html)。
- 审查状态：2026-10-14 作者、根代理及非编写 review_foundations 模型逐式复核；尚无人类同行签署或形式化验证。

## H3.3 {#proof-h3-3}

[H3 正文位置](../algebraic/homology/cellular-coefficients.md#proof-h3-3) · **完整证明（所列依赖下）**

- 假设与基础：域上有界、逐次有限维链；有符号张量微分。
- 依赖：本章定义与所列基础工具。
- 审查范围/未尽义务：两种可缩因子的收缩符号已展开，典范同构自然性已说明；不能由此直接套用无限维奇异链。
- 参考定位：[Hatcher, Algebraic Topology, §3.A Universal Coefficients for Homology](https://pi.math.cornell.edu/~hatcher/AT/ATpage.html)。
- 审查状态：2026-10-14 作者、根代理及非编写 review_foundations 模型逐式复核；尚无人类同行签署或形式化验证。

## H3.EZ {#proof-h3-ez}

[H3 正文位置](../algebraic/homology/cellular-coefficients.md#proof-h3-ez) · **引用定理**

- 假设与基础：空间奇异链与张量链；标准 Eilenberg–Zilber 及空间域 Kunneth 比较。
- 依赖：本章定义与所列基础工具。
- 审查范围/未尽义务：shuffle 映射、链同伦、一般空间链 Kunneth 与有限胞腔乘积比较仍外引。
- 参考定位：[Hatcher, Algebraic Topology, §3.A Universal Coefficients for Homology](https://pi.math.cornell.edu/~hatcher/AT/ATpage.html)。
- 审查状态：2026-10-14 作者、根代理及非编写 review_foundations 模型逐式复核；尚无人类同行签署或形式化验证。

## Q1.0 {#proof-q1-0}

[Q1 正文位置](../algebraic/cohomology/cochains-products.md#proof-q1-0) · **完整证明（所列依赖下）**

- 假设与基础：有限生成阿贝尔第一变量；有限自由表示；任意阿贝尔系数。
- 依赖：[H3.0](#proof-h3-0)。
- 审查范围/未尽义务：余核上的预合成、提升无关性和表示独立性已证明；一般导出函子理论不在本章范围。
- 参考定位：[Hatcher, Algebraic Topology, §3.1 Cohomology Groups; §3.2 Cup Product](https://pi.math.cornell.edu/~hatcher/AT/ATpage.html)。
- 审查状态：2026-10-14 作者、根代理及非编写 review_foundations 模型逐式复核；尚无人类同行签署或形式化验证。

## Q1.1 {#proof-q1-1}

[Q1 正文位置](../algebraic/cohomology/cochains-products.md#proof-q1-1) · **完整证明（所列依赖下）**

- 假设与基础：交换环系数；有序面；非负次数；边界平方零。
- 依赖：本章定义与所列基础工具。
- 审查范围/未尽义务：杯积删面公式、代表元无关性、结合律及拉回自然性已展开；系数乘法自然性要求环同态。
- 参考定位：[Hatcher, Algebraic Topology, §3.1 Cohomology Groups; §3.2 Cup Product](https://pi.math.cornell.edu/~hatcher/AT/ATpage.html)。
- 审查状态：2026-10-14 作者、根代理及非编写 review_foundations 模型逐式复核；尚无人类同行签署或形式化验证。

## Q1.2 {#proof-q1-2}

[Q1 正文位置](../algebraic/cohomology/cochains-products.md#proof-q1-2) · **完整证明（所列依赖下）**

- 假设与基础：固定域 k 上链复形和 k 线性链映射；无限维延拓使用选择公理。
- 依赖：本章定义与所列基础工具。
- 审查范围/未尽义务：评价核像与反变交换方块已展开；不声称对任意环仍是无修正对偶。
- 参考定位：[Hatcher, Algebraic Topology, §3.1 Cohomology Groups; §3.2 Cup Product](https://pi.math.cornell.edu/~hatcher/AT/ATpage.html)。
- 审查状态：2026-10-14 作者、根代理及非编写 review_foundations 模型逐式复核；尚无人类同行签署或形式化验证。

## Q1.3 {#proof-q1-3}

[Q1 正文位置](../algebraic/cohomology/cochains-products.md#proof-q1-3) · **完整证明（所列依赖下）**

- 假设与基础：非负有界、逐次有限秩自由整数链；任意阿贝尔系数 G；PRE5 自由子群与直和投影。
- 依赖：[Q1.0](#proof-q1-0)。
- 审查范围/未尽义务：Ext 嵌入、评价、正合性、非自然分裂、链映射反变和系数同态协变均已构造；待非编写及人类复核。
- 参考定位：[Hatcher, Algebraic Topology, §3.1 Cohomology Groups; §3.2 Cup Product](https://pi.math.cornell.edu/~hatcher/AT/ATpage.html)。
- 审查状态：2026-10-14 作者、根代理及非编写 review_foundations 模型逐式复核；尚无人类同行签署或形式化验证。

## Q1.cellular-comparison {#proof-q1-cellular-comparison}

[Q1 正文位置](../algebraic/cohomology/cochains-products.md#proof-q1-cellular-comparison) · **引用定理**

- 假设与基础：有限 CW；任意阿贝尔系数；胞腔上链与奇异上同调；胞腔映射下自然。
- 依赖：[H3.1](#proof-h3-1)。
- 审查范围/未尽义务：上链比较及评价兼容性未证明；一般连续映射还用胞腔逼近；单有同调群同构不够，杯积还需另行比较。
- 参考定位：[Hatcher §3.1](https://pi.math.cornell.edu/~hatcher/AT/ATpage.html)。
- 审查状态：2026-10-14 作者、根代理及非编写 review_foundations 模型逐式复核；尚无人类同行签署或形式化验证。

## Q1.commutativity {#proof-q1-commutativity}

[Q1 正文位置](../algebraic/cohomology/cochains-products.md#proof-q1-commutativity) · **引用定理**

- 假设与基础：上同调类上的分次交换；链级不严格交换。
- 依赖：[Q1.1](#proof-q1-1)、[H3.EZ](#proof-h3-ez)。
- 审查范围/未尽义务：cup-one链同伦及外积兼容性未展开。
- 参考定位：[Hatcher, Algebraic Topology, §3.1 Cohomology Groups; §3.2 Cup Product](https://pi.math.cornell.edu/~hatcher/AT/ATpage.html)。
- 审查状态：2026-10-14 作者、根代理及非编写 review_foundations 模型逐式复核；尚无人类同行签署或形式化验证。

## Q2.3 {#proof-q2-3}

[Q2 正文位置](../algebraic/cohomology/duality.md#proof-q2-3) · **完整证明（所列依赖下）**

- 假设与基础：连续映射 f:X→Y；整数奇异上链与链；非负次数；过高次帽积零。
- 依赖：[Q2.1](#proof-q2-1)。
- 审查范围/未尽义务：逐奇异单形计算和同调交换方块已展开；不要求 f 保持基本类。
- 参考定位：[Hatcher, Algebraic Topology, §3.3 Poincaré Duality](https://pi.math.cornell.edu/~hatcher/AT/ATpage.html)。
- 审查状态：2026-10-14 作者、根代理及非编写 review_foundations 模型逐式复核；尚无人类同行签署或形式化验证。

## Q2.1 {#proof-q2-1}

[Q2 正文位置](../algebraic/cohomology/duality.md#proof-q2-1) · **完整证明（所列依赖下）**

- 假设与基础：整数上链；p,n非负；过高次帽积为零；普通链的∂C0=0。
- 依赖：本章定义与所列基础工具。
- 审查范围/未尽义务：本批逐式删点计算并覆盖n=p端点。
- 参考定位：[Hatcher, Algebraic Topology, §3.3 Poincaré Duality](https://pi.math.cornell.edu/~hatcher/AT/ATpage.html)。
- 审查状态：2026-10-14 作者、根代理及非编写 review_foundations 模型逐式复核；尚无人类同行签署或形式化验证。

## Q2.2 {#proof-q2-2}

[Q2 正文位置](../algebraic/cohomology/duality.md#proof-q2-2) · **证明概要 / Advanced Outline**

- 假设与基础：闭（紧且无边界）、定向、有限组合三角剖分的 n 维 PL 流形；整数系数；可有限多分量。
- 依赖：[H3.1](#proof-h3-1)、[Q2.1](#proof-q2-1)。
- 审查范围/未尽义务：对偶胞腔关联数符号、逐次数重标号及到指定奇异帽积的比较未证明；已移除将未算符号当作成立链等式的表述。
- 参考定位：[Hatcher, Algebraic Topology, §3.3 Poincaré Duality](https://pi.math.cornell.edu/~hatcher/AT/ATpage.html)。
- 审查状态：2026-10-14 作者、根代理及非编写 review_foundations 模型逐式复核；尚无人类同行签署或形式化验证。

## Q2.euler {#proof-q2-euler}

[Q2 正文位置](../algebraic/cohomology/duality.md#proof-q2-euler) · **完整证明（所列依赖下）**

- 假设与基础：奇数维闭定向有限 PL 流形；有限生成整数同调的自由秩。
- 依赖：[Q1.3](#proof-q1-3)、[Q1.cellular-comparison](#proof-q1-cellular-comparison)、[Q2.2](#proof-q2-2)。
- 审查范围/未尽义务：完整条件推导：UCT 的 Ext 仅贡献挠子，整数对偶配对自由秩；对偶本身外引，不是独立全证。
- 参考定位：[Hatcher, Algebraic Topology, §3.3 Poincaré Duality](https://pi.math.cornell.edu/~hatcher/AT/ATpage.html)。
- 审查状态：2026-10-14 作者、根代理及非编写 review_foundations 模型逐式复核；尚无人类同行签署或形式化验证。

## G1.1 {#proof-g1-1}

[G1 正文位置](../algebraic/graduate-tools.md#proof-g1-1) · **完整证明（所列依赖下）**

- 假设与基础：n≥2；带基点相对边界同伦；群结构承接基本群重参数论证。
- 依赖：本章定义与所列基础工具。
- 审查范围/未尽义务：两个拼接方向与交换关系；人类复核待办。
- 参考定位：[Hatcher, Algebraic Topology, Chapter 4 Homotopy Theory](https://pi.math.cornell.edu/~hatcher/AT/ATpage.html)。
- 审查状态：本批作者核对；待人类同行复核。

## G1.2 {#proof-g1-2}

[G1 正文位置](../algebraic/graduate-tools.md#proof-g1-2) · **证明概要 / Advanced Outline**

- 假设与基础：有限递增、微分保持的过滤；r≥1；同调型指标。
- 依赖：本章定义与所列基础工具。
- 审查范围/未尽义务：下一页商分母的双包含、核像与边界项仍待展开。
- 参考定位：[Hatcher, Spectral Sequences in Algebraic Topology, Chapter 1 §1](https://pi.math.cornell.edu/~hatcher/SSAT/SSATpage.html)。
- 审查状态：本批作者核对；待人类同行复核。

## G1.fibration-hurewicz {#proof-g1-fibration-hurewicz}

[G1 正文位置](../algebraic/graduate-tools.md#proof-g1-fibration-hurewicz) · **引用定理**

- 假设与基础：带基点Serre纤维化；Hurewicz需(n−1)连通CW且n≥2。
- 依赖：本章定义与所列基础工具。
- 审查范围/未尽义务：长正合列与Hurewicz完整证明未展开；低维为带基点集合。
- 参考定位：[Hatcher, Algebraic Topology, Chapter 4 Homotopy Theory](https://pi.math.cornell.edu/~hatcher/AT/ATpage.html)。
- 审查状态：本批作者核对；待人类同行复核。

## G1.serre {#proof-g1-serre}

[G1 正文位置](../algebraic/graduate-tools.md#proof-g1-serre) · **引用定理**

- 假设与基础：单连通CW基底；道路连通且CW同伦型的纤维；域系数。
- 依赖：[G1.2](#proof-g1-2)。
- 审查范围/未尽义务：几何构造与收敛外引；稳定页只给关联分次。
- 参考定位：[Hatcher, Spectral Sequences in Algebraic Topology, Chapter 1 §1](https://pi.math.cornell.edu/~hatcher/SSAT/SSATpage.html)。
- 审查状态：本批作者核对；待人类同行复核。

## G1.hopf {#proof-g1-hopf}

[G1 正文位置](../algebraic/graduate-tools.md#proof-g1-hopf) · **完整证明（所列依赖下）**

- 假设与基础：Hopf纤维化；胞腔逼近给π2(S3)=0是外引。
- 依赖：[G1.fibration-hurewicz](#proof-g1-fibration-hurewicz)。
- 审查范围/未尽义务：需胞腔逼近；不是从零构建的独立全证。
- 参考定位：[Hatcher, Algebraic Topology, Chapter 4 Homotopy Theory](https://pi.math.cornell.edu/~hatcher/AT/ATpage.html)。
- 审查状态：本批作者核对；待人类同行复核。

## R1.pairing {#proof-r1-pairing}

[R1 正文位置](../persistence/modules-reduction.md#proof-r1-pairing) · **引用定理**

- 假设与基础：域系数；有限维有限过滤；排序面先于上单形。
- 依赖：本章定义与所列基础工具。
- 审查范围/未尽义务：区间唯一分解与过滤相容基变换的配对证明未展开。
- 参考定位：[Edelsbrunner & Harer, Computational Topology: An Introduction (2010), Chapter VII Persistence](https://bookstore.ams.org/mbk-69/)。
- 审查状态：本批作者核对；待人类同行复核。

## R1.1 {#proof-r1-1}

[R1 正文位置](../persistence/modules-reduction.md#proof-r1-1) · **完整证明（所列依赖下）**

- 假设与基础：F2边界矩阵；仅向后加列；有限行列。
- 依赖：本章定义与所列基础工具。
- 审查范围/未尽义务：代数终止与证书全证；不等于配对定理。
- 参考定位：[Edelsbrunner & Harer, Computational Topology: An Introduction (2010), Chapter VII Persistence](https://bookstore.ams.org/mbk-69/)。
- 审查状态：本批作者核对；待人类同行复核。

## R1.2 {#proof-r1-2}

[R1 正文位置](../persistence/modules-reduction.md#proof-r1-2) · **完整证明（所列依赖下）**

- 假设与基础：已给出区间直和分解；半开区间。
- 依赖：[R1.pairing](#proof-r1-pairing)。
- 审查范围/未尽义务：逐区间计数全证，分解本身外引。
- 参考定位：[Edelsbrunner & Harer, Computational Topology: An Introduction (2010), Chapter VII Persistence](https://bookstore.ams.org/mbk-69/)。
- 审查状态：本批作者核对；待人类同行复核。

## R1.short-bars {#proof-r1-short-bars}

[R1 正文位置](../persistence/modules-reduction.md#proof-r1-short-bars) · **完整证明（所列依赖下）**

- 假设与基础：正长度条与真实参数尺度；零长度无存活参数。
- 依赖：[R1.2](#proof-r1-2)。
- 审查范围/未尽义务：保持P0 A/B回归；binary64不是实数精确算术。
- 参考定位：[Edelsbrunner & Harer, Computational Topology: An Introduction (2010), Chapter VII Persistence](https://bookstore.ams.org/mbk-69/)。
- 审查状态：本批作者核对；待人类同行复核。

## R2.1 {#proof-r2-1}

[R2 正文位置](../persistence/stability.md#proof-r2-1) · **完整证明（所列依赖下）**

- 假设与基础：固定标号同点数欧氏点云；每点扰动≤δ；半径尺度。
- 依赖：本章定义与所列基础工具。
- 审查范围/未尽义务：三角不等式与包含映射证明；有限精度需另说明。
- 参考定位：[Chazal, de Silva, Glisse & Oudot, The Structure and Stability of Persistence Modules (2016), algebraic stability](https://arxiv.org/abs/1207.3674)。
- 审查状态：本批作者核对；待人类同行复核。

## R2.stability {#proof-r2-stability}

[R2 正文位置](../persistence/stability.md#proof-r2-stability) · **引用定理**

- 假设与基础：有限构造、区间可分解的持续模；η交错。
- 依赖：[R1.pairing](#proof-r1-pairing)。
- 审查范围/未尽义务：匹配定理完整证明未展开。
- 参考定位：[Chazal, de Silva, Glisse & Oudot, The Structure and Stability of Persistence Modules (2016), algebraic stability](https://arxiv.org/abs/1207.3674)。
- 审查状态：本批作者核对；待人类同行复核。

## R2.2 {#proof-r2-2}

[R2 正文位置](../persistence/stability.md#proof-r2-2) · **完整证明（所列依赖下）**

- 假设与基础：条寿命严格大于2η；有限图存在最优匹配。
- 依赖：本章定义与所列基础工具。
- 审查范围/未尽义务：不允许由“无长条保证”推出删除短条。
- 参考定位：[Chazal, de Silva, Glisse & Oudot, The Structure and Stability of Persistence Modules (2016), algebraic stability](https://arxiv.org/abs/1207.3674)。
- 审查状态：本批作者核对；待人类同行复核。

## R2.3 {#proof-r2-3}

[R2 正文位置](../persistence/stability.md#proof-r2-3) · **完整证明（所列依赖下）**

- 假设与基础：有限条的两个端点误差各≤η。
- 依赖：本章定义与所列基础工具。
- 审查范围/未尽义务：两个端点三角不等式。
- 参考定位：[Chazal, de Silva, Glisse & Oudot, The Structure and Stability of Persistence Modules (2016), algebraic stability](https://arxiv.org/abs/1207.3674)。
- 审查状态：本批作者核对；待人类同行复核。

## A8.3 {#proof-a8-3}

[A8 正文位置](../ai/differentiable-persistence.md#proof-a8-3) · **完整证明（所列依赖下）**

- 假设与基础：固定有限复形；顶点值连续且θ0严格全序；固定确定性约化。
- 依赖：本章定义与所列基础工具。
- 审查范围/未尽义务：结构性等值保留；只给充分条件。
- 参考定位：[Gabrielsson et al., A Topology Layer for Machine Learning, AISTATS 2020](https://proceedings.mlr.press/v108/gabrielsson20a.html)。
- 审查状态：本批作者核对；待人类同行复核。

## A8.4 {#proof-a8-4}

[A8 正文位置](../ai/differentiable-persistence.md#proof-a8-4) · **完整证明（所列依赖下）**

- 假设与基础：C1输出；固定组合区域；正有限条；排名损失另需固定排名。
- 依赖：[A8.3](#proof-a8-3)、[R1.pairing](#proof-r1-pairing)。
- 审查范围/未尽义务：条件链式法则全证；一般配对、全局优化不在结论内。
- 参考定位：[Gabrielsson et al., A Topology Layer for Machine Learning, AISTATS 2020](https://proceedings.mlr.press/v108/gabrielsson20a.html)。
- 审查状态：本批作者核对；待人类同行复核。

## A8.5 {#proof-a8-5}

[A8 正文位置](../ai/differentiable-persistence.md#proof-a8-5) · **完整证明（所列依赖下）**

- 假设与基础：四顶点路径；q=(0,a,b,0)；0≤a,b≤1。
- 依赖：本章定义与所列基础工具。
- 审查范围/未尽义务：从分支过滤完整计算，含零值边界。
- 参考定位：[Gabrielsson et al., A Topology Layer for Machine Learning, AISTATS 2020](https://proceedings.mlr.press/v108/gabrielsson20a.html)。
- 审查状态：本批作者核对；待人类同行复核。

## A8.6 {#proof-a8-6}

[A8 正文位置](../ai/differentiable-persistence.md#proof-a8-6) · **完整证明（所列依赖下）**

- 假设与基础：a=b=c在(0,1)内部；双侧偏导与右方向导数分开。
- 依赖：[A8.5](#proof-a8-5)。
- 审查范围/未尽义务：不能把中央差分极限当作梯度。
- 参考定位：[Carrière et al., Optimizing persistent homology based functions, ICML 2021](https://proceedings.mlr.press/v139/carriere21a.html)。
- 审查状态：本批作者核对；待人类同行复核。
