/* global SimpleSchema */

const memberSchema = new SimpleSchema({
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  image: {
    type: String,
    defaultValue: '',
  },
  userId: {
    type: String,
  },
  messages: {
    type: [String],
    defaultValue: [],
  },
  unReadMessage: {
    type: [String],
    defaultValue: [],
  },
  unReadNotification: {
    type: Number,
    defaultValue: 0,
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

module.exports = memberSchema;
