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
    type: [String]
  },
  latitude: {
    type: String
  },
  longitude: {
    type: String
  },
  members: {
    type: [String]
  },
  publications: {
    type: [Object]
  },
  'publications.$.description': {
    type: String
  },
  'publications.$.userName': {
    type: String
  },
  'publications.$.userId': {
    type: String
  },
  'publications.$.userImage': {
    type: String
  },
  'publications.$.comments': {
    type: [Object]
  },
  'publications.$.comments.$.userName': {
    type: String
  },
  'publications.$.comments.$.userId': {
    type: String
  },
  'publications.$.comments.$.userImage': {
    type: String
  },
  'publications.$.comments.$.comment': {
    type: String
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