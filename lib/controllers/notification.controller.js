/* global Meteor */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */

class NotificationController {
  constructor() {
  }

  gerMembersToNotificate(dataList, currentUserName) {
    return dataList.filter(dataName => dataName !== currentUserName);
  }

  setGroupCreatedNotification(data) {
    const currentUserName = Meteor.user().profile.name;
    const inChargesNotificated = this.gerMembersToNotificate(data.inCharges, currentUserName);
    const membersNotificated = this.gerMembersToNotificate(data.members, currentUserName);

    inChargesNotificated.forEach((inChargeName) => {
      const inChargeNotification = {
        memberActionName: currentUserName,
        action: 'te agregó como: "Encargado" a',
        entity: data.groupName,
        entityId: data.entityId,
        entityTag: `/groups/${data.entityId}`,
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
        entityTag: `/groups/${data.entityId}`,
        userName: memberName,
        isUnRead: true,
      };

      Meteor.call('addNotification', memberNotification);
    });
  }

  setGroupPublicationCreatedNotification(data) {
    const currentUserName = Meteor.user().profile.name;
    const members = data.inCharges.concat(data.members);
    const membersNotificated = this.gerMembersToNotificate(members, currentUserName);

    membersNotificated.forEach((memberName) => {
      const memberNotification = {
        memberActionName: currentUserName,
        action: 'realizó una publicación en',
        entity: data.groupName,
        entityId: data.entityId,
        entityTag: `/groups/${data.entityId}/publications`,
        userName: memberName,
        isUnRead: true,
      };

      Meteor.call('addNotification', memberNotification);
    });
  }

  setGroupCommentPublicationCreatedNotification(data) {
    const currentUserName = Meteor.user().profile.name;
    const members = data.inCharges.concat(data.members);
    const membersNotificated = this.gerMembersToNotificate(members, currentUserName);

    membersNotificated.forEach((memberName) => {
      const memberNotification = {
        memberActionName: currentUserName,
        action: 'agregó un comentario a una publicación en',
        entity: data.groupName,
        entityId: data.entityId,
        entityTag: `/groups/${data.entityId}/publications`,
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
