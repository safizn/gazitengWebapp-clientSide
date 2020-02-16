// Polymer settings, Polyfill
{
  // Load Polymer (importing through the bower using the first webcomponent to be imported to the document, which includes `../polymer/polymer.html` import)
  // NOTE: Problem that it is executed after the below code.
  // System.import('polymer@2.0-preview/polymer.html!')
  // System.import('http://cdn.localhost/asset/webcomponent/component.package/polymer/polymer.html!')
  // Web performance API
  // window.performance && performance.mark && performance.mark('entrypoint.html');
  // Webcomponents Loader resolves all checks and loads polyfills if necessary.
  var script = document.createElement('script');
  script.async = true;
  script.src = '/asset/webcomponent/component.package/webcomponentsjs/webcomponents-loader.js'; // script.onload = afterLoad; // webcomponents-loader.js will load the polyfill, only then should be called "afterLoad" function.

  document.head.appendChild(script); // // Load webcomponentsjs polyfill if browser does not support native Web Components
  // function afterLoad() {
  //     // For native Imports, manually fire WebComponentsReady so user code
  //     // can use the same code path for native and polyfill'd imports.
  //     if (!window.HTMLImports) {
  //         window.dispatchEvent(
  //             new CustomEvent('WebComponentsReady', {bubbles: true})
  //         );
  //     }
  // };
  // let webComponentsSupported = (
  //     'registerElement' in document &&
  //     'import' in document.createElement('link') &&
  //     'content' in document.createElement('template')
  // );
  // if (!webComponentsSupported) {
  //     console.info('☕ Polyfill webcomponents. Loading webcomponents javascript.')
  //     let script = document.createElement('script');
  //     script.async = true;
  //     script.src = '/asset/webcomponent/component.package/webcomponentsjs/webcomponents-loader.js';
  //     // script.onload = afterLoad; // webcomponents-loader.js will load the polyfill, only then should be called "afterLoad" function.
  //     document.head.appendChild(script);
  //     // load tag 1.0.0-rc.4
  //     // JSPM Causes `detected as amd but didn't execute correctly.` which needs configuration. Using bower istead.
  //     // System.import('webcomponentsjs/webcomponents-lite.js')
  // } else {
  //     console.info('☕ Native webcomponents. Dispaching \'WebComponentsReady\' event manually.')
  //     window.addEventListener('load', () => { // inorder for the event listener to be registered before dispatching it.
  //         afterLoad();
  //     })
  // }
}