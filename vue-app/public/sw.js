/*
  A small service worker so repeat visits load from the browser's cache:
  - pages: network first (always the latest version), cached copy when offline
  - built JS/CSS/SVG (their names change with every build): cache first
  - paintings and Google Fonts: served from cache at once, refreshed in the background
  Sketchfab's 3D viewers are left alone (they manage their own caching).
*/
const CACHE = "epic-voices-v1";
const SCOPE = new URL(self.registration.scope);

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) =>
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  )
);

const keep = (res) => res && (res.ok || res.type === "opaque");

async function networkFirst(req) {
  const cache = await caches.open(CACHE);
  try {
    const res = await fetch(req);
    if (res.ok) cache.put(SCOPE.href, res.clone()); // every route is the same app page
    return res;
  } catch {
    return (await cache.match(SCOPE.href)) || Response.error();
  }
}

async function cacheFirst(req) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (keep(res)) cache.put(req, res.clone());
  return res;
}

async function staleWhileRevalidate(req, event) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(req);
  const update = fetch(req)
    .then((res) => {
      if (keep(res)) cache.put(req, res.clone());
      return res;
    })
    .catch(() => hit || Response.error());
  if (hit) {
    event.waitUntil(update);
    return hit;
  }
  return update;
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  if (req.mode === "navigate" && url.origin === SCOPE.origin) return event.respondWith(networkFirst(req));

  if (url.origin === SCOPE.origin && url.pathname.startsWith(SCOPE.pathname)) {
    const path = url.pathname.slice(SCOPE.pathname.length);
    if (path.startsWith("assets/img/")) return event.respondWith(staleWhileRevalidate(req, event));
    if (path.startsWith("assets/")) return event.respondWith(cacheFirst(req));
    return;
  }

  if (url.hostname === "fonts.gstatic.com") return event.respondWith(cacheFirst(req));
  if (url.hostname === "fonts.googleapis.com") return event.respondWith(staleWhileRevalidate(req, event));
});
