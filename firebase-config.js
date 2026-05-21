// ============================================================
// FIREBASE-CONFIG.JS — Akrya Anime v3
// Fusion complète v1 (auth centralisé) + v3 (helpers Firestore)
// TOUTES les fonctionnalités conservées
// ============================================================

// ============================================================
// CONFIGURATION
// ⚠️ Restreindre cette clé dans la Firebase Console
//    (domaines autorisés uniquement) avant mise en production.
// ============================================================
const firebaseConfig = {
  apiKey:            "AIzaSyCwDOGPUWQ08WGuAAZ9p6hS6SZytmRoKig",
  authDomain:        "arkya-animemanga.firebaseapp.com",
  projectId:         "arkya-animemanga",
  storageBucket:     "arkya-animemanga.firebasestorage.app",
  messagingSenderId: "52570519836",
  appId:             "1:52570519836:web:dbf4fcd7aafe01aac762d9"
};

// ============================================================
// INITIALISATION
// Guard contre la double initialisation si le fichier est chargé
// plusieurs fois (plusieurs pages ouvertes, hot-reload…)
// ============================================================
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
let db = null;

try {
  db = firebase.firestore();

  // Persistance hors-ligne : les données Firestore restent
  // accessibles même sans connexion (cache IndexedDB local)
  db.enablePersistence({ synchronizeTabs: true }).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('[Firestore] Plusieurs onglets ouverts — persistance désactivée.');
    } else if (err.code === 'unimplemented') {
      console.warn('[Firestore] Persistance non supportée par ce navigateur.');
    }
  });
} catch (e) {
  console.warn('[Firebase] Firestore non disponible:', e.message);
}

// ============================================================
// FOURNISSEURS OAUTH
// ============================================================
const googleProvider   = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

// Force le sélecteur de compte Google à chaque connexion
googleProvider.setCustomParameters({ prompt: 'select_account' });
// Affiche la popup Facebook en mode popup natif
facebookProvider.setCustomParameters({ display: 'popup' });

// ============================================================
// ÉTAT GLOBAL
// currentUser est accessible depuis toutes les pages via window.currentUser
// ============================================================
let currentUser = null;

// ============================================================
// MISE À JOUR DE L'UI SELON L'ÉTAT AUTH
// Compatible avec : index.html, watch.html, detail.html, profile.html…
// Cherche les IDs standards : authButtons / userMenu / userName / userAvatar
// ============================================================
function updateUIBasedOnAuth(user) {
  const authDiv  = document.getElementById('authButtons');
  const userDiv  = document.getElementById('userMenu');
  const nameEl   = document.getElementById('userName');
  const avatarEl = document.getElementById('userAvatar');

  // Si la page n'a pas ces éléments, on ne fait rien
  if (!authDiv || !userDiv) return;

  if (user) {
    authDiv.style.display = 'none';
    userDiv.style.display = 'flex';
    if (nameEl)   nameEl.textContent = user.displayName || user.email?.split('@')[0] || 'Utilisateur';
    if (avatarEl && user.photoURL) avatarEl.src = user.photoURL;
  } else {
    authDiv.style.display = 'flex';
    userDiv.style.display = 'none';
  }
}

// ============================================================
// OBSERVATEUR D'ÉTAT AUTH
// Se déclenche à chaque changement (connexion, déconnexion, refresh)
// ============================================================
auth.onAuthStateChanged(async (user) => {
  currentUser = user;

  // Mise à jour de l'interface sur toutes les pages
  updateUIBasedOnAuth(user);

  // Événement custom pour les scripts qui attendent que Firebase soit prêt
  // Usage : document.addEventListener('akrya:authReady', (e) => { ... })
  document.dispatchEvent(new CustomEvent('akrya:authReady', { detail: user }));

  if (user && db) {
    try {
      // Mise à jour de la fiche utilisateur dans Firestore
      // merge:true garantit qu'on n'écrase pas les autres champs (favoris, etc.)
      await db.collection('users').doc(user.uid).set({
        email:       user.email,
        displayName: user.displayName,
        photoURL:    user.photoURL,
        lastLogin:   firebase.firestore.FieldValue.serverTimestamp(),
        loginCount:  firebase.firestore.FieldValue.increment(1)
      }, { merge: true });
    } catch (e) {
      console.warn('[Firestore] Mise à jour profil échouée:', e.message);
    }
  }
});

// ============================================================
// FONCTIONS AUTH GLOBALES
// ============================================================

async function loginWithGoogle() {
  try {
    const result = await auth.signInWithPopup(googleProvider);
    if (typeof showToast === 'function') {
      showToast(`✨ Bienvenue ${result.user.displayName || result.user.email} !`);
    }
    return result;
  } catch (err) {
    handleAuthError(err);
  }
}

