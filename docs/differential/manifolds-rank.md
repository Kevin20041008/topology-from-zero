# D1 · 光滑流形、切空间与秩定理

<div class="chapter-meta">研究生课程 · 先修：P2、P6、P9；多元微积分的逆函数定理与常微分方程<br>学习方式：先独立重构证明，再完成书面练习和即时自检。实验只检验指定有限输入。</div>

## 1. 直观解释

拓扑流形只要求局部像欧氏空间；光滑结构还规定不同坐标之间能微分。微分拓扑关注那些不依赖具体长度和角度、却依赖光滑结构的性质。

## 2. 严格定义

本课程的光滑流形（smooth manifold）默认 Hausdorff、第二可数、有限维、无边界；有边界时另行声明。光滑图册的转移映射为 $C^\infty$ 微分同胚（diffeomorphism）。切向量（tangent vector）可定义为曲线在坐标中的一阶速度等价类，$T_pM$ 在坐标变换下由 Jacobian 变换。导数 $df_p:T_pM\to T_{f(p)}N$ 满足链式法则。

浸入（immersion）要求 $df_p$ 单射；浸没（submersion）要求满射；嵌入（embedding）是到像的同胚且为浸入。正则值（regular value）$y$ 要求每个 $p\in f^{-1}(y)$ 上导数满射，空逆像也满足。

## 3. 定理与证明

**定理 D1.1（常秩局部标准形）。** 若 $f:M^m\to N^n$ 在 $p$ 邻域秩恒为 $r$，存在局部坐标使 $f(x)=(x_1,\ldots,x_r,0,\ldots,0)$。

**证明。** 取坐标后重排变量，使前 $r$ 个分量关于前 $r$ 个变量的 Jacobian 子式非零。映射 $x\mapsto(f_1(x),\ldots,f_r(x),x_{r+1},\ldots,x_m)$ 的导数可逆，逆函数定理使它成为新坐标。此时 $f=(u_1,\ldots,u_r,g_{r+1}(u),\ldots,g_n(u))$。秩恒为 $r$ 强迫后面分量对 $u_{r+1},\ldots,u_m$ 的偏导都为零，在小矩形内它们只依赖前 $r$ 个坐标。再在目标坐标中减去这些函数，得到标准形。$\square$

**推论 D1.2（正则值原像）。** $f:M^m\to N^n$ 光滑、$y$ 正则，则非空 $f^{-1}(y)$ 为余维 $n$ 的嵌入子流形。
**证明。** 满秩条件在邻域保持，D1.1 将方程化成前 $n$ 个坐标为零；这些局部坐标转移光滑，给维数 $m-n$ 的子流形图册。$\square$

**命题 D1.3。** 真浸入若又是单射，则是嵌入；特别地，紧流形到 Hausdorff 流形的单射浸入是嵌入。
**证明。** 流形为局部紧 Hausdorff，真映射（紧集逆像紧）为闭映射，见 P6。单射闭连续映射到其像的逆连续，再结合浸入定义。紧定义域时紧集逆像是闭紧集，或直接用紧到 Hausdorff 连续双射定理。$\square$

**命题 D1.4（光滑单位分解）。** 任意开覆盖有光滑从属单位分解。
**证明。** 第二可数局部紧性给可数预紧坐标覆盖；用紧穷竭 $K_i\subset\operatorname{int}K_{i+1}$，在各紧环带 $K_i\setminus\operatorname{int}K_{i-1}$ 上选有限个坐标小球，其闭包在原覆盖成员内、且只与相邻有限层相交。由此得局部有限的一对嵌套坐标球 $V_j\Subset W_j$，小球覆盖全空间。欧氏光滑隆起函数给 $\rho_j\ge0$，在 $\overline V_j$ 上为一、支撑在 $W_j$ 内，延零仍光滑。$s=\sum\rho_j$ 局部有限、处处正，$\phi_j=\rho_j/s$ 即所求。紧穷竭由可数预紧基逐步取有限并并扩大内部构造。$\square$

**引用定理。** Whitney 嵌入定理：每个上述 $m$ 维光滑流形（$m>0$）可光滑嵌入 $\mathbb R^{2m}$。这比“画一个参数曲面”强得多，证明不在本章。

## 4. 正例与反例

**正例。** $S^n=\{x:\sum x_i^2=1\}$ 是平方范数的正则值原像，维数 $n$。紧圆周的标准参数映射给嵌入。

**反例。** $t\mapsto(t^2,t^3)$ 在零点导数为零，不能由其单射性推断光滑嵌入。$t\mapsto(e^{it},e^{i\alpha t})$（$\alpha$ 无理）是实线到环面的单射浸入，但不是嵌入：存在无界 $t_k$ 的像趋于原点像（由无理旋转的逼近），逆映射不连续。

## 5. 练习

1. 求 $S^n$ 在 $p$ 处的切空间。
2. 证明浸入的复合仍为浸入。
3. 证明每个光滑流形有 Riemann 度量。

??? tip "提示 1"
    1：对约束微分。3：把局部欧氏内积用光滑单位分解相加。
??? tip "提示 2 与核对"
    1：$T_pS^n=\{v:p\cdot v=0\}$。2：单射线性映射的复合单射。3：局部有限和光滑，对非零向量至少一项严格正。

<div class="admonition question" data-exercise="differential-manifolds-rank"></div>
<noscript>即时反馈需要 JavaScript；正文习题与分步提示仍可直接阅读。</noscript>

## 6. 参考书目

- John M. Lee. *Introduction to Smooth Manifolds*, 2nd ed., Springer, 2013.
- Victor Guillemin and Alan Pollack. *Differential Topology*, Prentice-Hall, 1974.
- John Milnor. *Morse Theory*, Princeton University Press, 1963.

本章以原创文字组织标准数学内容。标为“引用定理”的结果未在本章证明，不将其与已给出的证明混为一谈。
