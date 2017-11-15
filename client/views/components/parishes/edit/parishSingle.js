/* global Template ReactiveVar FlowRouter GoogleMaps */
import ParishController from './../../../../../lib/controllers/parish.controller';

Template.parishSingle.onCreated(function() {
  let parishId;
  this.parishController = new ReactiveVar(new ParishController());
  this.autorun(() => {
    parishId = FlowRouter.getParam('id');
    this.subscribe('singleParish', parishId);
  });

  GoogleMaps.ready('showMap', (map) => {
    this.parishController.get().setMapForShow(map, '');
    const parishFound = this.parishController.get().getParishById(parishId);
    if (parishFound) {
      this.parishController.get().setParishForShowOnMap(parishFound);
    }
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
