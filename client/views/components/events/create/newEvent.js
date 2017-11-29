/* global Template $ moment ReactiveVar GoogleMaps Meteor Materialize */
import EventController from './../../../../../lib/controllers/event.controller';

Template.newEvent.onRendered(function() {
  const $dateInput = $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Fecha actual',
    // clear: 'Clear',
    clear: false,
    close: 'Seleccionar',
    closeOnSelect: false, // Close upon selecting a date,
    min: new Date(),
  });

  const datePicker = $dateInput.pickadate('picker');
  datePicker.set('select', new Date());

  $('.timepicker').pickatime({
    default: 'now', // Set default time: 'now', '1:30AM', '16:30'
    fromnow: 0, // set default time to * milliseconds from now (using with default = 'now')
    twelvehour: false, // Use AM/PM or 24-hour format
    donetext: 'Seleccionar', // text for done-button
    cleartext: 'Limpiar',
    canceltext: 'Cancelar',
    autoclose: false, // automatic close timepicker
    ampmclickable: true, // make AM PM clickable
    // aftershow: function(){} // Function for after opening timepicker
  });

  $('input#event_name_create').characterCounter();

  document.getElementById('event_hour_create').value = moment().add(1, 'hours').format('HH:mm');
});

Template.newEvent.onCreated(function() {
  this.eventController = new ReactiveVar(new EventController());

  GoogleMaps.ready('showMap', (map) => {
    this.eventController.get().setMapForCreate(map);
    this.autorun(() => {
      this.eventController.get().setMapAttributesFroCreate('event_ubication_create');
    });
  });
});

Template.newEvent.onDestroyed(function() {
  Template.instance().eventController.get().onDestroyMapForCreate();
});

Template.newEvent.helpers({
  mapOptions: () => Template.instance().eventController.get().getMapOptions(),
});

Template.newEvent.events({
  'click #cancel_new_event': () => {
    Materialize.updateTextFields();
    $('form')[0].reset();
    $('ul.tabs').tabs('select_tab', 'test1');
  },

  'submit .new-event': (event) => {
    const eventName = event.target.event_name_create.value !== '' ? event.target.event_name_create.value : '';
    const eventUbication = event.target.event_ubication_create.value !== '' ? event.target.event_ubication_create.value : '';
    let eventDate = event.target.event_date_create.value !== '' ? event.target.event_date_create.value : '';
    const eventHour = event.target.event_hour_create.value !== '' ? event.target.event_hour_create.value : '';
    const eventDescription = event.target.event_description_create.value !== '' ? event.target.event_description_create.value : '';

    if (eventName === '') {
      event.target.event_name_create.classList.add('invalid');
      document.getElementById('label_event_name_create').classList.add('active');
    }
    if (eventUbication === '') {
      event.target.event_ubication_create.classList.add('invalid');
      document.getElementById('label_event_ubication_create').classList.add('active');
    }
    if (eventDate === '') {
      event.target.event_date_create.classList.add('invalid');
      document.getElementById('label_event_date_create').classList.add('active');
    }
    if (eventHour === '') {
      event.target.event_hour_create.classList.add('invalid');
      document.getElementById('label_event_hour_create').classList.add('active');
    }
    if (eventDescription === '') {
      event.target.event_description_create.classList.add('invalid');
      document.getElementById('label_event_description_create').classList.add('active');
    }

    const isValidform = eventName !== '' &&
      eventUbication !== '' &&
      eventDate !== '' &&
      eventHour !== '' &&
      eventDescription !== '';

    if (isValidform) {
      event.preventDefault();
      const eventPosition = Template.instance().eventController.get().getEventPosition();
      eventDate = new Date(`${eventDate} ${eventHour}`);
      const newEvent = {
        name: event.target.event_name_create.value,
        description: event.target.event_description_create.value,
        ubication: event.target.event_ubication_create.value,
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
    } else {
      event.preventDefault();
    }
  },

  'keypress #event_ubication_create': (event) => {
    if (event.which === 13) {
      event.stopPropagation();
      event.preventDefault();
    }
  },
});
