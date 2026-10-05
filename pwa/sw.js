/* Parigi 2027 — service worker
   - dopo la prima apertura tutto funziona offline
   - la pagina (index.html) è "rete prima, cache se offline": una versione nuova arriva al primo avvio con rete
   - icone, immagini e manifest sono "cache prima" con aggiornamento in background
   AD OGNI PUBBLICAZIONE: incrementare CACHE (v2, v3…) insieme ad APP_VER in index.html */
var CACHE = "parigi2027-v3";
var ASSETS = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-180.png", "./face_sx.webp", "./face_dx.webp"];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return Promise.all(ASSETS.map(function (u) {
        return fetch(u, { cache: "reload" }).then(function (res) {
          if (!res || !res.ok) throw new Error("fetch " + u);
          return c.put(u, res);
        });
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("notificationclick", function (e) {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (cs) {
    if (cs.length) return cs[0].focus();
    return clients.openWindow("./");
  }));
});

self.addEventListener("message", function (e) {
  if (e.data && e.data.type === "SKIP_WAITING") self.skipWaiting();
});

function isPage(req, url) {
  return req.mode === "navigate" || url.pathname.endsWith("/") || url.pathname.endsWith("/index.html");
}

self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  var url = new URL(e.request.url);
  if (url.origin !== location.origin) return; /* link di prenotazione e video Instagram vanno in rete */

  if (isPage(e.request, url)) {
    e.respondWith(
      fetch(e.request, { cache: "no-store" }).then(function (res) {
        if (res && res.ok) { var cl = res.clone(); caches.open(CACHE).then(function (c) { c.put("./index.html", cl); }); }
        return res;
      }).catch(function () {
        return caches.match("./index.html").then(function (hit) { return hit || caches.match("./"); });
      })
    );
    return;
  }

  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(function (hit) {
      var net = fetch(e.request).then(function (res) {
        if (res && res.ok) { var cl = res.clone(); caches.open(CACHE).then(function (c) { c.put(e.request, cl); }); }
        return res;
      });
      if (hit) { net.catch(function () {}); return hit; }
      return net.catch(function () { return caches.match("./index.html"); });
    })
  );
});
