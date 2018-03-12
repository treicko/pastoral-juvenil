/* global Meteor Members check */

Meteor.publish('members', function() {
  return Members.find({});
});

Meteor.publish('singleMember', function(id) {
  check(id, String);
  return Members.find({ _id: id });
});

Meteor.publish('singleMemberByUserId', function(id) {
  check(id, String);
  return Members.find({ userId: id });
});
