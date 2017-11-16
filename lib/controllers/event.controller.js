/* global Geolocation google GoogleMaps */
/* eslint-disable class-methods-use-this */

import MapHelper from './../helpers/map.helper';

class EventController {
  constructor() {
    this.map = null;
  }

  getGeolocation() {
    return this.map.getGeolocation();
  }

  getMapOptions() {
    const latLng = Geolocation.latLng();
    if (GoogleMaps.loaded() && latLng) {
      return {
        center: new google.maps.LatLng(latLng.lat, latLng.lng),
        zoom: 15,
      };
    }
    return {};
  }

  getEventPosition() {
    return this.map.getPositionFromEventLocation();
  }

  getMap() {
    return this.map;
  }

  setMap(map, formUbication) {
    this.map = new MapHelper(map, formUbication);
  }

  setMapForShow(map) {
    this.map = new MapHelper(map, '');
  }

  setMapAttributes() {
    this.map.setGeolocation(Geolocation.latLng());

    if (!this.map.getGeolocation()) {
      return;
    }

    if (!this.map.getEventLocationMarker()) {
      this.map.setEventOnCurrentLocationMarker();
      this.map.addEventLocationMarkerOnClick();
    }

    this.map.addCurrentLocationControl();
    this.map.addPlacesSearchBoxControl();
  }
}

module.exports = EventController;

