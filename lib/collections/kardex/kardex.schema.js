/* global SimpleSchema */

const kardexSchema = new SimpleSchema({
  userId: {
    type: String,
    label: 'user',
    autoform: {
      type: 'hidden',
    },
  },
  groups: {
    type: [Object],
    defaultValue: [],
    autoform: {
      type: 'hidden',
    },
  },
  'groups.$.groupId': {
    type: String,
    label: 'group id',
  },
  'groups.$.createdGroupAt': {
    type: Date,
    label: 'Create group at',
    autoValue: () => new Date(),
  },
  events: {
    type: [Object],
    defaultValue: [],
    autoform: {
      type: 'hidden',
    },
  },
  'events.$.eventId': {
    type: String,
  },
  'events.$.createdEventAt': {
    type: Date,
    label: 'Create event at',
    autoValue: () => new Date(),
  },
  isDeleted: {
    type: Boolean,
    label: 'Is deleted',
    autoform: {
      type: 'hidden',
    },
    autoValue: () => false,
  },
  createdAt: {
    type: Date,
    label: 'Create at',
    autoValue: () => new Date(),
    autoform: {
      type: 'hidden',
    },
  },
  updatedAt: {
    type: Date,
    label: 'Updated at',
    autoValue: () => new Date(),
    autoform: {
      type: 'hidden',
    },
  },
});

module.exports = kardexSchema;
