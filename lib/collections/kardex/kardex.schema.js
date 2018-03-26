/* global SimpleSchema */

const kardexSchema = new SimpleSchema({
  userId: {
    type: String,
  },
  inChargeGroups: {
    type: [String],
    defaultValue: [],
  },
  memberGroups: {
    type: [String],
    defaultValue: [],
  },
  inChargeEvents: {
    type: [String],
    defaultValue: [],
  },
  memberEvents: {
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
