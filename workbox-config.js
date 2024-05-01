module.exports = {
  "globDirectory": "dist/",
  "swDest": "dist/service-worker.js",
  "clientsClaim": true,
  "skipWaiting": true,
  "runtimeCaching": [
    {
      "urlPattern": /\.(?:png|jpg|jpeg|svg)$/,
      "handler": "CacheFirst",
      "options": {
        "cacheName": "images-cache",
        "expiration": {
          "maxEntries": 50,
          "maxAgeSeconds": 86400
        }
      }
    }
  ]
};
