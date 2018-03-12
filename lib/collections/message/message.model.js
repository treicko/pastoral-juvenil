/* global Meteor */
/* eslint-disable meteor/audit-argument-checks */
/* eslint-disable no-undef */
import MessageSchema from './message.schema';

Messages = new Meteor.Collection('messages');
Messages.attachSchema(MessageSchema);

Meteor.methods({
  newMessage: message => Messages.insert(message),
  updateMessage: (messageId, data) => {
    Messages.update(messageId, {
      // $set: { receiverUnReadMessage: 0, mailerUnReadMessage: 0 },
      $set: data,
    });
  },
  addComment: (comment) => {
    Messages.update(comment.messageId, {
      $push: { comments: comment.userComment },
      $inc: { unReadComments: comment.unReadComments },
    });
  },
});
