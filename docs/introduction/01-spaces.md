# 01 · 从距离到拓扑

<div class="chapter-meta">模块：拓扑学导论 · 先修：集合、函数、实数 · 建议：阅读 30 分钟，练习 30 分钟<br>本章目标：从度量开集推导拓扑公理，并区分“点的集合”和“空间”。</div>

**先修自检。** 能否区分 $x\in U$ 与 $U\subseteq X$，并写出并、交、补集？无穷交反例还用到阿基米德性质：对任意 $x\ne0$，存在正整数 $n$ 使 $1/n<|x|$。若这些操作不熟悉，先完成[先修依赖审查](../math-review.md)中的自检。

## 1. 直观解释：保留“附近”的结构

在实数轴上，判断一个点是否靠近另一个点，可以测量距离。但有些问题只关心“一个点是否拥有完全落在某集合中的小范围”，并不在意小范围究竟有多大。拓扑学（topology）把这样的局部关系抽象成开集（open set）。

把一根橡皮绳弯成不同形状，会改变距离，却可能保留邻近关系。这提供直观，但“能拉伸、不能撕裂”不是正式定义：一般拓扑空间不一定画得出来，空间之间的比较最终要靠连续映射（continuous map）与同胚（homeomorphism）。

开集也不等于“没有画出边界的区域”。整个空间总是开集；在离散空间里，每个单点集合都是开集。

## 2. 严格定义：用集合族指定一个空间

**定义 1.1（度量，metric）。** 集合 $X$ 上的函数 $d:X\times X\to[0,\infty)$ 称为度量，如果对所有 $x,y,z\in X$，有

$$
d(x,y)=0\iff x=y,\qquad d(x,y)=d(y,x),\qquad d(x,z)\le d(x,y)+d(y,z).
$$

半径 $r>0$ 的开球（open ball）是 $B_d(x,r)=\{y\in X:d(x,y)<r\}$。集合 $U\subseteq X$ 称为度量开集，如果对每个 $x\in U$，存在 $r>0$ 使 $B_d(x,r)\subseteq U$。

**定义 1.2（拓扑空间，topological space）。** 设 $\mathcal P(X)$ 是 $X$ 的幂集（power set）。如果集合族 $\tau\subseteq\mathcal P(X)$ 满足下列条件，则称 $\tau$ 为 $X$ 上的拓扑，$(X,\tau)$ 为拓扑空间：

1. $\varnothing,X\in\tau$；
2. 任意多个成员的并仍在 $\tau$ 中；
3. 有限多个成员的交仍在 $\tau$ 中。

也就是说，若 $U_i\in\tau$，则

$$
\bigcup_{i\in I}U_i\in\tau;
\qquad
U_1\cap\cdots\cap U_n\in\tau\quad(n\ge1).
$$

集合 $F$ 是闭集（closed set），指 $X\setminus F$ 是开集。集合 $N$ 是点 $x$ 的邻域（neighborhood），指存在开集 $U$ 满足 $x\in U\subseteq N$；按照这个约定，邻域自身不必是开集。

!!! note "集合与空间不同"
    $X$ 指点的集合，$(X,\tau)$ 才指定了空间。同一个 $X$ 可以配上多个拓扑，产生不同的连续映射。

## 3. 定理与证明：度量一定给出拓扑

**定理 1.3。** 度量空间 $(X,d)$ 的全部度量开集组成一个拓扑，称为度量诱导拓扑（metric-induced topology）。

**证明。** 记全部度量开集组成的集合族为 $\tau_d$。

首先，空集没有需要检验的点，因此条件空真；对任意 $x\in X$，任取正半径即可得到包含于 $X$ 的球，故 $\varnothing,X\in\tau_d$。

其次，设每个 $U_i\in\tau_d$，且 $x\in\bigcup_i U_i$。那么 $x$ 属于某个 $U_j$，所以存在 $r>0$ 使 $B_d(x,r)\subseteq U_j\subseteq\bigcup_i U_i$。故任意并是开集。

最后，若 $x\in U_1\cap\cdots\cap U_n$，对每个 $k$ 选取 $r_k>0$ 使 $B_d(x,r_k)\subseteq U_k$。有限个正数的最小值 $r=\min_k r_k$ 仍为正数，于是

