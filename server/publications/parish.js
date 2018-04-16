/* global Meteor Parishes check */

Meteor.publish('parishes', function() {
  return Parishes.find({});
});

Meteor.publish('singleParish', function(id) {
  check(id, String);
  return Parishes.find({ _id: id });
});

Meteor.publish('parishesNumber', function() {
  return Parishes.find({}, { fields: { name: 1 } });
});

Meteor.publish('parishesByVicarageName', function(vicarageName) {
  check(vicarageName, String);
  return Parishes.find(
    { vicarage: vicarageName },
    { fields: { vicarage: 1 } },
  );
});
