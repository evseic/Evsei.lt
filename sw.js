const CACHE_NAME = 'liubliubabki-v1';
const ASSETS = [
    '/admin.html',
    '/manifest.json',
    '/favicon.png',
    '/app_icon_512.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : { title: 'Новая заявка!', body: 'Проверьте админ панель' };
    
    const options = {
        body: data.body,
        icon: '/app_icon_512.png',
        badge: '/favicon.png',
        vibrate: [200, 100, 200],
        data: {
            url: '/admin.html'
        }
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});
