/* global Meteor Messages */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */
/* eslint-disable class-methods-use-this */

class MessageController {
  constructor() { }

  addCommentToMessage(newComment) {
    Meteor.call('addComment', newComment);
  }

  getMessagesByUserId(userId) {
    const messages = Messages.find({ mailerId: userId }).fetch();
    return messages;
  }

  getMessageById(id) {
    const messages = Messages.find({ _id: id }).fetch();
    if (messages && messages.length > 0) {
      return messages[0];
    }
    return {};
  }

  createMessage(newMessage) {
    Meteor.call('newMessage', newMessage, function(error, messageId) {
      if (!error) {
        Meteor.call('addMessageToMember', {
          mailerId: newMessage.mailerId,
          receiverId: newMessage.receiverId,
          messageId,
          mailerMessageId: newMessage.mailerId,
        });
        Meteor.call('addMessageToMember', {
          mailerId: newMessage.receiverId,
          receiverId: newMessage.mailerId,
          messageId,
          mailerMessageId: newMessage.mailerId,
        });
      }
    });
  }
}

module.exports = MessageController;
