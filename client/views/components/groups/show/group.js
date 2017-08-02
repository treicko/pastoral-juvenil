Template.Group.onCreated(function() {
  var kardex = this;
  kardex.autorun(function() {
    kardex.subscribe('singleKardexByUser', Meteor.userId());
  });
});

Template.Group.helpers({
  isEnrolled: function() {
    let isMemberEnrolled = false;
    if (this.members) {
      isMemberEnrolled = this.members.find(member => member === Meteor.userId());
    }
    return isMemberEnrolled;
  }
});

Template.Group.events({
  'click .enroll-member': function() {
    let newCurrentMembers = this.members ? this.members : [];
    const userKardex = Kardex.findOne({userId: Meteor.userId()});
    newCurrentMembers.push(Meteor.userId());
    Meteor.call('updateMembers', this._id, newCurrentMembers);
    if (userKardex) {
      userKardex.groups.push({ groupId: this._id });
      Meteor.call('updateKardexGroups', userKardex._id, userKardex.groups);
    } else {
      Meteor.call('insertKardexOnGroup', Meteor.userId(), this._id);
    }
  },

  'click .unsubscribe-member': function() {
    const currentMembers = this.members.filter(user => user !== Meteor.userId());
    Meteor.call('updateMembers', this._id, currentMembers);
  }
});