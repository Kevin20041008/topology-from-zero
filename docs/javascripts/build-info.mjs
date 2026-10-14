const target=document.querySelector('[data-build-info]');
if(target)fetch(new URL('../build-info.json',import.meta.url))
  .then(r=>{if(!r.ok)throw new Error('metadata unavailable');return r.json();})
  .then(info=>{target.textContent=`本页构建：${info.commit?.slice(0,7)??'来源未记录'}${info.dirty?' + 本地修改':''} · ${info.build_kind}。构建成功不代表数学审查完成。`;})
  .catch(()=>{target.textContent='构建标识暂不可用；请查版本与部署记录。';});
