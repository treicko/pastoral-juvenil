/* global Template Meteor Kardex Groups Events */

Template.kardex.onCreated(function() {
  this.autorun(() => {
    this.subscribe('singleKardexByUser', Meteor.userId());
  });
});

Template.kardex.helpers({
  kardex: () => {
    const kardexsito = Kardex.findOne({ userId: Meteor.userId() });
    return kardexsito;
  },
});

Template.currentUser.onCreated(function() {
  this.autorun(() => {
    this.subscribe('singleUser', Meteor.userId());
  });
});

Template.currentUser.helpers({
  currentUser: () => {
    const id = Meteor.userId();
    return Meteor.users.findOne({ _id: id });
  },
});

Template.groupOnKardex.onCreated(function() {
  this.autorun(() => {
    this.subscribe('groups');
  });
});

Template.groupOnKardex.helpers({
  groupOnKardex: () => Groups.findOne({ _id: this.groupId }),
  eventOnKardex: () => Events.findOne({ _id: this.eventId }),
});

Template.eventOnKardex.onCreated(function() {
  this.autorun(() => {
    this.subscribe('events');
  });
});

Template.eventOnKardex.helpers({
  eventOnKardex: () => Events.findOne({ _id: this.eventId }),
});
