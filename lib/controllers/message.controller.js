/* global Meteor Messages */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */
/* eslint-disable class-methods-use-this */

class MessageController {
  constructor() { }

  addCommentToMessage(newComment) {
    Meteor.call('addComment', newComment);
  }

  createMessage(newMessage) {
    const message = {
      userId: newMessage.receiverId,
      mailerId: newMessage.mailerId,
      unReadComments: 0,
      duplicateMessageId: 'none',
      comments: newMessage.comments,
    };

    Meteor.call('newMessage', message, (error, mailerMessageId) => {
      if (!error) {
        message.userId = newMessage.mailerId;
        message.mailerId = newMessage.receiverId;
        message.duplicateMessageId = mailerMessageId;

        Meteor.call('newMessage', message, (err, receiverMessageId) => {
          if (!err) {
            Meteor.call('updateMessage', mailerMessageId, { duplicateMessageId: receiverMessageId });
            Meteor.call('addMessageToMember', {
              mailerId: newMessage.receiverId,
              messageId: receiverMessageId,
            });
          }
        });

        Meteor.call('addMessageToMember', {
          mailerId: newMessage.mailerId,
          messageId: mailerMessageId,
        });
      }
    });
  }

  /* {
    userId: currentUser._id,
    members,
    messages,
  } */

  populateUserByMessage(data) {
    console.log('Data: ', data);
    const populatedUsersByMessage = data.messages;
    if (data.messages.length) {
      data.messages.forEach((message, index) => {
        const receiverIndex = data.members.findIndex(member => member.userId === message.userId);
        if (receiverIndex > -1) {
          populatedUsersByMessage[index].receiver = data.members[receiverIndex];
        }
      });
    }

    return populatedUsersByMessage;
  }

  getMessageById(id) {
    const messages = Messages.find({ _id: id }).fetch();
    if (messages && messages.length > 0) {
      return messages[0];
    }
    return {};
  }
}

module.exports = MessageController;
