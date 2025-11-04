// Service Worker pour PWA hors connexion
// Version 1.4.15 - Créée par AWS-Kiro
const CACHE_NAME = 'jeux-plateau-v1.4.18';
const urlsToCache = [
  './',
  './index.html',
  './styles.css',
  './manifest.json',
  './version.json',
  './logo.svg',
  './logo.png',
  './icon-192.png',
  './icon-512.png',
  './js/app.js',
  './js/base-game.js',
  './js/game-framework.js',
  './js/tictactoe-game.js',
  './js/checkers-game.js',
  './js/chess-game.js',
  './js/backgammon-game.js',
  './js/ludo-game.js',
  './js/abalone-game.js'
];

self.addEventListener('install', event => {
  // Forcer l'activation immédiate du nouveau service worker
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Mise en cache des fichiers:', urlsToCache);
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Erreur lors de la mise en cache:', error);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si on a une version en cache, on la retourne
        // Mais on lance aussi une requête réseau pour vérifier les mises à jour
        if (response) {
          // Vérifier si c'est un fichier de l'application
          const url = new URL(event.request.url);
          const isAppFile = urlsToCache.some(cachedUrl => 
            url.pathname.endsWith(cachedUrl.replace('./', ''))
          );
          
          if (isAppFile) {
            // Pour les fichiers de l'app, on vérifie s'il y a une nouvelle version
            fetch(event.request)
              .then(fetchResponse => {
                if (fetchResponse && fetchResponse.status === 200) {
                  const responseClone = fetchResponse.clone();
                  caches.open(CACHE_NAME)
                    .then(cache => cache.put(event.request, responseClone));
                }
              })
              .catch(() => {
                // Ignorer les erreurs réseau, on garde la version en cache
              });
          }
          
          return response;
        }
        
        // Si pas en cache, récupérer depuis le réseau
        return fetch(event.request)
          .then(fetchResponse => {
            // Vérifier si c'est une réponse valide
            if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
              return fetchResponse;
            }
            
            // Cloner la réponse car elle ne peut être consommée qu'une fois
            const responseToCache = fetchResponse.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, responseToCache));
            
            return fetchResponse;
          });
      })
  );
});

self.addEventListener('activate', event => {
  // Prendre le contrôle immédiatement
  event.waitUntil(
    Promise.all([
      // Supprimer les anciens caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log('Suppression ancien cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Prendre le contrôle de tous les clients
      self.clients.claim()
    ])
  );
});

// Écouter les messages du client pour forcer la mise à jour
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
      }).then(() => {
        event.ports[0].postMessage({ success: true });
      })
    );
  }
});
