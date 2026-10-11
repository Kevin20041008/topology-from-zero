# 符号与术语

| 符号或中文 | 英文 | 本书约定 |
| --- | --- | --- |
| $\mathcal P(X)$，幂集 | power set | $X$ 的全部子集 |
| $\tau$，拓扑 | topology | 指定哪些子集是开集的集合族 |
| 邻域 | neighborhood | 包含该点的某个开集的集合，本身未必开 |
| $f^{-1}(V)$，逆像 | preimage | 不要求 $f$ 可逆 |
| 同胚 | homeomorphism | 双射，且正反方向都连续 |
| 紧致 | compact | 每个开覆盖都有有限子覆盖 |
| $\mathbb F_2$，二元域 | binary field | 加法、乘法模 2 |
| $C_k$，链群 | chain group | 本版使用域系数，亦为向量空间 |
| $\partial_k$，边界算子 | boundary operator | 从 $k$ 链到 $(k-1)$ 链的线性映射 |
| $Z_k$，循环空间 | cycle space | $\ker\partial_k$ |
| $B_k$，边界空间 | boundary space | $\operatorname{im}\partial_{k+1}$ |
| $H_k$，同调 | homology | $Z_k/B_k$ |
| $\beta_k$，Betti 数 | Betti number | $\dim H_k$，依赖所选系数域 |
| 滤过 | filtration | 随尺度增长而嵌套的复形族 |
| $\mathcal B$，拓扑基 | basis | 覆盖全空间，交点处可细化；开集为基元素的任意并 |
| $\mathcal S$，子基 | subbasis | 先取有限交再取任意并；空交约定为 $X$ |
| $\overline A$，闭包 | closure | 每个开邻域都遇到 $A$ 的点组成的集合 |
| 连通、道路连通 | connected, path connected | 本书均允许空空间满足定义 |
| $I=[0,1]$ | unit interval | 同伦中的时间参数空间，使用通常拓扑 |
| $\simeq_{\partial I}$ | homotopy relative to endpoints | 整个变形过程中两个端点分别固定 |
| $\pi_1(X,x_0)$，基本群 | fundamental group | 基于 $x_0$ 的环路的端点固定同伦类 |
| $\alpha*\beta$，拼接 | concatenation | 先走 $\alpha$ 再走 $\beta$ |
| 可缩 | contractible | 非空空间的恒等映射同伦于常值映射 |
| $X/{\sim}$，商空间 | quotient space | 商集合配上“子集开当且仅当其逆像开”的拓扑 |
| 饱和 | saturated | 子集是完整等价类的并 |
| $Z/B$，线性商空间 | quotient vector space | $B$ 必须是 $Z$ 的子空间，元素是陪集 |
| 同伦等价 | homotopy equivalence | 两个方向连续映射的复合分别同伦于恒等映射 |
| 同调同构 | homology isomorphism | 必须说明次数、系数以及是否由指定空间映射诱导 |

若未另行说明，实数子集使用通常拓扑诱导的子空间拓扑；有限同调计算使用 $\mathbb F_2$。第一章的空集、全空间允许既开又闭。


## 研究生课程新增约定

| 符号 | 约定 |
| --- | --- |
| Hₙ(X;Z)、Hⁿ(X;G) | 整数同调与 G 系数上同调；系数不得默认互换 |
| ∂、δ | 链边界、上链余边界，分别降维与升维 |
| ∪、∩ 的上同调语境 | 正文用杯积与帽积的数学符号区分于集合并交 |
| πₙ(X,x₀) | 带基点高阶同伦群；n≥2 交换 |
| r、ε | 边长阈值与球半径，本站换算 r=2ε |
| TOP / PL / DIFF | 连续、分片线性、光滑范畴；不可任意互换 |
| 闭流形 | 紧且无边界，不只是某个环境中的闭子集 |
| degree / genus | 映射度 / 亏格；不同于多项式次数或矩阵秩 |

研究生正文中的引用定理不标为已证命题；各章规定的有限 CW、有限 PL、域系数等限制属于结论的一部分。
