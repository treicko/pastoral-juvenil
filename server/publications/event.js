/* global Meteor Events check */

Meteor.publish('events', function() {
  return Events.find({});
});

Meteor.publish('singleEvent', function(id) {
  check(id, String);
  return Events.find({ _id: id });
});

Meteor.publish('eventsNumber', function() {
  return Events.find({}, { fields: { name: 1 } });
});

Meteor.publish('memberEvents', function() {
  return Events.find({}, { fields: { name: 1, ubication: 1 } });
});

