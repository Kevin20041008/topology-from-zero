# D3 · 微分形式、Stokes 与 de Rham 上同调

<div class="chapter-meta">研究生课程 · 先修：D1；交替多重线性代数；Q1–Q2<br>学习方式：先独立重构证明，再完成书面练习和即时自检。实验只检验指定有限输入。</div>

## 1. 直观解释

闭形式可以沿循环积分，而恰当形式沿边界的积分由 Stokes 控制。de Rham 理论把微积分中“能否找到原函数”的问题连接到实系数上同调。

## 2. 严格定义

$p$ 次微分形式（differential form）是 $\Lambda^pT^*M$ 的光滑截面。外微分（exterior derivative）在坐标中满足 $d(f\,dx_{i_1}\wedge\cdots\wedge dx_{i_p})=df\wedge dx_{i_1}\wedge\cdots\wedge dx_{i_p}$。闭（closed）指 $d\omega=0$，恰当（exact）指 $\omega=d\eta$。

$$
H^p_{\mathrm{dR}}(M)=\ker(d:\Omega^p\to\Omega^{p+1})/\operatorname{im}(d:\Omega^{p-1}\to\Omega^p).
$$

拉回 $f^*$ 用 $df$ 代入各向量变量，满足 $f^*(\omega\wedge\eta)=f^*\omega\wedge f^*\eta$。

## 3. 定理与证明

**命题 D3.1。** $d^2=0$，$d(\omega\wedge\eta)=d\omega\wedge\eta+(-1)^p\omega\wedge d\eta$，且 $df^*=f^*d$。
**证明。** 坐标展开后，二阶混合偏导对称而 $dx_i\wedge dx_j$ 反对称，得到第一式；乘法法则及将 $df$ 穿过 $p$ 个微分给第二式；链式法则给第三式。坐标表达在重叠处因第三式一致，因此定义全局良定。$\square$

**定理 D3.2（同伦算子与 Poincaré 引理）。** 光滑同伦 $F:M\times I\to N$ 的两端拉回在 de Rham 上同调上相同。星形开集的正次闭形式全为恰当。

**证明。** 将 $F^*\omega$ 唯一写成 $\alpha_t+dt\wedge\beta_t$，定义 $K\omega=\int_0^1\beta_t\,dt$。外微分的 $dt$ 分量为 $\partial_t\alpha_t-d_M\beta_t$，由微积分基本定理得到

$$
dK\omega+Kd\omega=F_1^*\omega-F_0^*\omega.
$$

对星形开集取 $F(x,t)=tx$。正次形式经常值映射拉回为零，闭形式遂满足 $\omega=dK\omega$。$\square$

**定理 D3.3（Stokes）。** 对定向光滑 $n$ 维带边界流形及紧支撑 $(n-1)$ 形式，$\int_Md\omega=\int_{\partial M}\omega$，边界定向采用外法向在前。

**证明。** 用 D1 的光滑单位分解将 $\omega$ 分解到坐标半空间或欧氏空间，局部有限性与紧支撑使积分只需有限项。每个局部形式写为 $\sum_i(-1)^{i-1}a_i\,dx_1\wedge\cdots\widehat{dx_i}\cdots\wedge dx_n$。内部项对坐标积分时由紧支撑消去两端；半空间的法向项用一维基本定理只留下边界值，符号恰由外法向在前约定给出。坐标换元公式使局部积分一致，相加即得。$\square$

**引用定理（de Rham）。** 积分 $\omega\mapsto(\sigma\mapsto\int_{\Delta^p}\sigma^*\omega)$ 从形式到光滑奇异上链诱导 $H^*_{\mathrm{dR}}(M)\cong H^*(M;\mathbb R)$，与环结构相容。Stokes 证明它是上链映射；全局同构还需光滑逼近与局部到整体论证，本章不把前一个检查当成整个定理的证明。

## 4. 正例与反例

**正例。** 在 $\mathbb R^2\setminus\{0\}$ 上，$\omega=(-y\,dx+x\,dy)/(x^2+y^2)$ 闭，沿正向单位圆积分为 $2\pi$，故不是恰当形式。局部角度可作原函数，全局角度不能单值连续选择。

**反例。** “闭即恰当”只在适当局部区域成立。实系数形式也看不到整数挠：$\mathbb{RP}^2$ 的二阶整数上同调非零，但其正次实上同调全零。

## 5. 练习

1. 直接计算上述角形式的外微分。
2. 计算圆周上 $d\theta$ 的周期，并解释为什么 $\theta$ 不是全局实值函数。
3. 用 D3.2 证明欧氏空间正次 de Rham 上同调为零。

??? tip "提示 1"
    1：对两个系数分别求偏导。2：参数 $t\mapsto(\cos t,\sin t)$。
??? tip "提示 2 与核对"
    1：交叉偏导差为零。2：积分 $2\pi$，全局恰当形式沿闭路积分必零。3：用径向光滑收缩。

<div class="admonition question" data-exercise="differential-forms-derham"></div>
<noscript>即时反馈需要 JavaScript；正文习题与分步提示仍可直接阅读。</noscript>

## 6. 参考书目

- John M. Lee. *Introduction to Smooth Manifolds*, 2nd ed., Springer, 2013.
- Victor Guillemin and Alan Pollack. *Differential Topology*, Prentice-Hall, 1974.
- John Milnor. *Morse Theory*, Princeton University Press, 1963.
- Raoul Bott and Loring W. Tu. *Differential Forms in Algebraic Topology*, Springer, 1982.

本章以原创文字组织标准数学内容。标为“引用定理”的结果未在本章证明，不将其与已给出的证明混为一谈。
