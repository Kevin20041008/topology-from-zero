import {liftPath,projectTurn,loopSamples} from './covering-core.mjs';
const root=document.querySelector('[data-covering-lab]');
if(root){
  let samples=[0],sheet=0,dragging=false;
  const circle=root.querySelector('[data-cover-circle]'),graph=root.querySelector('[data-cover-graph]');
  const out=root.querySelector('[data-cover-output]'),error=root.querySelector('[data-cover-error]');
  const xy=u=>[150+105*Math.cos(2*Math.PI*u),150-105*Math.sin(2*Math.PI*u)];
  const ns='http://www.w3.org/2000/svg';
  function svg(parent,tag,attrs,text){const el=document.createElementNS(ns,tag);for(const [k,v]of Object.entries(attrs))el.setAttribute(k,v);if(text)el.textContent=text;parent.append(el);return el;}
  function render(){
    const {lift,closed,winding}=liftPath(samples,sheet);
    circle.replaceChildren();graph.replaceChildren();
    svg(circle,'circle',{cx:150,cy:150,r:105,fill:'none',stroke:'currentColor','stroke-width':2});
    const coords=[];
    for(let i=1;i<lift.length;i++)for(let j=0;j<=8;j++)coords.push(xy(lift[i-1]+(lift[i]-lift[i-1])*j/8).join(','));
    svg(circle,'polyline',{points:coords.join(' '),fill:'none',stroke:'#ad501f','stroke-width':5,opacity:.7});
    const [x,y]=xy(lift.at(-1));
    svg(circle,'circle',{cx:255,cy:150,r:5,fill:'currentColor'});
    svg(circle,'circle',{cx:x,cy:y,r:9,fill:'#ad501f'});
    svg(circle,'text',{x:150,y:150,'text-anchor':'middle',fill:'currentColor'},'p(u) = exp(2πiu)');
    svg(circle,'text',{x:150,y:175,'text-anchor':'middle',fill:'currentColor'},'右侧为起点 0');
    const lo=Math.min(...lift)-.5,hi=Math.max(...lift)+.5;
    const gy=u=>210-180*(u-lo)/(hi-lo),gx=i=>40+320*i/Math.max(1,lift.length-1);
    for(let k=Math.ceil(lo);k<=Math.floor(hi);k++){
      svg(graph,'line',{x1:40,x2:360,y1:gy(k),y2:gy(k),stroke:'currentColor',opacity:.25});
      svg(graph,'text',{x:32,y:gy(k)+4,'text-anchor':'end',fill:'currentColor'},String(k));
    }
    svg(graph,'polyline',{points:lift.map((v,i)=>`${gx(i)},${gy(v)}`).join(' '),fill:'none',stroke:'#ad501f','stroke-width':3});
    svg(graph,'text',{x:200,y:245,'text-anchor':'middle',fill:'currentColor'},'采样段参数 t →');
    out.textContent=`初始提升 ${sheet}；终点提升 ${lift.at(-1).toPrecision(6)}；${closed?`闭合路径，绕数 ${winding}`:'路径未闭合，绕数未定义'}。共 ${samples.length-1} 段。`;
  }
  function update(next){try{liftPath(next,sheet);samples=next;error.textContent='';render();}catch(e){error.textContent=e.message;}}
  function append(s){if(samples.length>=2001){error.textContent='已达到 2000 段教学上限，请重置。';return;}if(s!==samples.at(-1))update([...samples,s]);}
  function appendTurn(u){try{append(projectTurn(u));}catch(e){error.textContent=e.message;}}
  for(const button of root.querySelectorAll('[data-cover-preset]'))button.addEventListener('click',()=>update(loopSamples(Number(button.dataset.coverPreset))));
  for(const button of root.querySelectorAll('[data-cover-step]'))button.addEventListener('click',()=>appendTurn(samples.at(-1)+Number(button.dataset.coverStep)));
  root.querySelector('[data-cover-close]').addEventListener('click',()=>append(0));
  root.querySelector('[data-cover-reset]').addEventListener('click',()=>update([0]));
  root.querySelector('[data-cover-sheet]').addEventListener('change',event=>{
    const next=Number(event.target.value);
    try{liftPath(samples,next);sheet=next;error.textContent='';render();}
    catch(e){event.target.value=String(sheet);error.textContent=e.message;}
  });
  circle.addEventListener('keydown',event=>{if(['ArrowRight','ArrowLeft'].includes(event.key)){event.preventDefault();appendTurn(samples.at(-1)+(event.key==='ArrowRight'?1:-1)/8);}});
  function sample(event){
    const rect=circle.getBoundingClientRect(),x=event.clientX-rect.left-rect.width/2,y=rect.top+rect.height/2-event.clientY;
    if(Math.hypot(x,y)<rect.width*.08)return;
    appendTurn(Math.atan2(y,x)/(2*Math.PI));
  }
  circle.addEventListener('pointerdown',event=>{dragging=true;circle.setPointerCapture(event.pointerId);sample(event);});
  circle.addEventListener('pointermove',event=>{if(dragging)sample(event);});
  circle.addEventListener('pointerup',()=>{dragging=false;});
  circle.addEventListener('pointercancel',()=>{dragging=false;});
  render();
}
