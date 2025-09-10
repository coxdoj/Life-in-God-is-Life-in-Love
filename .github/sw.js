const CACHE = 'cw-v1';
const ASSETS = [
  '/', '/index.html',
  '/assets/logo.png','/assets/favicon.ico','/assets/favicon-32x32.png','/assets/favicon-180x180.png',
  '/assets/h3.js','/assets/mlWorker.js'
];
self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
});
self.addEventListener('fetch', e=>{
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});