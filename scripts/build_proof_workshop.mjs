import {readFileSync,writeFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import {proofTraining} from '../docs/javascripts/proof-training-bank.mjs';

export function renderWorkshop(tasks=proofTraining) {
  const sections=[`# 路线 A · 三级证明训练

<div class="chapter-meta">状态：Reviewed（非编写模型数学内容复核），待人类审阅<br>八章各一组训练与一项新迁移证明。步骤反馈检验给定材料的依赖，不评价自由证明，不声称形式化验证。</div>

## 如何使用

1. **层 1：理解。** 先遮住核对说明，用自己的话写出目标、量词顺序和关键假设；再展开说明，检查自己是否改变了命题。
2. **层 2：补理由。** 交互区可排列给定步骤、排除错误步骤。系统接受符合依赖关系的不同顺序；通过只表示这份材料组织正确。无 JavaScript 时可在纸上排列下方步骤，并为每一步补理由。
3. **层 3：独立证明。** 先完成新的迁移题，再逐条检查量规，最后展开完整论证。支持手写或本页输入；不把自由文字与参考答案作字符串匹配，不给自动“证明正确”判定。

保存草稿是可选的，只有主动按保存才写入本浏览器；不上传、不收集姓名、不自动计时或采集研究数据。默认关闭页面即丢失未保存输入。共享设备建议用纸笔，保存后也应主动删除。多个标签页不自动同步，同题同时保存时后写覆盖先写。

完整任务、提示、量规、参考答案均以静态正文提供，关闭脚本仍可学习。只有本页交互排序和可选草稿保存需要 JavaScript。实际学习效果尚未经受试者研究验证；研究准备见[学习者试用方案](../project/LEARNER_STUDY.md)。

| 章节 | 训练入口 | 新迁移任务 |
|---|---|---|
${tasks.map(t=>`| [${t.code}](../${t.chapter}) | [${t.title}](#${t.id}) | ${t.transfer} |`).join('\n')}
`];
  for(const task of tasks) {
    sections.push(`## ${task.code} · ${task.title} {#${task.id}}

[回到对应章节](../${task.chapter})。**先修：**${task.prerequisites}

### 层 1 · 先写目标、量词与假设

**待证命题。**${task.target}

先回答：证明结束时应得到什么？先固定哪个任意对象，后选择哪个见证？哪条假设会在何处用到？若集合或指标为空，如何处理？

??? info "核对目标、量词与假设"
${task.analysis.map(([name,text])=>`    - **${name}：**${text}`).join('\n')}

### 层 2 · 排序、排错并补上理由

交互组件下方保留同一组静态材料。步骤的字母只是标识；请说明每一步依赖什么，再排成证明。可交换的独立方向不强制唯一顺序。

<div data-proof-training="${task.id}"></div>
<noscript>交互区未启用；请用以下静态步骤纸笔作答，迁移题与完整答案不受影响。</noscript>

${[...task.steps].reverse().map(s=>`- **步骤 ${s.id}：**${s.text}`).join('\n')}

??? tip "逐步理由与错误反馈"
${task.steps.map(s=>`    - **${s.id}：**${s.invalid?`应排除。${s.invalid}`:`${s.reason}${s.needs.length?` 在此组织中先用步骤 ${s.needs.join('、')}。`:' 这一方向可以先开始。'}`}`).join('\n')}

**缺假设或错误推断的具体反例：**${task.counterexample}

### 层 3 · 新迁移证明（独立作答）

**任务。**${task.transfer}

在纸上或上方写作区写出连贯论证。暂不看完整答案；可以明确记下自己尚不能证明的步骤。参考论证不是唯一合法写法，新的证明路径应交给同学或教师逐步核查。

??? tip "提示 1"
    ${task.hints[0]}

??? tip "提示 2"
    ${task.hints[1]}

**自核量规（只用于自评）：**

${task.rubric.map(item=>`- ${item}`).join('\n')}

??? success "完整论证与边界情况（先独立作答）"
${task.solution.map(text=>`    ${text}`).join('\n\n')}

**回顾。**记录你从引导证明迁移了哪一种方法，以及新题中多了什么证明责任。排列正确不替代这项说明；看过答案后的改写也应如实标为借助答案。

**参考定位。**${task.reference} 本题表述、推导组织与反馈为原创；没有声称逐页核查原书。
`);
  }
  return sections.join('\n').trimEnd()+'\n';
}

const target=new URL('../docs/exercises/proof-workshop.md',import.meta.url);
if(process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href) {
  const result=renderWorkshop();
  if(process.argv.includes('--check')) {
    if(readFileSync(target,'utf8').replaceAll('\r\n','\n')!==result)throw new Error('proof-workshop.md differs from the proof training bank; regenerate it');
    console.log('Proof workshop matches its bank.');
  }else{writeFileSync(target,result);console.log('Wrote docs/exercises/proof-workshop.md');}
}
