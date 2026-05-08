/**
 * Kawa i Ciasteczko – Service Worker
 * Strategie cachowania:
 *  - Precache (instalacja): strony głównej + assetów krytycznych
 *  - Cache First: statyczne assety (obrazy, fonty, CSS, JS)
 *  - Network First: nawigacja (fallback do cache offline)
 *  - Cache tylko: manifest, ikony SW
 */

const CACHE_VERSION = "v1";
const STATIC_CACHE = `kawiarnia-static-${CACHE_VERSION}`;
const NAV_CACHE = `kawiarnia-navigation-${CACHE_VERSION}`;

const PRECACHE_URLS = [
  "/",
  "/manifest.json",
  "/icons/icon-192.svg",
  "/icons/icon-512.svg",
];

// Pliki, które pobieramy z sieci (Cache First)
const CACHE_FIRST_EXTENSIONS = [
  ".svg",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".ico",
  ".woff2",
  ".woff",
  ".ttf",
  ".css",
  ".js",
];

// ---- Instalacja - precache ----
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    }).then(() => {
      self.skipWaiting();
    })
  );
});

// ---- Aktywacja - czyszczenie starych cache'y ----
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => {
            return (
              name.startsWith("kawiarnia-") && name !== STATIC_CACHE && name !== NAV_CACHE
            );
          })
          .map((name) => caches.delete(name))
      );
    }).then(() => {
      self.clients.claim();
    })
  );
});

// ---- Pomocnik: czy URL ma rozszerzenie z listy Cache First ----
function hasCacheFirstExtension(url) {
  return CACHE_FIRST_EXTENSIONS.some((ext) => url.pathname.endsWith(ext));
}

// ---- Pomocnik: odpowiedź z cache lub fallback ----
function fromCacheOrFallback(request, cacheName) {
  return caches.open(cacheName).then((cache) => {
    return cache.match(request).then((cached) => {
      return cached || Promise.reject("no-match");
    });
  });
}

// ---- Fetch ----
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Tylko requesty z naszej domeny (same-origin)
  if (url.origin !== self.location.origin) return;

  // Nie cache'ujemy żądań do Next.js API ani _next/data (prefetch)
  if (url.pathname.startsWith("/_next/data")) return;

  // 1. Cache First dla assetów statycznych (CSS, JS, obrazki, fonty)
  if (hasCacheFirstExtension(url)) {
    event.respondWith(
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.match(request).then((cached) => {
          if (cached) return cached;
          return fetch(request).then((networkResponse) => {
            if (networkResponse && networkResponse.ok) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => {
            // Jeśli sieć i cache nie działają – pusty fallback
            return new Response("", { status: 408, statusText: "Offline" });
          });
        });
      })
    );
    return;
  }

  // 2. Network First dla nawigacji (strony HTML)
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.ok) {
          const clone = networkResponse.clone();
          caches.open(NAV_CACHE).then((cache) => cache.put(request, clone));
        }
        return networkResponse;
      }).catch(() => {
        return fromCacheOrFallback(request, NAV_CACHE).catch(() => {
          // Fallback do precache – strona główna
          return fromCacheOrFallback("/", STATIC_CACHE).catch(() => {
            return new Response("Offline", { status: 408 });
          });
        });
      })
    );
    return;
  }

  // 3. Dla pozostałych (manifest, same SW) – Network Only z fallback do cache
  event.respondWith(
    fetch(request).catch(() => {
      return fromCacheOrFallback(request, STATIC_CACHE).catch(() => {
        return new Response("", { status: 408 });
      });
    })
  );
});
