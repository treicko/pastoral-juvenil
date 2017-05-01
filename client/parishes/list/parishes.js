Template.Parishes.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('parishes');
  });
});

Template.Parishes.helpers({
  parishes: () => {
    return Parishes.find({});
  }
});