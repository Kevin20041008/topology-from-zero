# 逐定理证明与依赖台账

本批覆盖 H3、Q1、Q2、G1、R1、R2、A8 的主要编号结论与显式引用，共28项。没有把它称作全书定理审计。其他章节仍以[逐章记录](reviews/index.md)为准，未进入此表不等于已验证。

“完整证明”描述本地论证的展开范围，**允许依赖已精确声明的外引**；它不表示形式化认证或人类签署。“引用定理”把完整证明责任交给文献；“证明概要”保留尚未展开的步骤；“待审”标记尚不能认可的陈述。每项都列假设、依赖与人工复核义务，构建测试只检查台账和页面一致。

本批实际补全 Q1.1 杯积和 Q2.1 帽积的逐项符号计算，纠正 Q1.3 将块计算视作自然泛系数全证的表述；G1.2 明确下一页核像识别仍为概要。没有用测试替代 H3/Q2 的未尽证明。

参考链接定位到真实书籍/论文入口；本批没有逐页读取这些原书，不虚报外部核查范围。原文证明与习题仍需独立人类复核。

## H3.1 {#proof-h3-1}

[H3 正文位置](../algebraic/homology/cellular-coefficients.md#proof-h3-1) · **证明概要 / Advanced Outline**

- 假设与基础：有限CW；整数系数；骨架相对群集中引理外引。
- 依赖：本章定义与所列基础工具。
- 审查范围/未尽义务：非正则CW骨架相对群的完整比较；不能只取附加球领圈。
- 参考定位：[Hatcher, Algebraic Topology (2002), §2.2 Cellular Homology](https://pi.math.cornell.edu/~hatcher/AT/ATpage.html)。
- 审查状态：本批作者核对；待人类同行复核。

## H3.2 {#proof-h3-2}

[H3 正文位置](../algebraic/homology/cellular-coefficients.md#proof-h3-2) · **证明概要 / Advanced Outline**

- 假设与基础：逐次有限生成自由整数链；任意阿贝尔系数G；PRE5、CT1。
- 依赖：本章定义与所列基础工具。
- 审查范围/未尽义务：自然Tor映射及交换图；分块计算只给非自然分裂。
- 参考定位：[Hatcher, Algebraic Topology, §3.A Universal Coefficients for Homology](https://pi.math.cornell.edu/~hatcher/AT/ATpage.html)。
- 审查状态：本批作者核对；待人类同行复核。

## H3.3 {#proof-h3-3}

[H3 正文位置](../algebraic/homology/cellular-coefficients.md#proof-h3-3) · **完整证明（所列依赖下）**

- 假设与基础：域上有限维链复形；有符号张量微分。
- 依赖：本章定义与所列基础工具。
- 审查范围/未尽义务：补空间选择；不据此宣称空间链比较已证。
- 参考定位：[Hatcher, Algebraic Topology, §3.A Universal Coefficients for Homology](https://pi.math.cornell.edu/~hatcher/AT/ATpage.html)。
- 审查状态：本批作者核对；待人类同行复核。

## H3.EZ {#proof-h3-ez}

[H3 正文位置](../algebraic/homology/cellular-coefficients.md#proof-h3-ez) · **引用定理**

- 假设与基础：空间奇异链与张量链；采用标准Eilenberg–Zilber比较。
- 依赖：本章定义与所列基础工具。
- 审查范围/未尽义务：shuffle映射与链同伦未展开。
- 参考定位：[Hatcher, Algebraic Topology, §3.A Universal Coefficients for Homology](https://pi.math.cornell.edu/~hatcher/AT/ATpage.html)。
- 审查状态：本批作者核对；待人类同行复核。

## Q1.1 {#proof-q1-1}

[Q1 正文位置](../algebraic/cohomology/cochains-products.md#proof-q1-1) · **完整证明（所列依赖下）**

- 假设与基础：交换环系数；有序面；非负次数；边界平方零。
- 依赖：本章定义与所列基础工具。
- 审查范围/未尽义务：本批展开共享面相消；待人类复核符号。
- 参考定位：[Hatcher, Algebraic Topology, §3.1 Cohomology Groups; §3.2 Cup Product](https://pi.math.cornell.edu/~hatcher/AT/ATpage.html)。
- 审查状态：本批作者核对；待人类同行复核。

## Q1.2 {#proof-q1-2}

[Q1 正文位置](../algebraic/cohomology/cochains-products.md#proof-q1-2) · **完整证明（所列依赖下）**

- 假设与基础：域上链复形；无限维延拓使用选择公理。
- 依赖：本章定义与所列基础工具。
- 审查范围/未尽义务：自然性来自评价；无限维选择依赖明示。
- 参考定位：[Hatcher, Algebraic Topology, §3.1 Cohomology Groups; §3.2 Cup Product](https://pi.math.cornell.edu/~hatcher/AT/ATpage.html)。
- 审查状态：本批作者核对；待人类同行复核。

## Q1.3 {#proof-q1-3}

[Q1 正文位置](../algebraic/cohomology/cochains-products.md#proof-q1-3) · **引用定理**

- 假设与基础：有限生成自由整数链；任意阿贝尔系数G。
- 依赖：[H3.2](#proof-h3-2)。
- 审查范围/未尽义务：块计算给群分解；自然Ext嵌入未构造。
- 参考定位：[Hatcher, Algebraic Topology, §3.1 Cohomology Groups; §3.2 Cup Product](https://pi.math.cornell.edu/~hatcher/AT/ATpage.html)。
- 审查状态：本批作者核对；待人类同行复核。

## Q1.commutativity {#proof-q1-commutativity}

[Q1 正文位置](../algebraic/cohomology/cochains-products.md#proof-q1-commutativity) · **引用定理**

- 假设与基础：上同调类上的分次交换；链级不严格交换。
- 依赖：[Q1.1](#proof-q1-1)、[H3.EZ](#proof-h3-ez)。
- 审查范围/未尽义务：cup-one链同伦及外积兼容性未展开。
- 参考定位：[Hatcher, Algebraic Topology, §3.1 Cohomology Groups; §3.2 Cup Product](https://pi.math.cornell.edu/~hatcher/AT/ATpage.html)。
- 审查状态：本批作者核对；待人类同行复核。

## Q2.1 {#proof-q2-1}

[Q2 正文位置](../algebraic/cohomology/duality.md#proof-q2-1) · **完整证明（所列依赖下）**

- 假设与基础：整数上链；p,n非负；过高次帽积为零；普通链的∂C0=0。
- 依赖：本章定义与所列基础工具。
- 审查范围/未尽义务：本批逐式删点计算并覆盖n=p端点。
- 参考定位：[Hatcher, Algebraic Topology, §3.3 Poincaré Duality](https://pi.math.cornell.edu/~hatcher/AT/ATpage.html)。
- 审查状态：本批作者核对；待人类同行复核。

## Q2.2 {#proof-q2-2}

[Q2 正文位置](../algebraic/cohomology/duality.md#proof-q2-2) · **证明概要 / Advanced Outline**

- 假设与基础：闭、定向、有限组合三角剖分的n维PL流形。
- 依赖：[H3.1](#proof-h3-1)、[Q2.1](#proof-q2-1)。
- 审查范围/未尽义务：对偶胞腔关联数符号、逐次重标号及奇异帽积比较未完成。
- 参考定位：[Hatcher, Algebraic Topology, §3.3 Poincaré Duality](https://pi.math.cornell.edu/~hatcher/AT/ATpage.html)。
- 审查状态：本批作者核对；待人类同行复核。

## Q2.euler {#proof-q2-euler}

[Q2 正文位置](../algebraic/cohomology/duality.md#proof-q2-euler) · **完整证明（所列依赖下）**

- 假设与基础：奇数维闭定向有限PL流形；有理系数。
- 依赖：[Q1.2](#proof-q1-2)、[Q2.2](#proof-q2-2)。
- 审查范围/未尽义务：完整的条件推导；依赖未在教材全证的对偶。
- 参考定位：[Hatcher, Algebraic Topology, §3.3 Poincaré Duality](https://pi.math.cornell.edu/~hatcher/AT/ATpage.html)。
- 审查状态：本批作者核对；待人类同行复核。

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
