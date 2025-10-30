const CACHE_NAME = 'solv-02';
const urlsToCache = [
  '/',
  '/main.js',
];

// Install event: Pre-cache essential assets
self.addEventListener('install', (event) => {
  console.log('sw install', event);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event: Clean up old caches
self.addEventListener('activate', (event) => {
  console.log('sw activate', event);
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event: Intercept and handle network requests
self.addEventListener('fetch', (event) => {
  console.log('sw fetch', event);
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // If a cached response is found, return it
        if (response) {
          console.log('Found in cache:', event.request.url);
          return response;
        }

        // Otherwise, fetch from the network
        console.log('Fetching from network:', event.request.url);
        return fetch(event.request)
          .then((networkResponse) => {
            // If the network request is successful, cache the response
            // and return it
            if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
            }
            return networkResponse;
          })
          .catch((error) => {
            // Handle network errors (e.g., offline)
            console.error('Fetch failed:', event.request.url, error);
            // You could return an offline page here, or a fallback response
            // For example: return caches.match('/offline.html');
            return new Response('<h1>Offline</h1><p>You appear to be offline.</p>', {
              headers: { 'Content-Type': 'text/html' }
            });
          });
      })
  );
});
