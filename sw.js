var staticCacheName = "password-static-v3";

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(staticCacheName).then(cache => {
      cache.addAll([
        "index.htm",
        "script.js",
        "app.js",
        "style.css",
        "animate.min.css",
        "bootstrap.min.css",
        "sweetalert.min.js",
        "jquery.min.js",
        "img/favicon.ico",
        "img/favicon.png",
        "img/original.jpeg"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});


self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      cacheNames
        .filter(cacheName => {
          return (
            cacheName.startsWith("password-") && cacheName != staticCacheName
          );
        })
        .map(cacheName => {
          return caches.delete(cacheName);
        });
    })
  );
});

self.addEventListener("message", event => {
  if(event.data.action == 'Update'){
    self.skipWaiting();
  }
});
