# H3 / Q1 / Q2 作者核验记录

日期：2026-10-14。工作树 `work/topology-v06-quality`，分支 `codex/v0.6-proof-learning`，候选基线 `9a562ca`。本记录由内容编写代理维护，**不是独立人类审稿、形式化验证或全书完成声明**。非编写数学复核另见 `validation/v06/review-math-independent.md`。

## 文件级修改

- `docs/algebraic/homology/cellular-coefficients.md`：十二节规范；自由表示的 Tor；自然 UCT 的映射、正合性、两变量自然性与剪切反例；张量收缩的符号；完整区分有限代数与几何外引。
- `docs/algebraic/cohomology/cochains-products.md`：Ext 余核与自然性；完整有限自由上同调 UCT；评价和杯积拉回；链同伦对偶；胞腔上链比较独立外引；修正连通/道路连通与二次/二阶歧义。
- `docs/algebraic/cohomology/duality.md`：帽积自然性和交换图；整数三边圆周计算；移除未经符号推导的链等式；明确闭、定向、有限 PL 及条件 Euler 推导。
- `docs/exercises/h3-solutions.md`、`q1-solutions.md`、`q2-solutions.md`：每章八题完整论证，保留每题外引范围。
- `docs/assets/q2-circle-cap.svg`：原创有向圆周和帽积图，不增加运行时依赖。
- `docs/project/reviews/H3.md`、`Q1.md`、`Q2.md`：逐声明假设、证明范围、发现和未尽义务。
- `docs/project/H3-Q1-Q2-REVIEW.md`：本批数学修订范围及人工复核事项。
- `scripts/proof-ledger.json`、`docs/project/proof-ledger.md`：新增 H3.0、Q1.0、Q2.3、Q1.cellular-comparison；H3.2/Q1.3 的本地有限证明完成；几何比较与 PD 保留外引/概要；Q2.euler 依赖胞腔上链比较。
- `scripts/curriculum.json`：仅 H3/Q1/Q2 的十二节、8题、解答及review登记；H3先修补PRE5/CT1。
- `scripts/verify_algebra_chapter_examples.py`：标准库校验三个实际正文代码块、12节、8题答案及局部lemma/依赖契约。
- `validation/v06/q2-cap-diagram.png`：浏览器渲染的SVG预览；人工视觉检查标签完整、无裁切，箭头与链符号一致。

## 实际执行与结果

在工作树根执行：

```text
..\topology-venv\Scripts\python.exe scripts/verify_algebra_chapter_examples.py
PASS 3 finite Python examples, 3 twelve-section chapters, 24 solutions,
     and local lemma/dependency contracts

node --test scripts/test_cochain_identities.mjs
PASS 2 tests:
  Q1.1: 36 exact formal cup identities (p,q=0..5)
  Q2.1: 52 exact formal cap identities (including p=0,n=p,n<p)
```

临时源文件检查另通过：11个既有 `proof-*` 锚点全部保留、3个自检键与 HEAD 相同、33个本章相对文件链接存在、SVG为有效XML。`git diff --check` 无空白错误（Git有CRLF规范化提示，无失败）。新增答案页的题号和所有三个正文中的lemma编号也由标准库脚本检查。

通过 Playwright Chromium 将 SVG 独立渲染为 `q2-cap-diagram.png` 并实际查看，布局与内容正常。全仓构建、线上检查及完整测试由根代理统一执行，本记录不在结果尚未完成时声称它们成功。

## 数学自检范围与复核发现

作者逐式检查 Tor 的提升差因式分解、自然 UCT 的 beta 值域、张量边界像、Ext 嵌入的双向核像、自然性方差、两条无自然分裂反例，以及 p=0/n=p/过高次帽积端点。根代理第一遍复核确认这些有限链证明，并指出以下两项需要修正：

1. 普通奇异零次上同调不能从一般连通推出常值。题目与答案改为非空道路连通；圆盘利用可缩性保证道路连通。
2. 有限胞腔同调的抽象群比较不自动提供上同调、自然性与杯积比较。新增独立 `Q1.cellular-comparison` 外引，空间例子和 Euler 推论显式依赖它。

非编写 `review_foundations` 再次逐式复核，没有发现未解决的数学阻塞；建议增加链同伦的对偶公式、将“常数零上链1”改成“常值为1的零次上链”，均已落实。根代理与该代理的模型复核不等于人类审稿。

## 尚未完成

- 非正则有限 CW 骨架对相对群集中引理和附加映射度公式。
- 胞腔上链到奇异上同调、评价与胞腔映射自然性；一般连续映射的胞腔逼近输入。
- Eilenberg–Zilber shuffle 与链同伦、空间 Künneth 及杯积外积兼容。
- 分次交换的 cup-one 链同伦。
- Poincare 对偶的对偶胞腔关联数、次数重标号与指定奇异帽积映射比较。
- 曲面交叉配对非退化性及几何交点兼容性。
- 人类独立逐证明复核、原书具体证明逐页定位与形式化验证。

所有有限运算证据仅在明确输入、系数和表达式范围内成立；它们不证明自然 UCT、对偶或任意空间的一般数学结论。
