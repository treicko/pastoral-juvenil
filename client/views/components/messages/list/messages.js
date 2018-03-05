/* global Template $ ReactiveVar Meteor Members Messages */

import MessageController from './../../../../../lib/controllers/message.controller';

Template.messages.onRendered(function() {
  $('ul.tabs').tabs();
});

Template.messages.onCreated(function() {
  this.messageController = new ReactiveVar(new MessageController());
  this.memberMessages = new ReactiveVar([]);
  this.members = new ReactiveVar([]);
  this.currentMember = new ReactiveVar({});
  const currentUserId = Meteor.user()._id;

  this.autorun(() => {
    this.subscribe('members');
    this.subscribe('singleMember', currentUserId);
    this.subscribe('memberMessages', currentUserId);
    // Meteor user:  6ufX7ngaJK7fexaAz
    // this.subscribe('getMemberMessagesByUserId', Meteor.user()._id);

    console.log('Holaaaaa');

    if (Template.instance().subscriptionsReady()) {
      const allMembers = Members.find({}).fetch();
      Template.instance().members.set(allMembers);
      const memberMessages = Messages.find({ mailerId: currentUserId }).fetch();
      Template.instance().memberMessages.set(memberMessages);

      const member = Members.find({ userId: Meteor.user()._id }).fetch();
      if (member && member.length) {
        Template.instance().currentMember.set(member[0]);
      }

      /* const currentUser = Meteor.user();
      console.log('Current user'); */
      /* const messageController = Template.instance().messageController.get();
      const groups = messageController.getMessagesByUserId();
      const groupsFound = Template.instance().groupsFound;
      groupsFound.set(groups);
      $('input#search_group').autocomplete({
        data: groupController.getGroupsForSearch(groups),
        limit: 20,
        onAutocomplete: function(val) {
          if(groupController) {
            const groups = groupController.findByName(val);
            groupsFound.set(groups);
          }
        },
        minLength: 1,
      }); */
    }
  });

  const tabs = document.getElementsByClassName('tabs-content');
  for (let i = 0; i < tabs.length; i += 1) {
    $('.tabs-content').remove();
  }
});

Template.messages.helpers({
  userMessages: () => {
    const currentUser = Meteor.user();
    console.log('Current User: ', currentUser);

    const members = Template.instance().members.get();
    const messages = Template.instance().memberMessages.get();
    const currentMember = Template.instance().currentMember.get();

    if (members && messages && currentMember) {
      // const messagesFound =
      return Template.instance().messageController.get().populateUserByMessage({
        currentMember,
        members,
        messages,
      });

      // return messagesFound;

      /* if (messages) {
        const userMessages = messages.map((message) => { // eslint-disable-line arrow-body-style
          return {
            message,
            unReadMessage: (currentUser._id === message.mailerId) ?
              message.mailerUnReadMessage : message.receiverUnReadMessage,
          };
        });
        return userMessages;
      } */
    }

    return [];
  },
  hasUnreadMessage: unReadMessageCount => unReadMessageCount > 0,
});

Template.messages.events({
  /* 'keypress #search_group': function (event, template) {
    if (event.which === 13) {
      const groups = Template.instance().groupController.get().findByName(event.target.value);
      template.groupsFound.set(groups);
      const searchContent =
        document.getElementsByClassName('autocomplete-content dropdown-content');
      searchContent[0].innerHTML = '';
      return false;
    }
  }, */
});
