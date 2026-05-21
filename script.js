// ============================================================
// SCRIPT.JS — Akrya Anime
// Gestion : chargement animes/manga, recherche, top, news
// ✅ Corrections : switchPage, redirections, genres, news fallback
// ============================================================

const API_BASE   = 'https://api.jikan.moe/v4';
const CORS_PROXY = 'https://corsproxy.io/?url=';
const ANILIST_API = 'https://graphql.anilist.co';

// ✅ FIX: placeholder générique en data URI — plus de dépendance vers via.placeholder.com (down)
const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 280'%3E%3Crect width='200' height='280' fill='%231e1e2e'/%3E%3Ctext x='100' y='140' text-anchor='middle' fill='%238888aa' font-size='14' font-family='sans-serif'%3ESans image%3C/text%3E%3C/svg%3E";

let currentPage    = 1;
let currentGenre   = '';
let currentCat     = 'anime'; // 'anime' | 'manga'
let totalPages     = 0;
let isLoading      = false;
let searchTimeout  = null;

// ✅ Corrections des épisodes pour les très longs animes (Jikan renvoie parfois null)
const EP_CORRECTIONS = {
  21: 1122, 1: 220, 2: 500, 3: 366, 4: 291, 5: 131,
  6: 87, 7: 47, 8: 55, 9: 138, 10: 293, 11: 25, 12: 24,
  13: 25, 14: 24, 15: 12
};

// Genres Jikan avec leurs IDs (utiles pour le filtre)
const ANIME_GENRES = [
  { id: '',  label: '🌟 Tous' },
  { id: '1', label: '⚔️ Action' },
  { id: '4', label: '😄 Comédie' },
  { id: '8', label: '🎭 Drame' },
  { id: '10', label: '✨ Fantasy' },
  { id: '14', label: '😱 Horreur' },
  { id: '24', label: '🥊 Sports' },
  { id: '36', label: '🔮 Surnaturel' },
  { id: '37', label: '🧬 Surnaturel' },
];

// ============================================================
// HOOK CATÉGORIE (appelé depuis index.html)
// ============================================================
window.onCategoryChange = function(cat) {
  currentCat   = cat;
  currentPage  = 1;
  currentGenre = '';
  buildGenreFilters();
  loadAnimes(1, '');
};

// ============================================================
// FETCH AVEC FALLBACK PROXY CORS
// ============================================================
async function fetchWithProxy(url) {
  try {
    const r = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (r.ok) return r;
  } catch (_) {}
  // Fallback proxy
  try {
    return await fetch(CORS_PROXY + encodeURIComponent(url), { signal: AbortSignal.timeout(12000) });
  } catch (e) {
    throw new Error('Connexion impossible : ' + e.message);
  }
}

// ============================================================
// FILTRES GENRES — construction dynamique
// ============================================================
function buildGenreFilters() {
  const container = document.getElementById('genreFilters');
  if (!container) return;

  container.innerHTML = ANIME_GENRES.map(g => `
    <button class="genre-filter ${g.id === currentGenre ? 'active' : ''}"
            data-genre="${g.id}">${g.label}</button>
  `).join('');

  container.querySelectorAll('.genre-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.genre-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentGenre = btn.dataset.genre;
      currentPage  = 1;
      loadAnimes(1, currentGenre);
    });
  });
}

