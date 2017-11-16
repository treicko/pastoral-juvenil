/* global Meteor check */
/* eslint-disable meteor/audit-argument-checks */
/* eslint-disable no-undef */
import KardexSchema from './kardex.schema';

Kardex = new Meteor.Collection('kardex');

/* Kardex.allow({
  insert: function(userId, doc) {
    return !!userId;
  }
}); */

Kardex.attachSchema(KardexSchema);

Meteor.methods({
  insertKardexOnGroup: (userId, groupId) => {
    check(userId, String);
    check(groupId, String);
    const newKardexOnGroup = {
      userId,
      groups: [{ groupId }],
      events: [],
    };

    Kardex.insert(newKardexOnGroup);
  },
  insertKardexOnEvent: (userId, eventId) => {
    check(userId, String);
    check(eventId, String);
    const newKardexOnEvent = {
      userId,
      groups: [],
      events: [{ eventId }],
    };

    Kardex.insert(newKardexOnEvent);
  },
  updateKardexGroups: (id, currentState) => {
    check(id, String);
    Kardex.update(id, {
      $set: { groups: currentState },
    });
  },
  updateKardexEvents: (id, currentState) => {
    check(id, String);
    Kardex.update(id, {
      $set: { events: currentState },
    });
  },
});
