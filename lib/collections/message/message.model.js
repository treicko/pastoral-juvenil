import MessageSchema from './message.schema';

Messages = new Meteor.Collection('messages');
Messages.attachSchema(MessageSchema);

Meteor.methods({
  newMessage: function(message) {
    return Messages.insert(message);
  },
  updateUnReadMessage: function(messageId) {
    Messages.update(messageId, {
      $set: { receiverUnReadMessage: 0, mailerUnReadMessage: 0 }
    });
  },
  addComment: function(comment) {
    const newComment = {
      userId: comment.userId,
      userImage: comment.userImage,
      comment: comment.comment
    };
    if (comment.userId === comment.mailerId) {
      Messages.update(comment.messageId, {
        $push: { comments: newComment },
        $inc: { receiverUnReadMessage: 1 }
      });
    } else{
      Messages.update(comment.messageId, {
        $push: { comments: newComment },
        $inc: { mailerUnReadMessage: 1 }
      });
    }
  }
});
