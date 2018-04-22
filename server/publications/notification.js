/* global Meteor Notifications check */

Meteor.publish('userNotifications', function(currentUserName) {
  check(currentUserName, String);
  return Notifications.find({ userName: currentUserName });
});
