/* global Template GoogleMaps $ google Parishes */

Template.parishes.onRendered(function() {
  /* GoogleMaps.load({
    v: '3',
    libraries: 'places',
    key: 'AIzaSyCVKw1zfv0JsOsrH9yeAwoIjwcF7_JDAHY',
  }); */
  $('ul.tabs').tabs({
    onShow: () => {
      if (GoogleMaps.loaded()) {
        const center = GoogleMaps.maps.showMap.instance.getCenter();
        google.maps.event.trigger(GoogleMaps.maps.showMap.instance, 'resize');
        GoogleMaps.maps.showMap.instance.setCenter(center);
        GoogleMaps.maps.showMap.instance.setZoom(15);
      }
    },
  });
});

Template.parishes.onCreated(function() {
  this.autorun(() => {
    this.subscribe('parishes');
  });

  const tabs = document.getElementsByClassName('tabs-content');
  for (let i = 0; i < tabs.length; i += 1) {
    $('.tabs-content').remove();
  }
});

Template.parishes.helpers({
  parishes: () => Parishes.find({}),
});

Template.parishes.events({
  'click .collection-item': (event) => {
    $(event.target).addClass('active');
  },
});
