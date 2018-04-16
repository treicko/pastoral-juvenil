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
  vicarage: {
    type: String,
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
