/* global Template ReactiveVar Events */

Template.kardexEvents.onRendered(function() {
});

Template.kardexEvents.onCreated(function() {
  this.kardexEventsFound = new ReactiveVar([]);
  this.autorun(() => {
    this.subscribe('memberEvents');

    if (Template.instance().subscriptionsReady()) {
      const eventsFound = Events.find({}).fetch();
      if (eventsFound && eventsFound.length) {
        this.kardexEventsFound.set(eventsFound);
      }
    }
  });
});

Template.kardexEvents.helpers({
  events: () => Template.instance().kardexEventsFound.get(),
});
