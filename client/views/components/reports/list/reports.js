/* global Template Meteor */

Template.reports.onCreated(function() {
  this.autorun(() => {
    // this.subscribe('singleKardexByUser', Meteor.userId());
  });
});

Template.reports.helpers({
  /* kardex: () => {
    const kardexsito = Kardex.findOne({ userId: Meteor.userId() });
    return kardexsito;
  }, */
});

