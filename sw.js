// STILL: service worker. Rende l'app installabile e la fa funzionare anche senza internet.
// - File dell'app: prima la rete (così gli aggiornamenti arrivano subito), se offline la copia salvata.
// - Vue, Tailwind, font e pdf.js sono salvati nell'app stessa (js/vendor, css/tailwind.css, assets/fonts).
// - Eventuali file di altri siti: la copia salvata, aggiornata in background.
// Quando si aggiungono file all'app, aggiungerli a APP_FILES e cambiare VERSION.
// pdf.js (js/vendor/pdfjs, ~1,4 MB) non è in elenco: viene salvato la prima volta che si importa una dieta.
const VERSION = 'still-v8';
const APP_FILES = [
  './',
  'index.html',
  'manifest.webmanifest',
  'css/tailwind.css',
  'css/style.css',
  'js/vendor/vue.global.prod.js',
  'assets/fonts/plus-jakarta-sans-latin-normal.woff2',
  'assets/fonts/plus-jakarta-sans-latin-italic.woff2',
  'assets/fonts/plus-jakarta-sans-latin-ext-normal.woff2',
  'js/utils/format.js',
  'js/utils/calories.js',
  'js/data/foods.js',
  'js/import/diet-pdf.js',
  'js/data/quotes.js',
  'js/data/trophies.js',
  'js/data/exercises.js',
  'js/data/pets.js',
  'js/share/draw.js',
  'js/app.js',
  'assets/LOGO.svg',
  'assets/icon-192.png',
  'assets/icon-512.png',
  'assets/apple-touch-icon.png'
];
const LIBS = [];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    // Uno alla volta: se un file manca, gli altri vengono salvati lo stesso
    await Promise.all([...APP_FILES, ...LIBS].map(url =>
      fetch(url, { mode: url.startsWith('http') ? 'no-cors' : 'same-origin' })
        .then(res => (res.ok || res.type === 'opaque') ? cache.put(url, res) : null)
        .catch(() => null)));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (!/^https?:$/.test(url.protocol)) return;

  if (url.origin === self.location.origin) {
    // App: rete, poi copia salvata
    event.respondWith((async () => {
      const cache = await caches.open(VERSION);
      try {
        const res = await fetch(req);
        if (res.ok) cache.put(req, res.clone());
        return res;
      } catch (e) {
        const hit = await cache.match(req, { ignoreSearch: true });
        if (hit) return hit;
        if (req.mode === 'navigate') return (await cache.match('index.html')) || (await cache.match('./'));
        throw e;
      }
    })());
    return;
  }

  // Librerie e font: copia salvata subito, aggiornata in background
  event.respondWith((async () => {
    const cache = await caches.open(VERSION);
    const hit = await cache.match(req);
    const update = fetch(req).then(res => {
      if (res.ok || res.type === 'opaque') cache.put(req, res.clone());
      return res;
    }).catch(() => null);
    if (hit) { event.waitUntil(update); return hit; }
    const res = await update;
    return res || Response.error();
  })());
});
