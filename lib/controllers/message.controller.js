/* global Meteor */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */
/* eslint-disable class-methods-use-this */

class MessageController {
  constructor() { }

  addCommentToMessage(newComment) {
    const comment = {
      messageId: newComment.messageId,
      userComment: newComment.userComment,
      unReadComments: 0,
    };

    Meteor.call('addComment', comment);

    comment.messageId = newComment.duplicateMessageId;
    comment.unReadComments = 1;

    Meteor.call('addComment', comment);
  }

  createMessage(newMessage) {
    const message = {
      receiverId: newMessage.receiverId,
      mailerId: newMessage.mailerId,
      unReadComments: 0,
      duplicateMessageId: 'none',
      comments: newMessage.comments,
    };

    Meteor.call('newMessage', message, (error, mailerMessageId) => {
      if (!error) {
        Meteor.call('addMessageToMember', {
          mailerId: newMessage.mailerId,
          messageId: mailerMessageId,
          unReadMessage: 0,
        });

        message.receiverId = newMessage.mailerId;
        message.mailerId = newMessage.receiverId;
        message.duplicateMessageId = mailerMessageId;
        message.unReadComments = 1;

        Meteor.call('newMessage', message, (err, receiverMessageId) => {
          if (!err) {
            Meteor.call('updateMessage', mailerMessageId, { duplicateMessageId: receiverMessageId });
            Meteor.call('addMessageToMember', {
              mailerId: newMessage.receiverId,
              messageId: receiverMessageId,
              unReadMessage: 1,
            });
          }
        });
      }
    });
  }

  populateUserByMessage(data) {
    const populatedUsersByMessage = data.messages;
    if (data.messages.length) {
      data.messages.forEach((message, index) => {
        const receiverIndex =
          data.members.findIndex(member => member.userId === message.receiverId);
        if (receiverIndex > -1) {
          populatedUsersByMessage[index].receiver = data.members[receiverIndex];
        }
      });
    }

    return populatedUsersByMessage;
  }
}

module.exports = MessageController;
