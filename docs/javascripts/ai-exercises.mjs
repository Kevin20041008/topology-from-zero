export const aiExercises = {
  'ai-topological-loss': {
    question:'固定阈值下，硬 Betti 误差为何通常无法直接提供有用的反向传播梯度？',
    hints:['检查阈值复形在没有越过任何事件时是否变化。','整数值的 Betti 数在同一组合区域内固定，但越过事件可跳变。'],
    choices:[
      {text:'因为 Betti 数始终等于零',feedback:'非空空间通常有非零 β₀；困难来自损失随参数变化的方式。'},
      {text:'它通常分片常数，在事件处可能跳变',correct:true,feedback:'区域内导数为零，跳变处不连续；持续端点损失可以提供区域内梯度，但也有不可微位置。'},
      {text:'把阈值附近的短条删除就能得到正确梯度',feedback:'删除真实正条会改变数学对象；数值显示规则不能替代可微性分析。'}]
  },
  'ai-segmentation-topology': {
    question:'从同一 5×5 完整真值中，分别删去中心像素和边缘中点像素，哪个结论正确？',
    hints:['两个预测的前景面积和与真值的交集相同。','中心缺口被前景包围，边缘缺口与外部连通。'],
    choices:[
      {text:'Dice 都是 48/49，但 β₁ 分别为 1 和 0',correct:true,feedback:'在闭方块模型中，中心产生一个洞，边缘凹口不产生洞。相同 Dice 不能确定拓扑。'},
      {text:'Dice 相同，所以两个结果同胚',feedback:'Dice 只用交集和面积；此例连 Betti 数都不同。'},
      {text:'每删除一个像素就会产生一个洞',feedback:'删除边缘像素连向外部，不能把像素数差直接当作洞数。'}]
  },
  'ai-medical-topology': {
    question:'为血管分割设置“β₀=1、β₁=0”的先验前，最需要核实什么？',
    hints:['血管可有吻合环，也可能被扫描视野裁断。','先验的对象是中心线、管状实体还是截取区域？'],
    choices:[
      {text:'所有血管在任何视野中都是一棵树',feedback:'吻合环和边界裁剪会违反这一假设；不能无条件强加树先验。'},
      {text:'目标解剖、视野边界和离散模型是否支持该先验',correct:true,feedback:'先验要根据对象与标注范围确定；错误先验可能惩罚真实结构。'},
      {text:'只要 Dice 高就不必检查拓扑',feedback:'少量桥接或断裂像素可改变连通性，Dice 不能替代结构检查。'}]
  },
  'ai-higher-order-networks': {
    question:'对任意定向翻转 D，逐坐标激活 σ 满足 σ(Dx)=Dσ(x) 的充分必要条件是什么？',
    hints:['只需先检查一个坐标翻转符号。','比较 σ(−t) 与 −σ(t)。'],
    choices:[
      {text:'σ 是奇函数',correct:true,feedback:'逐坐标独立翻转将条件化为 σ(−t)=−σ(t)，包括 t=0。'},
      {text:'σ 必须是 ReLU',feedback:'ReLU(−1)=0，而 −ReLU(1)=−1，不满足定向符号等变。'},
      {text:'任意非线性函数都满足',feedback:'非线性本身不保证符号等变；还需明确偏置和特征的变换方式。'}]
  },
  'ai-point-cloud-learning': {
    question:'对应点移动至多 η，Rips 使用 d≤2ε 时，同一条边的出生尺度最多变化多少？',
    hints:['两端各移动至多 η，先对原始距离使用两次三角不等式。','出生值是距离的一半。'],
    choices:[
      {text:'η',correct:true,feedback:'距离差至多 2η，除以 2 得半径出生值差至多 η；需固定对应点和相同复形约定。'},
      {text:'2η，且无需核对尺度约定',feedback:'2η 是原始距离界；这里半径尺度必须再除以 2。'},
      {text:'完全不变',feedback:'刚体运动保距离，但一般逐点扰动可以改变距离和区间。'}]
  },
  'ai-differentiable-persistence': {
    question:'L(a,b)=max(a,b)² 在 a=b=0.5 时，固定 b 改变 a，会发生什么？',
    hints:['a<0.5 时最大值由 b 决定。','a>0.5 时损失是 a²，比较左右斜率。'],
    choices:[
      {text:'左导数 0、右导数 1，没有普通偏导数',correct:true,feedback:'中央差分或自动微分选支都不能消除两侧导数的不一致。'},
      {text:'中央差分约 0.5，所以普通偏导数就是 0.5',feedback:'对称差商可能收敛而左右差商不同；普通导数仍不存在。'},
      {text:'任何软件输出的梯度都是唯一数学梯度',feedback:'并列处实现采用约定的分支规则，必须与普通导数区分。'}]
  }
};
