/* global Template FlowRouter Meteor ReactiveVar Messages Members */
import MessageController from './../../../../../lib/controllers/message.controller';

Template.message.onRendered(function() {
  this.autorun(() => {
    const messageId = FlowRouter.getParam('id');
    Meteor.call('updateMessage', messageId, { unReadComments: 0 });
  });
});

Template.message.onDestroyed(function() {
});

Template.message.onCreated(function() {
  const messageId = FlowRouter.getParam('id');
  const receiverId = FlowRouter.getQueryParam('receiver');
  this.messageController = new ReactiveVar(new MessageController());
  this.message = new ReactiveVar({});
  this.receiver = new ReactiveVar({});

  this.autorun(() => {
    this.subscribe('singleMessage', messageId);
    this.subscribe('singleMemberByUserId', receiverId);

    if (Template.instance().subscriptionsReady()) {
      const messages = Messages.find({ _id: messageId }).fetch();
      const member = Members.find({ userId: receiverId }).fetch();

      if (messages && messages.length > 0) {
        if (messages[0].unReadComments > 0) {
          Meteor.call('updateMessage', messageId, { unReadComments: 0 });
        }
        Template.instance().message.set(messages[0]);
      }

      if (member && member.length > 0) {
        Template.instance().receiver.set(member[0]);
      }
    }
  });
});

Template.message.helpers({
  receiver: () => Template.instance().receiver.get(),
  comments: () => Template.instance().message.get().comments,
  currentUserName: () => Meteor.user().profile.name,
  currentUserId: () => Meteor.user()._id,
  isMessageMailer: (userId, currentMailerId) => userId === currentMailerId,
});

Template.message.events({
  'keypress .group-publication-comment': (event) => {
    if (event.which === 13) {
      const message = Template.instance().message.get();
      const receiver = Template.instance().receiver.get();

      if (message && receiver) {
        const newComment = {
          userComment: {
            userId: Meteor.user()._id,
            comment: `${event.target.value}`,
          },
          receiver: {
            userId: receiver.userId,
            unReadMessage: receiver.unReadMessage,
          },
          messageId: message._id,
          duplicateMessageId: message.duplicateMessageId,
        };
  
        console.log('User receiver id: ', Template.instance().receiver.get());
        console.log('Receiver UserId: ', Template.instance().receiver.get()._id);
  
        Template.instance().messageController.get().addCommentToMessage(newComment);
        event.target.value = ''; // eslint-disable-line no-param-reassign
      }
    }
  },
});
