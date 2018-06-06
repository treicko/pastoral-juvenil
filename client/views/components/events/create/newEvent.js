/* global Template $ moment ReactiveVar GoogleMaps Meteor Materialize Kardex Members Parishes */
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

  $('#textarea1').trigger('autoresize');

  $('input#event_name_create').characterCounter();

  document.getElementById('event_hour_create').value = moment().add(1, 'hours').format('HH:mm');
  document.getElementById('label_event_description_create').classList.remove('description-invalid');

  this.members = new ReactiveVar([]);
  const membersData = {};

  this.autorun(() => {
    this.subscribe('membersNameAndUserId');
    this.subscribe('parishesNumber');

    if (Template.instance().subscriptionsReady()) {
      const parishesData = {};
      const membersFound = Members.find({}).fetch();
      const parishesFound = Parishes.find({}).fetch();

      if (membersFound && membersFound.length) {
        this.members.set(membersFound);
        membersFound.forEach((member) => {
          membersData[member.name] = '/images/avatar2.jpg';
        });
      }

      if (parishesFound && parishesFound.length > 0) {
        parishesFound.forEach((parish) => {
          parishesData[parish.name] = null;
        });

        $('#event_parish_create').autocomplete({
          data: parishesData,
          limit: 10,
          minLength: 1,
        });
      }
    }

    $('.chips').material_chip();
    $('.chips-placeholder').material_chip({});
    $('.chips-autocomplete').material_chip({
      autocompleteOptions: {
        data: membersData,
        limit: 10,
        minLength: 1,
      },
    });
    $('.chips').on('chip.add', function(e) {
      if (e.currentTarget.id === 'in_charges_event_create') {
        document.getElementById('label_event_in_charges_create').classList.remove('chip-invalid');
      }
    });
  });
});

Template.newEvent.onCreated(function() {
  this.eventController = new ReactiveVar(new EventController());
  this.userKardex = new ReactiveVar(null);
  const userId = Meteor.user()._id;

  this.autorun(() => {
    this.subscribe('singleKardexByUser', userId);
    if (Template.instance().subscriptionsReady()) {
      const userKardexFound = Kardex.find({ userId }).fetch();
      if (userKardexFound && userKardexFound.length) {
        this.userKardex.set(userKardexFound[0]);
      }
    }
  });

  GoogleMaps.ready('showMap', (map) => {
    this.eventController.get().setMap(map);
    this.autorun(() => {
      this.eventController.get().setEventForCreate('event_ubication_create');
    });
  });
});

Template.newEvent.onDestroyed(function() {
  Template.instance().eventController.get().onDestroyMapForCreate();
});

Template.newEvent.helpers({
  eventRadio: () => 100,
});

Template.newEvent.events({
  'change #event_inscription_range_create': (event) => {
    document.getElementById('event_inscription_create').value = `${event.target.value} metros`;
    Template.instance().eventController.get().updateRadioOnMap(event.target.value);
  },

  'click #cancel_new_event': () => {
    Materialize.updateTextFields();
    $('form')[0].reset();
    $('ul.tabs').tabs('select_tab', 'test1');
  },

  'submit #new-event': (event) => {
    event.preventDefault();
    const inChargesData = $('#in_charges_event_create').material_chip('data');
    const membersData = $('#members_event_create').material_chip('data');
    const inCharges =
      Template.instance().eventController.get().getMembersOrInChargesFromData(inChargesData);
    const members =
      Template.instance().eventController.get().getMembersOrInChargesFromData(membersData);
    const eventToCreate = {
      name: event.target.event_name_create.value,
      ubication: event.target.event_ubication_create.value,
      radio: event.target.event_inscription_create.value,
      date: event.target.event_date_create.value,
      hour: event.target.event_hour_create.value,
      description: event.target.event_description_create.value,
      parish: event.target.event_parish_create.value,
    };

    if (!eventToCreate.name) {
      event.target.event_name_create.classList.add('invalid');
      document.getElementById('label_event_name_create').classList.add('active');
    }
    if (!eventToCreate.ubication) {
      event.target.event_ubication_create.classList.add('invalid');
      document.getElementById('label_event_ubication_create').classList.add('active');
    }
    if (!eventToCreate.radio) {
      event.target.event_inscription_create.classList.add('invalid');
      document.getElementById('label_event_inscription_create').classList.add('active');
    }
    if (!eventToCreate.date) {
      event.target.event_date_create.classList.add('invalid');
      document.getElementById('label_event_date_create').classList.add('active');
    }
    if (!eventToCreate.hour) {
      event.target.event_hour_create.classList.add('invalid');
      document.getElementById('label_event_hour_create').classList.add('active');
    }
    if (!eventToCreate.description) {
      event.target.event_description_create.classList.add('invalid');
      document.getElementById('label_event_description_create').classList.add('active');
      document.getElementById('label_event_description_create').classList.add('description-invalid');
    }
    if (!inCharges.length) {
      document.getElementById('label_event_in_charges_create').classList.add('active');
      document.getElementById('label_event_in_charges_create').classList.add('chip-invalid');
    }
    if (!eventToCreate.parish) {
      event.target.event_parish_create.classList.add('invalid');
      document.getElementById('label_event_parish_create').classList.add('active');
    }

    const isValidform = !!eventToCreate.name &&
      !!eventToCreate.ubication &&
      !!eventToCreate.date &&
      !!eventToCreate.hour &&
      !!eventToCreate.description &&
      !!eventToCreate.radio &&
      !!inCharges.length &&
      !!eventToCreate.parish;

    if (isValidform) {
      const eventPosition = Template.instance().eventController.get().getEventPosition();
      const eventDate = new Date(`${eventToCreate.date} ${eventToCreate.hour}`);
      const newEvent = {
        name: eventToCreate.name,
        description: eventToCreate.description,
        ubication: eventToCreate.ubication,
        radius: parseInt(eventToCreate.radio, 10),
        latitude: eventPosition.lat(),
        longitude: eventPosition.lng(),
        date: eventDate,
        participants: [],
        comments: [],
        interested: [],
        inCharges,
        members,
        parish: eventToCreate.parish,
      };

      Template.instance().eventController.get().createEvent({
        newEvent,
        userKardex: Template.instance().userKardex.get(),
        memberList: Template.instance().members.get(),
      });
      document.getElementById('label_event_description_create').classList.remove('description-invalid');
      $('form')[0].reset();

      const datePicker = $('.datepicker').pickadate('picker');
      datePicker.set('select', new Date());
      document.getElementById('event_hour_create').value = moment().add(1, 'hours').format('HH:mm');
      document.getElementById('event_inscription_create').value = '100 metros';
      document.getElementById('event_inscription_range_create').value = 100;
      Template.instance().eventController.get().updateRadioOnMap(100);
      Materialize.updateTextFields();

      $('ul.tabs').tabs('select_tab', 'test1');
    }
  },

  'keypress #event_ubication_create': (event) => {
    if (event.which === 13) {
      event.stopPropagation();
      event.preventDefault();
    }
  },
});
