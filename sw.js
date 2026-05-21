// ============================================================
// SW.JS — Akrya Anime v3
// Fusion complète v1 (robuste) + v3 (push, PWA)
// TOUTES les fonctionnalités conservées
// ============================================================

const CACHE_NAME = 'akrya-v3';
const OFFLINE_URL = '/offline.html';

// Fichiers à mettre en cache au démarrage
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/style.css',
  '/offline.html',
  '/favicon.svg',
  '/favicon.ico',
  '/manifest.json'
];

// ============================================================
// INSTALLATION
// ============================================================
self.addEventListener('install', (event) => {
  console.log('[SW] Installation...');

  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      // On tente chaque fichier individuellement — si l'un échoue, on continue
      for (const url of STATIC_CACHE_URLS) {
        try {
          const response = await fetch(url);
          if (response.ok) {
            await cache.put(url, response);
            console.log(`[SW] Cache OK: ${url}`);
          } else {
            console.warn(`[SW] Fichier non trouvé (${response.status}): ${url}`);
          }
        } catch (error) {
          console.warn(`[SW] Impossible de cacher: ${url}`, error.message);
        }
      }

      console.log('[SW] Installation terminée');
    })()
  );

  // Prend le contrôle immédiatement sans attendre le rechargement
  self.skipWaiting();
});

// ============================================================
// ACTIVATION
// ============================================================
self.addEventListener('activate', (event) => {
  console.log('[SW] Activation...');

  event.waitUntil(
    (async () => {
      // Supprimer tous les anciens caches (versions précédentes)
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log(`[SW] Suppression ancien cache: ${name}`);
            return caches.delete(name);
          })
      );

      console.log('[SW] Activation terminée');
    })()
  );

  // Prend immédiatement le contrôle de tous les clients ouverts
  self.clients.claim();
});

// ============================================================
// STRATÉGIES DE CACHE
// ============================================================

// Cache d'abord → réseau en fallback (assets statiques)
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    // Silencieux — ressource non disponible
  }

  return new Response('Ressource non disponible', { status: 404 });
}

// Réseau d'abord → cache en fallback (pages HTML)
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    // Réseau indisponible — on essaie le cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Fallback page hors-ligne pour les requêtes HTML
    if (request.headers.get('accept')?.includes('text/html')) {
      return caches.match(OFFLINE_URL);
    }
  }

  return new Response('Ressource non disponible', { status: 404 });
}

// ============================================================
// ROUTAGE DES REQUÊTES
// ============================================================
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // ── IGNORER les APIs et ressources externes ──
  // Elles ne doivent jamais être mises en cache ici
  if (
    url.href.includes('api.jikan.moe')    ||
    url.href.includes('graphql.anilist.co')||
    url.href.includes('firebase')          ||
    url.href.includes('gstatic.com')       ||
    url.href.includes('corsproxy.io')      ||
    url.href.includes('rss2json.com')      ||
    url.href.includes('myanimelist.net')   ||
    url.href.includes('cdnjs.cloudflare')
  ) {
    return; // Laisser passer directement
  }

  // ── ASSETS STATIQUES → Cache First ──
  if (url.pathname.match(/\.(css|js|ico|png|jpg|jpeg|gif|svg|webp|woff2?|json)$/i)) {
    event.respondWith(cacheFirst(event.request));
    return;
  }

  // ── PAGES HTML → Network First ──
  if (
    url.pathname.endsWith('.html') ||
    url.pathname === '/'           ||
    url.pathname === ''
  ) {
    event.respondWith(networkFirst(event.request));
    return;
  }

  // ── PAR DÉFAUT : cache puis réseau ──
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// ============================================================
// NOTIFICATIONS PUSH
// ============================================================
self.addEventListener('push', (event) => {
  console.log('[SW] Notification push reçue');

  let data = {
    title: 'Akrya Anime',
    body:  'Nouveau contenu disponible !',
    icon:  '/favicon.ico',
    badge: '/favicon.ico',
    tag:   'akrya-notification',
    url:   '/'
  };

  if (event.data) {
    try {
      data = { ...data, ...event.data.json() };
    } catch (error) {
      data.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body:  data.body,
      icon:  data.icon,
      badge: data.badge,
      tag:   data.tag,
      data:  { url: data.url }
    })
  );
});

// Clic sur une notification → ouvre la bonne URL
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const urlToOpen = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((windowClients) => {
      // Réutiliser un onglet déjà ouvert si possible
      for (const client of windowClients) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      // Sinon ouvrir un nouvel onglet
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

// ============================================================
// MESSAGE HANDLER
// ============================================================
self.addEventListener('message', (event) => {
  // Forcer la mise à jour immédiate du SW
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }

  // Vider le cache sur demande (ex: bouton "Vider le cache" dans les paramètres)
  if (event.data === 'clearCache') {
    event.waitUntil(
      caches.delete(CACHE_NAME).then(() => {
        console.log('[SW] Cache effacé');
        if (event.source) {
          event.source.postMessage({ action: 'cacheCleared' });
        }
      })
    );
  }
});

console.log('[SW] Akrya Service Worker v3 chargé');