async function loginWithFacebook() {
  try {
    const result = await auth.signInWithPopup(facebookProvider);
    if (typeof showToast === 'function') {
      showToast(`✨ Bienvenue ${result.user.displayName || result.user.email} !`);
    }
    return result;
  } catch (err) {
    handleAuthError(err);
  }
}

async function logout() {
  try {
    await auth.signOut();
    if (typeof showToast === 'function') showToast('🔓 Déconnecté avec succès');
    // Redirection automatique si on est sur une page protégée
    if (window.location.pathname.includes('profile.html')) {
      setTimeout(() => { window.location.href = 'index.html'; }, 1500);
    }
  } catch (err) {
    if (typeof showToast === 'function') showToast('❌ Erreur lors de la déconnexion', 'error');
  }
}

// ============================================================
// GESTION DES ERREURS AUTH
// ============================================================
function handleAuthError(err) {
  const MESSAGES = {
    'auth/popup-blocked':                              'Popup bloquée. Autorise les popups pour ce site.',
    'auth/popup-closed-by-user':                       'Fenêtre fermée avant la connexion.',
    'auth/account-exists-with-different-credential':   'Un compte existe déjà avec cet e-mail.',
    'auth/network-request-failed':                     'Erreur réseau. Vérifie ta connexion.',
    'auth/cancelled-popup-request':                    'Connexion annulée.',
    'auth/user-disabled':                              'Ce compte a été désactivé.',
    'auth/too-many-requests':                          'Trop de tentatives. Réessaie plus tard.',
  };
  const msg = MESSAGES[err.code] || err.message || 'Erreur inconnue';
  console.error('[Auth]', err.code, err.message);
  if (typeof showToast === 'function') showToast(`❌ ${msg}`, 'error');
}

// ============================================================
// UTILITAIRES FIRESTORE — Progression de visionnage
// ============================================================

// Sauvegarde la progression (dernier épisode vu) dans Firestore
async function saveProgress(contentType, contentId, episode) {
  if (!currentUser || !db) return;
  try {
    await db.collection('users').doc(currentUser.uid).set({
      [`progress.${contentType}.${contentId}`]: episode,
      lastWatched: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
  } catch (e) {
    console.warn('[Firestore] saveProgress:', e.message);
  }
}

// Récupère la progression sauvegardée pour un contenu donné
async function getProgress(contentType, contentId) {
  if (!currentUser || !db) return null;
  try {
    const doc = await db.collection('users').doc(currentUser.uid).get();
    return doc.exists
      ? (doc.data()?.progress?.[contentType]?.[contentId] ?? null)
      : null;
  } catch (_) {
    return null;
  }
}

// ============================================================
// UTILITAIRES FIRESTORE — Favoris
// ============================================================

// Récupère les favoris (Firestore si connecté, sinon localStorage)
async function getFavorites() {
  if (!currentUser || !db) {
    return JSON.parse(localStorage.getItem('akrya_fav') || '[]');
  }
  try {
    const doc = await db.collection('users').doc(currentUser.uid).get();
    return doc.exists ? (doc.data()?.favorites || []) : [];
  } catch (_) {
    return JSON.parse(localStorage.getItem('akrya_fav') || '[]');
  }
}

// Sauvegarde les favoris dans localStorage ET Firestore
async function saveFavorites(favorites) {
  // localStorage en premier — disponible immédiatement même offline
  localStorage.setItem('akrya_fav', JSON.stringify(favorites));
  if (!currentUser || !db) return;
  try {
    await db.collection('users').doc(currentUser.uid).set(
      { favorites },
      { merge: true }
    );
  } catch (e) {
    console.warn('[Firestore] saveFavorites:', e.message);
  }
}

// ============================================================
// TOKEN AUTH (pour appels API authentifiés si besoin)
// ============================================================
async function getAuthToken() {
  return currentUser ? await currentUser.getIdToken() : null;
}

// ============================================================
// EXPORTS GLOBAUX
// Toutes ces fonctions sont accessibles depuis n'importe quelle page
// ============================================================
window.loginWithGoogle   = loginWithGoogle;
window.loginWithFacebook = loginWithFacebook;
window.logout            = logout;
window.saveProgress      = saveProgress;
window.getProgress       = getProgress;
window.getFavorites      = getFavorites;
window.saveFavorites     = saveFavorites;
window.getAuthToken      = getAuthToken;

// currentUser accessible en lecture seule depuis toutes les pages
// Usage : if (window.currentUser) { ... }
Object.defineProperty(window, 'currentUser', {
  get: () => currentUser,
  configurable: true
});

console.log('✅ firebase-config.js chargé — projet: arkya-animemanga');
