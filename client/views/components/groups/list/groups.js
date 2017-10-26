import GroupController from './../../../../../lib/controllers/group.controller';

Template.Groups.onRendered(function() {
  GoogleMaps.load({
    v: '3',
    libraries: 'places',
    key: 'AIzaSyCVKw1zfv0JsOsrH9yeAwoIjwcF7_JDAHY'
  });

  // $('ul.tabs').tabs();
  $('ul.tabs').tabs({onShow: (tab) => {
    if(GoogleMaps.loaded()) {
      google.maps.event.trigger(GoogleMaps.maps.groupMap.instance, "resize");
    }
  }});
});

Template.Groups.onCreated(function() {
  var self = this;
  this.groupsFound = new ReactiveVar([]); 
  this.groupController = new ReactiveVar(new GroupController());
  self.autorun(function() {
    self.subscribe('groups');

    if (Template.instance().subscriptionsReady()) {
      const groupController = Template.instance().groupController.get();
      const groups = groupController.getGroups();
      const groupsFound = Template.instance().groupsFound;
      groupsFound.set(groups);
      $('input#search_group').autocomplete({
        data: groupController.getGroupsForSearch(groups),
        limit: 20,
        onAutocomplete: function(val) {
          if(groupController) {
            const groups = groupController.findByName(val);
            groupsFound.set(groups);
          }
        },
        minLength: 1,
      });
    }
  });

  const tabs = document.getElementsByClassName('tabs-content');
  for (let i = 0; i < tabs.length; i++) {
    $(".tabs-content").remove();
  }
});

Template.Groups.helpers({
  groups: () => {
    return Template.instance().groupsFound.get();
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

Template.Groups.events({
  'keypress #search_group': function (event, template) {
    if (event.which === 13) {
      const groups = Template.instance().groupController.get().findByName(event.target.value);
      template.groupsFound.set(groups);
      const searchContent = document.getElementsByClassName('autocomplete-content dropdown-content');
      searchContent[0].innerHTML = '';
      return false;
    }
  },
});