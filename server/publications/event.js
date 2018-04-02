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

Meteor.publish('assistantEventsByUser', function(userName) {
  check(userName, String);
  return Events.find(
    { members: { $in: [userName] } },
    { fields: { name: 1, location: 1, members: 1 } },
  );
});

Meteor.publish('inChargeEventsByUser', function(userName) {
  check(userName, String);
  return Events.find(
    { inCharges: { $in: [userName] } },
    { fields: { name: 1, location: 1, inCharges: 1 } },
  );
});
