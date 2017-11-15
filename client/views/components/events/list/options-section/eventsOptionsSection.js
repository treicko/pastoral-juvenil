/* global Template Session */

Template.registerHelper('checkedDate', function(checkedName) {
  const selectedEventsDate = Session.get('selectedEventsDate');
  return selectedEventsDate === checkedName ? 'checked' : '';
});

Template.events.events({
  'click .checked-date': (event) => {
    Session.set('selectedEventsDate', event.currentTarget.name);
  },
});