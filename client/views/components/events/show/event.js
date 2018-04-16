/* global Template FlowRouter Meteor ReactiveVar GoogleMaps Kardex Meteor Events Members $ */

import EventController from './../../../../../lib/controllers/event.controller';

Template.event.onRendered(function() {
  $('.modal').modal();
});

Template.event.onCreated(function() {
  const eventId = FlowRouter.getParam('id');
  this.eventController = new ReactiveVar(new EventController());
  this.event = new ReactiveVar(null);
  this.members = new ReactiveVar(null);

  this.autorun(() => {
    this.subscribe('singleKardexByUser', Meteor.userId());
    this.subscribe('singleEventByShow', eventId);
    this.subscribe('membersByShow');

    if (Template.instance().subscriptionsReady()) {
      GoogleMaps.ready('showMap', (map) => {
        this.eventController.get().setMap(map);
        this.autorun(() => {
          const eventFound = Events.find({ _id: eventId }).fetch();
          const members = Members.find({}).fetch();

          if (eventFound && eventFound.length) {
            this.event.set(eventFound[0]);
            this.eventController.get().setEventForShowOnMap(eventFound[0]);
          }

          if (members) {
            this.members.set(members);
          }
        });
      });
    }
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
  event: () => Template.instance().event.get(),
  eventDate: () => {
    const event = Template.instance().event.get();
    if (event) {
      return Template.instance().eventController.get().getEventDateForShow(event);
    }
    return '';
  },
  eventHour: () => {
    const event = Template.instance().event.get();
    if (event) {
      return Template.instance().eventController.get().getEventHourForShow(event);
    }
    return '';
  },
  inCharges: () => {
    const event = Template.instance().event.get();
    const members = Template.instance().members.get();
    if (event && members) {
      return Template.instance().eventController.get().getInChargeForShow(event.inCharges, members);
    }
    return [];
  },
  members: () => {
    const event = Template.instance().event.get();
    const members = Template.instance().members.get();
    if (event && members) {
      return Template.instance().eventController.get().getMembersForShow(event.members, members);
    }
    return [];
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

  'click #delete_event': () => {
    Meteor.call('deleteEvent', FlowRouter.getParam('id'));
    $('#modalDelete').modal('close');
    FlowRouter.go('/events');
  },
});
