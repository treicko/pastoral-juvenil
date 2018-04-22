/* global Meteor */
/* eslint-disable meteor/audit-argument-checks */
/* eslint-disable no-undef */
import NotificationSchema from './notification.schema';

Notifications = new Meteor.Collection('notification');
Notifications.attachSchema(NotificationSchema);

Meteor.methods({
  addNotification: (notification) => {
    Notifications.insert(notification);
  },
  updateUnReadNotification: (notificationId) => {
    Notifications.update(notificationId, {
      $set: { isUnRead: false },
    });
  },
});
