Template.Groups.onRendered(function() {
  GoogleMaps.load({
    v: '3',
    libraries: 'places',
    key: 'AIzaSyCVKw1zfv0JsOsrH9yeAwoIjwcF7_JDAHY'
  });

  $('ul.tabs').tabs();
  $('ul.tabs').tabs({onShow: (tab) => {
    if(GoogleMaps.loaded()) {
      google.maps.event.trigger(GoogleMaps.maps.groupMap.instance, "resize");
    }
  }});
});

Template.Groups.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('groups');
  });

  const tabs = document.getElementsByClassName('tabs-content');
  for (let i = 0; i < tabs.length; i++) {
    $(".tabs-content").remove();
  }
});

Template.Groups.helpers({
  groups: () => {
    return Groups.find({});
  },
  users: () => {
    return Meteor.users.find({});
  }/*,
  g: () => {
    return Meteor.users.find({ _id: '25jYEFaPLD8ScZpmP' })
  }*/
});

/*Template.Grupito.helpers({
  gru: () => {
    return Groups.findOne({_id: 'bjHQy9ZdJsEgW4u9B'});
  }
});*/

/* Template.Grupito.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var id = Meteor.userId();
    self.subscribe('singleUser', id);
  });
});

Template.Grupito.helpers({
  gru: () => {
    var id = Meteor.userId();
    return Meteor.users.findOne({_id: id});
  }
}); */