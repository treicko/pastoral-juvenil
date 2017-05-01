Members = new Meteor.Collection('members');

Members.allow({
  insert: function(userId, doc) {
    return !!userId;
  }
});

MemberSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Name"
  },
  desc: {
    type: String,
    label: "Description"
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

Members.attachSchema(MemberSchema);