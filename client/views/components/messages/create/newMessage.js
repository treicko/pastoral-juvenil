import MessageController from './../../../../../lib/controllers/message.controller';


Template.NewMessage.onRendered(function() {
});

Template.NewMessage.onCreated(function() {
  var self = this;
  const membersData = {};
  this.members = new ReactiveVar([]);
  this.messageController = new ReactiveVar(new MessageController());
  const currentUser = Meteor.user();
  console.log('New Message: user', currentUser)
  self.autorun(function() {
    self.subscribe('members');

    if (Template.instance().subscriptionsReady()) {
      const allMembers = Members.find({}).fetch();
      Template.instance().members.set(allMembers);
      
      if(allMembers.length > 0) {
        allMembers.forEach(member => {
          membersData[member.name] = 'http://lorempixel.com/250/250/people/'
        });
      }
      $('input#search_member_for_message').autocomplete({
        data: membersData,
        limit: 20,
        onAutocomplete: function(val) {
          /* if(groupController) {
            const groups = groupController.findByName(val);
            groupsFound.set(groups);
          } */
        },
        minLength: 1,
      });
    }
  });
});

Template.NewMessage.helpers({
  /* groups: () => {
    return Template.instance().groupsFound.get();
  } */
});

Template.NewMessage.events({
  'submit #new-message': function(event) {
    event.stopPropagation();
    event.preventDefault();
    const currentUser = Meteor.user();
    const receiverName = document.getElementById('search_member_for_message').value;
    const message = document.getElementById('message_description').value;
    const members = Template.instance().members.get();
    console.log('Members: ', members);
    if (members) {
      const receiver = members.find(member => member.name === receiverName);
      if (receiver && receiver.messages) {
        console.log('receier: ', receiver);
        const messageWithUser = receiver.messages.find(userMessage => currentUser._id === userMessage.userId)
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
                comment: message
              }
            ],
          }
          Template.instance().messageController.get().createMessage(newMessage);
        } else {
          const newComment = {
            userId: currentUser._id,
            userImage: 'image',
            comment: message,
            messageId: messageWithUser.messageId,
            mailerId: messageWithUser.mailerMessageId
          }
          console.log('New Coment Clau: ', newComment);
          
          Template.instance().messageController.get().addCommentToMessage(newComment);
        }
        $("form")[0].reset();
        $('ul.tabs').tabs('select_tab', 'messages');
      } 
    }
  }
});