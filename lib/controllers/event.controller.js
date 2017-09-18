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
        zoom: 15
      }
    }
  }

  getEventPosition() {
    return this.map.getPositionFromEventLocation();
  }

  getMap() {
    return this.map;
  }

  setMap(map, formUbication) {
    console.log('Map constructed');
    this.map = new MapHelper(map, formUbication);
  }

  setMapAttributes() {
    this.map.setGeolocation(Geolocation.latLng());    

    if (!this.map.getGeolocation())
      return;

    if (!this.map.getEventLocationMarker()) {
      this.map.setEventOnCurrentLocationMarker();
      this.map.addEventLocationMarker();
    }
  
    this.map.addCurrentLocationControl();
    this.map.addPlacesSearchBoxControl();
    console.log('Entro aqui...!!');
  }
}

module.exports = EventController;

