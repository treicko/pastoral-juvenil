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
  this.currentMember = new ReactiveVar({});

  this.autorun(() => {
    this.subscribe('singleUnreadMessageMember', userId);
  });
});

Template.layout.onDestroyed(function () {
  document.body.style.backgroundImage = "url('images/login.jpg')";
});

Template.layout.helpers({
  userName: () => Meteor.user().profile.name,
  userEmail: () => Meteor.user().emails[0].address,
  unReadMessageUser: () => {
    const member = Members.find({}).fetch();
    console.log('Member: ', member);
    if (member && member.length > 0) {
      return member[0].unReadMessage;
    }
    return [];
  },
  hasUnreadMessage: unReadMessageCount => unReadMessageCount.length > 0,
});

Template.registerHelper('active', (routeName) => {
  const routeN = FlowRouter.getRouteName();
  return routeN === routeName ? 'layout-active' : '';
});
