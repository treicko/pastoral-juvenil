Template.Event.onCreated(function() {
  var kardex = this;
  kardex.autorun(function() {
    kardex.subscribe('singleKardexByUser', Meteor.userId());
  });
});


Template.Event.helpers({
  isEnrolled: function() {
    let isMemberEnrolled = false;
    if (this.participants) {
      isMemberEnrolled = this.participants.find(member => member === Meteor.userId());
    }
    return isMemberEnrolled;
  }
});

Template.Event.events({
  'click .enroll-participant': function() {
    let newCurrentParticipants = this.participants ? this.participants : [];
    const userKardex = Kardex.findOne({userId: Meteor.userId()});
    newCurrentParticipants.push(Meteor.userId());
    Meteor.call('updateParticipants', this._id, newCurrentParticipants);
    if (userKardex) {
      userKardex.events.push({ eventId: this._id });
      Meteor.call('updateKardexEvents', userKardex._id, userKardex.events);
    } else {
      Meteor.call('insertKardexOnEvent', Meteor.userId(), this._id);
    }
  },

  'click .unsubscribe-participant': function() {
    const currentMembers = this.participants.filter(user => user !== Meteor.userId());
    Meteor.call('updateParticipants', this._id, currentMembers);
  }
});