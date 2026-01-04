/// <reference lib="webworker" />
// Advanced service worker: precache shell + runtime caching (stale-while-revalidate), offline fallback, update lifecycle.
// NOTE: This file is TypeScript; Vite will bundle/emit JS automatically.

const swScope = self as unknown as ServiceWorkerGlobalScope;

const SW_VERSION = "v2";
const SW_PRECACHE = `vsa-precache-${SW_VERSION}`;
const SW_RUNTIME = `vsa-runtime-${SW_VERSION}`;
const SW_DATA_CACHE = `vsa-data-${SW_VERSION}`;

const SW_PRECACHE_URLS: string[] = ["./", "./index.html", "./manifest.json"];

swScope.addEventListener("install", (event: ExtendableEvent) => {
  swScope.skipWaiting();
  event.waitUntil(
    caches.open(SW_PRECACHE).then((cache) => cache.addAll(SW_PRECACHE_URLS))
  );
});

swScope.addEventListener("activate", (event: ExtendableEvent) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => ![SW_PRECACHE, SW_RUNTIME, SW_DATA_CACHE].includes(k))
          .map((k) => caches.delete(k))
      );
      swScope.clients.claim();
    })()
  );
});

async function swStaleWhileRevalidate(
  request: Request,
  cacheName: string
): Promise<Response> {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  try {
    const resp = await fetch(request);
    if (resp && resp.status === 200) {
      cache.put(request, resp.clone());
    }
    return resp;
  } catch (e) {
    if (cached) return cached;
    return new Response("Offline", { status: 503 });
  }
}

swScope.addEventListener("fetch", (event: FetchEvent) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);

  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          return await fetch(request);
        } catch {
          return (
            (await caches.match("./index.html")) ||
            new Response("Offline", { status: 503 })
          );
        }
      })()
    );
    return;
  }

  if (url.pathname.endsWith("/data/steels.json")) {
    event.respondWith(swStaleWhileRevalidate(request, SW_DATA_CACHE));
    return;
  }

  if (url.hostname.includes("cdn.jsdelivr.net")) {
    event.respondWith(swStaleWhileRevalidate(request, SW_RUNTIME));
    return;
  }

  if (url.origin === self.location.origin) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(SW_RUNTIME);
        const cached = await cache.match(request);
        try {
          const resp = await fetch(request);
          if (resp && resp.status === 200) {
            cache.put(request, resp.clone());
          }
          return resp;
        } catch {
          return cached || new Response("Offline", { status: 503 });
        }
      })()
    );
  }
});

swScope.addEventListener("message", (event: ExtendableMessageEvent) => {
  if (event.data === "vsa-skip-waiting") {
    swScope.skipWaiting();
  }
});
