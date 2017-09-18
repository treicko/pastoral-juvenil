import EventController from './../../../../../lib/controllers/event.controller';

Template.NewParish.onRendered(function() {  
  $('input.autocomplete').autocomplete({
    data: {
      "Pedro Perez Silgado": 'https://placehold.it/250x250',
      "Juan Antonio Merida Aranibal": 'https://placehold.it/250x250',
      "Julio Rojas Flores": 'https://placehold.it/250x250',
      "Camilo Fuentes Mendieta": 'https://placehold.it/250x250',
      "Alberto Blackut Rodriguez": 'https://placehold.it/250x250'
    },
    limit: 20 // The max amount of results that can be shown at once. Default: Infinity.
  });
});

Template.NewParish.onCreated(function() {
  const self = this;  
  this.eventController = new ReactiveVar(new EventController());

  GoogleMaps.ready('parishMap', (map) => {
    this.eventController.get().setMap(map, 'parish_ubication');
    self.autorun(() => {
      this.eventController.get().setMapAttributes();
    });
  });
});

Template.NewParish.helpers({
  mapOptions: function() {
    return Template.instance().eventController.get().getMapOptions();
  }
});

Template.NewParish.events({
  'submit #new-parish': function(event) {
    event.preventDefault();
    const eventPosition = Template.instance().eventController.get().getEventPosition();
    const newParish = {
      'name': event.target.parish_name.value,
      'location': event.target.parish_ubication.value,
      'inCharge': event.target.parish_in_charge.value
    }
    console.log('La puta madreeee no entra aqui cuando presioo submit: ', newParish);
    Meteor.call('insertParish', newParish);    
    $("form")[0].reset();
    $('ul.tabs').tabs('select_tab', 'parishes');
  },

  'keypress #search-input': function (event, template) {
    if (event.which === 13) {
      event.stopPropagation();
      return false;
    }
  },
});