import EventController from './../../../../../lib/controllers/event.controller';
import TimeHelper from './../../../../../lib/helpers/time.helper';

Template.NewEvent.onRendered(function() {
  console.log('En el onRendered... leoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo');
  GoogleMaps.load({
    key: 'AIzaSyCVKw1zfv0JsOsrH9yeAwoIjwcF7_JDAHY',
    libraries: 'places'
  });
  // Template.timeHelper.set();
  
});

Template.NewEvent.onCreated(function() {
  const eventController = new EventController();
  this.timeHelper = new ReactiveVar(new TimeHelper());
  console.log('En el onCreated...');
  
  //this.timeHelper = new TimeHelper();
  //console.log('Veremos si llama al fuckig helper...', timeHelper.getHour());
  
  console.log(eventController.lala());
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

      const searchContent = document.getElementById('search-content');
      const searchInput = document.getElementById('search-input');
      console.log('Leooooo mira el searchBox antes: ');
      var searchBox = new google.maps.places.SearchBox(searchInput);
      console.log('Leooooo mira el searchBox despues: ', searchBox);
      map.instance.controls[google.maps.ControlPosition.TOP_LEFT].push(searchContent);
      const searchBtn = document.getElementById('search-btn');
      searchBtn.onclick = function() {
        const location = searchInput.value;
        geocoder = new google.maps.Geocoder();
        console.log('geocoder: ', geocoder, 'input value: ', location);
        geocoder.geocode({'address': location}, function (results, status) {
          console.log('Hola leoooooooooo');
          /* var lat = data[0].geometry.location.lat();
          var lng = data[0].geometry.location.lng();
          var origin = new google.maps.LatLng(lat, lng);
          console.log('lat: ', lat, ' lng: ', lng, ' orign: ', origin, ' data: ', data, ' location: ', location); */
          // plot origin


          if (status === 'OK') {
            //map.instance.setZoom(15);
            map.instance.setCenter(results[0].geometry.location);
            markers.forEach(function(marker) {
              marker.setMap(null);
            });
            markers = [];

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map.instance,              
              //title: place.name,
              position: results[0].geometry.location
            }));
            /* resultsMap.setCenter(); */
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
        //proccessButtonSearch(location);
      };

      // Bias the SearchBox results towards current map's viewport.
      map.instance.addListener('bounds_changed', function() {
        searchBox.setBounds(map.instance.getBounds());        
      });

      var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
      searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();
        console.log('This is the enter event lat: ', places[0].geometry.location.lat(), ' lang: ', places[0].geometry.location.lng());
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
  currentDate: function() {
    var timeHelper = Template.instance().timeHelper.get();
    console.log('En el helpers...');
    // console.log('desde el helper perros....', tmp.timeHelper.get().getCurrentDate());
    return timeHelper.getCurrentDate();    
  },
  currentHour: function() {
    var timeHelper = Template.instance().timeHelper.get();
    return timeHelper.getCurrentHour();
  }
});

Template.NewEvent.events({
  'submit .new-event': function(event) {
    console.log('esta es mi event compadre: ', event);
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
  },

  'keypress #search-input': function (event, template) {
    if (event.which === 13) {
      event.stopPropagation();
      return false;
    }
  },
});