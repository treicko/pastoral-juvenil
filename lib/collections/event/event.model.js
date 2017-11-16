/* global Meteor check */
/* eslint-disable meteor/audit-argument-checks */

import EventSchema from './event.schema';

const Events = new Meteor.Collection('events');

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
