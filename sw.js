// Opcional: suba este arquivo na mesma pasta do index.html para o app abrir sem internet.
var C='financas-casa-v2';
self.addEventListener('install',function(e){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim())});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
  e.respondWith(caches.open(C).then(function(c){
    return c.match(e.request,{ignoreSearch:true}).then(function(hit){
      var net=fetch(e.request).then(function(r){if(r&&r.ok)c.put(e.request,r.clone());return r}).catch(function(){return hit});
      return hit||net;
    });
  }));
});
