# H3 · 八题完整解答

[返回 胞腔同调与系数变换正文](../algebraic/homology/cellular-coefficients.md)。先独立作答，再检查每一步的对象、假设与引用输入。本页解答延续正文的证明边界；空间模型比较或对偶的外引不能因答案给出而消失。

## 1. 改变系数

整数乘六单射，故 $H_1=0,H_0=\mathbb Z/6$。在 $\mathbb F_2$ 上乘六为零，核、余核均为 $\mathbb F_2$。在 $\mathbb F_5$ 上乘六是恒等，核、余核均零。其余次数链群为零，所以同调也为零。

## 2. Euler 计数

胞腔数给 $1-2+1=0$，同调自由秩给 $1-2+1=0$。一般有限链在 $\mathbb Q$ 上满足 $\dim C_n=\dim B_n+b_n+\dim B_{n-1}$；交错求和时每个边界项出现两次且符号相反，故链计数与 Betti 计数一致。整数自由秩等于张量 $\mathbb Q$ 后维数，见第8题。

## 3. 球面乘积

$S^2$ 的有理同调在 $0,2$ 次各为 $\mathbb Q$，$S^1$ 在 $0,1$ 次各为 $\mathbb Q$。使用本章外引的空间 Künneth，非零张量对是 $(0,0),(0,1),(2,0),(2,1)$，故次数 $0,1,2,3$ 各一维，其他次数零。H3.3 证明了有限链计算；它本身不替代奇异链的 Eilenberg–Zilber 比较。

## 4. 两循环群的 Tor

按定义求乘 $m$ 在 $\mathbb Z/r$ 的核。令 $m=dm',r=dr'$，$\gcd(m',r')=1$，则 $r\mid mx$ 等价于 $r'\mid x$。核由 $[r']$ 生成，该元素阶为 $d$，因此核同构于 $\mathbb Z/d$，包括 $d=1$ 时的零群。

## 5. 系数自然性

$C_1\otimes G\cong G$，$d=6$ 在 $G=\mathbb Z/6,\mathbb Z/3$ 上均零，所以 $H_1=G$。表示 $H_0(C)=\mathbb Z/6$ 用 $\mathbb Z\xrightarrow{6}\mathbb Z$，Tor 同样是 $G[6]=G$，$\beta$ 在这两个表示下为恒等。系数同态在循环系数与 Tor 核上均为约化映射，故方块逐元素交换；两列左端 $H_1(C)\otimes G$ 均零。

## 6. 无自然分裂

任一群同态截面由 $s(1)$ 决定。$\beta s(1)=1$ 强迫 $s(1)\in\{e,e+u\}$。$f$ 在 Tor 端为恒等，自然性就要求 $f s(1)=s(1)$；但两候选被互换，无一固定。若存在适用于全部有限自由链的自然分裂，限制到这条链及其自同构便产生矛盾。

## 7. 张量收缩

对 $x\in H'_p$ 有 $dx=0$，故 $dS(x\otimes y)=(-1)^p(-1)^p x\otimes d_Ds_Dy$，$Sd(x\otimes y)=(-1)^p(-1)^p x\otimes s_Dd_Dy$。两项之和为 $x\otimes y$。若省掉收缩中的符号，结果变成 $(-1)^p x\otimes y$，奇数 $p$ 时在特征不为二的域上不等于恒等。

## 8. 有理化丢失挠子

CT1 给每个 $H_j(C)$ 为有限个 $\mathbb Z$ 与 $\mathbb Z/m$ 的直和。自由项 Tor 为零；$\mathbb Q[m]=0$，故所有循环项与 $\mathbb Q$ 的 Tor 为零。H3.2 遂使 $\alpha$ 成为自然同构。又 $(\mathbb Z/m)\otimes\mathbb Q=\mathbb Q/m\mathbb Q=0$，所以有理化只保留自由秩；例如零群与 $\mathbb Z/2$ 均有理化为零。
