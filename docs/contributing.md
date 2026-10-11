# 贡献与版权

本教材欢迎修正数学错误、改善中文解释、增加原创习题和小型可复现实验。

## 章节约定

每篇正式章节需要直观解释、严格定义、定理与证明、正例与反例、练习、参考书目。中文术语首次出现时给出英文原文；定理要写出完整假设，未证明而引用的结论需明确标注。

理论与实验应互相链接。Notebook 必须能从新内核完整运行，并说明输入、系数域、尺度约定和适用规模。实验输出不应被表述为一般性数学证明。

## 提交前检查

运行 `python scripts/verify_notebooks.py`、`python -m mkdocs build --strict` 和 `python scripts/verify_site.py`。涉及公式或样式时，再检查浏览器中的实际排版与手机宽度。

修改现有项目时先检查冲突，保留原文件；提交数学修正时附具体位置、问题说明和论证。不要用占位文本增加章节数量。

## 原创与许可

教材正文、题目、Notebook 说明及原创插图使用 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.zh-hans)；代码和 Notebook 代码单元使用 MIT。详细范围见项目根目录 `LICENSE.md` 与 `LICENSE-CODE`。

不复制受版权保护的教材正文、解答或插图。数学事实可以用自己的文字推导，并注明参考来源。引用书目不等于获得复制内容的许可。本版插图由项目内 SVG 源码原创绘制。

第三方 MathJax 保留其 Apache-2.0 许可文件；MkDocs Material、Jupyter 等依赖保留各自许可，见 `THIRD_PARTY_NOTICES.md`。
