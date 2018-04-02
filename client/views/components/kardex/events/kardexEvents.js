/* global Template ReactiveVar Events Meteor */

Template.kardexEvents.onRendered(function() {
});

Template.kardexEvents.onCreated(function() {
  this.assistantUserEvents = new ReactiveVar([]);
  this.autorun(() => {
    this.subscribe('assistantEventsByUser', Meteor.user().profile.name);

    if (Template.instance().subscriptionsReady()) {
      const eventsFound = Events.find({}).fetch();
      if (eventsFound && eventsFound.length) {
        const assistantEvents = this.kardexController.get().getAssistantGroupsByUser(eventsFound);
        this.assistantUserEvents.set(assistantEvents);
      }
    }
  });
});

Template.kardexEvents.helpers({
  assistantEvents: () => Template.instance().assistantUserEvents.get(),
});
