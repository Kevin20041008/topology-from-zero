# Python Notebook：运行、复现与理论对应

Notebook承担可修改、可重复的计算；浏览器用于即时探索；一般定理用正文证明。按[运行指南](development.md)安装验证依赖，使用新内核“Restart Kernel and Run All”。四份Notebook本批均重新执行，原结果及源文件保留。

| 文件 | 理论接口 | 计算范围与复现入口 |
| --- | --- | --- |
| [01 有限拓扑](labs/notebooks/01-finite-topology.ipynb) | PRE1、PRE2、拓扑基与连续性 | 幂集、拓扑公理、全部开集逆像；Python标准库 |
| [02 模2同调](labs/notebooks/02-square-homology.ipynb) | 代数预备、第三章、K1 | 三角形/方环、边界平方零、Rips二维骨架；参数为边长r |
| [03 杯积](labs/notebooks/03-cohomology-cup-products.ipynb) | Q1–Q2 | 两复形相同Betti但不同杯积配对；整数边界先验证后模2 |
| [04 学习基线](labs/notebooks/04-topology-learning-baselines.ipynb) | R1–R2、A1–A2 | 固定种子96云，64/32训练测试；标准化只拟合训练；一次合成结果无一般优势结论 |

详细输入/输出、系数与预期结果仍在[原实验室页面](labs/index.md)，原下载URL及锚点保持。浏览器半径epsilon与Notebook02边长r满足r=2epsilon，比较结果前先换尺度。

```sh
python scripts/verify_notebooks.py
```

验证入口在临时目录、新内核执行每份源Notebook的副本，检查所有代码单元和断言，不覆盖用户结果。Notebook02的几何输入当前限固定教学案例；不能把它直接当作接收任意浮点输入的通用API。复杂整数SNF、真实AI数据复现仍见[建设状态](project/IMPLEMENTATION_STATUS.md)。
