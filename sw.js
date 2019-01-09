self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("password-static-v1").then(cache => {
      cache.addAll([
        "/index.htm",
        "/script.js",
        "/style.css",
        "/animate.min.css",
        "/bootstrap.min.css",
        "/jquery.min.js",
        "/img/favicon.ico",
        "/img/favicon.png"
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
