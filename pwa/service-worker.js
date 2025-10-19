// Advanced service worker: precache essential shell, runtime caching with
// stale-while-revalidate for data & CDN assets, offline fallback.
// Increment version to force update.
const VERSION = 'v2';
const PRECACHE = `vsa-precache-${VERSION}`;
const RUNTIME = `vsa-runtime-${VERSION}`;
const DATA_CACHE = `vsa-data-${VERSION}`;

// Shell resources (small, critical)
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(PRECACHE).then(cache => cache.addAll(PRECACHE_URLS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter(k => ![PRECACHE, RUNTIME, DATA_CACHE].includes(k)).map(k => caches.delete(k))
      );
      // Claim to control open clients immediately.
      self.clients.claim();
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

  // Same-origin static assets (JS, CSS)
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then(cached => {
        const fetchPromise = fetch(request)
          .then(resp => {
            if (resp && resp.status === 200) {
              caches.open(RUNTIME).then(cache => cache.put(request, resp.clone()));
            }
            return resp;
          })
          .catch(() => cached);
        return cached || fetchPromise;
      })
    );
    return;
  }
});

// Optional: listen for skipWaiting message from app for manual update triggers
self.addEventListener('message', event => {
  if (event.data === 'vsa-skip-waiting') {
    self.skipWaiting();
  }
});
