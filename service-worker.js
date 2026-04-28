const CACHE_NAME = 'abhay-portfolio-v2';
const DYNAMIC_CACHE_NAME = 'abhay-portfolio-dynamic-v2';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './offline.html',
  './css/styles.css',
  './css/components.css',
  './css/project-pages.css',
  './js/main.js',
  './js/components.js',
  './js/counter.js',
  './assets/Profile_Photo.jpg',
  './assets/Abhay_Gupta_Resume_2026.pdf',
  './favicon.png',
  './project-agentx.html',
  './project-edupath.html',
  './project-helmet-detection.html',
  './project-jarvis.html',
  './project-ml.html',
  './project-reelspro.html'
];

// Install Event
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Immediately activate new SW
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // HTML Page Strategy: Network First -> Cache -> Offline Page
  if (request.headers.get('Accept').includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // If valid response, update cache
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // If network fails, try cache
          return caches.match(request).then((response) => {
            if (response) {
              return response;
            }
            // If not in cache, show offline page
            return caches.match('./offline.html');
          });
        })
    );
    return;
  }

  // Asset Strategy (CSS, JS, Images): Cache First -> Network -> Cache
  event.respondWith(
    caches.match(request).then((response) => {
      if (response) {
        return response; // Return from cache
      }
      return fetch(request).then((networkResponse) => {
        // Cache new assets dynamically
        if(!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseClone = networkResponse.clone();
        caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
          cache.put(request, responseClone);
        });
        return networkResponse;
      });
    })
  );
});

// Activate Event
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME, DYNAMIC_CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim(); // Take control immediately
});
