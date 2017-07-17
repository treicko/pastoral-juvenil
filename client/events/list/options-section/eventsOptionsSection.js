Template.registerHelper('checkedDate', function(checkedName) {
  const selectedEventsDate = Session.get('selectedEventsDate');
  return selectedEventsDate === checkedName ? 'checked' : '';
});

Template.Events.events({
  'click .checked-date': function(elem, template) {
    Session.set('selectedEventsDate', elem.currentTarget.id)
  }
});