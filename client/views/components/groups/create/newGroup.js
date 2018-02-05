/* global Template Members $ ReactiveVar GoogleMaps */

import EventController from './../../../../../lib/controllers/event.controller';
import GroupController from './../../../../../lib/controllers/group.controller';

Template.newGroup.onRendered(function() {
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
    $('.chips-placeholder').material_chip({
    });
    $('.chips-autocomplete').material_chip({
      autocompleteOptions: {
        data: membersData,
        limit: 10,
        minLength: 1,
      },
    });
  });
});

Template.newGroup.onCreated(function() {
  const self = this;
  this.eventController = new ReactiveVar(new EventController());
  this.groupController = new ReactiveVar(new GroupController());

  self.autorun(function() {
    self.subscribe('groups');
  });

  GoogleMaps.ready('showMap', (map) => {
    this.groupController.get().setMap(map);
    self.autorun(() => {
      this.groupController.get().setGroupForCreate('group_ubication_create');
    });
  });

  /* this.eventController = new ReactiveVar(new EventController());

  GoogleMaps.ready('showMap', (map) => {
    this.eventController.get().setMap(map);
    this.autorun(() => {
      this.eventController.get().setEventForCreate('event_ubication_create');
    });
  }); */
});

Template.newGroup.helpers({
});

Template.newGroup.events({
  'submit #new-group': (event) => {
    event.preventDefault();
    const groupPosition = Template.instance().groupController.get().getGroupPosition();
    const inChargesData = $('#in_charges_create').material_chip('data');
    const membersData = $('#members_create').material_chip('data');
    const inCharges =
      Template.instance().groupController.get().getMembersOrInChargesFromData(inChargesData);
    const members =
      Template.instance().groupController.get().getMembersOrInChargesFromData(membersData);

    const newGroup = {
      name: event.target.group_name_create.value,
      location: event.target.group_ubication_create.value,
      inCharge: inCharges,
      description: event.target.group_description_create.value,
      latitude: groupPosition.lat(),
      longitude: groupPosition.lng(),
      members,
      publications: [],
    };

    Template.instance().groupController.get().saveGroup(newGroup);
    $('form')[0].reset();
    $('ul.tabs').tabs('select_tab', 'groups');
  },

  /* 'keypress #group_ubication_create': (event) => {
    if (event.which === 13) {
      event.stopPropagation();
      event.preventDefault();
    }
  }, */
});
