
import EventController from './../../../../../lib/controllers/event.controller';
import TimeHelper from './../../../../../lib/helpers/time.helper';

Template.NewEvent.onRendered(function() {
  console.log('onRendered NewEvent');
  GoogleMaps.load({
    v: '3',
    libraries: 'places',
    key: 'AIzaSyCVKw1zfv0JsOsrH9yeAwoIjwcF7_JDAHY'
  });

  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false // Close upon selecting a date,
  });

  $('.timepicker').pickatime({
    default: 'now', // Set default time: 'now', '1:30AM', '16:30'
    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
    twelvehour: false, // Use AM/PM or 24-hour format
    donetext: 'OK', // text for done-button
    cleartext: 'Clear', // text for clear-button
    canceltext: 'Cancel', // Text for cancel-button
    autoclose: false, // automatic close timepicker
    ampmclickable: true, // make AM PM clickable
    aftershow: function(){} //Function for after opening timepicker
  });
});

Template.NewEvent.onCreated(function() {
  const self = this;
  const eventController = new EventController();
  this.timeHelper = new ReactiveVar(new TimeHelper());
  
  //var radius = new ReactiveVar(100);
  //var newEventShapeLocation = new ReactiveVar(null);

  GoogleMaps.ready('locationMap', function(map) {
    eventController.setMap(map);
    self.autorun(function() {
      console.log('onCreated - self.autorun NewEvent'); 
      eventController.setMapAttributes();
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
    console.log('En el helpers...2');
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