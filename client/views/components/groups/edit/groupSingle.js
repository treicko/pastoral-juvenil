/* global Template ReactiveVar FlowRouter GoogleMaps Members $ */

import GroupController from './../../../../../lib/controllers/group.controller';

Template.groupSingle.onRendered(function() {
  $('.chips').on('chip.add', function(e) {
    if (e.currentTarget.id === 'in_charges_create') {
      document.getElementById('label_inCharges_edit').classList.remove('chip-invalid');
    }
  });
  document.getElementById('label_group_description_edit').classList.remove('description-invalid');
});

Template.groupSingle.onCreated(function() {
  this.groupController = new ReactiveVar(new GroupController());
  const groupId = FlowRouter.getParam('id');

  this.autorun(() => {
    this.subscribe('singleGroup', groupId);
    this.subscribe('members');
  });

  GoogleMaps.ready('showMap', (map) => {
    this.groupController.get().setMap(map);
    this.autorun(() => {
      this.groupController.get().setGroupForEditOnMap(groupId, 'group_ubication_edit');
    });
  });
});

Template.groupSingle.helpers({
  group: () => {
    const groupId = FlowRouter.getParam('id');
    if (Template.instance().groupController) {
      const groupFound = Template.instance().groupController.get().getGroupById(groupId);
      if (groupFound) {
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
  'submit #edit-group': (event) => {
    event.preventDefault();
    const groupPosition = Template.instance().groupController.get().getGroupPosition();
    const inChargesData = $('#inCharges_edit').material_chip('data');
    const membersData = $('#members_edit').material_chip('data');
    const inCharges =
      Template.instance().groupController.get().getMembersOrInChargesFromData(inChargesData);
    const members =
      Template.instance().groupController.get().getMembersOrInChargesFromData(membersData);

    const editedGroup = {
      name: event.target.group_name_edit.value,
      location: event.target.group_ubication_edit.value,
      inCharge: inCharges,
      description: event.target.group_description_edit.value,
      latitude: groupPosition.lat(),
      longitude: groupPosition.lng(),
      members,
    };

    if (!editedGroup.name) {
      event.target.group_name_edit.classList.add('invalid');
      document.getElementById('label_group_name_edit').classList.add('active');
    }
    if (!editedGroup.location) {
      event.target.group_ubication_edit.classList.add('invalid');
      document.getElementById('label_group_ubication_edit').classList.add('active');
    }
    if (!editedGroup.inCharge.length) {
      document.getElementById('label_inCharges_edit').classList.add('active');
      document.getElementById('label_inCharges_edit').classList.add('chip-invalid');
    }
    if (!editedGroup.description) {
      event.target.group_description_edit.classList.add('invalid');
      document.getElementById('label_group_description_edit').classList.add('active');
      document.getElementById('label_group_description_edit').classList.add('description-invalid');
    }

    const isValidform = !!editedGroup.name &&
      !!editedGroup.location &&
      !!editedGroup.inCharge.length &&
      !!editedGroup.description;

    if (isValidform) {
      const groupId = FlowRouter.getParam('id');
      Template.instance().groupController.get().editGroup(groupId, editedGroup);
      document.getElementById('label_group_description_edit').classList.remove('description-invalid');
      FlowRouter.go(`/groups/${groupId}`);
    }
  },

  'keypress #group_ubication_edit': (event) => {
    if (event.which === 13) {
      event.stopPropagation();
      event.preventDefault();
    }
  },
});