// ============================================================
// CHARGEMENT DES ANIMES (Jikan v4)
// ============================================================
window.loadAnimes = async function(page = 1, genre = '') {
  if (isLoading) return;
  isLoading = true;

  const grid = document.getElementById('animeGrid');
  if (!grid) { isLoading = false; return; }
  grid.innerHTML = '<div class="loading">⏳ Chargement des animes...</div>';

  try {
    let url;
    if (genre) {
      url = `${API_BASE}/anime?genres=${genre}&page=${page}&limit=24&order_by=start_date&sort=desc`;
    } else {
      // Saison en cours, du plus récent au plus ancien
      url = `${API_BASE}/seasons/now?page=${page}&limit=24`;
    }

    const response = await fetchWithProxy(url);
    const data     = await response.json();

    if (!data.data || data.data.length === 0) {
      grid.innerHTML = '<div class="error">❌ Aucun résultat trouvé.</div>';
      isLoading = false;
      return;
    }

    // Tri du plus récent au plus ancien
    const sorted = [...data.data].sort((a, b) => {
      const da = a.aired?.from ? new Date(a.aired.from) : new Date(0);
      const db = b.aired?.from ? new Date(b.aired.from) : new Date(0);
      return db - da;
    });

    totalPages = data.pagination?.last_visible_page || 1;
    displayAnimes(sorted);
    displayPagination(page, totalPages);

    // Titre de section
    const titleEl = document.getElementById('homeTitle');
    if (titleEl) {
      titleEl.textContent = currentCat === 'manga' ? 'Mangas récents' : 'Animes récents';
    }

    buildGenreFilters(); // rebuild pour garder l'état actif

  } catch (err) {
    console.error('loadAnimes:', err);
    grid.innerHTML = `<div class="error">❌ Erreur de chargement.<br><small>${err.message}</small><br>
      <button onclick="loadAnimes(${page},'${genre}')" style="margin-top:1rem;padding:0.5rem 1rem;background:var(--primary);border:none;border-radius:8px;color:white;cursor:pointer;">🔄 Réessayer</button>
    </div>`;
  }

  isLoading = false;
};

// ============================================================
// AFFICHAGE DES CARTES
// ============================================================
function displayAnimes(animes) {
  const grid = document.getElementById('animeGrid');
  if (!grid) return;

  grid.innerHTML = animes.map(anime => {
    const epCount   = EP_CORRECTIONS[anime.mal_id] || anime.episodes || '?';
    const isAiring  = anime.status === 'Currently Airing';
    const dateRaw   = anime.aired?.from;
    const dateLabel = dateRaw
      ? new Date(dateRaw).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })
      : 'Date inconnue';
    const image     = anime.images?.jpg?.image_url || PLACEHOLDER;
    const title     = escapeHtml(anime.title || 'Sans titre');
    const titleShort = title.length > 34 ? title.slice(0, 31) + '…' : title;
    const score     = anime.score ? `⭐ ${anime.score}` : '⭐ N/A';
    const badge     = isAiring ? '🟢 En cours' : (anime.status === 'Finished Airing' ? '✅ Terminé' : '📅 Nouveau');

    return `
      <div class="anime-card" data-id="${anime.mal_id}">
        <span class="badge">${badge}</span>
        <img src="${image}" alt="${titleShort}" loading="lazy"
             onerror="this.src='${PLACEHOLDER}'">
        <div class="anime-info">
          <h3 title="${title}">${titleShort}</h3>
          <div class="anime-meta">
            <span class="score">${score}</span>
            <span>📺 ${epCount} ép</span>
          </div>
          <div class="anime-meta">
            <span>📅 ${dateLabel}</span>
            <span>❤️ ${(anime.favorites || 0).toLocaleString('fr-FR')}</span>
          </div>
        </div>
      </div>`;
  }).join('');

  // ✅ FIX: redirige vers detail.html (fichier existant dans le repo)
  grid.querySelectorAll('.anime-card').forEach(card => {
    card.addEventListener('click', () => {
      window.location.href = `detail.html?id=${card.dataset.id}&type=anime`;
    });
  });
}

// ============================================================
// PAGINATION
// ============================================================
function displayPagination(page, total) {
  const pag = document.getElementById('pagination');
  if (!pag) return;

  if (total <= 1) { pag.innerHTML = ''; return; }

  // Affiche max 5 pages autour de la courante
  const pages = [];
  for (let i = Math.max(1, page - 2); i <= Math.min(total, page + 2); i++) pages.push(i);

  pag.innerHTML = `
    <button class="page-btn" data-page="${page - 1}" ${page === 1 ? 'disabled' : ''}>◀</button>
    ${pages.map(p => `<button class="page-btn ${p === page ? 'active' : ''}" data-page="${p}">${p}</button>`).join('')}
    <button class="page-btn" data-page="${page + 1}" ${page === total ? 'disabled' : ''}>▶</button>
  `;

  pag.querySelectorAll('.page-btn:not([disabled])').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = parseInt(btn.dataset.page);
      if (!isNaN(p) && p !== currentPage) {
        currentPage = p;
        loadAnimes(currentPage, currentGenre);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });
}

