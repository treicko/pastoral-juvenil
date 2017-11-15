/* global Template $ ReactiveVar GoogleMaps Meteor */
import EventController from './../../../../../lib/controllers/event.controller';

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
  this.eventController = new ReactiveVar(new EventController());

  GoogleMaps.ready('parishMap', (map) => {
    this.eventController.get().setMap(map, 'parish_ubication');
    this.autorun(() => {
      this.eventController.get().setMapAttributes();
    });
  });
});

Template.newParish.helpers({
  mapOptions: () => Template.instance().eventController.get().getMapOptions(),
});

Template.newParish.events({
  'submit #new-parish': (event) => {
    event.preventDefault();
    const parishPosition = Template.instance().eventController.get().getEventPosition();
    const newParish = {
      name: event.target.parish_name.value,
      location: event.target.parish_ubication.value,
      inCharge: event.target.parish_in_charge.value,
      latitude: parishPosition.lat(),
      longitude: parishPosition.lng(),
    };
    Meteor.call('insertParish', newParish);
    $('form')[0].reset();
    $('ul.tabs').tabs('select_tab', 'parishes');
  },

  'keypress #search-input': (event) => {
    if (event.which === 13) {
      event.stopPropagation();
    }
  },
});
