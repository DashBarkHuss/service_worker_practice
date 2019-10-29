cacheList = ["chicken.jpg", "puppy.jpg", '/', "offline.json"];


self.addEventListener("install", event => {
    return caches.open("images_cache_v1").then(cache=>{
        return cache.addAll(cacheList);
    })
})

self.addEventListener("fetch", event => {
    console.log("fetch", event.request.url);
    const parsedURL = new URL(event.request.url);
    if (parsedURL.pathname == "/info.json" && !navigator.onLine){
        console.log(parsedURL.pathname =="/info.json", parsedURL.pathname);

        event.respondWith(fetch("/offline.json"));
        // event.respondWith(new Response(JSON.stringify({"status":"offline"}))); //this line if you don't have an offline.json file
        return;
    }
    event.respondWith(caches.match(parsedURL.pathname).then(response=>{
        if (response){
            console.log("cache");
            return response;
        } else {
            console.log("fetch");
            return fetch(parsedURL);
        }
    }))
})
