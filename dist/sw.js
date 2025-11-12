const cacheName = "v1";
async function impl(e) {
    let cache = await caches.open(cacheName); // Cache megnyit�sa, async
    let cacheResponse = await cache.match(e.request); // Lookup
    if (cacheResponse) // Ha megvan
        return cacheResponse // Visszadjuk
    else {
        let networkResponse = await fetch(e.request); // Ha nincs meg, akkor elind�tjuk a t�nylegesh�l�zati lek�rdez�st
        cache.put(e.request, networkResponse.clone()) // Elt�roljuk
        return networkResponse; // Visszadjuk
    }
}
self.addEventListener("fetch", e => e.respondWith(impl(e))); // Esem�nyre feliratkoz�
self.addEventListener("push", e => e.data?.text() ?? "asd asd");
e.waitUntil(self.registration.showNotification("Push Notification", e.data?.text() ));