Template.GroupSingle.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    self.subscribe('singleGroup', id);
  });
});

Template.GroupSingle.helpers({
  group: () => {
    var id = FlowRouter.getParam('id');
    return Groups.findOne({_id: id});
  }
});