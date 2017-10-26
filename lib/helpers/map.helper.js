class MapHelper {
  constructor(map, ubicationForm = '') {
    this.circle = null;
    this.controls = new Array();
    this.currentLocation = Geolocation.latLng();
    this.infoWindow = new google.maps.InfoWindow;
    this.map = map;
    this.markers = new Array();
    this.ubicationForm = ubicationForm;
    this.addressLocation = null;
  }

  addCurrentLocationControl() {
    if(!this.controls['currentLocation'] && this.currentLocation) {
      const controlCurrentLocation = document.createElement('div');
      controlCurrentLocation.className = 'map-single-button';
      controlCurrentLocation.innerHTML = '<i class="Tiny material-icons">my_location</i>';
      controlCurrentLocation.title = 'Establecer tu posicion actual como nueva ubicacion';
      controlCurrentLocation.index = 1;

      controlCurrentLocation.addEventListener('click', () => {
        this.setEventOnCurrentLocationMarker();
      });

      this.map.instance.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlCurrentLocation);
      this.controls['currentLocation'] = controlCurrentLocation;
    }    
  }

  addEventLocationControl() {
    /* if(!this.controls['eventLocation']) {
      const controlCurrentLocation = document.createElement('div');
      controlCurrentLocation.className = 'map-event-location-button';
      controlCurrentLocation.innerHTML = '<a class="waves-effect waves-light btn map-button-add-event">Establecer ubicacion<i class="material-icons right">add_location</i></a>';
      controlCurrentLocation.title = 'Agregar ubicacion del evento';
      controlCurrentLocation.index = 1;

      controlCurrentLocation.addEventListener('click', () => {
        // this.setCurrentLocationMarker();
        console.log('In current location event listener');
        this.addEventLocationMarker();
      });

      this.map.instance.controls[google.maps.ControlPosition.TOP_CENTER].push(controlCurrentLocation);
      this.controls['eventLocation'] = controlCurrentLocation;
    } */ 
  }

  addEventLocationMarkerOnClick() {
    google.maps.event.addListener(this.map.instance, 'click', (event) => {
      this.clearEventLocationMarker();

      const geocoder = new google.maps.Geocoder;
      const marker = new google.maps.Marker({
        position: event.latLng,
        label: 'E',
        map: this.map.instance
      });

      console.log('MapHelper - Click event -- lat: ', event.latLng.lat(), ' lng: ', event.latLng.lng());

      this.markers['eventLocation'] = marker;
      geocoder.geocode({'location': event.latLng}, (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            const eventLocationForm = document.getElementById(this.ubicationForm);
            eventLocationForm.value = results[0].formatted_address;
            this.setInfoWindow(`<div align="center"><strong>Ubicacion del evento</strong><br>${results[0].formatted_address}</div>`, this.markers['eventLocation']);
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });      
    });
  }

  addSearchBtnEventOnClick(searchInput) {
    const searchBtn = document.getElementById('search-btn');
    searchBtn.onclick = () => {
      const location = searchInput.value;
      geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address': location}, (results, status) => {
        if (status === 'OK') {
          this.map.instance.setCenter(results[0].geometry.location);
          this.clearEventLocationMarker();
      
          const marker = new google.maps.Marker({
            map: this.map.instance,              
            position: results[0].geometry.location,
            anchorPoint: new google.maps.Point(0, -29),
          });
          this.markers['eventLocation'] = marker;
          const eventLocationForm = document.getElementById(this.ubicationForm);
          eventLocationForm.value = results[0].formatted_address;
          this.setInfoWindow(`<div align="center"><strong>Ubicacion del evento</strong><br>${results[0].formatted_address}</div>`, this.markers['eventLocation']);          
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });      
    };

  }

  addSearchBoxEventListenerPlacesChanged(searchBox) {
    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();
      console.log('This is the enter event lat: ', places[0].geometry.location.lat(), ' lang: ', places[0].geometry.location.lng(), ' places: ', places);
      if (places.length == 0) {
        return;
      }
    
      this.clearEventLocationMarker();
  
      const bounds = new google.maps.LatLngBounds();
      places.forEach((place) => {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }

        const marker = new google.maps.Marker({
          map: this.map.instance,
          title: place.name,
          position: place.geometry.location,
          anchorPoint: new google.maps.Point(0, -29),
        });
      
        this.markers['eventLocation'] = marker;
        const eventLocationForm = document.getElementById(this.ubicationForm);
        eventLocationForm.value = place.formatted_address;
        this.setInfoWindow(`<div align="center"><strong>Ubicacion del evento</strong><br>${place.formatted_address}</div>`, this.markers['eventLocation']);
      
        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      this.map.instance.fitBounds(bounds);
    });
  }

  addPlacesSearchBoxControl() {
    console.log('This is my map: ', this.map);
    console.log('This is my map: ', this.controls['searchLocation']);
    if(!this.controls['searchLocation']) {
      console.log('Entro aqui perros');
      const searchContent = document.getElementById('search-content');
      const searchInput = document.getElementById('search-input');
      console.log('SearContent: ', searchContent, 'SearchInput: ', searchInput);
      searchContent.style.visibility = "visible";
      const searchBox = new google.maps.places.SearchBox(searchInput);
      
      this.map.instance.controls[google.maps.ControlPosition.TOP_LEFT].push(searchContent);
      this.addSearchBtnEventOnClick(searchInput);
      this.map.instance.addListener('bounds_changed', () => {
        searchBox.setBounds(this.map.instance.getBounds());        
      });
      
      this.addSearchBoxEventListenerPlacesChanged(searchBox);
      this.controls['searchLocation'] = searchContent;
    }
  }

  clearEventLocationMarker() {
    if (this.markers['eventLocation']) {
      this.markers['eventLocation'].setMap(null);
      this.markers['eventLocation'] = null;
    }
  }

  getEventLocationMarker() {
    return this.markers['eventLocation'];
  }

  getGeolocation() {
    return this.currentLocation;
  }

  getMarkers() {
    return this.markers;
  }

  getSearchControl() {
    return this.controls['searchControl'];
  }

  getPositionFromEventLocation() {
    if(this.markers['eventLocation']){
      return this.markers['eventLocation'].getPosition();
    }
  }

  setGeolocation(latLng) {
    this.currentLocation = latLng;
  }

  setInfoWindow(message, marker) {
    this.infoWindow.close();
    this.infoWindow.setContent(message);
    this.infoWindow.open(this.map.instance, marker);
  }

  setEventOnCurrentLocationMarker() {
    this.clearEventLocationMarker();

    const geocoder = new google.maps.Geocoder;
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.currentLocation.lat, this.currentLocation.lng),
      anchorPoint: new google.maps.Point(0, -29),
      map: this.map.instance,
    });

    this.markers['eventLocation'] = marker;

    geocoder.geocode({'location': this.markers['eventLocation'].getPosition()}, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          /* const eventLocationForm = document.getElementById(this.ubicationForm);          
          eventLocationForm.value = results[0].formatted_address; */
          this.addressLocation = results[0].formatted_address;
          this.setInfoWindow(`<div align="center"><strong>Ubicacion del evento</strong><br>${results[0].formatted_address}</div>`, this.markers['eventLocation']);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });

    this.map.instance.setCenter(this.markers['eventLocation'].getPosition());
    this.map.instance.setZoom(15);
  }

  setLocationOnMap(location) {
    this.clearEventLocationMarker();

    const position = new google.maps.LatLng(location.lat, location.lng)
    const geocoder = new google.maps.Geocoder;
    const marker = new google.maps.Marker({
      position: position.latLng,
      label: 'E',
      map: this.map.instance
    });

    this.markers['eventLocation'] = marker;
    geocoder.geocode({'location': position.latLng}, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.setInfoWindow(`<div align="center"><strong>Ubicacion del evento</strong><br>${results[0].formatted_address}</div>`, this.markers['eventLocation']);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });      
  }



  getMapOptionsForShow() {    
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng( 0, 0),
        zoom: (this.location) ? 15 : 1
      }
    }
  }

  setLatitudeLongitudeForShow(lat, lng) {
    this.location = {
      lat: parseFloat(lat),
      lng: parseFloat(lng)
    }
  }

  setGeocoderForShowEntityMap(entityLocation) {
    /* return new Promise(function(resolve, reject) {
      geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
              console.log(results);
              resolve([results[0].geometry.location.lat , results[0].geometry.location.lng]);
          } else {
              reject(new Error('Couldnt\'t find the location ' + address));
          }
      });
    }); */
    
    /* return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder;
      geocoder.geocode({'location': entityLocation.getPosition()}, (results, status) => {
        console.log('En el geocoder carajooo: ');
        setTimeout(() => {
          if (status === 'OK') {
            console.log('results: ', results);
            // if (results[0]) {
              resolve(results[0].formatted_address);
              // this.setInfoWindow(`<div align="center"><strong>${entityMessage}</strong><br>${results[0].formatted_address}</div>`, entityLocation);
            // } else {
              
              //window.alert('No results found');
            // }
          } else {
            console.log('entro en el error status: ', status);
            reject(new Error('Couldnt\'t find the location ' + entityLocation.getPosition()));
            // window.alert('Geocoder failed due to LEoo: ' + status);
          }
        }, 500);
      });
    }); */
  }

  setEntityOnMapForShow(entityLocation, entityLabel, entityMessage) {
    this.clearEventLocationMarker();
    const geocoder = new google.maps.Geocoder;
    this.markers['eventLocation'] = new google.maps.Marker({
      position: new google.maps.LatLng(entityLocation.lat, entityLocation.lng),
      label: entityLabel,
      anchorPoint: new google.maps.Point(0, -29),
      map: this.map.instance,
    });
  
    console.log('Enra en el setEntityOnMapForShow');
    geocoder.geocode({'location': this.markers['eventLocation'].getPosition()}, (results, status) => {
      if (status === 'OK') {
        console.log('results: ', results);
        // if (results[0]) {
          this.setInfoWindow(`<div align="center"><strong>${entityMessage}</strong><br>${results[0].formatted_address}</div>`, this.markers['eventLocation']);
        // } else {
          
          //window.alert('No results found');
        // }
      } else {
        // this.clearEventLocationMarker();
        console.log('entro en el error status: ', status);
        // window.alert('Geocoder failed due to LEoo: ' + status);
      }
    });

    console.log('Event location marker: ', this.markers['eventLocation'].getPosition());
    this.map.instance.setCenter(this.markers['eventLocation'].getPosition());
    this.map.instance.setZoom(15);
    /* this.setGeocoderForShowEntityMap(this.markers['eventLocation'])
    .then(address => {
      console.log('este es el geocoder: ', address);
      console.log('La puuuuutaaaaa resuelta');
      this.setInfoWindow(`<div align="center"><strong>${entityMessage}</strong><br>${address}</div>`, this.markers['eventLocation']);
      this.map.instance.setCenter(this.markers['eventLocation'].getPosition());
      this.map.instance.setZoom(15);
    })
    .catch(error => {
      console.log('La mierdaaaaaaaa error', error);
      this.clearEventLocationMarker();
      return error;
    }); */
    
    /* geocoder.geocode({'location': this.markers['eventLocation'].getPosition()}, (results, status) => {
      console.log('En el geocoder carajooo: ');
      if (status === 'OK') {
        console.log('results: ', results);
        if (results[0]) {
          this.setInfoWindow(`<div align="center"><strong>${entityMessage}</strong><br>${results[0].formatted_address}</div>`, this.markers['eventLocation']);
        } else {
          window.alert('No results found');
        }
      }
      else {
        window.alert('Geocoder failed due to LEoo: ' + status);
      }
    }); */
  
    
  }
}

module.exports = MapHelper;