$$
B_d(x,r)\subseteq\bigcap_{k=1}^{n}U_k.
$$

因此有限交是开集，三个公理全部成立。$\square$

证明中的“有限”无法随意删去：无穷多个正数的下确界可能等于零。

## 4. 正例与反例

**正例 A：实数上的通常拓扑。** 取 $d(x,y)=|x-y|$。区间 $(a,b)$ 是开集：对 $x\in(a,b)$，取 $r=\tfrac12\min\{x-a,b-x\}$ 即可。

**正例 B：两个极端。** 离散拓扑（discrete topology）是 $\tau=\mathcal P(X)$；平凡拓扑（indiscrete topology）是 $\tau=\{\varnothing,X\}$。二者都满足公理。离散拓扑由离散度量 $d(x,y)=1$（当 $x\ne y$）诱导。

**反例 A：无穷交未必开。** 在实数的通常拓扑中，

$$
\bigcap_{n=1}^{\infty}\left(-\frac1n,\frac1n\right)=\{0\}.
$$

每个区间都开，但 $\{0\}$ 不开，因为任意以 $0$ 为中心的正半径开球都包含非零实数。

**反例 B：看起来合理的集合族也会失败。** 在 $X=\{a,b,c\}$ 上，集合族 $\{\varnothing,X,\{a\},\{b\}\}$ 不是拓扑，因为 $\{a\}\cup\{b\}=\{a,b\}$ 不在该集合族中。

**反例 C：开与闭不是互斥关系。** 在任意空间中，$X$ 与 $\varnothing$ 都既开又闭（clopen）。在实数上，$[0,1)$ 则既不开也不闭。因此，“不是开集”不能直接推出“是闭集”。

## 5. 练习

1. 在 $X=\{0,1\}$ 上验证 $\tau=\{\varnothing,\{1\},X\}$ 是拓扑，并列出全部闭集。这个空间称为谢尔宾斯基空间（Sierpiński space）。
2. 证明在有限集合上，只要一个集合族包含空集与全集，并对二元并和二元交封闭，它就是拓扑。说明“有限集合”用在何处。
3. 在实数通常拓扑中，证明任意单点集是闭集，并判断有理数集 $\mathbb Q$ 是否开、是否闭。可使用有理数与无理数在实数中的稠密性。
4. 已知 $\tau_1,\tau_2$ 是同一集合上的拓扑。证明 $\tau_1\cap\tau_2$ 是拓扑，并构造 $\tau_1\cup\tau_2$ 不是拓扑的例子。

??? tip "提示与核对"
    1. 闭集为 $X,\{0\},\varnothing$。检验有限集合族时，检查二元并、交已经足够。
    2. 有限集合只有有限多个不同子集，因此任何一族开集的并实际上等于其中有限多个不同成员的并。
    3. $\mathbb R\setminus\{x\}=(-\infty,x)\cup(x,\infty)$；每个开区间既有有理数又有无理数，所以 $\mathbb Q$ 既不开也不闭。
    4. 交中的开集同时属于两种拓扑。对并的反例可取三点集上的 $\{\varnothing,X,\{a\}\}$ 与 $\{\varnothing,X,\{b\}\}$。

**计算衔接。** [有限拓扑实验](../labs/index.md#finite)将穷举验证有限例子。穷举不能替代本章对任意度量空间的证明。

<div class="admonition question" data-exercise="spaces"></div>
<noscript>即时反馈需启用 JavaScript；正文练习和提示仍可直接阅读。</noscript>

## 6. 参考书目

- James R. Munkres. *Topology*, 2nd ed. Prentice Hall, 2000. 可进一步阅读拓扑空间、拓扑基与度量拓扑部分。
- Stephen Willard. *General Topology*. Addison-Wesley, 1970. 适合进一步理解抽象空间与邻域语言。

本章解释、证明组织、例题与习题均为本项目原创表述；上述书目用于延伸学习。

---

[返回学习路线](../index.md){ .md-button }
[下一步：基础 A · 拓扑基与子基 →](../point-set/bases-subbases.md){ .md-button .md-button--primary }
