/* global Template $ ReactiveVar FlowRouter GoogleMaps Meteor Kardex */
import GroupController from './../../../../../lib/controllers/group.controller';

Template.group.onRendered(function() {
  $('.tooltipped').tooltip({ delay: 50 });
  $('.chips').material_chip();
});

Template.group.onCreated(function() {
  const groupId = FlowRouter.getParam('id');
  const self = this;
  this.groupController = new ReactiveVar(new GroupController());
  self.autorun(function() {
    self.subscribe('singleGroup', groupId);
    self.subscribe('members');
  });

  GoogleMaps.ready('showMap', (map) => {
    this.groupController.get().setMapForShow(map);
    this.autorun(() => {
      this.groupController.get().setGroupForShowOnMap(groupId);
    });
  });
});

Template.group.helpers({
  group: () => {
    const groupId = FlowRouter.getParam('id');
    if (Template.instance().groupController) {
      const groupFound = Template.instance().groupController.get().getGroupById(groupId);
      if (groupFound) {
        // Template.instance().groupController.get().setGroupForShowOnMap(groupFound);
        const inChargeForShow =
          Template.instance().groupController.get().getInChargeForShow(groupFound);
        const membersForShow =
          Template.instance().groupController.get().getMembersForShow(groupFound);
        groupFound.inCharge = inChargeForShow;
        groupFound.membersForShow = membersForShow;
        return groupFound;
      }
    }
    return {};
  },
  isEnrolled: () => {
    let isMemberEnrolled = false;
    if (this.members) {
      isMemberEnrolled = this.members.find(member => member === Meteor.userId());
    }
    return isMemberEnrolled;
  },
});

Template.group.events({
  'click .enroll-member': () => {
    const newCurrentMembers = this.members ? this.members : [];
    const userKardex = Kardex.findOne({ userId: Meteor.userId() });
    newCurrentMembers.push(Meteor.userId());
    Meteor.call('updateMembers', this._id, newCurrentMembers);
    if (userKardex) {
      userKardex.groups.push({ groupId: this._id });
      Meteor.call('updateKardexGroups', userKardex._id, userKardex.groups);
    } else {
      Meteor.call('insertKardexOnGroup', Meteor.userId(), this._id);
    }
  },

  'click .unsubscribe-member': () => {
    const currentMembers = this.members.filter(user => user !== Meteor.userId());
    Meteor.call('updateMembers', this._id, currentMembers);
  },
});
