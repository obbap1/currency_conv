let P_BABA = 'my-site-cache-v3';
let urlsToCache = [
    './',
    './index.html',
    './main.js',
    './app.js',
    'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js'

];

self.addEventListener('install', function(event) {
    console.log("[ServiceWorker] installed");

    event.waitUntil(

        caches.open(P_BABA)
            .then(cache=>{
                console.log("[ServiceWorker] caching cache files");
                return cache.addAll(urlsToCache);
            })
    )
});

self.addEventListener('activate', function(event) {
    console.log("[ServiceWorker] activated");

    event.waitUntil(
        caches.keys().then(cacheNames=>{
            return Promise.all(cacheNames.map((thisCacheName)=>{
                if(thisCacheName !== P_BABA) {
                    console.log("[ServiceWorker] deleting old cache");
                    return caches.delete(thisCacheName);
                }
            }))
        })
    )
});

self.addEventListener('fetch', function(event) {
    console.log("[ServiceWorker] fetched",event.request.url);

    event.respondWith(

        caches.match(event.request)
            .then(response=>{
                if(response){
                    console.log("[ServiceWorker] found in the cache");
                    return response;
                }

                let requestClone = event.request.clone();

                fetch(requestClone)
                    .then(response=>{
                        if(!response) {
                            console.log("[ServiceWorker] no response from fetch");
                            return response;
                        }
                        let responseClone = response.clone();
                        
                        caches.open(P_BABA).then(cache=>{
                            console.log("[ServiceWorker] NEW Data New",event.request.url);
                            cache.put(event.request,responseClone);
                            console.log('My cache',P_BABA);
                        })

                    })
                    .catch(err=>{
                        console.log("[ServiceWorker] error",err);
                    })


                return fetch(event.request);
            })
    )

  });
