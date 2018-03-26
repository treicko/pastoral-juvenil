/* global Meteor Groups check */

Meteor.publish('groups', function() {
  return Groups.find({});
});

Meteor.publish('groupsNameAndLocation', function() {
  return Groups.find({}, { fields: { name: 1, location: 1 } });
});

Meteor.publish('singleGroup', function(id) {
  check(id, String);
  return Groups.find({ _id: id });
});

Meteor.publish('groupsNumber', function() {
  return Groups.find({}, { fields: { name: 1 } });
});

Meteor.publish('assistantGroupsByUser', function(userName) {
  check(userName, String);
  return Groups.find({ members: { $in: [userName] } }, { fields: { name: 1, location: 1 } });
});

Meteor.publish('inChargeGroupsByUser', function(userName) {
  check(userName, String);
  return Groups.find({ inCharge: { $in: [userName] } }, { fields: { name: 1, location: 1 } });
});

