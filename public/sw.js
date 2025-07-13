// کش کردن منابع برای دسترسی آفلاین
const CACHE_NAME = 'test-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

// نصب Service Worker و کش کردن منابع
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('کش باز شد');
      return cache.addAll(urlsToCache);
    })
  );
});

// مدیریت درخواست‌ها (Fetch)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // اگر درخواست در کش باشد، از کش برگردان
      if (response) {
        return response;
      }
      // در غیر این صورت، از شبکه درخواست کن
      return fetch(event.request).catch(() => {
        // در صورت آفلاین بودن و عدم وجود در کش
        return caches.match('/index.html');
      });
    })
  );
});

// به‌روزرسانی Service Worker و حذف کش‌های قدیمی
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});