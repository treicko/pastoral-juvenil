import ParishController from './../../../../../lib/controllers/parish.controller';

Template.ParishSingle.onRendered(function() {
});

Template.ParishSingle.onCreated(function() {  
  let parishId;
  this.parishController = new ReactiveVar(new ParishController());
  const self = this;
  self.autorun(function() {
    parishId = FlowRouter.getParam('id');
    self.subscribe('singleParish', parishId);
  });

  GoogleMaps.ready('showMap', (map) => {
    this.parishController.get().setMapForShow(map, '');
    const parishFound = this.parishController.get().getParishById(parishId);
    if (parishFound) {
      this.parishController.get().setParishForShowOnMap(parishFound);
    }
  });
});

Template.ParishSingle.helpers({
  parish: () => {
    const parishId = FlowRouter.getParam('id');
    if (Template.instance().parishController) {
      const parishFound = Template.instance().parishController.get().getParishById(parishId);
      if (parishFound) {
        return parishFound;
      }
    }
  }
});