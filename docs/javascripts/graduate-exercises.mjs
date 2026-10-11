// Original chapter self-checks; no learner data leaves the page.
export const graduateExercises = {
  "ai-features-learning": {
    "question": "持续端点对坐标是否处处光滑？",
    "hints": [
      "最大边和配对都可能切换。",
      "点重合时距离函数也有特殊性。"
    ],
    "choices": [
      {
        "text": "处处光滑",
        "feedback": "对称事件和退化点给出障碍。"
      },
      {
        "text": "只在满足相应条件的固定组合区域内可保证",
        "feedback": "正确；本章逐项列出条件。",
        "correct": true
      },
      {
        "text": "有自动微分就能证明",
        "feedback": "自动微分输出不是数学证明。"
      }
    ]
  },
  "ai-evaluation-protocol": {
    "question": "持续特征与几何基线在测试集准确率相同，应如何表述？",
    "hints": [
      "只报告得到的证据。",
      "合成小实验不支持普遍优势。"
    ],
    "choices": [
      {
        "text": "拓扑必然更好",
        "feedback": "没有数据支持该断言。"
      },
      {
        "text": "本次实验未显示准确率优势",
        "feedback": "正确；还应同时报告成本与适用范围。",
        "correct": true
      },
      {
        "text": "删掉基线结果",
        "feedback": "会破坏比较的完整性。"
      }
    ]
  },
  "algebraic-fundamental-group-functor-basepoint": {
    "question": "同伦 f≃g 没有固定基点时，应如何比较诱导同态？",
    "hints": [
      "观察同伦中基点走出的道路。",
      "两个诱导同态的目标基点甚至可能不同。"
    ],
    "choices": [
      {
        "text": "总有 f*=g* 且无需说明",
        "feedback": "目标群基点不同，不能直接写同一个等式。"
      },
      {
        "text": "用基点轨迹给出的变换比较",
        "feedback": "方形边界论证给出 f*=c#∘g*。",
        "correct": true
      },
      {
        "text": "它们完全没有关系",
        "feedback": "同伦仍给出受基点轨迹控制的精确关系。"
      }
    ]
  },
  "algebraic-covering-lifting-circle": {
    "question": "以 0 为起点提升圆周环路后，什么记录其同伦类？",
    "hints": [
      "提升终点必须落在整数纤维。",
      "拼接让这些整数相加。"
    ],
    "choices": [
      {
        "text": "提升曲线的长度",
        "feedback": "长度受参数化和几何影响，不是这里的同伦类判据。"
      },
      {
        "text": "提升终点的整数",
        "feedback": "绕数给 π₁(S¹) 到整数群的同构。",
        "correct": true
      },
      {
        "text": "绘图采样点数量",
        "feedback": "采样数量不决定拓扑类。"
      }
    ]
  },
  "algebraic-covering-classification": {
    "question": "覆盖分类中去掉基点会怎样？",
    "hints": [
      "纤维中另一点由一条道路连接。",
      "基点变换会引入共轭。"
    ],
    "choices": [
      {
        "text": "子群改为共轭类",
        "feedback": "正确；正规性不是一般分类的前提。",
        "correct": true
      },
      {
        "text": "所有子群都必须正规",
        "feedback": "正规只刻画正规覆盖。"
      },
      {
        "text": "所有覆盖变成万有覆盖",
        "feedback": "万有覆盖对应平凡子群。"
      }
    ]
  },
  "algebraic-fundamental-group-van-kampen": {
    "question": "两个开集都可缩，能直接断定其并单连通吗？",
    "hints": [
      "检查 van Kampen 的全部假设。",
      "圆周可以用两个长开弧覆盖。"
    ],
    "choices": [
      {
        "text": "总能",
        "feedback": "圆周给反例。"
      },
      {
        "text": "还需处理交集道路连通等假设",
        "feedback": "正确；交集不连通时要用群胚版本或其他论证。",
        "correct": true
      },
      {
        "text": "只要交集非空就能",
        "feedback": "非空不能替代道路连通。"
      }
    ]
  },
  "algebraic-homology-singular-chains": {
    "question": "连通但不道路连通的空间，H₀ 必为整数群吗？",
    "hints": [
      "零链边界由道路的两个端点构成。",
      "回忆闭拓扑学正弦曲线。"
    ],
    "choices": [
      {
        "text": "必然",
        "feedback": "连通不足以保证只有一个道路分支。"
      },
      {
        "text": "不必，它检测道路分支",
        "feedback": "正确；这里系数为整数。",
        "correct": true
      },
      {
        "text": "H₀ 总是零",
        "feedback": "非空空间的非约化 H₀ 不为零。"
      }
    ]
  },
  "algebraic-homology-exact-excision": {
    "question": "切除要求闭包 Z 位于 A 的哪里？",
    "hints": [
      "被删掉的区域不能碰到相对边界。",
      "比较区间端点的反例。"
    ],
    "choices": [
      {
        "text": "A 的内部",
        "feedback": "正确；这是本章切除定理的充分条件。",
        "correct": true
      },
      {
        "text": "任意 A 中即可",
        "feedback": "只包含于 A 不足，端点反例说明问题。"
      },
      {
        "text": "X 的任意位置",
        "feedback": "会改变相对链的信息。"
      }
    ]
  },
  "algebraic-homology-cellular-coefficients": {
    "question": "RP² 的二阶整数同调为零，模 2 二阶同调呢？",
    "hints": [
      "整数胞腔边界是乘 2。",
      "在模 2 系数中重新计算核。"
    ],
    "choices": [
      {
        "text": "仍为零",
        "feedback": "系数变化可改变核。"
      },
      {
        "text": "是一维",
        "feedback": "正确；这是系数效应，不是计算误差。",
        "correct": true
      },
      {
        "text": "无法定义",
        "feedback": "任何阿贝尔系数都可以定义。"
      }
    ]
  },
  "algebraic-cohomology-cochains-products": {
    "question": "同调群逐维同构能否保证同伦等价？",
    "hints": [
      "比较环面和两个圆与一个球面的楔和。",
      "检查一阶杯积。"
    ],
    "choices": [
      {
        "text": "能",
        "feedback": "群列表遗漏乘法信息。"
      },
      {
        "text": "不能，上同调环还可能不同",
        "feedback": "正确；杯积给出具体障碍。",
        "correct": true
      },
      {
        "text": "只有 Betti 数相同就能",
        "feedback": "Betti 数遗漏的信息更多。"
      }
    ]
  },
  "algebraic-cohomology-duality": {
    "question": "普通整数 Poincaré 对偶可以直接用于哪个空间？",
    "hints": [
      "检查闭、定向、有限 PL 三个条件。",
      "有边界时需要相对同调。"
    ],
    "choices": [
      {
        "text": "闭定向环面",
        "feedback": "满足本章全部条件。",
        "correct": true
      },
      {
        "text": "开直线",
        "feedback": "非紧；需要紧支撑版本。"
      },
      {
        "text": "实射影平面",
        "feedback": "不可定向；整数系数须引入定向局部系统。"
      }
    ]
  },
  "algebraic-graduate-tools": {
    "question": "谱序列稳定页给出两层 Z/2，能唯一确定总群吗？",
    "hints": [
      "稳定页是关联分次。",
      "比较阶为四的两个阿贝尔群。"
    ],
    "choices": [
      {
        "text": "能，必为直和",
        "feedback": "非平凡扩张给 Z/4。"
      },
      {
        "text": "不能，还可能有扩张问题",
        "feedback": "正确；两种群均有这样的过滤商。",
        "correct": true
      },
      {
        "text": "能，必为 Z/4",
        "feedback": "分裂扩张也可能发生。"
      }
    ]
  },
  "computational-boundary-algorithms": {
    "question": "二维 Rips 骨架足以正确计算完整 Rips 的哪些群？",
    "hints": [
      "H₁ 只使用 D₁ 和 D₂。",
      "H₂ 还会被三维单形边界改变。"
    ],
    "choices": [
      {
        "text": "H₀ 与 H₁",
        "feedback": "正确；这是本站浏览器算法的范围。",
        "correct": true
      },
      {
        "text": "所有维数",
        "feedback": "高维需要更高维单形。"
      },
      {
        "text": "只有 H₀",
        "feedback": "H₁ 同样完全由二维骨架决定。"
      }
    ]
  },
  "persistence-modules-reduction": {
    "question": "寿命为 5×10⁻¹¹ 的真实条应如何处理？",
    "hints": [
      "它有非空的存活尺度区间。",
      "区分显示格式与核心计算。"
    ],
    "choices": [
      {
        "text": "在核心计算保留",
        "feedback": "正确；可以缩略标签，不能删去数学对象。",
        "correct": true
      },
      {
        "text": "按 10⁻¹⁰ 容差删除",
        "feedback": "会改变 Betti 数，正是 P0 回归禁止的行为。"
      },
      {
        "text": "把出生强制舍入到零",
        "feedback": "会改变过滤和事件时间。"
      }
    ]
  },
  "persistence-stability": {
    "question": "每点位移 ≤δ，本站半径参数的交错界是多少？",
    "hints": [
      "距离变化最多 2δ。",
      "边出现条件是距离 ≤2ε。"
    ],
    "choices": [
      {
        "text": "δ",
        "feedback": "正确；半径参数将边长误差除以二。",
        "correct": true
      },
      {
        "text": "2δ 且不能更小",
        "feedback": "这是边长参数下的自然界。"
      },
      {
        "text": "与输入无关的 10⁻¹⁰",
        "feedback": "固定显示容差不是稳定性界。"
      }
    ]
  },
  "differential-manifolds-rank": {
    "question": "单射浸入何时能由本章命题保证为嵌入？",
    "hints": [
      "浸入是局部微分条件。",
      "还要控制像上的拓扑。"
    ],
    "choices": [
      {
        "text": "定义域紧、目标 Hausdorff",
        "feedback": "紧到 Hausdorff 的同胚判据补足拓扑条件。",
        "correct": true
      },
      {
        "text": "只要导数非零",
        "feedback": "无理绕环面给反例。"
      },
      {
        "text": "只要画面没有明显交叉",
        "feedback": "图像采样不能判定嵌入。"
      }
    ]
  },
  "differential-transversality-degree": {
    "question": "正则值的逆像为空时，该值还算正则值吗？",
    "hints": [
      "定义对逆像每一点量化。",
      "空集上的全称命题成立。"
    ],
    "choices": [
      {
        "text": "不算",
        "feedback": "定义并不要求逆像非空。"
      },
      {
        "text": "算；计数公式给零",
        "feedback": "正确；可用于证明非零度映射满射。",
        "correct": true
      },
      {
        "text": "必须修改正则值定义",
        "feedback": "无需修改。"
      }
    ]
  },
  "differential-forms-derham": {
    "question": "Stokes 已证明积分是上链映射，是否已经证明 de Rham 同构？",
    "hints": [
      "链映射未必诱导同构。",
      "还需证明同调层面的单射和满射。"
    ],
    "choices": [
      {
        "text": "已经证明",
        "feedback": "缺少单射与满射步骤。"
      },
      {
        "text": "还没有，需要全局比较论证",
        "feedback": "正确；本章明确引用这部分深结果。",
        "correct": true
      },
      {
        "text": "de Rham 定理不成立",
        "feedback": "定理成立，区别在证明范围。"
      }
    ]
  },
  "differential-morse-handles": {
    "question": "Morse 临界点数 cᵢ 必等于 Betti 数 bᵢ 吗？",
    "hints": [
      "胞腔微分可能非零。",
      "使用 bᵢ=cᵢ−rᵢ−rᵢ₊₁。"
    ],
    "choices": [
      {
        "text": "必相等",
        "feedback": "只有相关微分秩为零时相等。"
      },
      {
        "text": "只保证 bᵢ≤cᵢ",
        "feedback": "正确；附加的胞腔可能消去已有同调。",
        "correct": true
      },
      {
        "text": "总有 bᵢ≥cᵢ",
        "feedback": "不等号方向相反。"
      }
    ]
  },
  "differential-bundles-characteristic": {
    "question": "一个复线丛有处处非零截面，说明什么？",
    "hints": [
      "线丛每根纤维是一维。",
      "用截面作为基。"
    ],
    "choices": [
      {
        "text": "它平凡",
        "feedback": "正确；截面给全局丛同构。",
        "correct": true
      },
      {
        "text": "只能说明局部平凡",
        "feedback": "局部平凡本来就是定义，非零截面给更多信息。"
      },
      {
        "text": "其绕数一定非零",
        "feedback": "在球面分类中平凡丛绕数为零。"
      }
    ]
  },
  "geometric-categories-triangulations": {
    "question": "把接缝顶点坐标重合，却保留不同编号，会改变抽象复形吗？",
    "hints": [
      "边界矩阵依赖顶点编号与面关系。",
      "坐标只用于几何实现或渲染。"
    ],
    "choices": [
      {
        "text": "会，自动形成莫比乌斯带",
        "feedback": "几何重合不自动形成商复形。"
      },
      {
        "text": "不会，必须明确识别编号和面",
        "feedback": "正确；这也是已有网格测试的意义。",
        "correct": true
      },
      {
        "text": "只要着色连续就可以",
        "feedback": "着色不决定复形关联。"
      }
    ]
  },
  "geometric-surfaces": {
    "question": "圆柱与莫比乌斯带的关系是什么？",
    "hints": [
      "它们都可收缩到中心圆周。",
      "检查边界分支和定向性。"
    ],
    "choices": [
      {
        "text": "同胚",
        "feedback": "边界分支数不同。"
      },
      {
        "text": "同伦等价但不同胚",
        "feedback": "正确；中心圆周给同伦等价。",
        "correct": true
      },
      {
        "text": "只要同调相同就同胚",
        "feedback": "同调不能决定同胚。"
      }
    ]
  },
  "geometric-knots": {
    "question": "三叶结和平凡结的一阶同调相同，如何在本章区分？",
    "hints": [
      "一阶同调只看基本群阿贝尔化。",
      "三叶结群满射到 S₃。"
    ],
    "choices": [
      {
        "text": "用结群的非交换性",
        "feedback": "正确；平凡结群为交换的整数群。",
        "correct": true
      },
      {
        "text": "仅比较曲线长度",
        "feedback": "长度不是环境同痕不变量。"
      },
      {
        "text": "它们因此必等价",
        "feedback": "相同同调不足以分类结。"
      }
    ]
  },
  "geometric-three-manifolds-surgery": {
    "question": "Dehn 填充在基本群中对经线斜率施加什么？",
    "hints": [
      "新实体环面的经线界定一个盘。",
      "关系必须在整个群中取正规闭包。"
    ],
    "choices": [
      {
        "text": "把对应环路设为单位元",
        "feedback": "正确；van Kampen 给正规闭包商。",
        "correct": true
      },
      {
        "text": "只删除一个集合元素",
        "feedback": "商群需要正规子群。"
      },
      {
        "text": "使所有环路都交换",
        "feedback": "填充不普遍导致交换群。"
      }
    ]
  },
  "point-set-closure-nets": {
    "question": "一般拓扑空间中，什么可以刻画闭包？",
    "hints": [
      "数列的索引集只有可数个位置。",
      "按反向包含排列一个点的全部邻域。"
    ],
    "choices": [
      {
        "text": "总能只用数列",
        "feedback": "第一可数性缺失时，数列判据可能失败。"
      },
      {
        "text": "总能用取值于集合中的收敛网",
        "feedback": "邻域索引网给出闭包中的每一点；反向由收敛定义立即得到。",
        "correct": true
      },
      {
        "text": "只需集合里的常值网",
        "feedback": "常值网无法在 Hausdorff 空间中发现集合外的新闭包点。"
      }
    ]
  },
  "point-set-separation-countability": {
    "question": "下列哪项在一般空间中成立？",
    "hints": [
      "区分每点的邻域基与全空间的拓扑基。",
      "从可数基的每个非空成员选一点。"
    ],
    "choices": [
      {
        "text": "可分必然第二可数",
        "feedback": "Sorgenfrey 直线是反例。"
      },
      {
        "text": "第一可数必然第二可数",
        "feedback": "不可数离散空间是反例。"
      },
      {
        "text": "第二可数必然可分",
        "feedback": "所选可数点集遇到每个非空开集，故稠密。",
        "correct": true
      }
    ]
  },
  "point-set-products-sums": {
    "question": "在积拓扑的一个基本开集中，可以独立限制多少个坐标？",
    "hints": [
      "子基生成时只做有限交。",
      "不要与箱拓扑混淆。"
    ],
    "choices": [
      {
        "text": "只能一个",
        "feedback": "有限交可以同时限制多个坐标。"
      },
      {
        "text": "有限多个",
        "feedback": "有限支撑正是积拓扑基本开集的条件。",
        "correct": true
      },
      {
        "text": "必须所有坐标都受限制",
        "feedback": "无限个非平凡限制给出的是一般箱开集，未必积开。"
      }
    ]
  },
  "point-set-compactness-metric": {
    "question": "一般度量空间中，紧致的正确判据是哪一个？",
    "hints": [
      "有界集合可能容纳无限多个固定距离分开的点。",
      "还要保证 Cauchy 数列没有缺失的极限。"
    ],
    "choices": [
      {
        "text": "完备且有界",
        "feedback": "无限离散度量是反例。"
      },
      {
        "text": "完备且全有界",
        "feedback": "P4.3 证明了这与紧致等价。",
        "correct": true
      },
      {
        "text": "仅序列有界",
        "feedback": "有界性本身不保证紧致或完备。"
      }
    ]
  },
  "point-set-filters-tychonoff": {
    "question": "Tychonoff 定理对哪一种无限积拓扑成立？",
    "hints": [
      "证明中只需要对有限多个坐标邻域取交。",
      "滤子不要求对无限交封闭。"
    ],
    "choices": [
      {
        "text": "任意箱拓扑",
        "feedback": "箱积的对角闭离散子空间给出反例。"
      },
      {
        "text": "积拓扑",
        "feedback": "有限支撑让超滤子的有限交封闭性足够使用。",
        "correct": true
      },
      {
        "text": "只有可数积的积拓扑",
        "feedback": "在明确的选择原则下，指标集不必可数。"
      }
    ]
  },
  "point-set-local-compactness": {
    "question": "非紧致 Hausdorff 空间的一点紧化要保持 Hausdorff 性，本章采用什么充分条件？",
    "hints": [
      "需要把原空间一点和新增的无穷远点分开。",
      "寻找一个紧致闭包的开邻域。"
    ],
    "choices": [
      {
        "text": "局部紧致",
        "feedback": "紧邻域及其补提供所需分离。",
        "correct": true
      },
      {
        "text": "仅可分",
        "feedback": "有理数可分却缺少本章所需紧邻域。"
      },
      {
        "text": "仅第一可数",
        "feedback": "有理数第一可数但不是局部紧致。"
      }
    ]
  },
  "point-set-metrization-extension": {
    "question": "有界 Tietze 延拓中，为什么要求定义域子集闭？",
    "hints": [
      "考虑在零点无限振荡的函数。",
      "有界不意味着缺失端点处存在极限。"
    ],
    "choices": [
      {
        "text": "为了让子集有限",
        "feedback": "闭集可以无限，甚至不可数。"
      },
      {
        "text": "保证可在环境中分离构造使用的闭集",
        "feedback": "子集中的闭水平集由此也是环境闭集，可使用正规性。",
        "correct": true
      },
      {
        "text": "闭性只是记号约定",
        "feedback": "去掉闭性，sin(1/x) 给出有界连续但无法延拓的例子。"
      }
    ]
  },
  "point-set-completion-baire": {
    "question": "压缩映射在非空空间中一定有不动点吗？",
    "hints": [
      "检查 x↦x/2 在 (0,1) 上的行为。",
      "定理使用 Cauchy 极限必须留在空间内。"
    ],
    "choices": [
      {
        "text": "只要连续就够",
        "feedback": "连续映射甚至可能完全没有不动点。"
      },
      {
        "text": "还需要定理中的完备性",
        "feedback": "完备性使压缩迭代的极限成为空间内的不动点。",
        "correct": true
      },
      {
        "text": "需要空间有限",
        "feedback": "完备空间可以无限；有限性不是必要条件。"
      }
    ]
  },
  "point-set-local-properties-partitions": {
    "question": "单位分解为什么要求局部有限，而不只要求每点有限个非零值？",
    "hints": [
      "函数连续性是邻域条件。",
      "考虑越来越窄但峰高不变的尖峰趋向零点。"
    ],
    "choices": [
      {
        "text": "局部有限保证总和在邻域内是有限个连续函数之和",
        "feedback": "这正是连续性证明需要的条件。",
        "correct": true
      },
      {
        "text": "局部有限保证空间只有有限点",
        "feedback": "欧氏空间上的单位分解通常含无穷多个函数。"
      },
      {
        "text": "两种条件完全等价",
        "feedback": "尖峰反例说明逐点有限不足以推出连续。"
      }
    ]
  },
  "point-set-function-spaces": {
    "question": "Arzelà–Ascoli 中，一致有界还需搭配什么条件？",
    "hints": [
      "需要控制所有函数在小邻域内的共同振幅。",
      "x 的 n 次方在 1 附近越来越陡。"
    ],
    "choices": [
      {
        "text": "逐个函数连续就足够",
        "feedback": "x^n 是反例：每个函数连续，但族不相对紧致。"
      },
      {
        "text": "等度连续",
        "feedback": "等度连续与一致有界给出一致距离下的全有界性。",
        "correct": true
      },
      {
        "text": "每个函数取不同值",
        "feedback": "函数值彼此不同与所需紧致性无关。"
      }
    ]
  }
};
