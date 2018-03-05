/* global Template ReactiveVar Meteor Members $ */
import MessageController from './../../../../../lib/controllers/message.controller';

Template.newMessage.onRendered(function() {
});

Template.newMessage.onCreated(function() {
  const membersData = {};
  this.members = new ReactiveVar([]);
  this.messageController = new ReactiveVar(new MessageController());
  this.autorun(() => {
    this.subscribe('members');

    if (Template.instance().subscriptionsReady()) {
      const allMembers = Members.find({}).fetch();
      Template.instance().members.set(allMembers);

      if (allMembers.length > 0) {
        allMembers.forEach((member) => {
          membersData[member.name] = 'http://lorempixel.com/250/250/people/';
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
          mailerId: Meteor.user()._id,
          receiverId: receiver.userId,
          comments: [
            { comment: message },
          ],
        };

        Template.instance().messageController.get().createMessage(newMessage);


        /* const messageWithUser =
          receiver.messages.find(userMessage => currentUser._id === userMessage.userId);
        if (!messageWithUser) {
          const newMessage = {
            mailerId: currentUser._id,
            mailerName: currentUser.profile.name,
            mailerImage: 'image',
            mailerUnReadMessage: 0,
            receiverId: receiver.userId,
            receiverName: receiver.name,
            receiverImage: 'image',
            receiverUnReadMessage: 1,
            comments: [
              {
                userId: currentUser._id,
                userImage: 'image',
                comment: message,
              },
            ],
          };
          Template.instance().messageController.get().createMessage(newMessage);
        } else {
          const newComment = {
            userId: currentUser._id,
            userImage: 'image',
            comment: message,
            messageId: messageWithUser.messageId,
            mailerId: messageWithUser.mailerMessageId,
          };

          Template.instance().messageController.get().addCommentToMessage(newComment);
        } */
        $('form')[0].reset();
        $('ul.tabs').tabs('select_tab', 'messages');
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
