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
  selectedEvents: () => {
    const currentDate = new Date();
    const finded = Events.find({date: currentDate});
    console.log('este es mi resultado', finded);
    console.log('leo gay --------> ', moment.locale());
    return Events.find({date: currentDate});
  },
  title: () => {
    return 'Eventos del dia';
  }
});