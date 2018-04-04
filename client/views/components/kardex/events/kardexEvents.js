/* global Template ReactiveVar Events Meteor */

import KardexController from './../../../../../lib/controllers/kardex.controller';

Template.kardexEvents.onRendered(function() {
});

Template.kardexEvents.onCreated(function() {
  this.assistantUserEvents = new ReactiveVar([]);
  this.kardexController = new ReactiveVar(new KardexController());

  this.autorun(() => {
    this.subscribe('assistantEventsByUser', Meteor.user().profile.name);

    if (Template.instance().subscriptionsReady()) {
      const eventsFound = Events.find({}).fetch();
      if (eventsFound && eventsFound.length) {
        const assistantEvents = this.kardexController.get().getAssistantDataByUser(eventsFound);
        this.assistantUserEvents.set(assistantEvents);
      }
    }
  });
});

Template.kardexEvents.helpers({
  assistantEvents: () => Template.instance().assistantUserEvents.get(),
});
