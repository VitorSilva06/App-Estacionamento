const CACHE_NAME = 'estacionamento-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './login.html',
  './cadastro.html',
  './css/login.css',
  './css/cadastro.css',
  './backend/login.js',
  './backend/cadastro.js'
];

// Instala e adiciona arquivos ao cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Intercepta requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Atualiza cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.map((key) => {
        if (key !== CACHE_NAME) return caches.delete(key);
      })
    ))
  );
});
