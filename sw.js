// CECI EST MON SERVICE WORKER //
const version = 1.1;
const staticAssets = ["/", "/index.html", "/css/style.css", "/js/main.js"];

/* INSTALLATION */
self.addEventListener("install", ev => {
  console.log("service worker installed !");

  //CASHING RESSOURCES STATIQUES
  ev.waitUntil(
    caches.open("static_V1").then(cache => {
      cache.addAll(staticAssets);
      console.log("ressources mise en cache");
    })
  );
});

/* ACTIVATION */
self.addEventListener("activate", ev => {
  console.log("Service worker activé");
});

/* FETCH */
self.addEventListener("fetch", ev => {
  console.log("Fetch Request: ", ev.request);
  ev.respondWith(
    caches.match(ev.request).then(result => {
      return result || fetch(ev.request).catch(() => {});
    })
  );
});
