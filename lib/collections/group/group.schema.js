const groupSchema = new SimpleSchema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
  inCharge: {
    type: String
  },
  members: {
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
    autoValue: function() {
      return false;
    },
    autoform: {
      type: "hidden"
    }
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      return new Date();
    },
    autoform: {
      type: "hidden"
    }
  },
  updatedAt: {
    type: Date,
    autoValue: function() {
      return new Date();
    },
    autoform: {
      type: "hidden"
    }
  }
});

module.exports = groupSchema;