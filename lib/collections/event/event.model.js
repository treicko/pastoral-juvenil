/* global Meteor check */
/* eslint-disable meteor/audit-argument-checks */
/* eslint-disable no-undef */

import EventSchema from './event.schema';

Events = new Meteor.Collection('events');

/* Events.allow({
  insert: function(userId, doc) {
    return !!userId;
  }
}); */
Events.attachSchema(EventSchema);

Meteor.methods({
  updateParticipants: (id, currentState) => {
    check(id, String);
    Events.update(id, {
      $set: {
        participants: currentState,
      },
    });
  },
  insertEvent: (event) => {
    Events.insert(event);
  },
});

