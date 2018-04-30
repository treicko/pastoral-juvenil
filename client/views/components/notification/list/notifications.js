/* global Template ReactiveVar Meteor Notifications */
/* eslint-disable prefer-destructuring */

import NotificationController from './../../../../../lib/controllers/notification.controller';

Template.notifications.onRendered(function() {
  this.autorun(() => {
    const userId = Meteor.user()._id;
    Meteor.call('updateMemberByUserId', userId, { unReadNotification: 0 });
  });
});

Template.notifications.onCreated(function() {
  const currentUserName = Meteor.user().profile.name;
  this.notifications = new ReactiveVar([]);
  this.notificationController = new ReactiveVar(new NotificationController());
  this.autorun(() => {
    this.subscribe('userNotifications', currentUserName);

    if (Template.instance().subscriptionsReady()) {
      const notifications = Notifications.find({}).fetch();
      if (notifications && notifications.length) {
        this.notifications.set(notifications);
      }
    }
  });
});

Template.notifications.helpers({
  notifications: () => Template.instance().notifications.get(),
});

Template.registerHelper(
  'statusNotification',
  isUnRead => (isUnRead ? 'notification-unread' : ''),
);

Template.notifications.events({
  'click .collection-item': (event) => {
    const notificationId = event.currentTarget.id;
    const elementClass = document.getElementById(`${notificationId}`).className;
    const isUnReandNotification = elementClass.search('notification-unread') > -1;

    if (isUnReandNotification) {
      Template.instance().notificationController.get().updateUnReadNotification(notificationId);
    }
  },
});
