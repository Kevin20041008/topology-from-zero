# 公式渲染检查

此页用于检查本地 MathJax 的实际排版，属于技术验收页。公式应呈现为数学符号，不能显示原始反斜杠或错误信息。窄屏上的长公式允许在公式区域横向滚动。

## 行内公式

拓扑空间写作 $(X,\tau)$，同调为 $H_k(K;\mathbb F_2)$，并且 $\partial_{k-1}\circ\partial_k=0$。

源码使用 `$...$`，例如 `$\beta_1=1$`，渲染后为 $\beta_1=1$。

## 块级公式与矩阵

$$
\beta_k=\dim\ker\partial_k-\dim\operatorname{im}\partial_{k+1}.
$$

$$
D_1=\begin{pmatrix}1&1&0\\1&0&1\\0&1&1\end{pmatrix},\qquad
D_2=\begin{pmatrix}1\\1\\1\end{pmatrix},\qquad D_1D_2=0\quad\text{in }\mathbb F_2.
$$

## 多行推导与集合运算

$$
\begin{aligned}
(g\circ f)^{-1}(U)&=f^{-1}\bigl(g^{-1}(U)\bigr),\\
\bigcap_{n=1}^{\infty}(-1/n,1/n)&=\{0\}.
\end{aligned}
$$

## 技术约定

使用 `pymdownx.arithmatex` 保存数学标记，并使用本地固定版本 MathJax 3.2.2 的 SVG 输出。代码块中的公式源码应保持原样。检查浅色、深色模式与手机宽度，随后访问章节页，确认页面跳转后同样能排版。
