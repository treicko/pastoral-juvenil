Template.Members.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('members');
  });
});

Template.Members.helpers({
  members: () => {
    return Members.find({});
  }
});