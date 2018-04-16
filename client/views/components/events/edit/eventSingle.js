/* global Template $ FlowRouter ReactiveVar GoogleMaps Events Members Parishes */

import EventController from './../../../../../lib/controllers/event.controller';

Template.eventSingle.onRendered(function() {
  this.autorun(() => {
    this.subscribe('parishesNumber');

    if (Template.instance().subscriptionsReady()) {
      const parishesFound = Parishes.find({}).fetch();

      if (parishesFound && parishesFound.length > 0) {
        const parishesData = {};
        parishesFound.forEach((parish) => {
          parishesData[parish.name] = null;
        });
        $('#event_parish_edit').autocomplete({
          data: parishesData,
          limit: 10,
          minLength: 1,
        });
      }
    }
  });

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
  $('.chips').on('chip.add', function(e) {
    if (e.currentTarget.id === 'inCharges_events_edit') {
      document.getElementById('label_inCharges_event_edit').classList.remove('chip-invalid');
    }
  });
  document.getElementById('label_event_description_edit').classList.remove('description-invalid');
  document.getElementById('label_event_parish_edit').classList.add('active');
});

Template.eventSingle.onCreated(function() {
  const eventId = FlowRouter.getParam('id');
  this.eventController = new ReactiveVar(new EventController());
  this.event = new ReactiveVar(null);
  this.members = new ReactiveVar(null);

  this.autorun(() => {
    this.subscribe('singleEventByEdit', eventId);
    this.subscribe('membersByEdit');

    if (Template.instance().subscriptionsReady()) {
      GoogleMaps.ready('showMap', (map) => {
        this.eventController.get().setMap(map);

        this.autorun(() => {
          const eventFound = Events.find({ _id: eventId }).fetch();

          if (eventFound && eventFound.length) {
            this.event.set(eventFound[0]);
            this.eventController.get().setEventForEditOnMap(eventFound[0], 'event_ubication_edit');
          }

          const membersData = {};
          const members = Members.find({}).fetch();
          if (members && members.length) {
            members.forEach((member) => {
              membersData[member.name] = 'http://lorempixel.com/250/250/people/';
            });

            const inChargeForShow =
              this.eventController.get().setInChargesForData(eventFound[0].inCharges, members);

            const membersForShow =
              this.eventController.get().setInChargesForData(eventFound[0].members, members);

            $('#inCharges_events_edit.chips-autocomplete').material_chip({
              data: inChargeForShow,
              autocompleteOptions: {
                data: membersData,
                limit: 10,
                minLength: 1,
              },
              placeholder: 'Nombre',
            });

            $('#members_event_edit.chips-autocomplete').material_chip({
              data: membersForShow,
              autocompleteOptions: {
                data: membersData,
                limit: 10,
                minLength: 1,
              },
              placeholder: 'Nombre',
            });
          }
        });
      });
    }
  });
});

Template.eventSingle.helpers({
  event: () => Template.instance().event.get(),
  eventDate: () => {
    const event = Template.instance().event.get();
    if (event) {
      return Template.instance().eventController.get().getEventDateForShow(event);
    }
    return '';
  },
  eventHour: () => {
    const event = Template.instance().event.get();
    if (event) {
      return Template.instance().eventController.get().getEventHourForShow(event);
    }
    return '';
  },
});

Template.eventSingle.events({
  'change #event_inscription_range_edit': (event) => {
    document.getElementById('event_inscription_edit').value = `${event.target.value} metros`;
    Template.instance().eventController.get().updateRadioOnMap(event.target.value);
  },

  'submit #edit-event': (event) => {
    event.preventDefault();
    const inChargesData = $('#inCharges_events_edit').material_chip('data');
    const membersData = $('#members_event_edit').material_chip('data');
    const inCharges =
      Template.instance().eventController.get().getMembersOrInChargesFromData(inChargesData);
    const members =
      Template.instance().eventController.get().getMembersOrInChargesFromData(membersData);
    const eventDate = event.target.event_date_edit.value;
    const eventHour = event.target.event_hour_edit.value;
    const eventRadio = event.target.event_inscription_edit.value;
    const eventEdited = {
      name: event.target.event_name_edit.value,
      ubication: event.target.event_ubication_edit.value,
      description: event.target.event_description_edit.value,
      inCharges,
      members,
      interested: [],
      parish: event.target.event_parish_edit.value,
    };

    if (!eventEdited.name) {
      event.target.event_name_edit.classList.add('invalid');
      document.getElementById('label_event_name_edit').classList.add('active');
    }
    if (!eventEdited.ubication) {
      event.target.event_ubication_edit.classList.add('invalid');
      document.getElementById('label_event_ubication_edit').classList.add('active');
    }
    if (!eventDate) {
      event.target.event_date_edit.classList.add('invalid');
      document.getElementById('label_event_date_edit').classList.add('active');
    }
    if (!eventHour) {
      event.target.event_hour_edit.classList.add('invalid');
      document.getElementById('label_event_hour_edit').classList.add('active');
    }
    if (!eventEdited.inCharges.length) {
      document.getElementById('label_inCharges_event_edit').classList.add('active');
      document.getElementById('label_inCharges_event_edit').classList.add('chip-invalid');
    }
    if (!eventEdited.description) {
      event.target.event_description_edit.classList.add('invalid');
      document.getElementById('label_event_description_edit').classList.add('active');
      document.getElementById('label_event_description_edit').classList.add('description-invalid');
    }
    if (!eventEdited.parish) {
      event.target.event_parish_edit.classList.add('invalid');
      document.getElementById('label_event_parish_edit').classList.add('active');
    }

    const isValidform = !!eventEdited.name &&
      !!eventEdited.ubication &&
      !!eventRadio &&
      !!eventDate &&
      !!eventHour &&
      !!eventEdited.inCharges.length &&
      !!eventEdited.description &&
      !!eventEdited.parish;

    if (isValidform) {
      const eventPosition = Template.instance().eventController.get().getEventPosition();
      const newEventDate = new Date(`${eventDate} ${eventHour}`);

      eventEdited.radius = parseInt(eventRadio, 10);
      eventEdited.latitude = eventPosition.lat();
      eventEdited.longitude = eventPosition.lng();
      eventEdited.date = newEventDate;

      const eventId = FlowRouter.getParam('id');
      Template.instance().eventController.get().updateEvent(eventId, eventEdited);
      document.getElementById('label_event_description_edit').classList.remove('description-invalid');
      FlowRouter.go(`/events/${eventId}`);
    }
  },

  'keypress #event_ubication_edit': (event) => {
    if (event.which === 13) {
      event.stopPropagation();
      event.preventDefault();
    }
  },
});
