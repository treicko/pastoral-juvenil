/* global SimpleSchema */

const kardexSchema = new SimpleSchema({
  userId: {
    type: String,
  },
  groups: {
    type: [String],
    defaultValue: [],
  },
  events: {
    type: [String],
    defaultValue: [],
  },
  createdAt: {
    type: Date,
    label: 'Create at',
    autoValue: () => new Date(),
  },
  updatedAt: {
    type: Date,
    label: 'Updated at',
    autoValue: () => new Date(),
  },
});

module.exports = kardexSchema;
