import MapHelper from './../helpers/map.helper';

class EventController {
  constructor() {
    this.map = null;
  }

  getGeolocation() {
    return this.map.getGeolocation();
  }

  setMap(map) {
    this.map = new MapHelper(map);
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
  }
}

module.exports = EventController;

