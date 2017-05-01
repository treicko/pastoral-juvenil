Template.Events.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('events');
  });
});

Template.Events.onRendered(function() {
    $('.carousel-slider').carousel({full_width: true});
});

Template.Events.helpers({
  events: () => {
    return Events.find({});
  }
});