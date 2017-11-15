/* global Template ReactiveVar FlowRouter GoogleMaps Geolocation Members $ */

import GroupController from './../../../../../lib/controllers/group.controller';

Template.groupSingle.onRendered(function() {
});

Template.groupSingle.onCreated(function() {
  let groupId;
  this.groupController = new ReactiveVar(new GroupController());

  this.autorun(() => {
    groupId = FlowRouter.getParam('id');
    this.subscribe('singleGroup', groupId);
    this.subscribe('members');
  });

  GoogleMaps.ready('showMap', (map) => {
    this.autorun(() => {
      const latLng = Geolocation.latLng();
      if (!latLng) {
        return;
      }

      this.groupController.get().setMapForCreateOrEdit(map, 'group_ubication_edit');
      const groupFound = this.groupController.get().getGroupById(groupId);
      if (groupFound) {
        this.groupController.get().setGroupForShowOnMap(groupFound);
      }
      this.groupController.get().setControlsToMap();
    });
  });
});

Template.groupSingle.helpers({
  group: () => {
    const groupId = FlowRouter.getParam('id');
    if (Template.instance().groupController) {
      const groupFound = Template.instance().groupController.get().getGroupById(groupId);
      if (groupFound) {
        Template.instance().groupController.get().setGroupForShowOnMap(groupFound);
        const inChargeForShow =
          Template.instance().groupController.get().setInChargesForData(groupFound.inCharge);
        const membersForShow =
          Template.instance().groupController.get().setInChargesForData(groupFound.members);
        groupFound.inCharge = inChargeForShow;
        groupFound.membersForShow = membersForShow;

        const membersData = {};
        const members = Members.find({}).fetch();
        if (members.length > 0) {
          members.forEach((member) => {
            membersData[member.name] = 'http://lorempixel.com/250/250/people/';
          });
        }

        $('#inCharges_edit.chips-autocomplete').material_chip({
          data: inChargeForShow,
          autocompleteOptions: {
            data: membersData,
            limit: 10,
            minLength: 1,
          },
          placeholder: 'Nombre',
        });

        $('#members_edit.chips-autocomplete').material_chip({
          data: membersForShow,
          autocompleteOptions: {
            data: membersData,
            limit: 10,
            minLength: 1,
          },
          placeholder: 'Nombre',
        });
        return groupFound;
      }
    }
    return {};
  },
});

Template.groupSingle.events({
  'submit #new-group': (event) => {
    event.preventDefault();
    const groupPosition = Template.instance().groupController.get().getGroupPosition();
    const inChargesData = $('#inCharges_edit').material_chip('data');
    const membersData = $('#members_edit').material_chip('data');
    const inCharges =
      Template.instance().groupController.get().getMembersOrInChargesFromData(inChargesData);
    const members =
      Template.instance().groupController.get().getMembersOrInChargesFromData(membersData);

    const newGroup = {
      name: event.target.group_name_edit.value,
      location: event.target.group_ubication_edit.value,
      inCharge: inCharges,
      description: event.target.group_description_edit.value,
      latitude: groupPosition.lat(),
      longitude: groupPosition.lng(),
      members,
    };
    const groupId = FlowRouter.getParam('id');
    Template.instance().groupController.get().editGroup(groupId, newGroup);
    FlowRouter.go(`/groups/${groupId}`);
  },

  'keypress #search-input': (event) => {
    if (event.which === 13) {
      event.stopPropagation();
    }
    return false;
  },
});
