/* global Meteor Messages check */

Meteor.publish('messages', function() {
  return Messages.find({});
});

Meteor.publish('singleMessage', function(id) {
  check(id, String);
  return Messages.find({ _id: id });
});

Meteor.publish('memberMessages', function(id) {
  check(id, String);
  return Messages.find({ mailerId: id });
});
