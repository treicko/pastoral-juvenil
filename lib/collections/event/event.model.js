import EventSchema from './event.schema';

Events = new Meteor.Collection('events');

Events.allow({
  insert: function(userId, doc) {
    return !!userId;
  }
});
Events.attachSchema(EventSchema);

Meteor.methods({
  updateParticipants: function(id, currentState) {
    Events.update(id, {
      $set: {
        participants: currentState
      }
    });
  },
  insertEvent: function(event) {
    console.log("Call events: ", event);
    Events.insert(event);
  }
});
