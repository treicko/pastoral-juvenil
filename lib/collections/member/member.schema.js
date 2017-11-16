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
    type: [Object],
  },
  'messages.$.userId': {
    type: String,
  },
  'messages.$.messageId': {
    type: String,
  },
  'messages.$.mailerMessageId': {
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

module.exports = memberSchema;
