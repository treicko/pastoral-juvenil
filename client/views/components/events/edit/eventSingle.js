/* global Template FlowRouter Events */

Template.eventSingle.onCreated(function() {
  this.autorun(() => {
    const id = FlowRouter.getParam('id');
    this.subscribe('singleEvent', id);
  });
});

Template.eventSingle.helpers({
  event: () => {
    const id = FlowRouter.getParam('id');
    return Events.findOne({ _id: id });
  },
});
