/* global Template ReactiveVar FlowRouter GoogleMaps */
import ParishController from './../../../../../lib/controllers/parish.controller';

Template.parishSingle.onCreated(function() {
  this.parishController = new ReactiveVar(new ParishController());
  const parishId = FlowRouter.getParam('id');
  this.autorun(() => {
    this.subscribe('singleParish', parishId);
  });

  GoogleMaps.ready('showMap', (map) => {
    this.parishController.get().setMap(map);
    this.autorun(() => {
      this.parishController.get().setParishForShowOnMap(parishId);
    });
  });
});

Template.parishSingle.helpers({
  parish: () => {
    const parishId = FlowRouter.getParam('id');
    if (Template.instance().parishController) {
      const parishFound = Template.instance().parishController.get().getParishById(parishId);
      if (parishFound) {
        return parishFound;
      }
    }
    return {};
  },
});
