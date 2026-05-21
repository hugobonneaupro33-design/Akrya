<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <meta name="theme-color" content="#e94560">
  <title>Détail — Akrya</title>
  <link rel="icon" type="image/svg+xml" href="favicon.svg">
  <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
  <style>
:root{
  --primary:#e94560;--primary-dark:#c72e48;--primary-light:#ff6b8b;
  --bg:#0a0a0f;--bg-card:#13131f;--bg-hover:#1e1e2e;--bg-input:#16162a;
  --text:#f0f0f0;--text-muted:#8888aa;--border:#252540;
  --radius:16px;--radius-sm:8px;--transition:all .3s ease;
  --shadow:0 8px 24px rgba(0,0,0,.4);--shadow-card:0 12px 32px rgba(233,69,96,.18);
}
body.light-theme{--bg:#f0f0f5;--bg-card:#fff;--bg-hover:#e4e4f0;--text:#1a1a2e;--text-muted:#666688;--border:#d0d0e0;}
body.t-manga  {--primary:#8b5cf6;--primary-dark:#6d3fd4;--primary-light:#a78bfa;--shadow-card:0 12px 32px rgba(139,92,246,.18);}
body.t-webtoon{--primary:#14b8a6;--primary-dark:#0d9488;--primary-light:#2dd4bf;--shadow-card:0 12px 32px rgba(20,184,166,.18);}

*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{font-family:'Segoe UI',system-ui,sans-serif;background:var(--bg);color:var(--text);min-height:100vh;transition:background .3s,color .3s;}
::-webkit-scrollbar{width:6px;}::-webkit-scrollbar-track{background:var(--bg-card);}::-webkit-scrollbar-thumb{background:var(--primary);border-radius:3px;}

/* HEADER */
header{background:linear-gradient(135deg,#08080f,#12121e);padding:1rem 2rem;position:sticky;top:0;z-index:100;border-bottom:1px solid var(--border);}
body.light-theme header{background:linear-gradient(135deg,#e8e8f0,#f5f5ff);}
.hdr{display:flex;align-items:center;gap:1rem;flex-wrap:wrap;}
.home-link{color:var(--primary);text-decoration:none;font-weight:700;display:inline-flex;align-items:center;gap:.5rem;transition:color .2s;}
.home-link:hover{color:var(--primary-light);}
.hdr-title{font-size:1.1rem;font-weight:700;flex:1;}
.icon-btn{background:var(--bg-hover);border:1px solid var(--border);border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:1rem;transition:var(--transition);color:var(--text);}
.icon-btn:hover{background:var(--primary);}

/* CONTAINER */
.container{max-width:1200px;margin:0 auto;padding:2rem;}

/* HERO */
.detail-hero{display:flex;gap:2rem;background:var(--bg-card);border-radius:var(--radius);padding:1.8rem;margin-bottom:2rem;border:1px solid var(--border);}
.hero-poster{width:220px;flex-shrink:0;}
.hero-poster img{width:100%;border-radius:var(--radius-sm);box-shadow:var(--shadow);}
.hero-info{flex:1;min-width:0;}
.hero-info h1{font-size:1.8rem;margin-bottom:.3rem;line-height:1.2;}
.hero-info h2{font-size:1rem;color:var(--text-muted);margin-bottom:1rem;font-weight:400;}
.stats-row{display:flex;flex-wrap:wrap;gap:.6rem;margin-bottom:1rem;}
.stat-pill{background:var(--bg-hover);padding:.3rem .8rem;border-radius:20px;font-size:.82rem;border:1px solid var(--border);}
.action-row{display:flex;flex-wrap:wrap;gap:.7rem;margin-top:1rem;}
.btn-primary{display:inline-flex;align-items:center;gap:.4rem;background:var(--primary);color:#fff;padding:.65rem 1.5rem;border-radius:40px;text-decoration:none;font-weight:700;border:none;cursor:pointer;transition:var(--transition);}
.btn-primary:hover{background:var(--primary-dark);transform:translateY(-2px);}
.btn-outline{display:inline-flex;align-items:center;gap:.4rem;background:transparent;color:var(--primary);border:2px solid var(--primary);padding:.6rem 1.4rem;border-radius:40px;font-weight:700;cursor:pointer;transition:var(--transition);}
.btn-outline:hover,.btn-outline.active{background:var(--primary);color:#fff;}

/* INFO GRID */
.info-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1rem;margin-bottom:1.5rem;}
.info-card{background:var(--bg-card);border-radius:var(--radius);padding:1.2rem;border:1px solid var(--border);}
.info-card h3{color:var(--primary);margin-bottom:.8rem;font-size:1rem;}
.info-row{display:flex;justify-content:space-between;padding:.35rem 0;border-bottom:1px solid var(--border);font-size:.85rem;}
.info-row:last-child{border:none;}
.info-val{color:var(--text);font-weight:600;}
.tags{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.5rem;}
.tag{background:var(--primary);color:#fff;padding:.2rem .6rem;border-radius:20px;font-size:.72rem;}

/* SYNOPSIS */
.synopsis-box{background:var(--bg-card);border-radius:var(--radius);padding:1.4rem;margin-bottom:1.5rem;border:1px solid var(--border);}
.synopsis-tabs{display:flex;gap:.4rem;margin-bottom:1rem;flex-wrap:wrap;}
.syn-tab{padding:.4rem 1rem;background:var(--bg-hover);border:1px solid var(--border);border-radius:30px;color:var(--text-muted);cursor:pointer;font-size:.82rem;transition:var(--transition);}
.syn-tab.active{background:var(--primary);border-color:var(--primary);color:#fff;}
#synopsisText{line-height:1.7;color:var(--text-muted);font-size:.9rem;}

/* ÉPISODES */
.ep-section{background:var(--bg-card);border-radius:var(--radius);padding:1.4rem;border:1px solid var(--border);}
.ep-header{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.8rem;margin-bottom:1.2rem;}
.ep-header h3{font-size:1.1rem;}
.ep-search{padding:.5rem 1rem;background:var(--bg-hover);border:1px solid var(--border);border-radius:30px;color:var(--text);font-size:.85rem;width:200px;}
.ep-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(80px,1fr));gap:.6rem;max-height:380px;overflow-y:auto;padding:.3rem;}
.ep-item{background:var(--bg-hover);padding:.55rem .4rem;text-align:center;border-radius:8px;cursor:pointer;font-size:.78rem;font-weight:600;border:1px solid var(--border);transition:var(--transition);}
.ep-item:hover{background:var(--primary);border-color:var(--primary);color:#fff;transform:translateY(-2px);}
.ep-pagination{display:flex;justify-content:center;gap:.4rem;margin-top:1rem;flex-wrap:wrap;}
.ep-pg-btn{padding:.35rem .75rem;background:var(--bg-hover);border:1px solid var(--border);border-radius:var(--radius-sm);color:var(--text);cursor:pointer;font-size:.78rem;transition:var(--transition);}
.ep-pg-btn:hover,.ep-pg-btn.active{background:var(--primary);border-color:var(--primary);color:#fff;}

/* TOAST */
#toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%) translateY(16px);background:var(--bg-card);color:var(--text);border:1px solid var(--border);border-left:4px solid var(--primary);border-radius:var(--radius-sm);padding:.75rem 1.4rem;font-size:.85rem;min-width:240px;text-align:center;box-shadow:var(--shadow);opacity:0;pointer-events:none;transition:opacity .3s,transform .3s;z-index:9999;}
#toast.show{opacity:1;transform:translateX(-50%) translateY(0);pointer-events:auto;}

.loading,.error{text-align:center;padding:3rem;color:var(--text-muted);}
.error{color:var(--primary);}
@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.container>*{animation:fadeIn .35s ease-out;}

@media(max-width:768px){
  .detail-hero{flex-direction:column;align-items:center;text-align:center;}
  .hero-poster{width:180px;}
  .stats-row{justify-content:center;}
  .action-row{justify-content:center;}
  .container{padding:1rem;}
}
  </style>
</head>
<body>
<header>
  <div class="hdr">
    <a href="index.html" class="home-link">← Accueil</a>
    <span class="hdr-title" id="hdrTitle">Détail</span>
    <button class="icon-btn" id="themeToggle">🌙</button>
  </div>
</header>

<main class="container" id="mainContainer">
  <div class="loading">⏳ Chargement…</div>
</main>

<div id="toast"></div>

<script>
// ── CONFIG ──
const P=new URLSearchParams(location.search);
const CONTENT_ID=P.get('id');
const CONTENT_TYPE=P.get('type')||'anime'; // anime|manga|webtoon
const API='https://api.jikan.moe/v4';
const PROXY='https://corsproxy.io/?url=';
const PH="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 280'%3E%3Crect width='200' height='280' fill='%231e1e2e'/%3E%3Ctext x='100' y='140' text-anchor='middle' fill='%238888aa' font-size='13'%3ESans image%3C/text%3E%3C/svg%3E";

// Firebase
const fbCfg={apiKey:"AIzaSyCwDOGPUWQ08WGuAAZ9p6hS6SZytmRoKig",authDomain:"arkya-animemanga.firebaseapp.com",projectId:"arkya-animemanga",storageBucket:"arkya-animemanga.firebasestorage.app",messagingSenderId:"52570519836",appId:"1:52570519836:web:dbf4fcd7aafe01aac762d9"};
if(!firebase.apps.length)firebase.initializeApp(fbCfg);
const fbAuth=firebase.auth();
let fbDb=null;try{fbDb=firebase.firestore();}catch(_){}
let currentUser=null;
fbAuth.onAuthStateChanged(u=>{currentUser=u;});

// ── UTILITAIRES ──
function esc(s){if(!s)return'';return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
let toastT;
function toast(m){const el=document.getElementById('toast');el.textContent=m;el.classList.add('show');clearTimeout(toastT);toastT=setTimeout(()=>el.classList.remove('show'),2800);}

// ── THÈME ──
(()=>{
  const s=localStorage.getItem('akrya_theme');
  if(s==='light')document.body.classList.add('light-theme');
  document.getElementById('themeToggle').textContent=s==='light'?'☀️':'🌙';
  // Couleur selon type
  if(CONTENT_TYPE==='manga')document.body.classList.add('t-manga');
  if(CONTENT_TYPE==='webtoon')document.body.classList.add('t-webtoon');
})();
document.getElementById('themeToggle').addEventListener('click',()=>{
  document.body.classList.toggle('light-theme');
  const l=document.body.classList.contains('light-theme');
  localStorage.setItem('akrya_theme',l?'light':'dark');
  document.getElementById('themeToggle').textContent=l?'☀️':'🌙';
});

// ── FAVORIS ──
let favorites=JSON.parse(localStorage.getItem('akrya_fav')||'[]');
function isFav(id){return favorites.some(f=>f.id==id&&f.cat===CONTENT_TYPE);}
function toggleFav(id,title,image,score){
  const idx=favorites.findIndex(f=>f.id==id&&f.cat===CONTENT_TYPE);
  if(idx===-1){favorites.push({id,cat:CONTENT_TYPE,title,image,score});toast('❤️ Ajouté aux favoris');}
  else{favorites.splice(idx,1);toast('💔 Retiré des favoris');}
  localStorage.setItem('akrya_fav',JSON.stringify(favorites));
  if(currentUser&&fbDb)fbDb.collection('users').doc(currentUser.uid).set({favorites},{merge:true}).catch(()=>{});
  updateFavBtn();
}
function updateFavBtn(){
  const btn=document.getElementById('favBtn');
  if(!btn)return;
  const f=isFav(CONTENT_ID);
  btn.textContent=f?'❤️ Dans mes favoris':'🤍 Ajouter aux favoris';
  btn.classList.toggle('active',f);
}

// ── FETCH ──
async function apiFetch(url){
  try{const r=await fetch(url,{signal:AbortSignal.timeout(9000)});if(r.ok)return r;}catch(_){}
  return fetch(PROXY+encodeURIComponent(url),{signal:AbortSignal.timeout(14000)});
}

// ── STATUS ──
function statusLabel(s){
  return{
    'Currently Airing':'🟢 En cours','Finished Airing':'✅ Terminé',
    'Not yet aired':'📅 À venir','On Hiatus':'⏸️ En pause',
    'Discontinued':'❌ Annulé','Publishing':'🟢 En cours','Finished':'✅ Terminé',
    'RELEASING':'🟢 En cours','FINISHED':'✅ Terminé','NOT_YET_RELEASED':'📅 À venir'
  }[s]||s||'Inconnu';
}

// ── PAGINATION ÉPISODES ──
let epPage=1;const EP_PER_PAGE=60;

function buildEpList(total,label){
  const totalPages=Math.ceil(total/EP_PER_PAGE);
  function render(pg){
    const start=(pg-1)*EP_PER_PAGE+1,end=Math.min(pg*EP_PER_PAGE,total);
    const epGrid=document.getElementById('epGrid');
    if(!epGrid)return;
    epGrid.innerHTML=Array.from({length:end-start+1},(_,i)=>start+i)
      .map(n=>`<div class="ep-item" data-n="${n}" onclick="goWatch(${n})">${label} ${n}</div>`).join('');
    // Recherche
    document.getElementById('epSearch')?.addEventListener('input',e=>{
      const v=e.target.value.toLowerCase();
      document.querySelectorAll('.ep-item').forEach(el=>el.style.display=el.dataset.n.includes(v)?'':'none');
    });
    // Pagination
    const pag=document.getElementById('epPag');
    if(!pag||totalPages<=1){if(pag)pag.innerHTML='';return;}
    const pages=[];for(let i=Math.max(1,pg-2);i<=Math.min(totalPages,pg+2);i++)pages.push(i);
    pag.innerHTML=`<button class="ep-pg-btn" ${pg===1?'disabled':''} onclick="changePg(${pg-1})">◀</button>`+
      pages.map(p=>`<button class="ep-pg-btn${p===pg?' active':''}" onclick="changePg(${p})">${p}</button>`).join('')+
      `<button class="ep-pg-btn" ${pg===totalPages?'disabled':''} onclick="changePg(${pg+1})">▶</button>`;
  }
  window.changePg=(pg)=>{epPage=pg;render(pg);};
  window.goWatch=(n)=>{location.href=`watch.html?id=${CONTENT_ID}&type=${CONTENT_TYPE}&ep=${n}`;};
  render(1);
}

// ── RENDER ──
function renderDetail(data){
  const c=document.getElementById('mainContainer');
  const isAnime=CONTENT_TYPE==='anime';
  const isManga=CONTENT_TYPE==='manga'||CONTENT_TYPE==='webtoon';

  const title=data.title||data.title_romaji||'Sans titre';
  const titleEN=data.title_english||data.title_native||'';
  const image=data.images?.jpg?.large_image_url||data.images?.jpg?.image_url||data.coverImage?.large||PH;
  const score=data.score||(data.averageScore?data.averageScore/10:null);
  const rank=data.rank||null;
  const favs=data.favorites?.toLocaleString('fr-FR')||'0';
  const status=statusLabel(data.status);
  const year=data.aired?.from?new Date(data.aired.from).getFullYear():data.published?.from?new Date(data.published.from).getFullYear():data.year||'?';
  const epCount=data.episodes||data.chapters||0;
  const genres=(data.genres||[]).map(g=>g.name||g).filter(Boolean);
  const synopsis=data.synopsis||(data.description?.replace(/<[^>]*>/g,''))||'Synopsis non disponible.';
  const studio=isAnime?(data.studios||[]).map(s=>s.name).join(', ')||'N/A':'N/A';
  const author=isManga?(data.authors||[]).map(a=>a.name).join(', ')||'N/A':'N/A';
  const broadcast=data.broadcast?.string||data.broadcast?.day&&data.broadcast?.time?`${data.broadcast.day} à ${data.broadcast.time}`:null;

  document.title=`${title} — Akrya`;
  document.getElementById('hdrTitle').textContent=title;

  const watchUrl=`watch.html?id=${CONTENT_ID}&type=${CONTENT_TYPE}&ep=1`;

  c.innerHTML=`
    <!-- HERO -->
    <div class="detail-hero">
      <div class="hero-poster">
        <img src="${image}" alt="${esc(title)}" onerror="this.src='${PH}'">
      </div>
      <div class="hero-info">
        <h1>${esc(title)}</h1>
        ${titleEN?`<h2>${esc(titleEN)}</h2>`:''}
        <div class="stats-row">
          ${score?`<span class="stat-pill">⭐ ${typeof score==='number'?score.toFixed(1):score}</span>`:''}
          ${rank?`<span class="stat-pill">📊 Rang #${rank}</span>`:''}
          <span class="stat-pill">❤️ ${favs} favoris</span>
          <span class="stat-pill">${isAnime?'📺':'📚'} ${epCount||'?'} ${isAnime?'épisodes':'chapitres'}</span>
          <span class="stat-pill">${status}</span>
          ${broadcast?`<span class="stat-pill">🕒 ${esc(broadcast)}</span>`:''}
        </div>
        <div class="action-row">
          ${epCount>0?`<a href="${watchUrl}" class="btn-primary">▶ ${isAnime?'Regarder ép. 1':'Lire chap. 1'}</a>`:''}
          <button class="btn-outline" id="favBtn" onclick="toggleFav('${CONTENT_ID}','${esc(title.replace(/'/g,"\\'"))}','${image}',${score||0})">${isFav(CONTENT_ID)?'❤️ Dans mes favoris':'🤍 Ajouter aux favoris'}</button>
        </div>
      </div>
    </div>

    <!-- INFO GRID -->
    <div class="info-grid">
      <div class="info-card">
        <h3>📋 Informations</h3>
        <div class="info-row"><span>Statut</span><span class="info-val">${status}</span></div>
        <div class="info-row"><span>${isAnime?'Épisodes':'Chapitres'}</span><span class="info-val">${epCount||'?'}</span></div>
        ${isAnime?`<div class="info-row"><span>Durée</span><span class="info-val">${data.duration||'?'}</span></div>`:''}
        ${isManga?`<div class="info-row"><span>Volumes</span><span class="info-val">${data.volumes||'?'}</span></div>`:''}
        <div class="info-row"><span>Année</span><span class="info-val">${year}</span></div>
        ${isAnime&&data.season?`<div class="info-row"><span>Saison</span><span class="info-val">${data.season} ${data.year||''}</span></div>`:''}
      </div>
      <div class="info-card">
        <h3>🏢 Production</h3>
        ${isAnime?`<div class="info-row"><span>Studio</span><span class="info-val">${esc(studio)}</span></div>`:''}
        ${isManga?`<div class="info-row"><span>Auteur</span><span class="info-val">${esc(author)}</span></div>`:''}
        <div class="info-row"><span>Source</span><span class="info-val">${esc(data.source||'N/A')}</span></div>
        ${broadcast?`<div class="info-row"><span>Diffusion</span><span class="info-val">${esc(broadcast)}</span></div>`:''}
        <h3 style="margin-top:1rem">🏷️ Genres</h3>
        <div class="tags">${genres.map(g=>`<span class="tag">${esc(g)}</span>`).join('')||'N/A'}</div>
      </div>
    </div>

    <!-- SYNOPSIS -->
    <div class="synopsis-box">
      <div class="synopsis-tabs">
        <button class="syn-tab active" data-lang="fr">🇫🇷 Français</button>
        <button class="syn-tab" data-lang="en">🇬🇧 English</button>
      </div>
      <div id="synopsisText">${esc(synopsis)}</div>
    </div>

    <!-- ÉPISODES -->
    ${epCount>0?`
    <div class="ep-section">
      <div class="ep-header">
        <h3>${isAnime?'📺':'📚'} ${isAnime?'Épisodes':'Chapitres'} (${epCount})</h3>
        <input type="text" id="epSearch" class="ep-search" placeholder="🔍 Numéro…">
      </div>
      <div id="epGrid" class="ep-grid"></div>
      <div id="epPag" class="ep-pagination"></div>
    </div>`:''}
  `;

  // Synopsis tabs
  const synText=document.getElementById('synopsisText');
  document.querySelectorAll('.syn-tab').forEach(tab=>{
    tab.addEventListener('click',()=>{
      document.querySelectorAll('.syn-tab').forEach(t=>t.classList.remove('active'));
      tab.classList.add('active');
      synText.textContent=tab.dataset.lang==='en'?(data.synopsis||'Synopsis not available.'):(synopsis);
    });
  });

  // Épisodes
  if(epCount>0){
    const label=isAnime?'Ép.':'Ch.';
    buildEpList(epCount,label);
  }
}

// ── CHARGEMENT PRINCIPAL ──
async function loadDetail(){
  if(!CONTENT_ID){
    document.getElementById('mainContainer').innerHTML='<div class="error">❌ ID manquant dans l\'URL.</div>';
    return;
  }
  const cat=CONTENT_TYPE==='webtoon'?'manga':CONTENT_TYPE;
  try{
    const r=await apiFetch(`${API}/${cat}/${CONTENT_ID}`);
    if(!r.ok)throw new Error(`HTTP ${r.status}`);
    const d=await r.json();
    if(!d.data)throw new Error('Aucune donnée reçue');
    renderDetail(d.data);
  }catch(e){
    document.getElementById('mainContainer').innerHTML=`
      <div class="error">❌ Erreur de chargement<br><small>${esc(e.message)}</small><br>
      <button onclick="loadDetail()" style="margin-top:1rem;padding:.5rem 1.2rem;background:var(--primary);border:none;border-radius:8px;color:#fff;cursor:pointer;font-weight:600">🔄 Réessayer</button>
      <a href="index.html" style="margin-left:.8rem;color:var(--primary)">← Retour</a></div>`;
  }
}

loadDetail();
</script>
</body>
</html>
