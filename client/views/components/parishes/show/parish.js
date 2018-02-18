/* global Template ReactiveVar FlowRouter GoogleMaps Meteor $ */
import ParishController from './../../../../../lib/controllers/parish.controller';

Template.parish.onRendered(function() {
  $('.modal').modal();
});

Template.parish.onCreated(function() {
  this.parishController = new ReactiveVar(new ParishController());
  const parishId = FlowRouter.getParam('id');
  this.autorun(() => {
    this.subscribe('singleParish', parishId);
    this.subscribe('members');
  });

  GoogleMaps.ready('showMap', (map) => {
    this.parishController.get().setMap(map);
    this.autorun(() => {
      this.parishController.get().setParishForShowOnMap(parishId);
    });
  });
});

Template.parish.helpers({
  parish: () => {
    const parishId = FlowRouter.getParam('id');
    if (Template.instance().parishController) {
      const parishFound = Template.instance().parishController.get().getParishById(parishId);
      if (parishFound) {
        const inChargeForShow =
          Template.instance().parishController.get().getInChargeForShow(parishFound);
        parishFound.inCharge = inChargeForShow;
        return parishFound;
      }
    }
    return {};
  },
});

Template.parish.events({
  'click #delete_parsih': () => {
    Meteor.call('deleteParish', FlowRouter.getParam('id'));
    $('#modalDeleteParish').modal('close');
    FlowRouter.go('/parishes');
  },
});
