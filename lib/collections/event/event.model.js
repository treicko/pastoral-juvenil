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
  updateEvent: (id, event) => {
    Events.update(id, {
      $set: {
        name: event.name,
        description: event.description,
        ubication: event.ubication,
        radius: event.radius,
        latitude: event.latitude,
        longitude: event.longitude,
        date: event.date,
        participants: event.participants,
        comments: event.comments,
        interested: event.interested,
      },
    });
  },
});

