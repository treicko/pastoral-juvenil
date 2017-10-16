const memberSchema = new SimpleSchema({
  name: {
    type: String
  },
  phone: {
    type: String
  },
  image: {
    type: String,
    defaultValue: ''
  },
  userId: {
    type: String
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

module.exports = memberSchema;