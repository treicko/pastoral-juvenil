/* global Meteor Messages check */

Meteor.publish('messagesByMailer', function(id) {
  check(id, String);
  return Messages.find({ mailerId: id });
});

Meteor.publish('singleMessage', function(id) {
  check(id, String);
  return Messages.find({ _id: id });
});
