// A fresh server manifest must never relabel a stale HTML document.
const target=document.querySelector('[data-build-info]');
if(target){
  const meta=name=>document.querySelector(`meta[name="topology-${name}"]`)?.content;
  const commit=meta('build-commit'),digest=meta('inventory-sha256'),dirty=meta('build-dirty');
  const original=target.textContent;
  fetch(new URL('../build-info.json',import.meta.url),{cache:'no-cache'})
    .then(r=>{if(!r.ok)throw new Error('metadata unavailable');return r.json();})
    .then(info=>{
      if(info.commit!==commit||info.inventory_sha256!==digest||String(info.dirty)!==dirty){
        target.dataset.versionMismatch='true';
        target.textContent=`${original} 版本不一致：站点清单与本页 HTML 不属于同一构建，请刷新后核查版本记录。`;
      }else target.dataset.versionMismatch='false';
    })
    .catch(()=>{target.textContent=`${original} 暂无法与站点清单核对。`;});
}
