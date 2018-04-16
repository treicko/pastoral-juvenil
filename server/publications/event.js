/* global Meteor Events check */

Meteor.publish('events', function() {
  return Events.find({});
});

Meteor.publish('singleEvent', function(id) {
  check(id, String);
  return Events.find({ _id: id });
});

Meteor.publish('singleEventByShow', function(id) {
  check(id, String);
  return Events.find(
    { _id: id },
    {
      fields: {
        name: 1,
        description: 1,
        ubication: 1,
        radius: 1,
        latitude: 1,
        longitude: 1,
        date: 1,
        inCharges: 1,
        members: 1,
        parish: 1,
      },
    },
  );
});

Meteor.publish('singleEventByEdit', function(id) {
  check(id, String);
  return Events.find(
    { _id: id },
    {
      fields: {
        name: 1,
        description: 1,
        ubication: 1,
        radius: 1,
        latitude: 1,
        longitude: 1,
        date: 1,
        inCharges: 1,
        members: 1,
        parish: 1,
      },
    },
  );
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
    { fields: { name: 1, ubication: 1, members: 1 } },
  );
});

Meteor.publish('inChargeEventsByUser', function(userName) {
  check(userName, String);
  return Events.find(
    { inCharges: { $in: [userName] } },
    { fields: { name: 1, ubication: 1, inCharges: 1 } },
  );
});

Meteor.publish('assistantEventsByUserNumber', function(userName) {
  check(userName, String);
  return Events.find(
    { members: { $in: [userName] } },
    { fields: { name: 1 } },
  );
});

Meteor.publish('inChargeEventsByUserNumber', function(userName) {
  check(userName, String);
  return Events.find(
    { inCharges: { $in: [userName] } },
    { fields: { name: 1 } },
  );
});

Meteor.publish('eventsByParishName', function(parishName) {
  check(parishName, String);
  return Events.find(
    { parish: parishName },
    { fields: { parish: 1 } },
  );
});
