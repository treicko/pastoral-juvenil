/* global SimpleSchema */

const parishSchema = new SimpleSchema({
  name: {
    type: String,
  },
  location: {
    type: String,
  },
  inCharge: {
    type: [String],
  },
  latitude: {
    type: String,
  },
  longitude: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    defaultValue: false,
    autoform: {
      type: 'hidden',
    },
  },
  createdAt: {
    type: Date,
    autoValue: () => new Date(),
    autoform: {
      type: 'hidden',
    },
  },
  updatedAt: {
    type: Date,
    autoValue: () => new Date(),
    autoform: {
      type: 'hidden',
    },
  },
});

module.exports = parishSchema;
