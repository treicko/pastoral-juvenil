/* global SimpleSchema moment */
const eventSchema = new SimpleSchema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  inCharges: {
    type: [String],
  },
  ubication: {
    type: String,
  },
  radius: {
    type: Number,
  },
  latitude: {
    type: String,
  },
  longitude: {
    type: String,
  },
  members: {
    type: [String],
  },
  interested: {
    type: [String],
    autoValue: () => [],
    autoform: {
      type: 'hidden',
    },
  },
  isDeleted: {
    type: Boolean,
    label: 'Is deleted',
    autoValue: () => false,
    autoform: {
      type: 'hidden',
    },
  },
  date: {
    type: Date,
    label: 'Event date',
    autoform: {
      value: new Date(moment().format()),
    },
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

module.exports = eventSchema;
