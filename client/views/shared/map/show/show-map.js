/* global Template GoogleMaps google */

Template.showMap.onRendered(function() {
  GoogleMaps.load({
    v: '3',
    libraries: 'places',
    key: 'AIzaSyCVKw1zfv0JsOsrH9yeAwoIjwcF7_JDAHY',
  });
});

Template.showMap.onCreated(function() {
});

Template.showMap.helpers({
  showMapOptions: () => {
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(0, 0),
        zoom: (this.location) ? 15 : 1,
      };
    }
    return {};
  },
});
