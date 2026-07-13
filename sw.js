/* Lúdica Lab — Service Worker: instalable + carga instantánea (cache-first). */
const CACHE = 'ludica-v5';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './assets/logo.png',
  './assets/favicon.png',
  './assets/fonts/space-mono-latin-400-normal.woff2',
  './assets/fonts/space-mono-latin-700-normal.woff2'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(() => {}).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  // Solo cachea el mismo origen; las imágenes/videos externos van directo a la red.
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  // El portafolio (archivo único muy pesado) va directo a la red, sin caché.
  if (url.pathname.includes('/portafolio/')) return;
  e.respondWith(
    caches.match(req).then(hit => {
      if (hit) return hit;
      return fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => hit);
    })
  );
});
