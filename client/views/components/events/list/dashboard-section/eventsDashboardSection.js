/* global GoogleMaps google Template $ ReactiveVar */

Template.eventsDashboardSection.onRendered(function() {
  /* GoogleMaps.load({
    v: '3',
    libraries: 'places',
    key: 'AIzaSyCVKw1zfv0JsOsrH9yeAwoIjwcF7_JDAHY',
  }); */

  $('.chip').click(function() {
    $('.chip').removeClass('chip-selected');
    $(this).addClass('chip-selected');
  });
  $('.modal').modal();
});

Template.eventsDashboardSection.onCreated(function() {
  this.currentLocation = new ReactiveVar(null);
  this.eventLocation = new ReactiveVar(null);
  this.mapComponents = new ReactiveVar([]);
});

Template.eventsDashboardSection.onDestroyed(function () {
});

Template.eventsDashboardSection.helpers({
  isRegisterEnable: () => GoogleMaps.loaded(),
});

Template.eventsDashboardSection.events({
  'click .eventRegister': (event, templateInstance) => {
    $('#modalRegister').modal('open');

    $('.modal').modal({
      ready: () => {
        // Callback for Modal open. Modal and trigger parameters available.
        // alert("Ready");
        google.maps.event.trigger(GoogleMaps.maps.registerMap.instance, 'resize');
      },
    });
  },
});
