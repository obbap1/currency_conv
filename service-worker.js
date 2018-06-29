let P_BABA = 'my-site-cache-v1';
let urlsToCache = [
    '/'
];

self.addEventListener('install', function(event) {
    console.log(event);
    event.waitUntil(
        caches.open(P_BABA)
            .then(cache=>{
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    )
});

self.addEventListener('activate', function(event) {
    // Perform some task
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            console.log('response',response);
            return response;
          }
          return fetch(event.request);
        }
      )
    );
  });
