// Service Worker pour PWA hors connexion
const CACHE_NAME = 'jeux-plateau-v1.2.1';
const urlsToCache = [
  './',
  './index.html',
  './styles.css',
  './manifest.json',
  './version.json',
  './js/app.js',
  './js/base-game.js',
  './js/tictactoe-game.js',
  './js/checkers-game.js',
  './js/chess-game.js',
  './js/backgammon-game.js',
  './js/ludo-game.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
