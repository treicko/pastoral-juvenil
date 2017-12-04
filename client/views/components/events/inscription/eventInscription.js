/* global Template FlowRouter ReactiveVar GoogleMaps */

import EventController from './../../../../../lib/controllers/event.controller';

Template.eventInscription.onCreated(function() {
  const eventId = FlowRouter.getParam('id');
  this.eventController = new ReactiveVar(new EventController());
  this.canUserInscribe = new ReactiveVar(false);
  this.autorun(() => {
    this.subscribe('singleEvent', eventId);
  });

  GoogleMaps.ready('showMap', (map) => {
    this.eventController.get().setMap(map);
    this.autorun(() => {
      this.eventController.get().setEventForInscriptionOnMap(eventId);
      const isEnableInscription = this.eventController.get().isEnableInscription(eventId);
      this.canUserInscribe.set(isEnableInscription);
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

});