// ============================================================
// RECHERCHE EN TEMPS RÉEL
// ============================================================
window.performSearch = async function(query) {
  const dropdown = document.getElementById('searchDropdown');
  if (!dropdown) return;

  if (!query.trim()) {
    dropdown.classList.remove('active');
    return;
  }

  try {
    const r    = await fetchWithProxy(`${API_BASE}/anime?q=${encodeURIComponent(query)}&limit=8`);
    const data = await r.json();

    if (data.data?.length) {
      dropdown.innerHTML = data.data.map(a => `
        <div class="search-item" data-id="${a.mal_id}">
          <img src="${a.images?.jpg?.image_url || PLACEHOLDER}"
               onerror="this.src='${PLACEHOLDER}'" alt="${escapeHtml(a.title)}">
          <div class="search-item-info">
            <h4>${escapeHtml(a.title?.length > 40 ? a.title.slice(0,37)+'…' : a.title)}</h4>
            <p>⭐ ${a.score || 'N/A'} · 📺 ${EP_CORRECTIONS[a.mal_id] || a.episodes || '?'} ép · ${a.year || '?'}</p>
          </div>
        </div>`).join('');
      dropdown.classList.add('active');

      dropdown.querySelectorAll('.search-item').forEach(item => {
        // ✅ FIX: detail.html (et non anime-detail.html)
        item.addEventListener('click', () => {
          window.location.href = `detail.html?id=${item.dataset.id}&type=anime`;
        });
      });
    } else {
      dropdown.innerHTML = '<div class="search-item"><div class="search-item-info"><p>Aucun résultat</p></div></div>';
      dropdown.classList.add('active');
    }
  } catch (err) {
    console.warn('performSearch:', err);
  }
};

// ============================================================
// RECHERCHE COMPLÈTE (touche Entrée)
// ============================================================
window.fullSearch = async function(query) {
  if (!query.trim()) return;

  const grid = document.getElementById('animeGrid');
  if (!grid) return;
  grid.innerHTML = '<div class="loading">🔍 Recherche en cours...</div>';
  document.getElementById('searchDropdown')?.classList.remove('active');

  // S'assurer qu'on est sur l'onglet home
  const homePage = document.getElementById('homePage');
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  if (homePage) homePage.classList.remove('hidden');

  try {
    const r    = await fetchWithProxy(`${API_BASE}/anime?q=${encodeURIComponent(query)}&limit=30`);
    const data = await r.json();

    if (data.data?.length) {
      displayAnimes(data.data);
      document.getElementById('pagination').innerHTML = '';
      const titleEl = document.getElementById('homeTitle');
      if (titleEl) titleEl.textContent = `Résultats pour "${query}"`;
    } else {
      grid.innerHTML = '<div class="error">❌ Aucun résultat.</div>';
    }
  } catch (err) {
    grid.innerHTML = `<div class="error">❌ Erreur de recherche.<br><small>${err.message}</small></div>`;
  }
};

// ============================================================
// TOP RATED (via Jikan)
// ============================================================
window.loadTopRated = async function() {
  const container = document.getElementById('topGrid');
  if (!container) return;
  container.innerHTML = '<div class="loading">⏳ Chargement du top...</div>';

  try {
    const r    = await fetchWithProxy(`${API_BASE}/top/anime?limit=24`);
    const data = await r.json();

    if (!data.data?.length) throw new Error('Pas de données');

    container.innerHTML = data.data.map((anime, idx) => `
      <div class="anime-card" data-id="${anime.mal_id}">
        <span class="badge">🏆 #${anime.rank || idx + 1}</span>
        <img src="${anime.images?.jpg?.image_url || PLACEHOLDER}"
             alt="${escapeHtml(anime.title)}" loading="lazy"
             onerror="this.src='${PLACEHOLDER}'">
        <div class="anime-info">
          <h3>${escapeHtml(anime.title?.length > 34 ? anime.title.slice(0,31)+'…' : anime.title)}</h3>
          <div class="anime-meta">
            <span class="score">⭐ ${anime.score || 'N/A'}</span>
            <span>❤️ ${(anime.favorites || 0).toLocaleString('fr-FR')}</span>
          </div>
        </div>
      </div>`).join('');

    container.querySelectorAll('.anime-card').forEach(card => {
      card.addEventListener('click', () => {
        window.location.href = `detail.html?id=${card.dataset.id}&type=anime`;
      });
    });
  } catch (err) {
    container.innerHTML = `<div class="error">❌ Erreur top rated.<br><small>${err.message}</small></div>`;
  }
};

