/* global Meteor */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */

class NotificationController {
  constructor() {
  }

  setGroupCreatedNotification(data) {
    const currentUserName = Meteor.user().profile.name;
    const inChargesNotificated =
      data.inCharges.filter(inChargeName => inChargeName !== currentUserName);
    const membersNotificated =
      data.members.filter(memberName => memberName !== currentUserName);

    inChargesNotificated.forEach((inChargeName) => {
      const inChargeNotification = {
        memberActionName: currentUserName,
        action: 'te agregó como: "Encargado" a',
        entity: data.groupName,
        entityId: data.entityId,
        entityTag: '/groups/',
        userName: inChargeName,
        isUnRead: true,
      };

      Meteor.call('addNotification', inChargeNotification);
    });

    membersNotificated.forEach((memberName) => {
      const memberNotification = {
        memberActionName: currentUserName,
        action: 'te agregó como: "Participante" a',
        entity: data.groupName,
        entityId: data.entityId,
        entityTag: '/groups/',
        userName: memberName,
        isUnRead: true,
      };

      Meteor.call('addNotification', memberNotification);
    });
  }

  updateUnReadNotification(notificationId) {
    Meteor.call('updateUnReadNotification', notificationId);
  }
}

module.exports = NotificationController;
