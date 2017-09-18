import EventController from './../../../../../lib/controllers/event.controller';

Template.NewGroup.onRendered(function() {  
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

Template.NewGroup.onCreated(function() {
  const self = this;  
  this.eventController = new ReactiveVar(new EventController());

  GoogleMaps.ready('groupMap', (map) => {
    this.eventController.get().setMap(map, 'group_ubication');
    self.autorun(() => {
      this.eventController.get().setMapAttributes();
    });
  });
});

Template.NewGroup.helpers({
  mapOptions: function() {
    return Template.instance().eventController.get().getMapOptions();
  }
});

Template.NewGroup.events({
  'submit #new-group': function(event) {
    event.preventDefault();
    const eventPosition = Template.instance().eventController.get().getEventPosition();
    const newGroup = {
      'name': event.target.group_name.value,
      'location': event.target.group_ubication.value,
      'inCharge': event.target.group_in_charge.value,
      'description': event.target.group_description.value
    }

    Meteor.call('insertGroup', newGroup);
    $("form")[0].reset();
    $('ul.tabs').tabs('select_tab', 'groups');
  },

  'keypress #search-input': function (event, template) {
    if (event.which === 13) {
      event.stopPropagation();
      return false;
    }
  },
});