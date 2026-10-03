export const STORAGE_KEY='pitt-prelim-study-v1';
export const emptyProgress=()=>({schemaVersion:1,problems:{},cards:{},lessons:{}});
export function validateProgress(value,ids){
  if(!value||value.schemaVersion!==1)throw Error('This is not a version 1 study-progress file.');
  const result=emptyProgress();
  for(const [id,p] of Object.entries(value.problems||{})){
    if(!ids.problems.has(id)||!p||typeof p!=='object')continue;
    result.problems[id]={status:['new','attempted','review','mastered'].includes(p.status)?p.status:'new',bookmark:p.bookmark===true,notes:typeof p.notes==='string'?p.notes.slice(0,50000):'',hints:Number.isInteger(p.hints)?Math.max(0,Math.min(10,p.hints)):0};
  }
  for(const [id,c] of Object.entries(value.cards||{})){
    if(!ids.cards.has(id)||!c||typeof c!=='object')continue;
    if(!Number.isFinite(c.due)||c.due<0||c.due>8640000000000000)continue;
    result.cards[id]={due:c.due,interval:Number.isFinite(c.interval)?Math.max(0,Math.min(365,c.interval)):0,reviews:Number.isInteger(c.reviews)?Math.max(0,Math.min(1000000,c.reviews)):0};
  }
  for(const [id,v] of Object.entries(value.lessons||{}))if(ids.lessons.has(id)&&v===true)result.lessons[id]=true;
  return result;
}
export function scheduleCard(previous,rating,now=Date.now()){
  if(!['again','hard','good','easy'].includes(rating))throw Error('Unknown card rating.');
  const old=previous?.interval||0;
  const interval=rating==='again'?1/1440:rating==='hard'?Math.max(1,old*1.2):rating==='good'?Math.max(3,old*2):Math.max(7,old*2.5);
  return {due:now+Math.min(365,interval)*86400000,interval:Math.min(365,interval),reviews:(previous?.reviews||0)+1};
}
