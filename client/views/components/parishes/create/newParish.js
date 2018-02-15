/* global Template $ ReactiveVar GoogleMaps Meteor Materialize Members */
import ParishController from './../../../../../lib/controllers/parish.controller';

Template.newParish.onRendered(function() {
  let members = [];
  const membersData = {};

  this.autorun(() => {
    this.subscribe('members');

    if (Template.instance().subscriptionsReady()) {
      members = Members.find({}).fetch();
      if (members.length > 0) {
        members.forEach((member) => {
          membersData[member.name] = 'http://lorempixel.com/250/250/people/';
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
    const inChargesData = $('#parish_members_create').material_chip('data');
    const inCharges =
      Template.instance().parishController.get().getInChargesFromData(inChargesData);

    const newParish = {
      name: event.target.parish_name_create.value,
      location: event.target.parish_ubication_create.value,
      inCharge: inCharges,
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
