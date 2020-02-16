{
  var App = window.App; // Load pre-caching Service Worker

  navigator.serviceWorker && window.addEventListener('load', function () {
    navigator.serviceWorker.register(window.location.origin + '/serviceWorker.js', {
      scope: App.config.PROTOCOL + App.config.HOST
    }).then(function (registration) {
      console.info('☕ Service Worker - registered with scope: ' + registration.scope);
    });
  });
} // ---------------------------

console.info('☕ Service worker disabled for development, will be generated at build time.');