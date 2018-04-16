/* global Template ReactiveVar FlowRouter GoogleMaps Members Groups $ Parishes */

import GroupController from './../../../../../lib/controllers/group.controller';

Template.groupSingle.onRendered(function() {
  this.autorun(() => {
    this.subscribe('parishesNumber');

    if (Template.instance().subscriptionsReady()) {
      const parishesFound = Parishes.find({}).fetch();

      if (parishesFound && parishesFound.length > 0) {
        const parishesData = {};

        parishesFound.forEach((parish) => {
          parishesData[parish.name] = null;
        });

        $('#group_parish_edit').autocomplete({
          data: parishesData,
          limit: 10,
          minLength: 1,
        });
      }
    }
  });

  $('.chips').on('chip.add', function(e) {
    if (e.currentTarget.id === 'in_charges_create') {
      document.getElementById('label_inCharges_edit').classList.remove('chip-invalid');
    }
  });
  document.getElementById('label_group_description_edit').classList.remove('description-invalid');
  document.getElementById('label_group_parish_edit').classList.add('active');
});

Template.groupSingle.onCreated(function() {
  const groupId = FlowRouter.getParam('id');
  this.groupController = new ReactiveVar(new GroupController());
  this.group = new ReactiveVar(null);

  this.autorun(() => {
    this.subscribe('singleGroupByEdit', groupId);
    this.subscribe('membersByEdit');
    this.subscribe('parishesNumber');

    if (Template.instance().subscriptionsReady()) {
      GoogleMaps.ready('showMap', (map) => {
        this.groupController.get().setMap(map);
        this.autorun(() => {
          const groupFound = Groups.find({ _id: groupId }).fetch();
          if (!this.group.get() && groupFound && groupFound.length) {
            this.group.set(groupFound[0]);
            this.groupController.get().setGroupForEditOnMap(groupFound[0], 'group_ubication_edit');

            const membersData = {};
            const members = Members.find({}).fetch();
            if (members && members.length) {
              members.forEach((member) => {
                membersData[member.name] = 'http://lorempixel.com/250/250/people/';
              });

              const inChargeForShow =
                this.groupController.get().setInChargesForData(groupFound[0].inCharges, members);

              const membersForShow =
                this.groupController.get().setInChargesForData(groupFound[0].members, members);

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
            }
          }
        });
      });
    }
  });
});

Template.groupSingle.helpers({
  group: () => Template.instance().group.get(),
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
      description: event.target.group_description_edit.value,
      latitude: groupPosition.lat(),
      longitude: groupPosition.lng(),
      parish: event.target.group_parish_edit.value,
      inCharges,
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
    if (!editedGroup.inCharges.length) {
      document.getElementById('label_inCharges_edit').classList.add('active');
      document.getElementById('label_inCharges_edit').classList.add('chip-invalid');
    }
    if (!editedGroup.description) {
      event.target.group_description_edit.classList.add('invalid');
      document.getElementById('label_group_description_edit').classList.add('active');
      document.getElementById('label_group_description_edit').classList.add('description-invalid');
    }

    if (!editedGroup.parish) {
      event.target.group_parish_edit.classList.add('invalid');
      document.getElementById('label_group_parish_edit').classList.add('active');
    }

    const isValidform = !!editedGroup.name &&
      !!editedGroup.location &&
      !!editedGroup.inCharges.length &&
      !!editedGroup.description &&
      !!editedGroup.parish;

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
