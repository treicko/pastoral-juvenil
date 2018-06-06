/* global App */
App.accessRule('*');
App.accessRule('https://*.googleapis.com/*');
App.accessRule('https://*.google.com/*');
App.accessRule('https://*.gstatic.com/*');

App.configurePlugin('plugin.google.maps', {
  API_KEY_FOR_ANDROID: 'AIzaSyCZiZYuHqrDDI-djq8k6sCSI2UoShu04tY',
});
