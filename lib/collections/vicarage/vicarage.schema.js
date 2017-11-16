/* global SimpleSchema */

const vicarageSchema = new SimpleSchema({
  name: {
    type: String,
  },
  department: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    autoValue: () => false,
  },
  date: {
    type: Date,
    autoValue: () => new Date(),
  },
  createdAt: {
    type: Date,
    autoValue: () => new Date(),
  },
  updatedAt: {
    type: Date,
    autoValue: () => new Date(),
  },
});

module.exports = vicarageSchema;
