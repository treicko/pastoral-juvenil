/* global Template ReactiveVar FlowRouter GoogleMaps Members Vicarages $ */
import ParishController from './../../../../../lib/controllers/parish.controller';

Template.parishSingle.onRendered(function() {
  this.autorun(() => {
    this.subscribe('vicaragesNumber');

    if (Template.instance().subscriptionsReady()) {
      const vicarages = Vicarages.find({}).fetch();

      if (vicarages && vicarages.length > 0) {
        const vicaragesData = {};

        vicarages.forEach((vicarage) => {
          vicaragesData[vicarage.name] = null;
        });

        $('#parish_vicarage_edit').autocomplete({
          data: vicaragesData,
          limit: 10,
          minLength: 1,
        });
      }
    }
  });

  $('.chips').material_chip();
  document.getElementById('label_parish_vicarage_edit').classList.add('active');
});

Template.parishSingle.onCreated(function() {
  this.parishController = new ReactiveVar(new ParishController());
  const parishId = FlowRouter.getParam('id');

  this.autorun(() => {
    this.subscribe('singleParish', parishId);
    this.subscribe('members');
  });

  GoogleMaps.ready('showMap', (map) => {
    this.parishController.get().setMap(map);
    this.autorun(() => {
      this.parishController.get().setParishForEditOnMap(parishId, 'parish_ubication_edit');
    });
  });
});

Template.parishSingle.helpers({
  parish: () => {
    const parishId = FlowRouter.getParam('id');
    if (Template.instance().parishController) {
      const parishFound = Template.instance().parishController.get().getParishById(parishId);
      if (parishFound) {
        const inChargeForEdit =
          Template.instance().parishController.get().setInChargesForData(parishFound.inCharge);
        const membersData = {};
        const members = Members.find({}).fetch();

        if (members.length > 0) {
          members.forEach((member) => {
            membersData[member.name] = '/images/avatar2.jpg';
          });
        }

        $('#parish_inCharges_edit.chips-autocomplete').material_chip({
          data: inChargeForEdit,
          autocompleteOptions: {
            data: membersData,
            limit: 10,
            minLength: 1,
          },
          placeholder: 'Nombre',
        });
        return parishFound;
      }
    }

    return {};
  },
});

Template.parishSingle.events({
  'submit #edit-parish': (event) => {
    event.preventDefault();
    const inChargesData = $('#parish_inCharges_edit').material_chip('data');
    const inCharges =
      Template.instance().parishController.get().getInChargesFromData(inChargesData);

    const editedParish = {
      name: event.target.parish_name_edit.value,
      location: event.target.parish_ubication_edit.value,
      inCharge: inCharges,
      vicarage: event.target.parish_vicarage_edit.value,
    };

    if (!editedParish.name) {
      event.target.parish_name_create.classList.add('invalid');
      document.getElementById('label_parish_name_edit').classList.add('active');
    }
    if (!editedParish.location) {
      event.target.parish_ubication_create.classList.add('invalid');
      document.getElementById('label_parish_ubication_edit').classList.add('active');
    }
    if (!editedParish.vicarage) {
      event.target.parish_vicarage_edit.classList.add('invalid');
      document.getElementById('label_parish_vicarage_edit').classList.add('active');
    }

    const isValidform = !!editedParish.name &&
      !!editedParish.location &&
      !!editedParish.vicarage;

    if (isValidform) {
      const parishId = FlowRouter.getParam('id');
      const parishPosition = Template.instance().parishController.get().getParishPosition();
      editedParish.latitude = parishPosition.lat();
      editedParish.longitude = parishPosition.lng();
      Template.instance().parishController.get().editParish(parishId, editedParish);
      FlowRouter.go(`/parishes/${parishId}`);
    }
  },

  'keypress #parish_ubication_edit': (event) => {
    if (event.which === 13) {
      event.stopPropagation();
      event.preventDefault();
    }
  },
});
