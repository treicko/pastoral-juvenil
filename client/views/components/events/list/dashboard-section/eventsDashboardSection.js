console.log('la puuuuuuuuuuuu entra primero aqui wonejos');

/*let eventMarkers = [];*/

function drawEventRadio(map, marker) {
  if (GoogleMaps.loaded()) {
    var cityCircle = new google.maps.Circle({
      strokeColor: '#26a69a',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#26a69a',
      fillOpacity: 0.35,
      map: map,
      center: marker.position,
      radius: Math.sqrt(1) * 100,
      /*editable: true*/
    });
  }
}

function createMarker(position, title, map, focus, info) {
  console.log('EN EL CREATE MARKER: creoq ue primero entra aqui: ', title);
  if (GoogleMaps.loaded()) {
    
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(position.lat, position.lng),
      title: title,//'Ubicacion actual',
      map: map.instance
    });

    const infoMarkerWindow = new google.maps.InfoWindow({
      content: `<div><p>${info}</p></div>`
    });

    marker.addListener('click', function() {
      infoMarkerWindow.open(map, marker);
    });

    if (focus) {
      map.instance.setCenter(marker.getPosition());
      map.instance.setZoom(15);
    }

    /*eventMarkers.push(marker);*/
    return marker;
  }
    /*else {
      marker.setPosition(latLng);
    }*/
}

function getCurrentLocation() {
  const latLng = Geolocation.latLng();
  if (!latLng)
    return;
  else
    return latLng;
}

function CurrentLocationButtonControl(map) {
  var position = { lat: map.getCenter().lat(), lng: map.getCenter().lng() };
  var controlCurrentLocation = document.createElement('div');
  controlCurrentLocation.className = 'map-single-button';
  controlCurrentLocation.innerHTML = '<i class="Tiny material-icons">my_location</i>';
  controlCurrentLocation.title = 'Mostrar tu ubicacion actual';
  /*controlDiv.appendChild(controlCurrentLocation);*/

  // Setup the click event listeners: simply set the map to Chicago.
  controlCurrentLocation.addEventListener('click', function() {
    map.setCenter(position);
    map.setZoom(15);
  });

  controlCurrentLocation.index = 1;
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlCurrentLocation);
}

function EventLocationButtonControl(map, eventPosition) {
  /*const eventControlDiv = document.createElement('div');*/
  const controlEventLocation = document.createElement('div');
  controlEventLocation.className = 'map-content-button';
  controlEventLocation.innerHTML = '<i class="Tiny material-icons map-content-icon-button">location_on</i>Ubicacion del evento';
  controlEventLocation.title = 'Click to recenter the map';
  /*eventControlDiv.appendChild(controlEventLocation);*/

  // Setup the click event listeners: simply set the map to Chicago.
  controlEventLocation.addEventListener('click', function() {
    map.setCenter(eventPosition);
    map.setZoom(16);
  });

  /*eventControlDiv.index = 1;*/
  controlEventLocation.index = 1;
  /*map.controls[google.maps.ControlPosition.TOP_CENTER].push(eventControlDiv);*/
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(controlEventLocation);
  console.log('EN EL EVENT LOCATION BUTTON Entro aqui hermanooooooooo: ');
}

