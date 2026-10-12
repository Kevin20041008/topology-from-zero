# AI 拓扑实验：损失、分割与可微边界

三个确定性小模型分别对应 [A3](../ai/topological-loss.md)、[A4](../ai/segmentation-topology.md)、[A8](../ai/differentiable-persistence.md)。它们不训练真实神经网络，也不使用患者数据；目的在于让损失值、拓扑计算与导数的含义可以逐项核对。系数一律为 $\mathbb F_2$。

## 实验 A3：硬 Betti 损失与持续寿命损失 {#loss}

将前景概率记为 $p_i$，令 $q_i=1-p_i$。固定三个顶点构成的路径，输入 $q=(0,t,0)$，顶点在 $q_i$ 时进入滤过，边在两个端点值的最大值时进入。横轴 $s$ 对应保留 $p_i\ge1-s$ 的子水平复形。中点 $t$ 越低，两端越早连通。

<div class="lab lab-panel" data-ai-lab="loss">
  <label>中间顶点值 t <input aria-label="中间顶点值 t" type="range" min="0" max="1" step="any" value="0.8"></label>
  <div class="lab-actions">
    <button class="md-button" type="button" data-t="0">t=0</button>
    <button class="md-button" type="button" data-t="0.5">t=0.5（阈值事件）</button>
    <button class="md-button" type="button" data-t="1">t=1</button>
    <button class="md-button" type="button" data-step>沿解析梯度走一步</button>
  </div>
  <p data-output role="status" aria-live="polite"></p>
  <svg viewBox="0 0 400 225" role="img" aria-label="三顶点路径和零维持续条形码"></svg>
</div>

当 $t>0$ 时，有限正条为 $[0,t)$，另有一条本质条 $[0,\infty)$；$t=0$ 时只有本质条。固定 $s=1/2$，硬损失 $(\beta_0-1)^2$ 在 $t\le1/2$ 时为零，在 $t>1/2$ 时为一。寿命损失则为 $L=t^2$，$dL/dt=2t$；按钮使用步长 $0.1$，即 $t\leftarrow0.8t$。这一步是对独立标量 $t$ 的解析更新；神经网络参数还需乘上 $\partial t/\partial\theta$，并考虑其他损失项。

**限制。** 本质条不裁剪、不进入这个有限条损失。它只压制多余分支的存在时间；没有承诺保留空间位置、孔洞或真实解剖。核心保留全部正寿命条，显示小数只影响文字。

## 实验 A4：相同 Dice，不同孔洞和连通分支 {#segmentation}

每个前景像素解释为**包含边和角点的闭单位方块**。角接触会使前景连通（8 邻接）；背景洞计数对应补上外框后的 4 邻接。这里直接构造方块的三角剖分，以精确模 2 边界矩阵计算同调，并输出 $\chi=V-E+F$。

<div class="lab lab-panel" data-ai-lab="segmentation">
  <label>选择预测掩膜
    <select aria-label="选择预测掩膜">
      <option value="hole">删除中心像素：产生孔洞</option>
      <option value="notch">删除边缘像素：没有孔洞</option>
      <option value="target">完整方块：与真值相同</option>
      <option value="broken">删除窄桥：分支断开</option>
      <option value="bridge">窄桥真值：保持连通</option>
      <option value="empty">全空预测</option>
    </select>
  </label>
  <div class="lab-body">
    <div><p>真值</p><svg data-target viewBox="0 0 260 260" role="img" aria-label="真值二值像素方块"></svg></div>
    <div><p>预测</p><svg data-prediction viewBox="0 0 260 260" role="img" aria-label="预测二值像素方块"></svg></div>
  </div>
  <p data-output role="status" aria-live="polite"></p>
</div>

真值完整 $5\times5$ 方块有 25 个像素。删除中心像素与删除上边缘中点均剩 24 个像素，交集均为 24，因而 Dice 完全相同：$48/49$。两者的 Betti 数分别为 $(1,1)$ 与 $(1,0)$。窄桥案例切换为 13 像素的专用真值；删除桥后为 12 像素、Dice $24/25$，但 $\beta_0$ 从 1 变为 2。不要把不同真值下的 Dice 当成同一组预测的排名。

**限制。** 二维的 $\beta_1$ 是孔洞数；三维还有空腔 $\beta_2$。数值相同不意味着同胚或解剖结构正确。全空与全空的 Dice 在本实现约定为 1，并明确标识此约定；只有一方空时为 0。

## 实验 A8：进入反向传播的端点与不可微位置 {#differentiable}

四顶点路径取 $q=(0,a,b,0)$。两端首次连通的尺度是 $\max(a,b)$；若最大值为正，唯一有限正条为 $[0,\max(a,b))$。观察 $L=\max(a,b)^2$ 的梯度如何随负责合并的顶点切换。

<div class="lab lab-panel" data-ai-lab="differentiable">
  <label>顶点值 a <input aria-label="顶点值 a" type="range" min="0" max="1" step="0.05" value="0.7"></label>
  <label>顶点值 b <input aria-label="顶点值 b" type="range" min="0" max="1" step="0.05" value="0.4"></label>
  <button class="md-button" type="button" data-tie>设置 a=b=0.5</button>
  <p data-output role="status" aria-live="polite"></p>
  <svg viewBox="0 0 400 225" role="img" aria-label="四顶点路径和零维持续条形码"></svg>
</div>

在 $a>b$ 上梯度为 $(2a,0)$，在 $b>a$ 上为 $(0,2b)$。在 $a=b=c\in(0,1)$，固定 $b$ 改变 $a$ 的左导数是 0、右导数是 $2c$，因此没有普通梯度。在 $(1,1)$，右侧扰动超出本实验定义域，界面明确将右导数标为实平面公式延拓的导数。软件选择一个并列最大值只能给出一种分支规则；它不把函数变得可微。中央差分在内部并列点会给出约 $c$，也不是普通导数的存在性证明。$(0,0)$ 是特殊的二次零点，在非负参数域内有零的一阶近似。

## 可复现方法与验证范围

- 路径实验直接调用既有持续边界约化核心，包含短正区间、全零和并列事件回归；没有使用寿命容差。
- 像素方块逐个加入所有面，再按固定对角线分成两个三角形；相邻方块共享实际顶点编号。所得空间与闭方块之并相同。边界矩阵在 $\mathbb F_2$ 上精确消元。
- 自动化测试将全部 512 个 $3\times3$ 掩膜与独立的前景 8 邻接/背景 4 邻接算法对照，并检查边界平方为零、Euler 等式和指定 Dice 分数；GUDHI 独立对照另外记录。
- 导数测试在选定的二进制精确可表示步长和光滑分支上使用严格差商等式；拓扑和区间端点断言不采用容差。不把分支上的差分通过外推为并列点可微。
- 寿命平方和仍是 binary64 计算：极小正寿命的平方可能下溢为零。此时区间仍保留，损失数值不能作为“没有同调类”的判据；实际优化需另行选择尺度与精度。

本页的有限计算支持指定实例，不能代替 A3/A4/A8 的证明，也不构成训练收益或临床效能证据。更多结构化学习见 [A6](../ai/higher-order-networks.md)，点云和现有 Notebook 路线见 [A7](../ai/point-cloud-learning.md)。

<noscript>需要 JavaScript 才能拖动参数。所有默认输入、预期 Betti 数、损失公式和限制已在正文写明，可不运行脚本独立验算。</noscript>
