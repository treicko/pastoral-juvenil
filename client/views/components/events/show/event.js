/* global Template FlowRouter Meteor ReactiveVar GoogleMaps Kardex */

import EventController from './../../../../../lib/controllers/event.controller';

Template.event.onCreated(function() {
  this.eventController = new ReactiveVar(new EventController());
  const eventId = FlowRouter.getParam('id');
  this.autorun(() => {
    this.subscribe('singleKardexByUser', Meteor.userId());
    this.subscribe('singleEvent', eventId);
  });

  GoogleMaps.ready('showMap', (map) => {
    this.eventController.get().setMapForShow(map, '');
    this.eventController.get().setEventForShowOnMap(eventId);
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
  event: () => {
    const eventId = FlowRouter.getParam('id');
    return Template.instance().eventController.get().getEventByIdForShow(eventId);
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
