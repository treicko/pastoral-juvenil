/* global Template Meteor Kardex */

Template.event.onCreated(function() {
  this.autorun(() => {
    this.subscribe('singleKardexByUser', Meteor.userId());
  });
});


Template.event.helpers({
  isEnrolled: () => {
    let isMemberEnrolled = false;
    if (this.participants) {
      isMemberEnrolled = this.participants.find(member => member === Meteor.userId());
    }
    return isMemberEnrolled;
  },
});

Template.event.events({
  'click .enroll-participant': () => {
    const newCurrentParticipants = this.participants ? this.participants : [];
    const userKardex = Kardex.findOne({ userId: Meteor.userId() });
    newCurrentParticipants.push(Meteor.userId());
    Meteor.call('updateParticipants', this._id, newCurrentParticipants);
    if (userKardex) {
      userKardex.events.push({ eventId: this._id });
      Meteor.call('updateKardexEvents', userKardex._id, userKardex.events);
    } else {
      Meteor.call('insertKardexOnEvent', Meteor.userId(), this._id);
    }
  },

  'click .unsubscribe-participant': () => {
    const currentMembers = this.participants.filter(user => user !== Meteor.userId());
    Meteor.call('updateParticipants', this._id, currentMembers);
  },
});
