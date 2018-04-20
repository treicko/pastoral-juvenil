/* global Template FlowRouter GoogleMaps ReactiveVar Groups Events Parishes */
import ParishController from './../../../../../lib/controllers/parish.controller';

Template.parishDetail.onCreated(function() {
  this.parishController = new ReactiveVar(new ParishController());
  this.parishId = new ReactiveVar(null);

  this.autorun(() => {
    const parishSelected = FlowRouter.getParam('name');
    this.subscribe('singleParishDetailByName', parishSelected);
    this.subscribe('groupsByParishDetail', parishSelected);
    this.subscribe('eventsByParishDetail', parishSelected);

    if (Template.instance().subscriptionsReady()) {
      GoogleMaps.ready('showMap', (map) => {
        this.parishController.get().setMap(map);
        this.autorun(() => {
          const groups = Groups.find({}).fetch();
          const events = Events.find({}).fetch();
          const parishFound = Parishes.find({ name: parishSelected }).fetch();

          if ((groups && groups.length) || (events && events.length)) {
            this.parishController.get().setEntitiesParishesDetailForShowOnMap(events, groups);
          }

          if (parishFound && parishFound.length) {
            this.parishId.set(parishFound[0]._id);
          }
        });
      });
    }
  });
});

Template.parishDetail.helpers({
  parishName: () => FlowRouter.getParam('name'),
  parishId: () => Template.instance().parishId.get(),
});
