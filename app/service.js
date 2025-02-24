self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activating...');
    event.waitUntil(self.clients.claim());
});


self.addEventListener('fetch', event => {
    //console.log('Intercepted request:', event.request.url);
    //console.log(window.location);
    //let filePath = event.request.url.toString().split('/'), file;
    //console.log(`REGISTERED EVENT:`, event);
    //console.log(`REGISTERED EVENT1:`, event.request);
    //console.log(`REGISTERED EVENT2:`, event.request.url);
    //console.log(`REGISTERED EVENT3:`, event.request.headers);
    if (filePath.length > 0) {
        if (file = filePath[filePath.length - 1].slice(-3)) {

        }
    }
    if (event.request.url.includes('example.txt')) {
        /* event.respondWith(new Response('Intercepted file content', { 
          headers: { 'Content-Type': 'text/plain' } 
        })); */
        return;
    }

    // Default: continue request as normal
    event.respondWith(fetch(event.request));
});