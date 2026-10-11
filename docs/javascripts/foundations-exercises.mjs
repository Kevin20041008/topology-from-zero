export const foundationsExercises = {
  pre1: {
    question:'f 把 a、b 都映为 y。A={a}, B={b}。关于像与逆像，哪句话正确？',
    hints:['分别计算 A∩B 与两个像的交。','逆像由逐个元素是否映入集合来判定，不需要反函数。'],
    choices:[
      {text:'像总保持交，所以两个结果都是空集',feedback:'f(A)=f(B)={y}，它们的交非空；但 f(A∩B) 为空。'},
      {text:'像不总保交；逆像保交且不要求双射',correct:true,feedback:'像可能把不同的见证合并；逆像的两个条件由同一个 x 同时满足，所以保交。'},
      {text:'没有反函数就不能谈逆像',feedback:'逆像是满足 f(x)∈S 的全部 x 的集合，它不同于反函数，任何映射都可定义。'}
    ]
  },
  pre2:{
    question:'“对每个 ε>0，都存在 N，使所有 n≥N 满足 |xₙ|<ε”的否定是什么？',
    hints:['从外向内依次否定量词：∀变∃，∃变∀。','失败须有同一个正 ε，使每个尾部都出现距离至少 ε 的项。'],
    choices:[
      {text:'存在 ε>0，使每个 N 都有某个 n≥N 满足 |xₙ|≥ε',correct:true,feedback:'这给出固定误差与任意晚的失败项，正好否定原收敛条件。'},
      {text:'存在一个 n 使 |xₙ|>0',feedback:'有限个早期偏差不妨碍收敛；甚至 1/n 的每项都非零仍趋于零。'},
      {text:'对每个 ε>0，每个 n 都满足 |xₙ|≥ε',feedback:'这远强于不收敛。取 (−1)ⁿ，它不趋零，但不满足 ε=2 的这句话。'}
    ]
  },
  pre3:{
    question:'R 上 d(x,y)=|x−y| 与 ρ(x,y)=|arctan x−arctan y| 诱导相同拓扑。能推出什么？',
    hints:['同一拓扑决定开集和连续性；Cauchy 条件还涉及全空间统一的距离尺度。','序列 xₙ=n 在 ρ 下是 Cauchy，在通常距离下不是。'],
    choices:[
      {text:'同一拓扑必然有相同的完备性',feedback:'通常实数度量完备，但 arctan 将 R 等距映到有界开区间，后者不完备。'},
      {text:'每条序列在两种度量下的 Cauchy 性都相同',feedback:'xₙ=n 的 arctan 值趋近 π/2，故在 ρ 下 Cauchy，却在 d 下不满足 Cauchy 条件。'},
      {text:'开集与收敛极限相同，但完备性可能不同',correct:true,feedback:'拓扑决定趋向空间内某点的收敛；Cauchy 性不预先指定空间内极限，不能仅由拓扑决定。'}
    ]
  }
};
