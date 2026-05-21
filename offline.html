// ============================================================
// SW.JS — Service Worker Akrya Anime
// ✅ Cache statique minimal + network-first pour les pages
// ✅ Fallback offline.html si réseau indisponible
// ============================================================
const CACHE='akrya-v2';
const STATIC=['/','index.html','style.css','offline.html','favicon.svg','favicon.ico'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(async c=>{
    for(const url of STATIC){try{await c.add(url);}catch(_){}}
  }));
  self.skipWaiting();
});

self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch',e=>{
  const url=new URL(e.request.url);
  // Laisser passer les APIs
  if(url.hostname.includes('jikan')||url.hostname.includes('anilist')||url.hostname.includes('firebase')||url.hostname.includes('gstatic')||url.hostname.includes('corsproxy')||url.hostname.includes('rss2json'))return;
  // Assets statiques → cache first
  if(/\.(css|js|ico|svg|png|jpg|jpeg|webp|woff2?)$/.test(url.pathname)){
    e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(cache=>cache.put(e.request,c));return r;}).catch(()=>new Response('',{status:404}))));
    return;
  }
  // Pages HTML → network first, offline fallback
  if(e.request.headers.get('accept')?.includes('text/html')){
    e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(cache=>cache.put(e.request,c));return r;}).catch(async()=>{const cached=await caches.match(e.request);return cached||caches.match('offline.html');}));
    return;
  }
});
