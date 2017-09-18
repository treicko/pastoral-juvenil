Template.Parishes.onRendered(function() {
  console.log('OnRendered Parishes');
  GoogleMaps.load({
    v: '3',
    libraries: 'places',
    key: 'AIzaSyCVKw1zfv0JsOsrH9yeAwoIjwcF7_JDAHY'
  });

  $('ul.tabs').tabs();
  $('ul.tabs').tabs({onShow: (tab) => {
    if(GoogleMaps.loaded()) {
      google.maps.event.trigger(GoogleMaps.maps.parishMap.instance, "resize");
    }
  }});
});

Template.Parishes.onCreated(function() {
  console.log('OnCreated Parishes');
  
  var self = this;
  self.autorun(function() {
    self.subscribe('parishes');
  });

  const tabs = document.getElementsByClassName('tabs-content');
  for (let i = 0; i < tabs.length; i++) {
    $(".tabs-content").remove();
  }
});

Template.Parishes.helpers({
  parishes: () => {
    return Parishes.find({});
  }
});

Template.Parishes.events({
  'click .collection-item': function (e) {
    /* e.preventDefault(); */
    $(e.target).addClass('active'); 
    console.log('Hola pirroooo en e console.', this);
    /* e.target.addClass("active"); */
  }
});