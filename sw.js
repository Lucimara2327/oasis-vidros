/* Oásis Vidros - service worker. Mude a versão abaixo quando trocar fotos ou o site. */
var V='oasis-v2';
var CORE=["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "favicon-64.png", "apple-touch-icon.png", "bancadas-1.jpg", "boxes-1.jpg", "boxes-2.jpg", "boxes-3.jpg", "boxes-4.jpg", "boxes-5.jpg", "boxes-6.jpg", "boxes-7.jpg", "boxes-8.jpg", "espelhos-1.jpg", "espelhos-2.jpg", "espelhos-3.jpg", "espelhos-4.jpg", "espelhos-5.jpg", "janelas-1.jpg", "janelas-2.jpg", "janelas-3.jpg", "janelas-4.jpg", "janelas-5.jpg", "janelas-6.jpg", "janelas-7.jpg", "marmore-1.jpg", "marmore-2.jpg", "marmore-3.jpg", "marmore-4.jpg", "marmore-5.jpg", "marmore-6.jpg", "marmore-7.jpg", "marmore-8.jpg", "moveis-0.jpg", "moveis-1.jpg", "portas-1.jpg", "portas-10.jpg", "portas-11.jpg", "portas-12.jpg", "portas-2.jpg", "portas-3.jpg", "portas-4.jpg", "portas-5.jpg", "portas-6.jpg", "portas-7.jpg", "portas-8.jpg", "portas-9.jpg", "servicos-1.jpg", "servicos-2.jpg", "servicos-3.jpg", "servicos-4.jpg", "servicos-5.jpg", "servicos-6.jpg", "vitrines-1.jpg", "p1.jpg", "p2.jpg", "p3.jpg", "p4.jpg", "p5.jpg"];
self.addEventListener('install',function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(CORE)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==V}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  var r=e.request;if(r.method!=='GET')return;
  var u=new URL(r.url);
  if(u.origin!==location.origin)return;
  if(/\.mp4$/.test(u.pathname)||r.headers.get('range'))return; /* vídeos sempre pela rede */
  if(r.mode==='navigate'){
    e.respondWith(fetch(r).then(function(res){var cp=res.clone();caches.open(V).then(function(c){c.put('index.html',cp)});return res}).catch(function(){return caches.match('index.html')}));
    return;
  }
  e.respondWith(caches.match(r).then(function(hit){
    return hit||fetch(r).then(function(res){if(res&&res.ok){var cp=res.clone();caches.open(V).then(function(c){c.put(r,cp)})}return res});
  }));
});
