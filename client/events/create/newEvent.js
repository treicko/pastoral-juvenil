function getHour(hour) {
  let newHour;
  switch(hour) {
    case '1':
      newHour = 13;
      break;
    case '2':
      newHour = 14;
      break;
    case '3':
      newHour = 15;
      break;
    case '4':
      newHour = 16;
      break;
    case '5':
      newHour = 17;
      break;
    case '6':
      newHour = 18;
      break;
    case '7':
      newHour = 19;
      break;
    case '8':
      newHour = 20;
      break;
    case '9':
      newHour = 21;
      break;
    case '10':
      newHour = 22;
      break;
    case '11':
      newHour = 23;
      break;
    default:
      newHour = 24;
      break;
  }
  return newHour;
}

function getCurrentDate() {
  const date = moment().format('L').split('/');
  return `${date[2]}-${date[0]}-${date[1]}`;
}

function getCurrentHour() {
  const data = moment().add(1, 'hours').format('LT').split(' ');
  const hour = data[0].split(':');
  let currentHour = (hour[0] > 9) ? `${hour[0]}:00` : `0${hour[0]}:00`;
  if(data[1] === 'PM') {
    currentHour = `${getHour(hour[0])}:00`;
  }
  return currentHour;
};

Template.NewEvent.onRendered(function() {
  GoogleMaps.load({
    key: 'AIzaSyCVKw1zfv0JsOsrH9yeAwoIjwcF7_JDAHY',
    libraries: 'places'
  });
});

Template.NewEvent.onCreated(function() {
  var self = this;
  var radius = new ReactiveVar(100);
  var newEventShapeLocation = new ReactiveVar(null);
  GoogleMaps.ready('locationMap', function(map) {
    var marker;
    var cityCircle;

    // Create and move the marker when latLng changes.
    self.autorun(function() {
      var latLng = Geolocation.latLng();
      if (! latLng)
        return;

      // If the marker doesn't yet exist, create it.
      if (! marker) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(latLng.lat, latLng.lng),
          map: map.instance
        });

        cityCircle = new google.maps.Circle({
          strokeColor: '#26a69a',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#26a69a',
          fillOpacity: 0.35,
          map: map.instance,
          center: marker.position,
          radius: Math.sqrt(1) * 100,
          editable: true
        });
      }
      // The marker already exists, so we'll just change its position.
      else {
        marker.setPosition(latLng);
      }
      // Center and zoom the map view onto the current position.
      map.instance.setCenter(marker.getPosition());
      map.instance.setZoom(15);

      var input = document.getElementById('search-input');
      console.log('Leooooo mira el searchBox antes: ');
      var searchBox = new google.maps.places.SearchBox(input);
      console.log('Leooooo mira el searchBox despues: ', searchBox);
      map.instance.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      // Bias the SearchBox results towards current map's viewport.
      map.instance.addListener('bounds_changed', function() {
        searchBox.setBounds(map.instance.getBounds());
      });

      var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
      searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }

        // Clear out the old markers.
        markers.forEach(function(marker) {
          marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
          if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
          }
          var icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };

          // Create a marker for each place.
          markers.push(new google.maps.Marker({
            map: map.instance,
            icon: icon,
            title: place.name,
            position: place.geometry.location
          }));

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.instance.fitBounds(bounds);
      });
    });

    google.maps.event.addListener(map.instance, 'click', function(event) {
      if (! marker) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(event.latLng.lat, event.latLng.lng),
          map: map.instance
        });
      }
      // The marker already exists, so we'll just change its position.
      else {
        marker.setPosition(event.latLng);
        cityCircle.setCenter(event.latLng)
      }
    });

  });
});

Template.NewEvent.helpers({
  mapOptions: function() {
    var latLng = Geolocation.latLng();    
    if (GoogleMaps.loaded() && latLng) {
      return {
        center: new google.maps.LatLng(latLng.lat, latLng.lng),
        zoom: 15
      };
    }
  },
  currentDate: () => {
    const myDate = getCurrentDate();
    return myDate;
  },
  currentHour: () => {
    var myHour = getCurrentHour();
    return myHour;
  }
});

Template.NewEvent.events({
  'submit .new-event': function(event) {
    event.preventDefault();
    const eventDate = new Date(`${event.target.event_date.value} ${event.target.event_hour.value}`)
    const location = { 'latitude': 24, 'longitude': 34 };
    console.log('mira hermano este es el date: ', eventDate);

    const newEvent = {
      'name': event.target.event_name.value,
      'desc': event.target.event_description.value,
      'latitude': GoogleMaps.maps.locationMap.instance.getCenter().lat(),
      'longitude': GoogleMaps.maps.locationMap.instance.getCenter().lng(),
      'map': [{'LEo': 'llalala'}],
      'date': `${event.target.event_date.value}T${event.target.event_hour.value}`,
      'participants': [],
      'comments': [],
      'isDeleted': false,
      'createdAt': new Date(),
      'updatedAt': new Date()
    }
    Meteor.call('insertEvent', newEvent);
    FlowRouter.go("/events");
  }
});