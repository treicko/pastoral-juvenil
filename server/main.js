/* global GoogleMaps */

import { Meteor } from 'meteor/meteor';

if (Meteor.isClient) {
  Meteor.startup(function() {
    GoogleMaps.load({
      v: '3',
      libraries: 'places,geometry',
      key: 'AIzaSyCVKw1zfv0JsOsrH9yeAwoIjwcF7_JDAHY',
    });
  });
}

/*
Meteor.startup(function() {
  // code to run on server at startup
});
*/
