cacheList = ["chicken.jpg", "puppy.jpg"];

self.addEventListener("install", event => {
    return caches.open("images_cache_v1").then(cache=>{
        return cache.addAll(cacheList);
    })
})

self.addEventListener("fetch", event => {
    const parsedURL = new URL(event.request.url);
    event.respondWith(caches.match(parsedURL.pathname).then(response=>{
        if (response){
            return response;
        } else {
            return fetch(parsedURL);
        }
    }))
})