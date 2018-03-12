/* global SimpleSchema Meteor */

const messageSchema = new SimpleSchema({
  receiverId: {
    type: String,
  },
  mailerId: {
    type: String,
  },
  unReadComments: {
    type: Number,
  },
  duplicateMessageId: {
    type: String,
  },
  comments: {
    type: [Object],
  },
  'comments.$._id': {
    type: String,
    autoValue: () => Meteor.uuid(),
  },
  'comments.$.userId': {
    type: String,
  },
  /* 'comments.$.userImage': {
    type: String,
  }, */
  'comments.$.comment': {
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

module.exports = messageSchema;
