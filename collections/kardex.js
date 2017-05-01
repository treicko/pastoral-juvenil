Kardex = new Meteor.Collection('kardex');

Kardex.allow({
  insert: function(userId, doc) {
    return !!userId;
  }
});

KardexSchema = new SimpleSchema({
  userId: {
    type: String,
    label: "user",
    autoform: {
      type: "hidden"
    }
  },
  groups: {
    type: [Object],
    defaultValue: [],
    autoform: {
      type: "hidden"
    }
  },
  "groups.$.groupId": {
    type: String,
    label: "group id"
  },
  "groups.$.createdGroupAt": {
    type: Date,
    label: "Create group at",
    autoValue: function() {
      return new Date();
    },
  },
  events: {
    type: [Object],
    defaultValue: [],
    autoform: {
      type: "hidden"
    }
  },
  "events.$.eventId": {
    type: String
  },
  "events.$.createdEventAt": {
    type: Date,
    label: "Create event at",
    autoValue: function() {
      return new Date();
    },
  },
  isDeleted: {
    type: Boolean,
    label: "Is deleted",
    autoform: {
      type: "hidden"
    },
    autoValue: function() {
      return false;
    },
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
  insertKardexOnGroup: function(userId, groupId) {
    console.log('En el insert nooooooooo');
    let newKardexOnGroup = {
      'userId': userId,
      'groups': [{ groupId: groupId }],
      'events': []
    };

    Kardex.insert(newKardexOnGroup);
  },
  insertKardexOnEvent: function(userId, eventId) {
    let newKardexOnEvent = {
      'userId': userId,
      'groups': [],
      'events': [{ eventId: eventId }]
    };

    Kardex.insert(newKardexOnEvent);
  },
  updateKardexGroups: function(id, currentState) {
    console.log('leo hermano entro en el update de kardex');
    Kardex.update(id, {
      $set: {
        groups: currentState
      }
    });
  },
  updateKardexEvents: function(id, currentState) {
    console.log('leo hermano entro en el update de kardex de eventos');
    Kardex.update(id, {
      $set: {
        events: currentState
      }
    });
  },
});

Kardex.attachSchema(KardexSchema);