/* global Template $ ReactiveVar GoogleMaps Meteor Materialize */
import ParishController from './../../../../../lib/controllers/parish.controller';

Template.newParish.onRendered(function() {
  $('input.autocomplete').autocomplete({
    data: {
      'Pedro Perez Silgado': 'https://placehold.it/250x250',
      'Juan Antonio Merida Aranibal': 'https://placehold.it/250x250',
      'Julio Rojas Flores': 'https://placehold.it/250x250',
      'Camilo Fuentes Mendieta': 'https://placehold.it/250x250',
      'Alberto Blackut Rodriguez': 'https://placehold.it/250x250',
    },
    limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
  });
});

Template.newParish.onCreated(function() {
  this.parishController = new ReactiveVar(new ParishController());
  GoogleMaps.ready('showMap', (map) => {
    this.parishController.get().setMap(map);
    this.autorun(() => {
      this.parishController.get().setParishForCreate('parish_ubication_create');
    });
  });
});

Template.newParish.helpers({
  mapOptions: () => Template.instance().eventController.get().getMapOptions(),
});

Template.newParish.events({
  'click #cancel_new_parish': () => {
    Materialize.updateTextFields();
    $('form')[0].reset();
    $('ul.tabs').tabs('select_tab', 'parishes');
  },

  'submit #new-parish': (event) => {
    event.preventDefault();

    const newParish = {
      name: event.target.parish_name_create.value,
      location: event.target.parish_ubication_create.value,
      inCharge: event.target.parish_in_charge_create.value,
    };

    if (!newParish.name) {
      event.target.parish_name_create.classList.add('invalid');
      document.getElementById('label_parish_name_create').classList.add('active');
    }
    if (!newParish.location) {
      event.target.parish_ubication_create.classList.add('invalid');
      document.getElementById('label_parish_ubication_create').classList.add('active');
    }

    const isValidform = !!newParish.name &&
      !!newParish.location;

    if (isValidform) {
      const parishPosition = Template.instance().parishController.get().getParishPosition();
      newParish.latitude = parishPosition.lat();
      newParish.longitude = parishPosition.lng();
      Meteor.call('insertParish', newParish);
      $('form')[0].reset();
      $('ul.tabs').tabs('select_tab', 'parishes');
    }
  },

  'keypress #parish_ubication_create': (event) => {
    if (event.which === 13) {
      event.stopPropagation();
      event.preventDefault();
    }
  },
});
