Events = new Meteor.Collection('events');

Events.allow({
  insert: function(userId, doc) {
    return !!userId;
  }
});

EventSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Name"
  },
  desc: {
    type: String,
    label: "Description"
  },
  location: {
    type: String,
    label: "Location"
  },
  participants: {
    type: [String],
    autoValue: function() {
      return [];
    },
    autoform: {
      type: "hidden"
    }
  },
  isDeleted: {
    type: Boolean,
    label: "Is deleted",
    autoValue: function() {
      return false;
    },
    autoform: {
      type: "hidden"
    }
  },
  createdAt: {
    type: Date,
    label: "Create at",
    autoValue: function() {
      return new Date();
    },
    autoform: {
      type: "hidden"
    }
  },
  updatedAt: {
    type: Date,
    label: "Updated at",
    autoValue: function() {
      return new Date();
    },
    autoform: {
      type: "hidden"
    }
  }
});

Meteor.methods({
  updateParticipants: function(id, currentState) {
    Events.update(id, {
      $set: {
        participants: currentState
      }
    });
  },
});

Events.attachSchema(EventSchema);