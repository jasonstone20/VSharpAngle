// Advanced service worker: precache essential shell, runtime caching with
// stale-while-revalidate for data & CDN assets, offline fallback.
// Increment version to force update.
const VERSION = 'v3';
const PRECACHE = `vsa-precache-${VERSION}`;
const RUNTIME = `vsa-runtime-${VERSION}`;
const DATA_CACHE = `vsa-data-${VERSION}`;

// Shell resources (small, critical)
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json'
];

// Install: pre-cache shell but DO NOT force skipWaiting; let user trigger activation
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE).then(cache => cache.addAll(PRECACHE_URLS))
  );
});

// Activate: clean old caches; do NOT clients.claim automatically to avoid race reload loops
self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter(k => ![PRECACHE, RUNTIME, DATA_CACHE].includes(k)).map(k => caches.delete(k))
      );
    })()
  );
});

// Helper: stale-while-revalidate
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const networkPromise = fetch(request)
    .then(resp => {
      if (resp && resp.status === 200) {
        cache.put(request, resp.clone());
      }
      return resp;
    })
    .catch(() => cached);
  return cached || networkPromise;
}

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  // Navigation: serve network first, fallback to cached shell.
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const resp = await fetch(request);
          return resp;
        } catch {
          return (await caches.match('./index.html')) || new Response('Offline', { status: 503 });
        }
      })()
    );
    return;
  }

  // Data cache (steel dataset)
  if (url.pathname.endsWith('/data/steels.json')) {
    event.respondWith(staleWhileRevalidate(request, DATA_CACHE));
    return;
  }

  // Shoelace CDN & other external static assets: cache first then revalidate
  if (url.hostname.includes('cdn.jsdelivr.net')) {
    event.respondWith(staleWhileRevalidate(request, RUNTIME));
    return;
  }

  // Same-origin static assets (JS, CSS, built chunks)
  if (url.origin === self.location.origin) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(RUNTIME);
        const cached = await cache.match(request);
        try {
          const network = await fetch(request);
          if (network && network.status === 200) {
            // Put a single clone into cache; return original
            cache.put(request, network.clone());
          }
          return cached || network;
        } catch (err) {
          return cached || new Response('Offline', { status: 503 });
        }
      })()
    );
    return;
  }
});

// Optional: listen for skipWaiting message from app for manual update triggers
// Controlled update: when app explicitly requests activation, perform skipWaiting then claim
self.addEventListener('message', event => {
  if (event.data === 'vsa-skip-waiting') {
    self.skipWaiting();
    // After waiting skipped, next activate will fire; optionally claim here after short delay
    setTimeout(() => self.clients.claim(), 100);
  }
});
