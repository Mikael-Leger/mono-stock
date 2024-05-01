module.exports = {
  "globDirectory": "build/",
  "globPatterns": [
    "**/*.js",
    "**/*.css",
    "**/*.html"
  ],
  "swDest": "build/service-worker.js",
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
