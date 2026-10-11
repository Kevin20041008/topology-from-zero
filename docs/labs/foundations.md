# 基础实验台：映射、拓扑生成与度量公理

本实验对应 [PRE1](../preliminaries/sets-maps-relations.md)、[PRE2](../preliminaries/proofs-counterexamples.md)、[PRE3](../preliminaries/metric-spaces.md) 与[拓扑基](../point-set/bases-subbases.md)。先预测结果，再操作；屏幕上的有限验证不能代替无限对象的数学证明。

## 输入、输出与操作

<div class="lab" data-foundations-lab>
  <div class="lab-panel">
    <h3>1 · 像与逆像</h3>
    <label>映射 f : {a,b,c} → {a,b,c}
      <select data-mapping><option value="collapse">合并 a、b</option><option value="identity">恒等映射</option></select>
    </label>
    <p data-mapping-output role="status" aria-live="polite"></p>
  </div>
  <div class="lab-panel">
    <h3>2 · 从子集生成最小拓扑</h3>
    <p>全集 X={a,b,c}；空集和全集始终包含。选择其余生成集：</p>
    <fieldset><legend>生成集</legend>
      <label><input type="checkbox" data-generator value="1"> {a}</label>
      <label><input type="checkbox" data-generator value="2"> {b}</label>
      <label><input type="checkbox" data-generator value="3" checked> {a,b}</label>
      <label><input type="checkbox" data-generator value="4"> {c}</label>
      <label><input type="checkbox" data-generator value="5"> {a,c}</label>
      <label><input type="checkbox" data-generator value="6" checked> {b,c}</label>
    </fieldset>
    <p data-topology-output role="status" aria-live="polite"></p>
  </div>
  <div class="lab-panel">
    <h3>3 · 精确整数距离矩阵</h3>
    <label for="metric-matrix">JSON 方阵；点按 0,1,… 编号；最多8点，元素为0到1000000的整数</label>
    <textarea id="metric-matrix" data-metric-matrix rows="4" style="width:100%">[[0,1,3],[1,0,1],[3,1,0]]</textarea>
    <button type="button" class="md-button" data-check-metric>检查度量公理</button>
    <p data-metric-output role="status" aria-live="polite">默认输入含一个三角不等式反例；点击检查可见证据。</p>
    <label>球心编号 <input type="number" data-ball-center min="0" max="7" step="1" value="0"></label>
    <label>严格球半径 <input type="number" data-ball-radius min="1" max="1000000" step="1" value="3"></label>
    <button type="button" class="md-button" data-check-ball>计算开球</button>
    <p data-ball-output role="status" aria-live="polite">先使用一个度量或伪度量矩阵，再查看开球。</p>
  </div>
</div>

<noscript>本实验需JavaScript。默认映射像不保交；默认拓扑补入{b}后共5个开集；默认矩阵满足3&gt;1+1，因此不是度量。</noscript>

## 数学定义与算法正确性

**像与逆像。** 对有限映射枚举元素，像收集 $f(x)$，逆像收集满足 $f(x)\in B$ 的 $x$。集合通过编号的位表示，重复像自动合并；这与 PRE1 的存在量词定义逐元素一致。

**拓扑生成。** 从给定集合族加上 $\varnothing,X$ 开始，反复补二元并与二元交，直到不再增加。有限 $n$ 点集合只有 $2^n$ 个子集，故循环终止。终态对二元并交封闭，归纳得对有限并交封闭；任意子族在这个有限集合族中只有有限个不同成员，所以任意并也在其中。终态因此为拓扑。任何包含输入的拓扑都必须包含每一步补入的并交，归纳得终态包含于它，所以确为最小拓扑。

**度量检查。** 对角为零、对称、三角不等式逐项/逐对/逐三元组检查；最后检查不同点间严格正距离。如果仅最后一项失败则是伪度量（pseudometric），而不是含模糊容差的“近似度量”。三角检查为 $O(n^3)$，存储为 $O(n^2)$。空集合、单点、重复位置及非法输入均有测试。

## 可复现实例

1. 保持默认生成集 $\{a,b\},\{b,c\}$，缺失的交为 $\{b\}$；补全后得到 $\varnothing,\{b\},\{a,b\},\{b,c\},X$。
2. 改用 `[[0,1,2],[1,0,1],[2,1,0]]`，这是实线三点的距离，应该通过。
3. 改用 `[[0,0],[0,0]]`，两点距离零，应该报告伪度量。
4. 输入 `[]`，空度量空间允许；输入 `[[]]` 不是方阵，应拒绝。

## 验证范围与限制

整数上界使所有两项加法都在 JavaScript 安全整数范围内，因此实验中公理判断是精确的；不接受任意浮点距离，不用容差把正距离当作零。生成拓扑核心限至4点、UI固定3点；指数规模不适合推广为大型拓扑搜索工具。

`scripts/test_foundations.mjs` 穷举三点全集上的全部64个生成族，与独立枚举出的全部29个带标号拓扑求交作对照；也穷举有限映射的逆像运算，并检验距离矩阵的合法与退化情形。这个穷举范围与上面的终止/最小性证明应当分别理解。

延伸：[有限拓扑 Python Notebook](notebooks/01-finite-topology.ipynb)保留更便于修改的计算形式；较复杂的同调计算仍由既有Notebook承担。
