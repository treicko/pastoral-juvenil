/* global Template FlowRouter Meteor ReactiveVar */
import MessageController from './../../../../../lib/controllers/message.controller';

Template.message.onRendered(function() {
  this.autorun(() => {
    const id = FlowRouter.getParam('id');
    Meteor.call('updateUnReadMessage', id);
  });
});

Template.message.onDestroyed(function() {
});

Template.message.onCreated(function() {
  this.messageController = new ReactiveVar(new MessageController());

  this.autorun(() => {
    const id = FlowRouter.getParam('id');
    this.subscribe('singleMessage', id);
  });
});

Template.message.helpers({
  message: () => {
    let currentMailer;
    let currentReceiver;
    const currentUser = Meteor.user();
    const message = Template.instance().messageController.get().getMessageById(FlowRouter.getParam('id'));
    if (message) {
      if (currentUser._id === message.mailerId) {
        currentMailer = {
          _id: message.mailerId,
          name: message.mailerName,
          image: message.mailerImage,
        };
        currentReceiver = {
          _id: message.receiverId,
          name: message.receiverName,
          image: message.receiverImage,
        };
      } else {
        currentMailer = {
          _id: message.receiverId,
          name: message.receiverName,
          image: message.receiverImage,
        };
        currentReceiver = {
          _id: message.mailerId,
          name: message.mailerName,
          image: message.mailerImage,
        };
      }
      return {
        _id: message._id,
        currentMailer,
        currentReceiver,
        comments: message.comments,
        mailerId: message.mailerId,
        receiverId: message.receiverId,
      };
    }
    return {};
  },

  user: () => {
    const currentUser = Meteor.user();
    return {
      _id: currentUser._id,
      email: currentUser.emails[0],
      name: currentUser.profile.name,
    };
  },

  isMessageMailer: (userId, currentMailerId) => userId === currentMailerId,
});

Template.message.events({
  'keypress .group-publication-comment': (event) => {
    if (event.which === 13) {
      const newComment = {
        userId: document.getElementById('message_comment_user_id').value,
        userImage: document.getElementById('message_comment_user_image').value,
        comment: `${event.target.value}`,
        messageId: document.getElementById('message_id').value,
        mailerId: document.getElementById('message_mailer_id').value,
        receiverId: document.getElementById('message_receiver_id').value,
      };

      Template.instance().messageController.get().addCommentToMessage(newComment);
      event.target.value = ''; // eslint-disable-line no-param-reassign
    }
  },
});
