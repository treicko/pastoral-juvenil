Template.ParishSingle.onRendered(function() {
  var self = this;
  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    self.subscribe('singleParish', id);
  });
});

Template.ParishSingle.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    self.subscribe('singleParish', id);
  });
});

Template.ParishSingle.helpers({
  parish: () => {
    var id = FlowRouter.getParam('id');
    return Parishes.findOne({_id: id});
  }
});