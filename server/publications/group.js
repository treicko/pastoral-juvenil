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

Meteor.publish('singleGroupByEdit', function(id) {
  check(id, String);
  return Groups.find(
    { _id: id },
    {
      fields: {
        name: 1,
        location: 1,
        inCharges: 1,
        description: 1,
        latitude: 1,
        longitude: 1,
        members: 1,
      },
    },
  );
});

Meteor.publish('singleGroupByPublications', function() {
  return Groups.find({}, { fields: { name: 1, publications: 1 } });
});

Meteor.publish('singleGroupByShow', function(id) {
  check(id, String);
  return Groups.find(
    { _id: id },
    {
      fields: {
        name: 1,
        location: 1,
        inCharges: 1,
        description: 1,
        latitude: 1,
        longitude: 1,
        members: 1,
        publications: 1,
      },
    },
  );
});

Meteor.publish('groupsNumber', function() {
  return Groups.find({}, { fields: { name: 1 } });
});

Meteor.publish('assistantGroupsByUser', function(userName) {
  check(userName, String);
  return Groups.find(
    { members: { $in: [userName] } },
    { fields: { name: 1, location: 1, members: 1 } },
  );
});

Meteor.publish('inChargeGroupsByUser', function(userName) {
  check(userName, String);
  return Groups.find(
    { inCharges: { $in: [userName] } },
    { fields: { name: 1, location: 1, inCharges: 1 } },
  );
});

