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

    const hasReceiverMessage =
      newComment.receiver.unReadMessage.find(message => message === newComment.duplicateMessageId);

    const hasUpdateReceiver = hasReceiverMessage > -1;
    console.log('hasUpdateReceiver', !hasUpdateReceiver);
    if (!hasReceiverMessage) {
      const receiver = {
        userId: newComment.receiver.userId,
        unReadMessage: newComment.duplicateMessageId,
      };
  
      console.log('updateMessageToReceiver', receiver);
      Meteor.call('updateMessageToReceiver', receiver);
    }
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
        Meteor.call('addMessageToMailer', {
          mailerId: newMessage.mailerId,
          messageId: mailerMessageId,
        });

        message.receiverId = newMessage.mailerId;
        message.mailerId = newMessage.receiverId;
        message.duplicateMessageId = mailerMessageId;
        message.unReadComments = 1;

        Meteor.call('newMessage', message, (err, receiverMessageId) => {
          if (!err) {
            Meteor.call('updateMessage', mailerMessageId, { duplicateMessageId: receiverMessageId });
            const msj = {
              mailerId: newMessage.receiverId,
              messageId: receiverMessageId,
              unReadMessage: receiverMessageId,
            };
            Meteor.call('addMessageToMember', msj);
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
