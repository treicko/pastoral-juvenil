import EventController from './../../../../../lib/controllers/event.controller';
import GroupController from './../../../../../lib/controllers/group.controller';

Template.NewGroup.onRendered(function() {
  let members = [];
  const self = this;
  const membersData = {};

  self.autorun(function() {
    self.subscribe('members');

    if (Template.instance().subscriptionsReady()) {
      members = Members.find({}).fetch();
      if(members.length > 0) {
        members.forEach(member => {
          membersData[member.name] = 'http://lorempixel.com/250/250/people/'
        });
      }
    }

    $('.chips').material_chip();
    $('.chips-placeholder').material_chip({
      placeholder: 'Enter a tag'
    }); 
    $('.chips-autocomplete').material_chip({
      autocompleteOptions: {
        data: membersData,
        limit: 10,
        minLength: 1
      },
      placeholder: 'Nombre'
    });
  });
});

Template.NewGroup.onCreated(function() {
  const self = this;
  this.eventController = new ReactiveVar(new EventController());
  this.groupController = new ReactiveVar(new GroupController());

  self.autorun(function() {
    self.subscribe('groups');
  });

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
    const groupPosition = Template.instance().eventController.get().getEventPosition();
    const inChargesData = $('#inCharges').material_chip('data');
    const membersData = $('#members').material_chip('data');
    const inCharges = Template.instance().groupController.get().getMembersOrInChargesFromData(inChargesData);
    const members = Template.instance().groupController.get().getMembersOrInChargesFromData(membersData);
    
    const newGroup = {
      'name': event.target.group_name.value,
      'location': event.target.group_ubication.value,
      'inCharge': inCharges,
      'description': event.target.group_description.value,
      'latitude': groupPosition.lat(),
      'longitude': groupPosition.lng(),
      'members': members
    }
    
    Template.instance().groupController.get().saveGroup(newGroup);
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