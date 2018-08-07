let cacheStorageName = 'restaurant-cache-no';
let cacheStorageNumber = 1;
cacheStorageName += cacheStorageNumber;
//console.log(cacheStorageName);

//Cache all required code to work offline
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(cacheStorageName).then(function(cache) {
    return cache.addAll([
      '/',
      '/index.html',
      '/restaurant.html',
      '/css/styles.css',
      '/js/dbhelper.js',
      '/js/main.js',
      '/js/restaurant_info.js',
      '/img/1.jpg',
      '/img/2.jpg',
      '/img/3.jpg',
      '/img/4.jpg',
      '/img/5.jpg',
      '/img/6.jpg',
      '/img/7.jpg',
      '/img/8.jpg',
      '/img/9.jpg',
      '/img/10.jpg',
      '/js/sw.js',
      '/data/restaurants.json'
      ])
    .catch(error => {
      console.log("error opening cache" + error)
    });
  }));
});

/*This is based on the code shown in the study jam
and it's supposed to delete old cached files but I've never seen
it delete any.  I'm assuming this is because this app already has all
the pages it's going to see and never gets any new ones */
self.addEventListener('activate', function (event) {
  //console.log('Activating new service worker.');
  event.waitUntil(
      caches.keys().then(function (cacheNames) {
          return Promise.all(
              cacheNames.filter(function (cacheName) {
                  return cacheName.startsWith('restaurant-cache-') &&
                      cacheName != cacheStorageName;
              }).map(function (cacheName) {
                  //console.log("deleting " + cacheName);
                  return caches.delete(cacheName);
              })
          );
      })
  );
});

// If the fetch from the network fails use the cache...
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
    .catch(error => console.log(error, event.request))
  );
});