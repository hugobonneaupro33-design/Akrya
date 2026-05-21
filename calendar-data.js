// ============================================================
// CALENDAR-DATA.JS — Akrya v3
// Calendrier AniList temps réel + fallback Jikan
// ============================================================
const ALIST='https://graphql.anilist.co';
const JIKAN='https://api.jikan.moe/v4';
const CPROXY='https://corsproxy.io/?url=';
const DAYS_FR=['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'];
const MONTHS_FR=['janv','févr','mars','avr','mai','juin','juil','août','sept','oct','nov','déc'];
let calWeekOffset=0,calLoading=false;

function weekRange(off=0){
  const now=new Date();now.setDate(now.getDate()+off*7);
  const dow=now.getDay(),diff=dow===0?6:dow-1;
  const mon=new Date(now);mon.setDate(now.getDate()-diff);mon.setHours(0,0,0,0);
  const sun=new Date(mon);sun.setDate(mon.getDate()+6);sun.setHours(23,59,59,999);
  return{mon,sun,start:Math.floor(mon/1000),end:Math.floor(sun/1000)};
}

const CAL_Q=`query($s:Int,$e:Int,$p:Int){Page(page:$p,perPage:50){pageInfo{hasNextPage}airingSchedules(airingAt_greater:$s,airingAt_lesser:$e,sort:TIME){airingAt episode media{id title{romaji english}coverImage{medium}averageScore status}}}}`;

async function fetchCalSched(s,e){
  const all=[];
  for(let p=1;p<=3;p++){
    try{
      const body=JSON.stringify({query:CAL_Q,variables:{s,e,p}});
      let r;
      try{r=await fetch(ALIST,{method:'POST',headers:{'Content-Type':'application/json'},body,signal:AbortSignal.timeout(10000)});}
      catch(_){r=await fetch(CPROXY+encodeURIComponent(ALIST),{method:'POST',headers:{'Content-Type':'application/json'},body,signal:AbortSignal.timeout(14000)});}
      if(!r.ok)break;
      const d=await r.json();const pg=d?.data?.Page;if(!pg)break;
      all.push(...(pg.airingSchedules||[]));if(!pg.pageInfo?.hasNextPage)break;
    }catch(_){break;}
  }
  return all;
}

async function loadCalendar(off=0){
  if(calLoading)return;calLoading=true;calWeekOffset=off;
  const{mon,sun,start,end}=weekRange(off);

  const tEl=document.getElementById('calendarTitle')||document.getElementById('calTitle');
  if(tEl)tEl.textContent=`📅 ${mon.getDate()} ${MONTHS_FR[mon.getMonth()]} – ${sun.getDate()} ${MONTHS_FR[sun.getMonth()]} ${sun.getFullYear()}`;

  const hEl=document.getElementById('weekDays')||document.getElementById('calDaysHdr');
  if(hEl){
    hEl.innerHTML=Array.from({length:7},(_,i)=>{
      const d=new Date(mon);d.setDate(mon.getDate()+i);
      const isToday=d.toDateString()===new Date().toDateString();
      return`<div class="calendar-day-hdr${isToday?' today':''}" style="${isToday?'color:var(--primary-light);font-weight:800;':''}">${DAYS_FR[i]}<div class="cal-day-date">${d.getDate()} ${MONTHS_FR[d.getMonth()]}</div></div>`;
    }).join('');
  }

  const gEl=document.getElementById('calendarGrid')||document.getElementById('calGrid');
  if(gEl)gEl.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--text-muted)">⏳ Chargement du planning…</div>';

  try{
    const scheds=await fetchCalSched(start,end);
    const byDay=Array.from({length:7},()=>[]);
    scheds.forEach(s=>{if(!s.airingAt)return;const d=new Date(s.airingAt*1000);let dow=d.getDay()-1;if(dow<0)dow=6;byDay[dow].push(s);});
    const today=new Date().toDateString();

    if(!gEl){calLoading=false;return;}
    gEl.innerHTML=Array.from({length:7},(_,i)=>{
      const eps=byDay[i];const dayDate=new Date(mon);dayDate.setDate(mon.getDate()+i);
      const isToday=dayDate.toDateString()===today;
      return`<div class="calendar-day" style="${isToday?'background:color-mix(in srgb,var(--primary) 6%,var(--bg-hover));border-left:2px solid var(--primary);':''}">`+
        (eps.length?eps.map(s=>{
          const title=s.media?.title?.romaji||s.media?.title?.english||'?';
          const sc=s.media?.averageScore?(s.media.averageScore/10).toFixed(1):null;
          const t=new Date(s.airingAt*1000);
          const hh=String(t.getHours()).padStart(2,'0'),mm=String(t.getMinutes()).padStart(2,'0');
          const short=title.length>20?title.slice(0,18)+'…':title;
          return`<div class="calendar-episode" onclick="location.href='detail.html?id=${s.media?.id}&type=anime'">
            <strong class="cal-ep-title">${short}</strong>
            <small class="cal-ep-info">Ép.${s.episode} · ${hh}:${mm}${sc?` · ⭐${sc}`:''}</small>
          </div>`;
        }).join(''):
        '<div class="calendar-empty">Aucune sortie</div>')+
        `</div>`;
    }).join('');
  }catch(e){
    if(gEl)gEl.innerHTML=`<div style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--primary)">❌ Erreur calendrier<br><small>${e.message}</small></div>`;
  }finally{calLoading=false;}
}

function prevWeek(){loadCalendar(calWeekOffset-1);}
function nextWeek(){loadCalendar(calWeekOffset+1);}
function currentWeek(){loadCalendar(0);}
window.loadCalendar=loadCalendar;window.prevWeek=prevWeek;window.nextWeek=nextWeek;window.currentWeek=currentWeek;
window.Calendar={loadCalendar,prevWeek,nextWeek,currentWeek};
console.log('✅ calendar-data.js Akrya v3');
