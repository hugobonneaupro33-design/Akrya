<div align="center">

<img src="favicon.svg" width="80" alt="Akrya Logo">

# 🎌 Akrya

### La plateforme anime, manga & webtoon nouvelle génération

[![Site en ligne](https://img.shields.io/badge/🌐_Site_en_ligne-Visiter-e94560?style=for-the-badge)](https://hugobonneaupro33-design.github.io/Akrya/)
[![GitHub Pages](https://img.shields.io/badge/Hébergé_sur-GitHub_Pages-181717?style=for-the-badge&logo=github)](https://github.com/hugobonneaupro33-design/Akrya)
[![Firebase](https://img.shields.io/badge/Firebase-Auth_&_DB-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com)
[![Licence MIT](https://img.shields.io/badge/Licence-MIT-22c55e?style=for-the-badge)](LICENSE)

---

*Découvrez, suivez et regardez vos animes, mangas et webtoons préférés.*  
*VF · VOSTFR · Calendrier en temps réel · Profil synchronisé.*

</div>

---

## ✨ Fonctionnalités

### 🗂️ Catalogue
- **3 catégories** — Anime (rouge), Manga (violet), Webtoon (tiffany) avec thème de couleur dédié
- **Filtres par genre** — Action, Fantasy, Romance, Horreur, Sports, Sci-Fi, Historique…
- **Recherche en temps réel** — résultats instantanés avec aperçu image
- **Tri du plus récent** — sorties classées par date de diffusion
- **24+ webtoons** — Solo Leveling, Tower of God, Sweet Home, Weak Hero, Omniscient Reader…

### 📺 Lecture
- **8 sources vidéo** — AnimeSama, Neko-sama, VoirAnime, Mavanimes, AnimePahe, Crunchyroll, VF5, AniWave
- **VF & VOSTFR** — choix de la langue par bouton
- **Progression sauvegardée** — reprend là où vous vous êtes arrêté (localStorage + cloud)
- **Épisodes vus** — marqués visuellement dans la sidebar
- **Autoplay** — passage automatique à l'épisode suivant
- **Raccourcis clavier** — ← → pour naviguer, Espace pour lancer, F pour plein écran
- **Sidebar paginée** — navigation « ‹ › » + boutons première/dernière page + saut direct

### 📅 Calendrier
- **Temps réel** — données AniList GraphQL, actualisation par semaine
- **Navigation semaines** — précédente, actuelle, suivante
- **Heure de diffusion** — jour, heure JST, numéro d'épisode, note
- **Mise en évidence** — jour actuel surligné

### 👤 Profil utilisateur
- **Connexion** — Google & Facebook via Firebase Auth
- **Favoris** — ajout depuis n'importe quelle page, synchronisé Firestore
- **Historique** — 50 derniers épisodes regardés, cliquables pour reprendre
- **Statistiques** — 11 métriques (épisodes/jour, heures, note moyenne, jours de membre…)
- **Paramètres** — thème, autoplay, notifications, profil public, toggle switches
- **Export/Import** — sauvegarde JSON de toutes les données
- **Synchronisation** — localStorage ↔ Firestore (merge intelligent)

### 🗞️ Actualités
- **12 actualités** en fallback immédiat
- **Flux RSS live** — Anime News Network chargé en arrière-plan

### 📡 Planning saison
- **Filtrable par jour** — Lundi à Dimanche
- **Données live** — saison en cours depuis Jikan API

### 📱 PWA & Performance
- **Service Worker** — mode hors-ligne, cache automatique
- **Installable** — manifest.json, icône, raccourcis
- **Responsive** — mobile, tablette, desktop
- **Thème clair/sombre** — mémorisé entre les sessions

---

Akrya/
├── README.md           # Documentation
├── calendar-data.js    # Calendrier AniList temps réel
├── detail.html         # Détail anime/manga/webtoon + épisodes + recommandations
├── firebase-config.js  # Firebase init unique + helpers auth
├── index.html          # Page d'accueil — 5 onglets, 3 catégories
├── main.js             # Service Worker + bannière offline
├── manifest.json       # PWA manifest
├── offline.html        # Page hors-ligne
├── profile.html        # Profil — favoris, historique, stats, paramètres
├── script.js           # Catalogue, recherche, top, news
├── style.css           # Styles globaux
├── sw.js               # Service Worker v3
└── watch.html          # Lecteur vidéo — 12 sources, sidebar paginée

---

## 🛠️ Stack technique

| Couche | Technologie |
|--------|-------------|
| Frontend | HTML5 · CSS3 · JavaScript Vanilla ES2022 |
| Données animes | [Jikan API v4](https://jikan.moe) (REST) |
| Calendrier | [AniList](https://anilist.co) (GraphQL) |
| Authentification | Firebase Auth (Google / Facebook) |
| Base de données | Cloud Firestore |
| Hébergement | GitHub Pages |
| PWA | Service Worker + Web App Manifest |

---

## 📸 Aperçu

| Page | Description |
|------|-------------|
| 🏠 Accueil | Catalogue paginé, filtres genre, 3 thèmes de couleur |
| 📺 Lecteur | Player avec 8 sources, sidebar épisodes, progression |
| 📅 Calendrier | Planning hebdomadaire temps réel AniList |
| 👤 Profil | Dashboard complet avec stats et paramètres |

---

## 🤝 Contribution

Les contributions sont les bienvenues !

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/ma-feature`)
3. Committez vos changements (`git commit -m 'feat: ajouter ...'`)
4. Push sur la branche (`git push origin feature/ma-feature`)
5. Ouvrez une Pull Request

---

## 📄 Licence

Distribué sous licence **MIT**. Voir [`LICENSE`](LICENSE) pour plus d'informations.

---

<div align="center">

Fait avec ❤️ par **Irichi** · [Irichi](https://github.com/hugobonneaupro33-design)

⭐ **Si le projet vous plaît, laissez une étoile !** ⭐

</div>