function EventRouteButtonControl(controlDiv, map, eventPosition) {
  const controlEventLocation = document.createElement('div');
  controlEventLocation.className = 'map-content-button';
  controlEventLocation.innerHTML = '<i class="Tiny material-icons" style="color:#26a69a;font-size:14px">location_on</i>Ubicacion del evento';
  controlEventLocation.title = 'Click to recenter the map';
  controlDiv.appendChild(controlEventLocation);

  // Setup the click event listeners: simply set the map to Chicago.
  controlEventLocation.addEventListener('click', function() {
    console.log('entra al evento hermano');
    map.setCenter(eventPosition);
    map.setZoom(16);
  });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, start, end) {
  directionsService.route({
    origin: start,
    destination: end,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

Template.EventsDashboardSection.onRendered(function() {
  console.log('EventDashboardSection OnRendered');
  GoogleMaps.load({
    v: '3',
    libraries: 'places',
    key: 'AIzaSyCVKw1zfv0JsOsrH9yeAwoIjwcF7_JDAHY'
  });

  //$('.chips').material_chip();
  $('.chip').click(function() {
    console.log('Hola hermano me seleccionaron...', this);
    $('.chip').removeClass('chip-selected');
    $(this).addClass('chip-selected');
  });
  $('.modal').modal();
});

Template.EventsDashboardSection.onCreated(function() {
  console.log('EN EL ONCREATED: acabo de crearme pendejos...');
  this.currentLocation = new ReactiveVar(null);
  this.eventLocation = new ReactiveVar(null);
  this.mapComponents = new ReactiveVar([]);
  const self = this;
  /*GoogleMaps.ready('registerMap', function(map) {
    console.log('EN EL GOOGLE MAPS READY: ya esta listo el pinshe mapa...');
    self.autorun(function() {
    });
  });*/
});

Template.EventsDashboardSection.onDestroyed(function () {
  console.log('EN EL DESTROY bitches....');
  /*eventMarkers.forEach(marker => marker.setMap(null));
  eventMarkers = [];*/
});

Template.EventsDashboardSection.helpers({
  mapRegisterOptions: function() {
    Template.instance().currentLocation.set(getCurrentLocation());
    if (GoogleMaps.loaded()){
      return {
        center: new google.maps.LatLng(-17.3938436971689, -66.1571037769318),
        zoom: 15
      }
    }
  },
  isRegisterEnable: function() {
    return GoogleMaps.loaded() && true;
  }
});

Template.EventsDashboardSection.events({
  'click .eventRegister': function(event, template) {
    let eventSelected;
    const eventId = event.target.id;
    template.data.events.forEach((element, index) => {
      if (element._id === eventId) {
        eventSelected = element;
        template.eventLocation.set({lat: eventSelected.latitude, lng: eventSelected.longitude});
        console.log('entro: ', index);
        return;
      }
    });
    console.log('EN EL EVENT: veremos que tiene mi reactividad: ', template.eventLocation.get());
    GoogleMaps.ready('registerMap', function(map) {
      console.log('ready again el fuking map...');
    });

    /* $('#modalRegister').openModal({
      ready: function() {
        google.maps.event.trigger(GoogleMaps.maps.registerMap.instance, 'resize');
      }
    }); */

    $('#modalRegister').modal('open');

    $('.modal').modal({
      ready: (modal, trigger) => { // Callback for Modal open. Modal and trigger parameters available.
        //alert("Ready");
        google.maps.event.trigger(GoogleMaps.maps.registerMap.instance, 'resize');
        console.log(modal, trigger);
      }
    }
  );

    if (GoogleMaps.loaded()) {
      /*console.log('EN EL EVENT markers: ', eventMarkers.length);*/
      if(eventSelected) {
        
        /*if (eventMarkers.length < 2) {*/
          let currentLocation = template.currentLocation.get();
          let eventLocation = { lat: eventSelected.latitude, lng: eventSelected.longitude };
          let eventMarkerLocation;
          if (currentLocation) {
            currentMarkerLocation = createMarker(currentLocation, 'Ubicacion actual', GoogleMaps.maps.registerMap, true, 'Ubicacion actual');
            template.mapComponents.get().push(currentMarkerLocation);
            console.log('haciendo uso de push...');
            /*eventMarkers.push(currentMarkerLocation);*/
          }
          eventMarkerLocation = createMarker(eventLocation, 'Ubicacion del evento', GoogleMaps.maps.registerMap, false, 'Ubicacion del evento');
          /*eventMarkers.push(eventMarkerLocation);*/

          console.log('la puuuta del event: ', GoogleMaps.maps.registerMap.instance.Marker);
          /*const eventContentString = '<div><p>Ubicacion del evento</p></div>';
          const eventMarker = new google.maps.Marker({
            position: new google.maps.LatLng(eventSelected.latitude, eventSelected.longitude),
            animation: google.maps.Animation.BOUNCE,
            map: GoogleMaps.maps.registerMap.instance
          });
          eventMarkers.push(eventMarker);
          const eventInfoWindow = new google.maps.InfoWindow({
            content: eventContentString
          });

          eventMarker.addListener('click', function() {
            eventInfoWindow.open(GoogleMaps.maps.registerMap, eventMarker);
          });*/
          const eventPosition = new google.maps.LatLng(eventSelected.latitude, eventSelected.longitude);
          /*console.log('esto es lo que tiene mi lat lang: ', eventMarkers);*/
          /*const eventControlDiv = document.createElement('div');*/
          const currentLocationControl = new CurrentLocationButtonControl(GoogleMaps.maps.registerMap.instance);
          const eventLocationControl = new EventLocationButtonControl(GoogleMaps.maps.registerMap.instance, eventPosition);
          drawEventRadio(GoogleMaps.maps.registerMap.instance, eventLocationControl);
          /*eventControlDiv.index = 1;
          GoogleMaps.maps.registerMap.instance.controls[google.maps.ControlPosition.TOP_CENTER].push(eventControlDiv);*/

          var directionsService = new google.maps.DirectionsService;
          var directionsDisplay = new google.maps.DirectionsRenderer;
          directionsDisplay.setMap(GoogleMaps.maps.registerMap.instance);
          const latLng = Geolocation.latLng();
          let currentPosition;
          if (latLng) {
            console.log('entra aqui tiburon pero no grafica ni mierda...');
            currentPosition = new google.maps.LatLng(latLng.lat, latLng.lng);
            calculateAndDisplayRoute(directionsService, directionsDisplay, currentPosition, eventMarkerLocation.position);
          }
        /*}*/
      }
    }
  }
});