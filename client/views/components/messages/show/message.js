import MessageController from './../../../../../lib/controllers/message.controller';

Template.Message.onRendered(function() {
  this.autorun(() => {
    var id = FlowRouter.getParam('id');
    Meteor.call('updateUnReadMessage', id);
  });
});

Template.Message.onDestroyed(function() {
});

Template.Message.onCreated(function() {
  this.messageController = new ReactiveVar(new MessageController());

  this.autorun(() => {
    var id = FlowRouter.getParam('id');
    this.subscribe('singleMessage', id);
  });
});

Template.Message.helpers({
  message: function() {
    let currentMailer;
    let currentReceiver;
    const currentUser = Meteor.user();
    const message = Template.instance().messageController.get().getMessageById(FlowRouter.getParam('id'));
    if (message) {
      if (currentUser._id === message.mailerId) {
        currentMailer = {
          _id: message.mailerId,
          name: message.mailerName,
          image: message.mailerImage
        };
        currentReceiver = {
          _id: message.receiverId,
          name: message.receiverName,
          image: message.receiverImage
        }
      } else {
        currentMailer = {
          _id: message.receiverId,
          name: message.receiverName,
          image: message.receiverImage
        };
        currentReceiver = {
          _id: message.mailerId,
          name: message.mailerName,
          image: message.mailerImage
        }
      }
      return {
        _id: message._id,
        currentMailer,
        currentReceiver,
        comments: message.comments,
        mailerId: message.mailerId,
        receiverId: message.receiverId
      }
    }
    return {};
  },

  user: function() {
    const currentUser = Meteor.user();
    return {
      _id: currentUser._id,
      email: currentUser.emails[0],
      name: currentUser.profile.name
    };
  },

  isMessageMailer: function (userId, currentMailerId) {
    return userId === currentMailerId;
  }
});

Template.Message.events({
  'keypress .group-publication-comment': function (event, template) {
    if (event.which === 13) {
      const newComment = {
        userId: document.getElementById("message_comment_user_id").value,
        userImage: document.getElementById("message_comment_user_image").value,
        comment: `${event.target.value}`,
        messageId: document.getElementById("message_id").value,
        mailerId: document.getElementById("message_mailer_id").value,
        receiverId: document.getElementById("message_receiver_id").value
      }
      
      Template.instance().messageController.get().addCommentToMessage(newComment);
      event.target.value  = '';
      return false;
    }
  }
});