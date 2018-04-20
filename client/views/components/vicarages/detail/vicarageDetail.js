/* global Template ReactiveVar FlowRouter GoogleMaps Parishes Vicarages */
import VicarageController from './../../../../../lib/controllers/vicarage.controller';

Template.vicarageDetail.onCreated(function() {
  this.vicarageController = new ReactiveVar(new VicarageController());
  this.vicarageId = new ReactiveVar(null);

  this.autorun(() => {
    const vicarageSelected = FlowRouter.getParam('name');
    this.subscribe('singleVicarageDetailByName', vicarageSelected);
    this.subscribe('parishesByVicarageDetail', vicarageSelected);

    if (Template.instance().subscriptionsReady()) {
      GoogleMaps.ready('showMap', (map) => {
        this.vicarageController.get().setMap(map);
        this.autorun(() => {
          const parishes = Parishes.find({}).fetch();
          const vicarageFound = Vicarages.find({ name: vicarageSelected }).fetch();

          if (parishes && parishes.length) {
            this.vicarageController.get().setEntitiesVicaragesDetailForShowOnMap(parishes);
          }

          if (vicarageFound && vicarageFound.length) {
            this.vicarageId.set(vicarageFound[0]._id);
          }
        });
      });
    }
  });
});

Template.vicarageDetail.helpers({
  vicarageName: () => FlowRouter.getParam('name'),
  vicarageId: () => Template.instance().vicarageId.get(),
});
