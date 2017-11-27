/* global Template $ moment ReactiveVar GoogleMaps Meteor Materialize */
import EventController from './../../../../../lib/controllers/event.controller';

Template.newEvent.onRendered(function() {
  console.log('On Rendered positivoo!');
  const $dateInput = $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false, // Close upon selecting a date,
    min: new Date(),
  });

  const datePicker = $dateInput.pickadate('picker');
  datePicker.set('select', new Date());

  $('.timepicker').pickatime({
    default: 'now', // Set default time: 'now', '1:30AM', '16:30'
    fromnow: 0, // set default time to * milliseconds from now (using with default = 'now')
    twelvehour: false, // Use AM/PM or 24-hour format
    donetext: 'OK', // text for done-button
    cleartext: 'Clear', // text for clear-button
    canceltext: 'Cancel', // Text for cancel-button
    autoclose: false, // automatic close timepicker
    ampmclickable: true, // make AM PM clickable
    // aftershow: function(){} // Function for after opening timepicker
  });

  $('input#event_name_create').characterCounter();

  document.getElementById('event_hour_create').value = moment().add(1, 'hours').format('HH:mm');
});

Template.newEvent.onCreated(function() {
  console.log('On created new event hijitasssss');
  this.eventController = new ReactiveVar(new EventController());

  /* GoogleMaps.ready('locationMap', (map) => {
    this.eventController.get().setMap(map, 'event_ubication');

    this.autorun(() => {
      this.eventController.get().setMapAttributes();
    });
  }); */

  GoogleMaps.ready('showMap', (map) => {
    console.log('Google maps ready');
    // this.eventController.get().setMap(map, 'event_ubication');
    this.eventController.get().setMapForCreate(map);
    this.autorun(() => {
      this.eventController.get().setMapAttributesFroCreate('event_ubication_create');
    });
    /* this.eventController.get().setMap(map, 'event_ubication'); */
  });
});

Template.newEvent.onDestroyed(function() {
  console.log('On Destroy Khaboom!');
  Template.instance().eventController.get().onDestroyMapForCreate();
});

Template.newEvent.helpers({
  mapOptions: () => Template.instance().eventController.get().getMapOptions(),
});

Template.newEvent.events({
  'submit .new-event': (event) => {
    console.log('Event keyword: ', event.which);
    if (!event.which) {
      event.stopPropagation();
      event.preventDefault();
    } else {
      event.preventDefault();
      const eventPosition = Template.instance().eventController.get().getEventPosition();
      const eventDate = new Date(`${event.target.event_date.value} ${event.target.event_hour.value}`);
      const newEvent = {
        name: event.target.event_name.value,
        description: event.target.event_description.value,
        ubication: event.target.event_ubication.value,
        latitude: eventPosition.lat(),
        longitude: eventPosition.lng(),
        date: eventDate,
        participants: [],
        comments: [],
        interested: [],
      };
      Meteor.call('insertEvent', newEvent);
      Materialize.updateTextFields();
      $('form')[0].reset();
      $('ul.tabs').tabs('select_tab', 'test1');
    }
  },

  'keypress #search-input': (event) => {
    if (event.which === 13) {
      event.stopPropagation();
    }
  },
});
