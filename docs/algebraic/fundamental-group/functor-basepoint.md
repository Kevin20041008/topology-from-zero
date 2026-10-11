# F1 · 基点变换、函子性与形变收缩

<div class="chapter-meta">研究生课程 · 先修：基础 C；群同态与共轭<br>学习方式：先独立重构证明，再完成书面练习和即时自检。实验只检验指定有限输入。</div>

## 1. 直观解释

基本群不仅给每个空间一个群，还把保持基点的连续映射变成群同态。移动基点需要选一条道路，而不同选择通常只相差共轭；忽略这一步会把“自然同构”与“存在某个同构”混为一谈。

## 2. 严格定义

带基点映射 $f:(X,x_0)\to(Y,y_0)$ 满足 $f(x_0)=y_0$。群同态（group homomorphism）保持乘法；内自同构（inner automorphism）形如 $g\mapsto hgh^{-1}$。

若道路 $c$ 从 $x_0$ 到 $x_1$，定义基点变换
$c_\#: \pi_1(X,x_1)\to\pi_1(X,x_0)$，$[\alpha]\mapsto[c*\alpha*\bar c]$；乘法仍按行走次序。

收缩映射（retraction）$r:X\to A$ 满足 $r|_A=\operatorname{id}_A$。强形变收缩（strong deformation retraction）还要求同伦 $H$ 从 $\operatorname{id}_X$ 到包含映射与 $r$ 的复合，并始终固定 $A$ 的每一点。

## 3. 定理与证明

**定理 F1.1（函子性）。** $f_*[\alpha]=[f\circ\alpha]$ 定义群同态，且 $(g\circ f)_*=g_*\circ f_*$、$(\operatorname{id})_*=\operatorname{id}$。

**证明。** 将端点固定同伦与 $f$ 复合，得到像环路的端点固定同伦，故代表元无关。逐段代入拼接公式，$f\circ(\alpha*\beta)=(f\circ\alpha)*(f\circ\beta)$，所以保持乘法及常值环路。复合与恒等式在代表映射层面已严格成立。$\square$

**命题 F1.2。** $c_\#$ 是同构，其逆为 $\bar c_\#$。若 $d$ 也是从 $x_0$ 到 $x_1$ 的道路，则 $d_\#$ 与 $c_\#$ 相差内自同构。

**证明。** 基础 C 的消去同伦说明 $\bar c*c$ 及 $c*\bar c$ 分别可缩成对应基点的常值道路；插入这些消去证明保持乘法，并证明两个基点变换复合为恒等。令 $h=[d*\bar c]\in\pi_1(X,x_0)$，则
$d_\#([\alpha])=h\,c_\#([\alpha])\,h^{-1}$，因为中间相邻的 $\bar c*c$ 可消去。$\square$

**定理 F1.3（同伦与基点轨迹）。** 若 $H$ 是从 $f$ 到 $g$ 的同伦，令 $c(s)=H(x_0,s)$，则 $f_*=c_\#\circ g_*$，这里两边均从 $\pi_1(X,x_0)$ 到 $\pi_1(Y,f(x_0))$。

**证明。** 对环路 $\alpha$，方形映射 $(t,s)\mapsto H(\alpha(t),s)$ 的边界按底边、右边、反向顶边、反向左边走，像为 $f\alpha*c*\overline{g\alpha}*\bar c$。方形边界在整个方形中可固定起点收缩：方形凸，直接用到起始角的线性收缩。复合后这个像环路平凡，于是 $[f\alpha]=[c*g\alpha*\bar c]$。$\square$

**推论 F1.4。** 道路连通空间的同伦等价给基本群同构；强形变收缩在 $A$ 中选基点时给出包含与收缩诱导的互逆同构。

**证明。** 同伦等价的两个复合同伦于恒等；由 F1.3，其诱导复合与恒等至多相差基点变换同构，因而各诱导映射（作相应基点调整后）均为同构。强形变收缩时基点轨迹恒定，直接由 F1.1 和 F1.3 得两个复合均为恒等。$\square$

## 4. 正例与反例

**正例。** $\mathbb R^n\setminus\{0\}$ 强形变收缩到 $S^{n-1}$：
$H(x,s)=((1-s)+s/\|x\|)x$。系数始终正，不经过被删除原点；单位球面上的点始终固定。

**反例。** 一般收缩映射不一定是同伦等价：任意有基点空间都收缩到该单点，但圆周的基本群将在覆盖单元证明为 $\mathbb Z$，所以圆周不能同伦等价于一点。

**反例。** 改变基点的同构不是无条件唯一的；在非交换基本群中，不同道路可导致非平凡共轭。

## 5. 练习

1. 验证径向形变的所有端点与固定点条件。
2. 证明收缩映射使包含诱导同态单射、收缩诱导同态满射。
3. 当基本群交换时，说明同一连通空间中基点变换为何与道路选择无关。

??? tip "提示 1"
    2：$r\circ i=\operatorname{id}$。3：使用 F1.2 的共轭公式。

??? tip "提示 2 与核对"
    2：$r_*i_*=\operatorname{id}$，左可逆给单射、右可逆给满射，但不保证二者同构。3：交换群中的内自同构均为恒等。

<div class="admonition question" data-exercise="algebraic-fundamental-group-functor-basepoint"></div>
<noscript>即时反馈需要 JavaScript；正文习题与分步提示仍可直接阅读。</noscript>

## 6. 参考书目

- Allen Hatcher. *Algebraic Topology*, Cambridge University Press, 2002.
- Glen E. Bredon. *Topology and Geometry*, Springer, 1993.

本章以原创文字组织标准数学内容。标为“引用定理”的结果未在本章证明，不将其与已给出的证明混为一谈。
