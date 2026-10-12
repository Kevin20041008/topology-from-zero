import {bridgeLoss, pairedBridgeLoss, segmentationPresets, maskTopology, diceScore} from './ai-topology-core.mjs';

const NS='http://www.w3.org/2000/svg';
function node(tag, attributes, text) {
  const el=document.createElementNS(NS,tag);
  for(const [k,v] of Object.entries(attributes)) el.setAttribute(k,v);
  if(text!==undefined) el.textContent=text;
  return el;
}
const fmt=x=>Number.isFinite(x)?Number(x.toPrecision(6)).toString():'∞';

function pathPicture(svg,values,bars) {
  svg.replaceChildren();
  const x=i=>40+i*320/(values.length-1);
  for(let i=1;i<values.length;i++) svg.append(node('line',{x1:x(i-1),y1:65,x2:x(i),y2:65,class:'shape-edge'}));
  values.forEach((v,i)=>{
    svg.append(node('circle',{cx:x(i),cy:65,r:10,class:'shape-point'}));
    svg.append(node('text',{x:x(i),y:38,'text-anchor':'middle'},`q${i}=${fmt(v)}`));
  });
  svg.append(node('text',{x:20,y:112},'H₀ 条形码（横轴 s，末端箭头表示 ∞）'));
  bars.forEach((bar,i)=>{
    const y=145+i*28;
    svg.append(node('line',{x1:40+320*bar.birth,y1:y,x2:40+320*(Number.isFinite(bar.death)?bar.death:1),y2:y,class:'shape-edge'}));
    svg.append(node('text',{x:40,y:y+20},`[${fmt(bar.birth)}, ${fmt(bar.death)})`));
    if(!Number.isFinite(bar.death)) svg.append(node('text',{x:365,y:y+5},'→'));
  });
}

function initLoss(lab) {
  const slider=lab.querySelector('input');
  function render() {
    const t=Number(slider.value), result=bridgeLoss(t);
    slider.setAttribute('aria-valuetext',fmt(t));
    lab.querySelector('[data-output]').textContent=`t=${fmt(t)}；s=0.5 时 β₀=${result.betti[0]}；硬损失=${result.hardLoss}；有限条寿命平方和 L=${fmt(result.loss)}；dL/dt=${fmt(result.gradient)}。本质条单独保留。`;
    pathPicture(lab.querySelector('svg'),[0,t,0],result.bars);
  }
  slider.addEventListener('input',render);
  for(const button of lab.querySelectorAll('[data-t]')) button.addEventListener('click',()=>{slider.value=button.dataset.t;render();});
  lab.querySelector('[data-step]').addEventListener('click',()=>{slider.value=Math.max(0,Number(slider.value)*0.8).toString();render();});
  render();
}

function maskPicture(svg,mask) {
  svg.replaceChildren();
  mask.forEach((row,r)=>row.forEach((value,c)=>svg.append(node('rect',{x:20+44*c,y:20+44*r,width:44,height:44,
    fill:value?'var(--md-typeset-a-color)':'var(--book-panel)',stroke:'var(--md-default-fg-color)', 'stroke-width':1}))));
}

function initSegmentation(lab) {
  const select=lab.querySelector('select'), presets=segmentationPresets();
  function render() {
    const name=select.value, target=['bridge','broken'].includes(name)?presets.bridge:presets.target;
    const prediction=presets[name], t=maskTopology(target), p=maskTopology(prediction), dice=diceScore(prediction,target);
    maskPicture(lab.querySelector('[data-target]'),target);
    maskPicture(lab.querySelector('[data-prediction]'),prediction);
    lab.querySelector('[data-output]').textContent=`真值：${t.pixels} 像素，(β₀,β₁)=(${t.betti})；预测：${p.pixels} 像素，(β₀,β₁)=(${p.betti})，χ=${p.euler}。Dice=${dice.numerator}/${dice.denominator}=${fmt(dice.value)}。`;
  }
  select.addEventListener('change',render);render();
}

function initDifferentiable(lab) {
  const inputs=[...lab.querySelectorAll('input')];
  function render() {
    const [a,b]=inputs.map(el=>Number(el.value)), result=pairedBridgeLoss(a,b);
    inputs.forEach(el=>el.setAttribute('aria-valuetext',fmt(Number(el.value))));
    const derivative=result.tie
      ?`a=b>0，不存在普通梯度。固定 b 时，a 的左导数=0，${a===1?'实平面公式延拓的右导数=2（域内不能向右扰动）':`右导数=${fmt(2*a)}`}；两分支梯度为 (${fmt(2*a)},0) 与 (0,${fmt(2*b)})。`
      :`梯度=(${result.gradient.map(fmt).join(',')})${a===0&&b===0?'；此处为非负参数域内的二次零点。':'；仅当前分支。'}`;
    lab.querySelector('[data-output]').textContent=`a=${fmt(a)}，b=${fmt(b)}；L=max(a,b)²=${fmt(result.loss)}。${derivative}`;
    pathPicture(lab.querySelector('svg'),[0,a,b,0],result.bars);
  }
  for(const input of inputs) input.addEventListener('input',render);
  lab.querySelector('[data-tie]').addEventListener('click',()=>{for(const input of inputs)input.value='0.5';render();});
  render();
}

for(const lab of document.querySelectorAll('[data-ai-lab]')) {
  ({loss:initLoss,segmentation:initSegmentation,differentiable:initDifferentiable})[lab.dataset.aiLab]?.(lab);
}
