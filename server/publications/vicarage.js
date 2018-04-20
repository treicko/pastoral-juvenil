/* global Meteor Vicarages check */

Meteor.publish('vicarages', function() {
  return Vicarages.find({});
});

Meteor.publish('singleVicarage', function(id) {
  check(id, String);
  return Vicarages.find({ _id: id });
});

Meteor.publish('vicaragesNumber', function() {
  return Vicarages.find({}, { fields: { name: 1 } });
});

Meteor.publish('singleVicarageDetailByName', function(vicarageName) {
  check(vicarageName, String);
  return Vicarages.find({ name: vicarageName }, { fields: { name: 1 } });
});
