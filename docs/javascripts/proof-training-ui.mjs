import {proofTraining} from './proof-training-bank.mjs';
import {PROOF_STORAGE_KEY,MAX_DRAFT_LENGTH,initialOrder,checkArrangement,moveStep,decodeDrafts,encodeDrafts} from './proof-training-core.mjs';

function element(tag, text, attrs = {}) {
  const el = document.createElement(tag);
  if (text !== undefined) el.textContent = text;
  for (const [key,value] of Object.entries(attrs)) el.setAttribute(key,value);
  return el;
}

for (const mount of document.querySelectorAll('[data-proof-training]')) {
  const task = proofTraining.find(t => t.id === mount.dataset.proofTraining);
  if (!task) continue;
  const wrapper = element('section',undefined,{'aria-label':`${task.code} 证明训练交互区`,class:'proof-training'});
  wrapper.append(element('h4','层 2 · 调整推理顺序并排除错误步骤'));
  wrapper.append(element('p','用上移/下移安排步骤，勾选应排除的错误步骤。反馈只核对这份证明的依赖；不同合法证明请写在层 3，不会被自动判错。'));
  let order = initialOrder(task);
  const excluded = new Set();
  const list = element('ol',undefined,{'data-proof-steps':''});
  const feedback = element('div','尚未检查。',{role:'status','aria-live':'polite','data-proof-feedback':''});
  function renderSteps(focusId, direction) {
    list.replaceChildren();
    for (const [position,id] of order.entries()) {
      const step=task.steps.find(s=>s.id===id);
      const li=element('li',undefined,{'data-step':id});
      li.append(element('p',step.text));
      const row=element('div',undefined,{class:'proof-controls'});
      for (const [delta,name] of [[-1,'上移'],[1,'下移']]) {
        const button=element('button',name,{type:'button','data-move':String(delta),'aria-label':`${name}步骤 ${id}`,class:'md-button'});
        button.disabled=(position===0 && delta===-1)||(position===order.length-1 && delta===1);
        button.addEventListener('click',()=>{order=moveStep(order,id,delta);feedback.textContent='顺序已改变，请重新检查。';renderSteps(id,delta);});
        row.append(button);
      }
      const label=element('label'),check=element('input',undefined,{type:'checkbox','aria-label':`排除步骤 ${id}`});
      check.checked=excluded.has(id);
      check.addEventListener('change',()=>{check.checked?excluded.add(id):excluded.delete(id);feedback.textContent='排除项已改变，请重新检查。';});
      label.append(check,document.createTextNode(' 排除此步骤'));row.append(label);li.append(row);list.append(li);
    }
    if(focusId) {
      const own=[...list.children].find(li=>li.dataset.step===focusId);
      const preferred=own.querySelector(`[data-move="${direction}"]`);
      (preferred.disabled?own.querySelector('button:not(:disabled)'):preferred)?.focus();
    }
  }
  const check=element('button','检查步骤与理由',{type:'button',class:'md-button'});
  check.addEventListener('click',()=>{
    const result=checkArrangement(task,order,[...excluded]);feedback.replaceChildren();
    if(result.ok)feedback.append(element('p','这组步骤的依赖关系与错误排除均符合本题。它不代表你已独立掌握证明；请继续完成层 3，并用量规自核。'));
    else {const issues=element('ul');for(const issue of result.errors)issues.append(element('li',issue.message));feedback.append(issues);}
  });
  const reset=element('button','恢复初始步骤',{type:'button',class:'md-button'});
  reset.addEventListener('click',()=>{order=initialOrder(task);excluded.clear();renderSteps();feedback.textContent='已恢复。层 3 草稿未改动。';});
  wrapper.append(list,check,document.createTextNode(' '),reset,feedback);
  renderSteps();

  wrapper.append(element('h4','层 3 · 独立写作区（不自动判真）'));
  wrapper.append(element('p',task.transfer));
  wrapper.append(element('p','默认只留在当前页面；只有按“保存本题到本机”才写入此浏览器存储。草稿不上传，也不参与学习进度评分。请不要填写姓名、联系方式或其他个人信息。共享设备上请勿保存。'));
  const label=element('label','你的独立证明',{for:`proof-draft-${task.id}`});
  const input=element('textarea',undefined,{id:`proof-draft-${task.id}`,rows:'9',maxlength:String(MAX_DRAFT_LENGTH),'data-proof-draft':'','aria-describedby':`proof-draft-note-${task.id}`});
  const note=element('p',`最多 ${MAX_DRAFT_LENGTH} 个字符。自核框只记录你的判断，系统不会评判文字。`,{id:`proof-draft-note-${task.id}`});
  const rubric=element('fieldset');rubric.append(element('legend','自核量规（自评，非自动评分）'));
  const checks=task.rubric.map((item,index)=>{
    const line=element('label'),box=element('input',undefined,{type:'checkbox','data-rubric':String(index)});
    line.append(box,document.createTextNode(' '+item));rubric.append(line);return box;
  });
  const status=element('p','当前草稿未保存。',{role:'status','aria-live':'polite','data-draft-status':''});
  try {
    const saved=decodeDrafts(localStorage.getItem(PROOF_STORAGE_KEY),proofTraining)[task.id];
    if(saved){input.value=saved.text;checks.forEach((box,i)=>{box.checked=saved.checks.includes(i);});status.textContent='已读取此前主动保存的本机草稿；未自动判真。';}
  }catch {status.textContent='本机存储不可用；仍可在本页写作，离开前请自行复制。';}
  const unsaved=()=>{status.textContent='当前改动尚未保存；没有自动评分或上传。';};
  input.addEventListener('input',unsaved);checks.forEach(box=>box.addEventListener('change',unsaved));
  const save=element('button','保存本题到本机',{type:'button',class:'md-button'});
  save.addEventListener('click',()=>{
    try {
      const all=decodeDrafts(localStorage.getItem(PROOF_STORAGE_KEY),proofTraining);
      all[task.id]={text:input.value,checks:checks.flatMap((box,i)=>box.checked?[i]:[])};
      localStorage.setItem(PROOF_STORAGE_KEY,encodeDrafts(all,proofTraining));
      status.textContent='已保存本题草稿与自核记录，仅限此浏览器；没有自动判真或上传。';
    }catch {status.textContent='保存失败：本机存储不可用。本页内容仍在，请自行复制。';}
  });
  const erase=element('button','删除本题本机记录',{type:'button',class:'md-button'});
  erase.addEventListener('click',()=>{
    try {
      const all=decodeDrafts(localStorage.getItem(PROOF_STORAGE_KEY),proofTraining);delete all[task.id];
      if(Object.keys(all).length)localStorage.setItem(PROOF_STORAGE_KEY,encodeDrafts(all,proofTraining));else localStorage.removeItem(PROOF_STORAGE_KEY);
      status.textContent='本题的已保存记录已删除；当前输入保留，离开页面后不会恢复。';
    }catch {status.textContent='删除失败：本机存储不可用，无法确认此前记录已删除。当前输入仍保留。';}
  });
  wrapper.append(label,input,note,rubric,save,document.createTextNode(' '),erase,status);
  mount.replaceChildren(wrapper);
}
