# 贡献与版权

本教材欢迎修正数学错误、改善中文解释、增加原创习题和小型可复现实验。

## 章节约定

每篇正式章节需要直观解释、严格定义、定理与证明、正例与反例、练习、参考书目。中文术语首次出现时给出英文原文；定理要写出完整假设，未证明而引用的结论需明确标注。

理论与实验应互相链接。Notebook 必须能从新内核完整运行，并说明输入、系数域、尺度约定和适用规模。实验输出不应被表述为一般性数学证明。

## 提交前检查

先用 `python -m pip install -r requirements-validation.txt` 安装验证依赖，再运行 `node --test scripts/test_topology.mjs`、`python scripts/verify_independent.py`、`python scripts/verify_notebooks.py`、`python -m mkdocs build --strict`、`python scripts/verify_site.py` 和 `git diff --check`。涉及公式或样式时，再检查浏览器中的实际排版与手机宽度。

新增或修改自检题时，逐个核对选项的数学理由，并实测空提交、错答、正确答案、分步提示和重置；题库位于 `docs/javascripts/exercise-bank.mjs`。不得通过缩短、舍弃正持续区间或放宽断言来消除测试差异。

修改现有项目时先检查冲突，保留原文件；提交数学修正时附具体位置、问题说明和论证。不要用占位文本增加章节数量。

使用[数学问题反馈表单](https://github.com/Kevin20041008/topology-from-zero/issues/new?template=math-issue.yml)报告缺失假设、证明漏洞或实验计算错误。请注明 URL、命题编号、版本、反例或复现步骤；实验还需注明系数域及 $r=2\varepsilon$ 的尺度约定。未完成的审查任务见[数学审查台账](math-review.md)。

所有修改通过 Pull Request，等待自动化检查通过与数学审阅后再合并。新增章节使用新路径；不得改动 `scripts/legacy_urls.json` 来掩盖旧 URL 或锚点回归。该清单记录 v0.2 发布时的页面及正文锚点。

## 原创与许可

教材正文、题目、Notebook 说明及原创插图使用 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.zh-hans)；代码和 Notebook 代码单元使用 MIT。详细范围见项目根目录 `LICENSE.md` 与 `LICENSE-CODE`。

不复制受版权保护的教材正文、解答或插图。数学事实可以用自己的文字推导，并注明参考来源。引用书目不等于获得复制内容的许可。本版插图由项目内 SVG 源码原创绘制。

第三方 MathJax 保留其 Apache-2.0 许可文件；MkDocs Material、Jupyter 等依赖保留各自许可，见 `THIRD_PARTY_NOTICES.md`。
