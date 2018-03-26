/* global Meteor Kardex check */

Meteor.publish('kardex', function() {
  return Kardex.find({});
});

Meteor.publish('singleKardex', function(id) {
  check(id, String);
  return Kardex.find({ _id: id });
});

Meteor.publish('userKardex', function(id) {
  check(id, String);
  return Kardex.find({ userId: id });
});

Meteor.publish('singleKardexByUser', function(id) {
  check(id, String);
  return Kardex.find({ userId: id }, { fields: { userId: 1 } });
});
