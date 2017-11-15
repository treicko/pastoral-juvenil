class MessageController {
  constructor() {
  }

  addCommentToMessage(newComment) {
    Meteor.call('addComment', newComment);
  }

  getMessagesByUserId(userId) {
    console.log('userId: ', userId);
    const messages = Messages.find({mailerId: userId}).fetch();
    console.log('Messages found: ', messages);
    return messages;
  }

  getMessageById(id) {
    const messages = Messages.find({_id: id}).fetch();
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
          messageId: messageId,
          mailerMessageId: newMessage.mailerId
        });
        Meteor.call('addMessageToMember', {
          mailerId: newMessage.receiverId,
          receiverId: newMessage.mailerId,
          messageId: messageId,
          mailerMessageId: newMessage.mailerId
        });
      }
    });
  }
}

module.exports = MessageController;