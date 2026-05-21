// ============================================================
// FIREBASE-CONFIG.JS — Akrya Anime
// ✅ FIX: init Firebase UNE SEULE FOIS avec firebase.apps check
// ✅ FIX: showToast RETIRÉ d'ici (défini dans script.js uniquement)
// ✅ FIX: updateUIBasedOnAuth centralisé pour toutes les pages
// ⚠️  NOTE SÉCURITÉ : Pour la prod, restreindre cette clé dans la
//     Firebase Console (domaines autorisés uniquement).
// ============================================================

const firebaseConfig = {
  apiKey:            "AIzaSyCwDOGPUWQ08WGuAAZ9p6hS6SZytmRoKig",
  authDomain:        "arkya-animemanga.firebaseapp.com",
  projectId:         "arkya-animemanga",
  storageBucket:     "arkya-animemanga.firebasestorage.app",
  messagingSenderId: "52570519836",
  appId:             "1:52570519836:web:dbf4fcd7aafe01aac762d9"
};

// ✅ FIX: guard contre la double initialisation (chargé depuis plusieurs pages)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
let db = null;

try {
  db = firebase.firestore();
  // Persistance hors-ligne (cache local Firestore)
  db.enablePersistence({ synchronizeTabs: true }).catch(err => {
    if (err.code === 'failed-precondition') {
      console.warn('[Firestore] Plusieurs onglets ouverts, persistance désactivée.');
    } else if (err.code === 'unimplemented') {
      console.warn('[Firestore] Persistance non supportée par ce navigateur.');
    }
  });
} catch (e) {
  console.warn('[Firebase] Firestore non disponible:', e.message);
}

// Fournisseurs OAuth
const googleProvider   = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
facebookProvider.setCustomParameters({ display: 'popup' });

let currentUser = null;

// ============================================================
// MISE À JOUR DE L'UI SELON L'ÉTAT AUTH
// Fonctionne sur index.html, profile.html, watch.html, etc.
// ============================================================
function updateUIBasedOnAuth(user) {
  const authDiv  = document.getElementById('authButtons');
  const userDiv  = document.getElementById('userMenu');
  const nameEl   = document.getElementById('userName');
  const avatarEl = document.getElementById('userAvatar');

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
// OBSERVATEUR D'ÉTAT — déclenche la mise à jour UI + Firestore
// ============================================================
auth.onAuthStateChanged(async (user) => {
  currentUser = user;
  updateUIBasedOnAuth(user);
  // Émettre un événement custom pour les scripts qui en ont besoin (profile.js, etc.)
  document.dispatchEvent(new CustomEvent('akrya:authReady', { detail: user }));

  if (user && db) {
    try {
      // Mettre à jour la fiche utilisateur dans Firestore
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
    if (typeof showToast === 'function')
      showToast(`✨ Bienvenue ${result.user.displayName || result.user.email} !`);
  } catch (err) {
    handleAuthError(err);
  }
}

async function loginWithFacebook() {
  try {
    const result = await auth.signInWithPopup(facebookProvider);
    if (typeof showToast === 'function')
      showToast(`✨ Bienvenue ${result.user.displayName || result.user.email} !`);
  } catch (err) {
    handleAuthError(err);
  }
}

async function logout() {
  try {
    await auth.signOut();
    if (typeof showToast === 'function') showToast('🔓 Déconnecté avec succès');
    // Retour accueil si on est sur une page protégée
    if (window.location.pathname.includes('profile.html')) {
      setTimeout(() => { window.location.href = 'index.html'; }, 1500);
    }
  } catch (err) {
    if (typeof showToast === 'function') showToast('❌ Erreur lors de la déconnexion', 'error');
  }
}

function handleAuthError(err) {
  const MESSAGES = {
    'auth/popup-blocked':                     'Popup bloquée. Autorise les popups pour ce site.',
    'auth/popup-closed-by-user':              'Fenêtre fermée avant la connexion.',
    'auth/account-exists-with-different-credential': 'Un compte existe déjà avec cet e-mail.',
    'auth/network-request-failed':            'Erreur réseau. Vérifie ta connexion.',
    'auth/cancelled-popup-request':           'Connexion annulée.',
  };
  const msg = MESSAGES[err.code] || err.message || 'Erreur inconnue';
  console.error('[Auth]', err.code, err.message);
  if (typeof showToast === 'function') showToast(`❌ ${msg}`, 'error');
}

// ============================================================
// UTILITAIRES FIRESTORE — progression & favoris
// ============================================================
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

async function getProgress(contentType, contentId) {
  if (!currentUser || !db) return null;
  try {
    const doc = await db.collection('users').doc(currentUser.uid).get();
    return doc.exists ? (doc.data()?.progress?.[contentType]?.[contentId] ?? null) : null;
  } catch (_) {
    return null;
  }
}

async function getFavorites() {
  if (!currentUser || !db) {
    // Fallback localStorage si pas connecté
    return JSON.parse(localStorage.getItem('akrya_favorites') || '[]');
  }
  try {
    const doc = await db.collection('users').doc(currentUser.uid).get();
    return doc.exists ? (doc.data()?.favorites || []) : [];
  } catch (_) {
    return JSON.parse(localStorage.getItem('akrya_favorites') || '[]');
  }
}

async function saveFavorites(favorites) {
  // Toujours sauvegarder en local pour la cohérence offline
  localStorage.setItem('akrya_favorites', JSON.stringify(favorites));
  if (!currentUser || !db) return;
  try {
    await db.collection('users').doc(currentUser.uid).set({ favorites }, { merge: true });
  } catch (e) {
    console.warn('[Firestore] saveFavorites:', e.message);
  }
}

// ============================================================
// EXPORTS GLOBAUX
// ============================================================
window.loginWithGoogle   = loginWithGoogle;
window.loginWithFacebook = loginWithFacebook;
window.logout            = logout;
window.saveProgress      = saveProgress;
window.getProgress       = getProgress;
window.getFavorites      = getFavorites;
window.saveFavorites     = saveFavorites;

// Rendre currentUser accessible partout (lecture seule via getter)
Object.defineProperty(window, 'currentUser', {
  get: () => currentUser,
  configurable: true
});

console.log('✅ firebase-config.js chargé — projet: arkya-animemanga');
