var cacheName = 'jetherson';
var filesToCache = [
	'/jet/index.htm',
	'/jet/main.js',
	'/jet/jetherson-arceo-512.png',
	'/jet/jetherson-arceo-256.png',
	'/jet/jetherson-arceo-192.png',
	'/jet/jetherson-arceo-152.png',
	'/jet/jetherson-arceo-144.png',
	'/jet/jetherson-arceo-128.png',
	'/favicon.ico'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
	e.waitUntil(
		caches.open(cacheName).then(function(cache) {
			return cache.addAll(filesToCache);
		})
	);
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
	e.respondWith(
		caches.match(e.request).then(function(response) {
			return response || fetch(e.request);
		})
	);
});
