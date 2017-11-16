/* global SimpleSchema Meteor */

const messageSchema = new SimpleSchema({
  mailerId: {
    type: String,
  },
  mailerName: {
    type: String,
  },
  mailerImage: {
    type: String,
  },
  mailerUnReadMessage: {
    type: Number,
  },
  receiverId: {
    type: String,
  },
  receiverName: {
    type: String,
  },
  receiverImage: {
    type: String,
  },
  receiverUnReadMessage: {
    type: Number,
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
  'comments.$.userImage': {
    type: String,
  },
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
