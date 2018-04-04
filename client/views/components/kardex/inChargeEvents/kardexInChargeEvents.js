/* global Template ReactiveVar Events Meteor */

import KardexController from './../../../../../lib/controllers/kardex.controller';

Template.kardexInChargeEvents.onRendered(function() {
});

Template.kardexInChargeEvents.onCreated(function() {
  this.inChargeUserEvents = new ReactiveVar([]);
  this.kardexController = new ReactiveVar(new KardexController());

  this.autorun(() => {
    this.subscribe('inChargeEventsByUser', Meteor.user().profile.name);

    if (Template.instance().subscriptionsReady()) {
      const eventsFound = Events.find({}).fetch();
      if (eventsFound && eventsFound.length) {
        const inChargeEvents = this.kardexController.get().getInChargeDataByUser(eventsFound);
        this.inChargeUserEvents.set(inChargeEvents);
      }
    }
  });
});

Template.kardexInChargeEvents.helpers({
  inChargeEvents: () => Template.instance().inChargeUserEvents.get(),
});
