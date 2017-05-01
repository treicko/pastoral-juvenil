Parishes = new Meteor.Collection('parishes');

Parishes.allow({
  insert: function(userId, doc) {
    return !!userId;
  }
});

ParishSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Name"
  },
  location: {
    type: String,
    label: "Location"
  },
  isDeleted: {
    type: Boolean,
    label: "Is deleted",
    defaultValue: false,
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
    defaultValue: null,
    autoform: {
      type: "hidden"
    }
  }
});

Parishes.attachSchema(ParishSchema);