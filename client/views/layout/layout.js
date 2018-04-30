/* global Template $ FlowRouter Meteor Members ReactiveVar */

Template.layout.onRendered(function() {
  this.autorun(() => {
    document.body.style.backgroundImage = "url('images/bg02.png')";
    const elems = document.getElementsByClassName('waves-effect waves-light btn');
    for (let i = 0; i < elems.length; i += 1) {
      elems[i].removeAttribute('class');
    }
    if (elems.length === 1) {
      elems[0].removeAttribute('class');
    }
  });

  $('.button-collapse').sideNav({
    menuWidth: 300, // Default is 300
    edge: 'left', // Choose the horizontal origin
    closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    draggable: true, // Choose whether you can drag to open on touch screens
  });
});

Template.layout.onCreated(function() {
  const userId = Meteor.user()._id;
  this.memberUnReadMessage = new ReactiveVar([]);
  this.memberUnReadNotification = new ReactiveVar(0);

  this.autorun(() => {
    this.subscribe('singleUnreadMessageAndNotificationMember', userId);

    if (Template.instance().subscriptionsReady()) {
      const members = Members.find({}).fetch();

      if (members && members.length > 0) {
        this.memberUnReadMessage.set(members[0].unReadMessage);
        this.memberUnReadNotification.set(members[0].unReadNotification);
      }
    }
  });
});

Template.layout.onDestroyed(function () {
  document.body.style.backgroundImage = "url('images/login.jpg')";
});

Template.layout.helpers({
  userName: () => Meteor.user().profile.name,
  userEmail: () => Meteor.user().emails[0].address,
  unReadMessageUser: () => Template.instance().memberUnReadMessage.get(),
  unReadNotificationUser: () => Template.instance().memberUnReadNotification.get(),
  hasUnreadMessage: unReadMessageCount => unReadMessageCount.length > 0,
  hasUnreadNotification: unReadNotificationCount => unReadNotificationCount > 0,
});

Template.registerHelper('active', (routeName) => {
  const routeN = FlowRouter.getRouteName();
  return routeN === routeName ? 'layout-active' : '';
});
