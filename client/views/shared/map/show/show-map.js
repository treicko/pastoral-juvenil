Template.ShowMap.onRendered(function() {
  GoogleMaps.load({
    v: '3',
    libraries: 'places',
    key: 'AIzaSyCVKw1zfv0JsOsrH9yeAwoIjwcF7_JDAHY'
  });
});

Template.ShowMap.onCreated(function() {
});

Template.ShowMap.helpers({
  showMapOptions: function() {
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng( 0, 0),
        zoom: (this.location) ? 15 : 1
      }
    }
    return {};
  }
});