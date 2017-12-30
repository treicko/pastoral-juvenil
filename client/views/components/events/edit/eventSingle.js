/* global Template $ FlowRouter ReactiveVar GoogleMaps Meteor */

import EventController from './../../../../../lib/controllers/event.controller';

Template.eventSingle.onRendered(function() {
  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Fecha actual',
    clear: false,
    close: 'Seleccionar',
    closeOnSelect: false, // Close upon selecting a date,
    min: new Date(),
  });

  $('.timepicker').pickatime({
    fromnow: 0, // set default time to * milliseconds from now (using with default = 'now')
    twelvehour: false, // Use AM/PM or 24-hour format
    donetext: 'Seleccionar', // text for done-button
    cleartext: 'Limpiar',
    canceltext: 'Cancelar',
    autoclose: false, // automatic close timepicker
    ampmclickable: true, // make AM PM clickable
  });

  $('input#event_name_edit').characterCounter();
});

Template.eventSingle.onCreated(function() {
  this.eventController = new ReactiveVar(new EventController());
  const eventId = FlowRouter.getParam('id');

  this.autorun(() => {
    this.subscribe('singleEvent', eventId);
  });

  GoogleMaps.ready('showMap', (map) => {
    this.eventController.get().setMap(map);
    this.autorun(() => {
      this.eventController.get().setEventForEditOnMap(eventId, 'event_ubication_edit');
    });
  });
});

Template.eventSingle.helpers({
  event: () => {
    const eventId = FlowRouter.getParam('id');
    return Template.instance().eventController.get().getEventByIdForShow(eventId);
  },
});

Template.eventSingle.events({
  'change #event_inscription_range_edit': (event) => {
    document.getElementById('event_inscription_edit').value = `${event.target.value} metros`;
    Template.instance().eventController.get().updateRadioOnMap(event.target.value);
  },

  'submit #edit-event': (event) => {
    const eventName = event.target.event_name_edit.value !== '' ? event.target.event_name_edit.value : '';
    const eventUbication = event.target.event_ubication_edit.value !== '' ? event.target.event_ubication_edit.value : '';
    const eventRadio = event.target.event_inscription_edit.value !== '' ? event.target.event_inscription_edit.value : '';
    let eventDate = event.target.event_date_edit.value !== '' ? event.target.event_date_edit.value : '';
    const eventHour = event.target.event_hour_edit.value !== '' ? event.target.event_hour_edit.value : '';
    const eventDescription = event.target.event_description_edit.value !== '' ? event.target.event_description_edit.value : '';

    if (eventName === '') {
      event.target.event_name_edit.classList.add('invalid');
      document.getElementById('label_event_name_edit').classList.add('active');
    }
    if (eventUbication === '') {
      event.target.event_ubication_edit.classList.add('invalid');
      document.getElementById('label_event_ubication_edit').classList.add('active');
    }
    if (eventRadio === '') {
      event.target.event_inscription_edit.classList.add('invalid');
      document.getElementById('label_event_inscription_edit').classList.add('active');
    }
    if (eventDate === '') {
      event.target.event_date_edit.classList.add('invalid');
      document.getElementById('label_event_date_edit').classList.add('active');
    }
    if (eventHour === '') {
      event.target.event_hour_edit.classList.add('invalid');
      document.getElementById('label_event_hour_edit').classList.add('active');
    }
    /* if (eventDescription === '') {
      event.target.event_description_edit.classList.add('invalid');
      document.getElementById('label_event_description_edit').classList.add('active');
    } */

    const isValidform = eventName !== '' &&
      eventUbication !== '' &&
      eventDate !== '' &&
      eventHour !== '' &&
      eventRadio !== '';

    if (isValidform) {
      event.preventDefault();
      const eventPosition = Template.instance().eventController.get().getEventPosition();
      eventDate = new Date(`${eventDate} ${eventHour}`);
      const updateEvent = {
        name: eventName,
        description: eventDescription,
        ubication: eventUbication,
        radius: parseInt(eventRadio, 10),
        latitude: eventPosition.lat(),
        longitude: eventPosition.lng(),
        date: eventDate,
        participants: [],
        comments: [],
        interested: [],
      };

      const eventId = FlowRouter.getParam('id');
      Meteor.call('updateEvent', eventId, updateEvent);
      FlowRouter.go(`/events/${eventId}`);
    } else {
      event.preventDefault();
    }
  },

  'keypress #event_ubication_edit': (event) => {
    if (event.which === 13) {
      event.stopPropagation();
      event.preventDefault();
    }
  },
});