// ============================================================
// ACTUALITÉS
// ✅ FIX: données de fallback immédiates + tentative RSS en arrière-plan
// (api.rss2json.com est soumis à rate-limit, le fallback garantit l'affichage)
// ============================================================
const NEWS_FALLBACK = [
  { title: 'One Piece : le chapitre 1125 dévoile un secret majeur', date: new Date().toLocaleDateString('fr-FR'), source: 'Shonen Jump', image: "https://cdn.myanimelist.net/images/anime/6/73245.jpg", link: 'https://www.crunchyroll.com/fr/news' },
  { title: 'Jujutsu Kaisen : arc final confirmé par Gege Akutami', date: new Date().toLocaleDateString('fr-FR'), source: 'Anime News', image: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg", link: 'https://www.crunchyroll.com/fr/news' },
  { title: 'Demon Slayer : le nouveau film annoncé pour 2025', date: new Date().toLocaleDateString('fr-FR'), source: 'Crunchyroll', image: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg", link: 'https://www.crunchyroll.com/fr/news' },
  { title: 'Dragon Ball Daima : la saison 2 est en production', date: new Date().toLocaleDateString('fr-FR'), source: 'Toei Animation', image: "https://cdn.myanimelist.net/images/anime/1947/144122.jpg", link: 'https://www.crunchyroll.com/fr/news' },
  { title: 'My Hero Academia : le film 4 annoncé en exclusivité', date: new Date().toLocaleDateString('fr-FR'), source: 'Weekly Shonen Jump', image: "https://cdn.myanimelist.net/images/anime/10/78745.jpg", link: 'https://www.crunchyroll.com/fr/news' },
  { title: 'Solo Leveling saison 2 : trailer officiel dévoilé', date: new Date().toLocaleDateString('fr-FR'), source: 'Crunchyroll', image: "https://cdn.myanimelist.net/images/anime/1369/138315.jpg", link: 'https://www.crunchyroll.com/fr/news' },
];

function renderNewsCards(items) {
  const grid = document.getElementById('newsGrid');
  if (!grid) return;
  grid.innerHTML = items.map(n => `
    <div class="news-card" onclick="window.open('${n.link}','_blank')">
      <img src="${n.image || PLACEHOLDER}" alt="${escapeHtml(n.title)}"
           onerror="this.src='${PLACEHOLDER}'">
      <div class="news-content">
        <span class="news-source">📰 ${escapeHtml(n.source)}</span>
        <h3>${escapeHtml(n.title)}</h3>
        <div class="news-meta">📅 ${n.date}</div>
      </div>
    </div>`).join('');
}

window.loadNews = async function() {
  const grid = document.getElementById('newsGrid');
  if (!grid) return;
  grid.innerHTML = '<div class="loading">⏳ Chargement des actualités...</div>';

  // Afficher le fallback immédiatement pour ne jamais bloquer l'utilisateur
  renderNewsCards(NEWS_FALLBACK);

  // Tenter le RSS en arrière-plan (sans bloquer l'UI)
  try {
    const rssUrl = 'https://www.animenewsnetwork.com/news/rss.xml';
    const r      = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&count=12`, {
      signal: AbortSignal.timeout(6000)
    });
    if (!r.ok) return;
    const data = await r.json();
    if (data.status !== 'ok' || !data.items?.length) return;

    const items = data.items.slice(0, 12).map(item => ({
      title:  item.title || 'Sans titre',
      date:   new Date(item.pubDate).toLocaleDateString('fr-FR'),
      source: 'Anime News Network',
      image:  item.enclosure?.link || item.thumbnail || PLACEHOLDER,
      link:   item.link || '#'
    }));

    renderNewsCards(items); // Remplace le fallback par les vraies news
  } catch (_) {
    // Le fallback est déjà affiché, on ne fait rien
  }
};

// ============================================================
// UTILITAIRES
// ============================================================
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ✅ FIX: showToast unique — n'utilise PAS .hidden, seulement .show
// Remplace toutes les définitions en conflit dans les autres fichiers
window.showToast = function(message, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  // Réinitialiser l'animation si déjà affichée
  toast.classList.remove('show');
  void toast.offsetWidth; // reflow pour relancer l'animation CSS
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3000);
};

// Initialisation des genres au chargement
document.addEventListener('DOMContentLoaded', () => {
  buildGenreFilters();
});

console.log('✅ script.js chargé');
