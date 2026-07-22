// Car Events Near Me — service worker (offline-capable app shell)
// v2: pages are always network-first and only OK responses are cached, so a
// bad response (e.g. a transient 404) can never get pinned and served stale.
// Bumping the cache name purges the old v1 cache (which had cached broken
// pages) on every client's next visit — this self-heals stale installs.
const CACHE = "cenm-v2";
const ASSETS = ["/icon.svg", "/manifest.webmanifest", "/apple-icon.png"];

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
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Immutable build assets: safe to serve cache-first.
  const isStaticAsset =
    url.pathname.startsWith("/_next/static/") || ASSETS.includes(url.pathname);
  if (isStaticAsset) {
    e.respondWith(
      caches.match(req).then((m) =>
        m ||
        fetch(req).then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
      )
    );
    return;
  }

  // Everything else (pages, event details, API, data): always go to the
  // network. Cache only successful navigations, purely as an offline fallback.
  e.respondWith(
    fetch(req)
      .then((res) => {
        if (req.mode === "navigate" && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      })
      .catch(() =>
        req.mode === "navigate"
          ? caches.match(req).then((m) => m || caches.match("/"))
          : Response.error()
      )
  );
});
