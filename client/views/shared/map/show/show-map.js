/* global Template GoogleMaps google */

Template.showMap.onRendered(function() {
  GoogleMaps.load({
    v: '3',
    libraries: 'places,geometry',
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
        zoom: 1,
      };
    }
    return {};
  },
  isGoogleMapsLoaded: () => GoogleMaps.loaded(),
});

Template.showMap.events({
  'click #no-conection-image': () => {
    document.location.reload(true);
  },
});
