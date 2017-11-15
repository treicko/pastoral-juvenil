/* global Template $ ReactiveVar Meteor */

import MessageController from './../../../../../lib/controllers/message.controller';

Template.messages.onRendered(function() {
  console.log('On Rendered Messagess');
  $('ul.tabs').tabs();
});

Template.messages.onCreated(function() {
  this.messagesFound = new ReactiveVar([]);
  this.messageController = new ReactiveVar(new MessageController());
  this.autorun(() => {
    this.subscribe('messagesByMailer', Meteor.user()._id);
    if (Template.instance().subscriptionsReady()) {
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
    const messages =
      Template.instance().messageController.get().getMessagesByUserId(currentUser._id);
    if (messages) {
      const userMessages = messages.map((message) => { // eslint-disable-line arrow-body-style
        return {
          message,
          unReadMessage: (currentUser._id === message.mailerId) ?
            message.mailerUnReadMessage : message.receiverUnReadMessage,
        };
      });
      return userMessages;
    }
    return {};
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
