/* global Template Members $ ReactiveVar GoogleMaps Parishes Materialize */
import GroupController from './../../../../../lib/controllers/group.controller';

Template.newGroup.onRendered(function() {
  this.members = new ReactiveVar([]);
  const membersData = {};

  this.autorun(() => {
    this.subscribe('membersNameAndUserId');
    this.subscribe('parishesNumber');

    if (Template.instance().subscriptionsReady()) {
      const membersFound = Members.find({}).fetch();
      const parishesFound = Parishes.find({}).fetch();

      if (membersFound && membersFound.length > 0) {
        this.members.set(membersFound);
        membersFound.forEach((member) => {
          membersData[member.name] = 'http://lorempixel.com/250/250/people/';
        });
      }

      if (parishesFound && parishesFound.length > 0) {
        const parishesData = {};

        parishesFound.forEach((parish) => {
          parishesData[parish.name] = null;
        });

        $('#parish_create').autocomplete({
          data: parishesData,
          limit: 10,
          minLength: 1,
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
    $('.chips').on('chip.add', function(e) {
      if (e.currentTarget.id === 'in_charges_create') {
        document.getElementById('label_group_in_charges_create').classList.remove('chip-invalid');
      }
    });
    $('select').material_select();
    document.getElementById('label_group_description_create').classList.remove('description-invalid');
  });
});

Template.newGroup.onCreated(function() {
  this.groupController = new ReactiveVar(new GroupController());

  GoogleMaps.ready('showMap', (map) => {
    this.groupController.get().setMap(map);
    this.autorun(() => {
      this.groupController.get().setGroupForCreate('group_ubication_create');
    });
  });
});

Template.newGroup.helpers({
});

Template.newGroup.events({
  'click #cancel_new_group': () => {
    Materialize.updateTextFields();
    $('form')[0].reset();
    $('ul.tabs').tabs('select_tab', 'groups');
  },

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
      inCharges,
      description: event.target.group_description_create.value,
      latitude: groupPosition.lat(),
      longitude: groupPosition.lng(),
      parish: event.target.parish_create.value,
      members,
      publications: [],
    };

    if (!newGroup.name) {
      event.target.group_name_create.classList.add('invalid');
      document.getElementById('label_group_name_create').classList.add('active');
    }
    if (!newGroup.location) {
      event.target.group_ubication_create.classList.add('invalid');
      document.getElementById('label_group_ubication_create').classList.add('active');
    }
    if (!newGroup.inCharges.length) {
      document.getElementById('label_group_in_charges_create').classList.add('active');
      document.getElementById('label_group_in_charges_create').classList.add('chip-invalid');
    }
    if (!newGroup.description) {
      event.target.group_description_create.classList.add('invalid');
      document.getElementById('label_group_description_create').classList.add('active');
      document.getElementById('label_group_description_create').classList.add('description-invalid');
    }

    if (!newGroup.parish) {
      event.target.parish_create.classList.add('invalid');
      document.getElementById('label_parish_create').classList.add('active');
    }

    const isValidform = !!newGroup.name &&
      !!newGroup.location &&
      !!newGroup.inCharges.length &&
      !!newGroup.description &&
      !!newGroup.parish;

    if (isValidform) {
      Template.instance().groupController.get().saveGroup({
        newGroup,
        memberList: Template.instance().members.get(),
      });
      document.getElementById('label_group_description_create').classList.remove('description-invalid');
      $('form')[0].reset();
      $('ul.tabs').tabs('select_tab', 'groups');
    }
  },

  'keypress #group_ubication_create': (event) => {
    if (event.which === 13) {
      event.stopPropagation();
      event.preventDefault();
    }
  },
});
