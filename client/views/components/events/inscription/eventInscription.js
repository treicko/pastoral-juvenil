/* global Template FlowRouter ReactiveVar GoogleMaps Meteor Kardex */

import EventController from './../../../../../lib/controllers/event.controller';

Template.eventInscription.onCreated(function() {
  const eventId = FlowRouter.getParam('id');
  const userId = Meteor.user()._id;
  this.eventController = new ReactiveVar(new EventController());
  this.canUserInscribe = new ReactiveVar(false);
  this.userKardex = new ReactiveVar(null);
  this.autorun(() => {
    this.subscribe('singleEvent', eventId);
    this.subscribe('singleKardexByUser', userId);
  });

  GoogleMaps.ready('showMap', (map) => {
    this.eventController.get().setMap(map);
    this.autorun(() => {
      this.eventController.get().setEventForInscriptionOnMap(eventId);
      const isEnableInscription = this.eventController.get().isEnableInscription(eventId);
      this.canUserInscribe.set(isEnableInscription);

      const userKardexFound = Kardex.find({ userId }).fetch();
      if (userKardexFound && userKardexFound.length) {
        this.userKardex.set(userKardexFound[0]);
      }
    });
  });
});


Template.eventInscription.helpers({
  event: () => {
    const eventId = FlowRouter.getParam('id');
    const eventFound = Template.instance().eventController.get().getEventByIdForShow(eventId);
    return eventFound;
  },
  isEnableInscription: () => Template.instance().canUserInscribe.get(),
});

Template.eventInscription.events({
  'click #event_sing_up': () => {
    const userKardex = Template.instance().userKardex.get();
    const eventId = FlowRouter.getParam('id');

    if (userKardex) {
      Meteor.call('updateKardex', userKardex._id, { events: eventId });
    } else {
      Meteor.call('inserKardex', {
        userId: Meteor.user()._id,
        events: [eventId],
      });
    }

    FlowRouter.go(`/events/${eventId}`);
  },
});
