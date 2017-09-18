Template.EventSingle.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    self.subscribe('singleEvent', id);
  });
});

Template.EventSingle.helpers({
  event: () => {
    var id = FlowRouter.getParam('id');
    console.log('My id loko: ', id);
    return Events.findOne({_id: id});
  }
});