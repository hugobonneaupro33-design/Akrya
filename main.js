// ============================================================
// MAIN.JS — Akrya Anime
// ✅ Service Worker registration + online/offline banner
// ✅ Ne crée PAS de bouton thème (déjà dans chaque page)
// ============================================================
'use strict';

// ── SERVICE WORKER ──
if('serviceWorker' in navigator){
  window.addEventListener('load',async()=>{
    try{
      const reg=await navigator.serviceWorker.register('/sw.js');
      reg.addEventListener('updatefound',()=>{
        const nw=reg.installing;
        nw.addEventListener('statechange',()=>{
          if(nw.state==='installed'&&navigator.serviceWorker.controller){
            showUpdateBanner();
          }
        });
      });
    }catch(e){console.warn('[SW] Erreur enregistrement:',e.message);}
  });
}

function showUpdateBanner(){
  const b=document.createElement('div');
  b.style.cssText='position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#13131f;border:1px solid #252540;border-left:4px solid #e94560;padding:.9rem 1.5rem;border-radius:12px;z-index:9998;display:flex;gap:1rem;align-items:center;box-shadow:0 8px 24px rgba(0,0,0,.4);font-size:.85rem;';
  b.innerHTML='✨ Nouvelle version disponible ! <button onclick="location.reload()" style="background:#e94560;border:none;padding:.3rem .9rem;border-radius:20px;color:#fff;cursor:pointer;font-weight:700">Actualiser</button>';
  document.body.appendChild(b);
  setTimeout(()=>b.remove(),12000);
}

// ── RÉSEAU ──
function showOfflineBanner(){
  if(document.getElementById('offlineBanner'))return;
  const b=document.createElement('div');
  b.id='offlineBanner';
  b.style.cssText='background:#d63031;color:#fff;text-align:center;padding:.5rem;position:sticky;top:0;z-index:9999;font-size:.85rem;';
  b.textContent='⚠️ Mode hors-ligne — Certaines fonctionnalités sont limitées';
  document.body.insertBefore(b,document.body.firstChild);
}
function hideOfflineBanner(){document.getElementById('offlineBanner')?.remove();}

window.addEventListener('online', ()=>{hideOfflineBanner();if(typeof showToast==='function')showToast('📡 Connexion rétablie');});
window.addEventListener('offline',()=>{showOfflineBanner();if(typeof showToast==='function')showToast('⚠️ Connexion perdue');});

if(!navigator.onLine)showOfflineBanner();

console.log('✅ main.js chargé');
