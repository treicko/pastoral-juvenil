/* global Geolocation google GoogleMaps Events moment */
/* eslint-disable class-methods-use-this */

import MapHelper from './../helpers/map.helper';

class EventController {
  constructor() {
    this.map = null;
  }

  isEnableInscription(eventId) {
    const eventFound = Events.findOne({ _id: eventId });
    if (this.map && eventFound) {
      return this.map.computeDistanceBetween(100);
    }
    return false;
  }

  getEventByIdForShow(eventId) {
    const eventFound = Events.findOne({ _id: eventId });
    if (eventFound) {
      const eventDate = eventFound.date;
      eventFound.date = moment(eventDate).format('LL');
      eventFound.hour = moment(eventDate).format('HH:mm');
      return eventFound;
    }
    return {};
  }

  getEventPosition() {
    return this.map.getPositionFromEventLocation();
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

  getMap() {
    return this.map;
  }

  onDestroyMapForCreate() {
    this.map.clearMapInstance();
  }

  setEventForShowOnMap(eventId) {
    const eventFound = Events.findOne({ _id: eventId });
    if (eventFound && this.map) {
      const eventLocation = {
        lat: eventFound.latitude,
        lng: eventFound.longitude,
      };
      this.map.setEntityOnMapForShow(eventLocation, 'P', 'Ubicacion del evento.');
    }
  }

  setEventForInscriptionOnMap(eventId) {
    const eventFound = Events.findOne({ _id: eventId });
    if (eventFound && this.map) {
      const eventLocation = {
        lat: eventFound.latitude,
        lng: eventFound.longitude,
      };
      this.map.setEntityOnMapForShow(eventLocation, 'P', '');
      this.map.setGeolocation(Geolocation.latLng());

      if (!this.map.getGeolocation()) {
        return;
      }

      this.map.addCurrentLocationControlForInscription();
      this.map.drawEntityCircleOnMapByRadio(100);
      this.map.calculateAndDisplayRoute();
    }
  }

  setMapForCreate(map) {
    this.map = new MapHelper(map);
    console.log('This map: ', this.map);
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

  setMapAttributesFroCreate(entityLocationForm) {
    this.map.setGeolocation(Geolocation.latLng());

    if (!this.map.getGeolocation()) {
      return;
    }

    if (!this.map.getEventLocationMarker()) {
      this.map.setMarkerOnCurrentLocation(entityLocationForm);
      this.map.addEventLocationMarkerOnClick(entityLocationForm);
    }

    this.map.addCurrentLocationControl(entityLocationForm);
    this.map.addPlacesSearchBoxControlToEntity(entityLocationForm);
    this.map.drawEntityCircleOnMapByRadio(100);
  }

  updateRadioOnMap(newRadio) {
    this.map.updateDrawEntityCircleOnMapRadio(newRadio);
  }
}

module.exports = EventController;

