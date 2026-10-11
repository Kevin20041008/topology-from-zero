import {members, imageMask, preimageMask, topologyViolation, generatedTopology, integerMetricReport, integerOpenBall} from './foundations-core.mjs';

const root = document.querySelector('[data-foundations-lab]');
if (root) {
  const format = mask => '{' + members(3,mask).map(i=>'abc'[i]).join(', ') + '}';
  const checks = [...root.querySelectorAll('[data-generator]')];
  const topology = root.querySelector('[data-topology-output]');
  const update = () => {
    const input = [0,7,...checks.filter(x=>x.checked).map(x=>Number(x.value))];
    const failure = topologyViolation(3,input);
    const generated = generatedTopology(3,input);
    topology.textContent = failure
      ? `原集合族不是拓扑：${format(failure.a)} 与 ${format(failure.b)} 的${failure.kind==='union'?'并':'交'} ${format(failure.result)} 缺失。补全后的最小拓扑有 ${generated.length} 个开集：${generated.map(format).join('，')}。`
      : `原集合族已是拓扑，共 ${generated.length} 个开集：${generated.map(format).join('，')}。`;
  };
  checks.forEach(x=>x.addEventListener('change',update)); update();

  const mappingSelect=root.querySelector('[data-mapping]');
  const mappingOutput=root.querySelector('[data-mapping-output]');
  const mapUpdate=()=>{
    const mapping=mappingSelect.value==='collapse'?[0,0,1]:[0,1,2];
    const left=imageMask(mapping,3,1&2), right=imageMask(mapping,3,1)&imageMask(mapping,3,2);
    const pull=preimageMask(mapping,3,1);
    mappingOutput.textContent=`f(a)=${'abc'[mapping[0]]}，f(b)=${'abc'[mapping[1]]}，f(c)=${'abc'[mapping[2]]}。取 A={a}, B={b}：f(A∩B)=${format(left)}；f(A)∩f(B)=${format(right)}。${left===right?'本例相等。':'不相等：这是像不保交的反例。'} 逆像 f⁻¹({a})=${format(pull)}；它不要求 f 可逆。`;
  };
  mappingSelect.addEventListener('change',mapUpdate);mapUpdate();

  const matrixInput=root.querySelector('[data-metric-matrix]');
  const report=root.querySelector('[data-metric-output]');
  const ballOutput=root.querySelector('[data-ball-output]');
  matrixInput.addEventListener('input',()=>{
    report.textContent='输入已改变，请重新检查度量公理。';
    ballOutput.textContent='输入已改变，请重新计算开球。';
  });
  for(const input of root.querySelectorAll('[data-ball-center], [data-ball-radius]')) {
    input.addEventListener('input',()=>{ballOutput.textContent='球心或半径已改变，请重新计算开球。';});
  }
  root.querySelector('[data-check-metric]').addEventListener('click',()=>{
    try {
      const matrix=JSON.parse(matrixInput.value), result=integerMetricReport(matrix);
      const {i,j,k}=result;
      const messages={metric:'这是度量（空集时公理按空真成立）。',
        pseudometric:`这是伪度量，但不是度量：不同点 ${i},${j} 的距离为 0。`,
        diagonal:`不满足对角线为零：d(${i},${i}) 非零。`,
        symmetry:`不满足对称性：d(${i},${j}) 与反方向不同。`,
        triangle:`违反三角不等式：d(${i},${j}) > d(${i},${k}) + d(${k},${j})。`};
      report.textContent=messages[result.kind];
    } catch(error) {report.textContent=`输入未参与计算：${error instanceof SyntaxError?'请输入有效 JSON 方阵。':error.message}`;}
  });
  root.querySelector('[data-check-ball]').addEventListener('click',()=>{
    const output=root.querySelector('[data-ball-output]');
    try {
      const center=Number(root.querySelector('[data-ball-center]').value);
      const radius=Number(root.querySelector('[data-ball-radius]').value);
      const vertices=integerOpenBall(JSON.parse(matrixInput.value),center,radius);
      output.textContent=`B(${center},${radius})={${vertices.join(', ')}}；边界 d=r 不包含在内。`;
    } catch(error) {output.textContent=`未计算开球：${error instanceof SyntaxError?'请输入有效 JSON 方阵。':error.message}`;}
  });
}
