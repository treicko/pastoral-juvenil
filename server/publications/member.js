/* global Meteor Members check */

Meteor.publish('members', function() {
  return Members.find({});
});

Meteor.publish('membersByEdit', function() {
  return Members.find({}, { fields: { name: 1 } });
});

Meteor.publish('membersByShow', function() {
  return Members.find({}, { fields: { name: 1, phone: 1 } });
});

Meteor.publish('membersNameAndUserId', function() {
  return Members.find({}, { fields: { name: 1, userId: 1 } });
});

Meteor.publish('singleMember', function(id) {
  check(id, String);
  return Members.find({ _id: id });
});

Meteor.publish('singleUnreadMessageAndNotificationMember', function(id) {
  check(id, String);
  return Members.find({ userId: id }, { fields: { unReadMessage: 1, unReadNotification: 1 } });
});

Meteor.publish('singleMemberByUserId', function(id) {
  check(id, String);
  return Members.find({ userId: id });
});
