// Car Events Near Me — service worker (offline-capable app shell)
const CACHE = "cenm-v1";
const ASSETS = ["/", "/icon.svg", "/manifest.webmanifest", "/apple-icon.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return; // never cache POSTs (checkout/api)
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // leave event photos & Supabase alone

  // Navigations: network-first so event data stays fresh, fall back to cache/home when offline.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((m) => m || caches.match("/")))
    );
    return;
  }

  // Same-origin static assets: cache-first.
  e.respondWith(
    caches.match(req).then((m) =>
      m ||
      fetch(req).then((res) => {
        if (res.ok && (url.pathname.startsWith("/_next/") || ASSETS.includes(url.pathname))) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      })
    )
  );
});
