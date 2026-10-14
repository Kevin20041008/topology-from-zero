import {STORAGE_KEY, decodeProgress, setCompleted, routeProgress, assess} from './learning-core.mjs';

const rootURL = new URL('../', import.meta.url);
const urlFor = path => new URL(path.replace(/\.md$/, '/'), rootURL).href;
const element = (tag,text,attrs={}) => {
  const el=document.createElement(tag);if(text!==undefined)el.textContent=text;
  for(const [name,value] of Object.entries(attrs))el.setAttribute(name,value);return el;
};

async function init() {
  const response=await fetch(new URL('assets/learning-paths.json',rootURL));
  if(!response.ok)throw new Error('Learning routes unavailable');
  const {routes}=await response.json();
  const codes=[...new Set(routes.flatMap(r=>r.lessons.map(l=>l.code)))];
  let raw=null, persistent=true;
  try {raw=localStorage.getItem(STORAGE_KEY);}catch {persistent=false;}
  let state=decodeProgress(raw,codes,routes.map(r=>r.id));
  const mount=document.querySelector('[data-learning-route]');
  if(mount)state.route=mount.dataset.learningRoute;
  const route=routes.find(r=>r.id===state.route);
  const save=()=>{try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}catch{persistent=false;}};
  if(mount)save();
  if(!route)return;
  const current=route.lessons.find(l=>new URL(urlFor(l.path)).pathname===location.pathname);
  const progress=element('p','',{role:'status','aria-live':'polite','data-route-progress':''});
  const update=()=>{const p=routeProgress(route,state);progress.textContent=`自评进度：${p.completed}/${p.total} 课。${persistent?'仅保存在本浏览器。':'存储不可用，本页临时记录。'}完成勾选不代表掌握或通过数学审查。`;};
  if(mount) {
    mount.replaceChildren(progress);
    const list=element('ol');
    for(const lesson of route.lessons) {
      const li=element('li'),label=element('label'),input=element('input',undefined,{type:'checkbox','data-lesson':lesson.code,'aria-label':`已完成 ${lesson.code}（自评）`});
      input.checked=state.completed.includes(lesson.code);
      input.addEventListener('change',()=>{state=setCompleted(state,lesson.code,input.checked);save();update();});
      label.append(input,document.createTextNode(' 已完成（自评） '));li.append(label,element('a',lesson.title,{href:urlFor(lesson.path)}));list.append(li);
    }
    mount.append(list);
    const reset=element('button','清除此路线的完成记录',{type:'button',class:'md-button'});
    reset.addEventListener('click',()=>{const own=new Set(route.lessons.map(l=>l.code));state.completed=state.completed.filter(c=>!own.has(c));save();for(const el of mount.querySelectorAll('input'))el.checked=false;update();});
    mount.append(reset);
    mount.append(element('p','完成记录按章节共享；清除此路线也会影响其他路线中的相同章节。多个标签页不实时同步。'));
  }
  if(current) {
    const index=route.lessons.indexOf(current),bar=element('aside',undefined,{class:'chapter-meta','aria-label':'当前学习路线','data-route-bar':''});
    bar.append(element('a',route.title,{href:urlFor(`start/${route.slug}.md`)}),progress);
    const label=element('label'),check=element('input',undefined,{type:'checkbox','aria-label':'已完成本课（自评）'});
    check.checked=state.completed.includes(current.code);
    check.addEventListener('change',()=>{state=setCompleted(state,current.code,check.checked);save();update();});
    label.append(check,document.createTextNode(' 已完成本课（自评）'));bar.append(label,element('br'));
    if(index>0)bar.append(element('a',`← 上一课：${route.lessons[index-1].title}`,{href:urlFor(route.lessons[index-1].path)}));
    bar.append(document.createTextNode(' '));
    bar.append(element('a',index+1<route.lessons.length?`下一课：${route.lessons[index+1].title} →`:'进入阶段项目 →',{href:index+1<route.lessons.length?urlFor(route.lessons[index+1].path):urlFor(`start/${route.slug}.md`)+'#project'}));
    document.querySelector('article h1')?.after(bar);
  }
  // Route pages and their lessons start with the chosen route; full navigation
  // remains reachable, and other sections are never hidden.
  if(current||mount) {
    const standard=document.querySelector('.md-sidebar--primary .md-nav--primary');
    if(standard) {
      const nav=element('nav',undefined,{'aria-label':'路线章节',class:'route-sidebar'});
      nav.append(element('a',route.title,{href:urlFor(`start/${route.slug}.md`)}));
      const list=element('ol');for(const l of route.lessons){const li=element('li'),a=element('a',l.title,{href:urlFor(l.path)});if(l===current)a.setAttribute('aria-current','page');li.append(a);list.append(li);}nav.append(list);
      const toggle=element('button','显示完整课程导航',{type:'button','aria-expanded':'false',class:'md-button'});
      standard.hidden=true;standard.id='full-course-navigation';toggle.setAttribute('aria-controls',standard.id);
      toggle.addEventListener('click',()=>{standard.hidden=!standard.hidden;toggle.setAttribute('aria-expanded',String(!standard.hidden));toggle.textContent=standard.hidden?'显示完整课程导航':'收起完整课程导航';});
      nav.append(toggle);standard.before(nav);
    }
  }
  const quiz=document.querySelector('[data-route-assessment]');
  if(quiz) {
    const form=element('form'),groups=[];
    for(const [i,q] of route.questions.entries()) {
      const fs=element('fieldset');fs.append(element('legend',q.question));
      const inputs=q.options.map((option,j)=>{const label=element('label'),input=element('input',undefined,{type:'radio',name:`route-question-${i}`,value:String(j)});label.append(input,document.createTextNode(option));fs.append(label,element('br'));return input;});groups.push(inputs);form.append(fs);
    }
    const submit=element('button','检查先修知识',{type:'submit',class:'md-button'}),feedback=element('div','',{role:'status','aria-live':'polite','data-assessment-feedback':''});
    form.append(submit,feedback);form.addEventListener('submit',event=>{event.preventDefault();const results=assess(route.questions,groups.map(g=>{const index=g.findIndex(x=>x.checked);return index<0?null:index;}));feedback.replaceChildren();results.forEach((r,i)=>feedback.append(element('p',`${i+1}. ${!r.answered?'尚未作答':r.correct?'正确':'需回看先修'}：${r.explanation}`)));});quiz.replaceChildren(form);
  }
  update();
}
init().catch(()=>{for(const mount of document.querySelectorAll('[data-learning-route]'))mount.textContent='进度组件暂不可用；下方静态课表、链接与题目仍可使用。';});
