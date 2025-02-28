self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activating...');
    event.waitUntil(self.clients.claim());
});


self.addEventListener('fetch', event => {

    const valid_sources = ['app-setup.js', 'import_worker.js'];
    const source = event.request.referrer;
    const appSetup = source.includes(valid_sources[0]),
        prefetch = source.includes(valid_sources[1]);

    if (event.request.referrer.includes('import_worker.js')) {

        event.respondWith(
            caches.open(`V1`)
                .then(async cache => {

                    let response = await cache.match(event.request);
                    if (response) console.log(`Picking `, event.request.url, ` from cache`);
                    if (!response) {
                        response = await fetch(event.request);
                        cache.put(event.request, response.clone());
                    }

                    return response;

                })
        );
    }

});