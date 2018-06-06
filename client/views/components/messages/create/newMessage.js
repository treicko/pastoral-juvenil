/* global Template ReactiveVar Meteor Members Messages FlowRouter $ */
import MessageController from './../../../../../lib/controllers/message.controller';

Template.newMessage.onRendered(function() {
});

Template.newMessage.onCreated(function() {
  const membersData = {};
  this.members = new ReactiveVar([]);
  this.messageController = new ReactiveVar(new MessageController());
  this.autorun(() => {
    if (Template.instance().subscriptionsReady()) {
      const allMembers = Members.find({}).fetch();
      Template.instance().members.set(allMembers);

      if (allMembers.length > 0) {
        allMembers.forEach((member) => {
          membersData[member.name] = '/images/avatar2.jpg';
        });
      }

      $('input#search_member_for_message').autocomplete({
        data: membersData,
        limit: 20,
        onAutocomplete: () => {
          document.getElementById('label_search_member_for_message').classList.remove('member-message-invalid');
        },
        minLength: 1,
      });
    }
  });
});

Template.newMessage.helpers({
});

Template.newMessage.events({
  'submit #new-message': (event) => {
    event.preventDefault();

    const receiverName = event.target.search_member_for_message.value;
    const message = event.target.message_description.value;
    const members = Template.instance().members.get();
    const currentUserId = Meteor.user()._id;

    document.getElementById('label_message_description').classList.remove('message-description-invalid');

    if (members) {
      const receiver = members.find(member => member.name === receiverName);

      if (!receiver) {
        document.getElementById('label_search_member_for_message').classList.add('active');
        document.getElementById('label_search_member_for_message').classList.add('member-message-invalid');
      }
      if (!message) {
        document.getElementById('label_message_description').classList.add('active');
        document.getElementById('label_message_description').classList.add('message-description-invalid');
      }

      const isValidform = !!receiver && !!message;

      if (isValidform) {
        const newMessage = {
          mailerId: currentUserId,
          receiverId: receiver.userId,
          comments: [
            {
              comment: message,
              userId: currentUserId,
            },
          ],
        };
        const messagesFound = Messages.find({
          mailerId: currentUserId,
          receiverId: receiver.userId,
        }).fetch();

        if (messagesFound && messagesFound.length > 0) {
          const messageFound = messagesFound[0];
          const newComment = {
            userComment: {
              userId: currentUserId,
              comment: message,
            },
            receiver: {
              userId: receiver.userId,
              unReadMessage: receiver.unReadMessage,
            },
            messageId: messageFound._id,
            duplicateMessageId: messageFound.duplicateMessageId,
          };

          Template.instance().messageController.get().addCommentToMessage(newComment);
          $('form')[0].reset();
          FlowRouter.go(`/messages/${messageFound._id}?receiver=${messageFound.receiverId}`);
        } else {
          Template.instance().messageController.get().createMessage(newMessage);
          $('form')[0].reset();
          $('ul.tabs').tabs('select_tab', 'messages');
        }
      }
    }
  },
  'keypress #search_member_for_message': (event) => {
    if (event.which === 13) {
      event.stopPropagation();
      event.preventDefault();
    }
  },
});
