/* global Template GoogleMaps $ google ReactiveVar Meteor */
/* eslint-disable prefer-destructuring */

import GroupController from './../../../../../lib/controllers/group.controller';

Template.groups.onRendered(function() {
  GoogleMaps.load({
    v: '3',
    libraries: 'places',
    key: 'AIzaSyCVKw1zfv0JsOsrH9yeAwoIjwcF7_JDAHY',
  });

  $('ul.tabs').tabs({
    onShow: () => {
      if (GoogleMaps.loaded()) {
        google.maps.event.trigger(GoogleMaps.maps.groupMap.instance, 'resize');
      }
    },
  });
});

Template.groups.onCreated(function() {
  this.groupsFound = new ReactiveVar([]);
  this.groupController = new ReactiveVar(new GroupController());
  this.autorun(() => {
    this.subscribe('groups');

    if (Template.instance().subscriptionsReady()) {
      const groupController = Template.instance().groupController.get();
      const groups = groupController.getGroups();
      const groupsFound = Template.instance().groupsFound;
      groupsFound.set(groups);
      $('input#search_group').autocomplete({
        data: groupController.getGroupsForSearch(groups),
        limit: 20,
        onAutocomplete: (val) => {
          if (groupController) {
            const groupsFoundByName = groupController.findByName(val);
            groupsFound.set(groupsFoundByName);
          }
        },
        minLength: 1,
      });
    }
  });

  const tabs = document.getElementsByClassName('tabs-content');
  for (let i = 0; i < tabs.length; i += 1) {
    $('.tabs-content').remove();
  }
});

Template.groups.helpers({
  groups: () => Template.instance().groupsFound.get(),
  users: () => Meteor.users.find({}),
});

Template.groups.events({
  'keypress #search_group': (event, templateInstance) => {
    if (event.which === 13) {
      const groups = Template.instance().groupController.get().findByName(event.target.value);
      templateInstance.groupsFound.set(groups);
      const searchContent = document.getElementsByClassName('autocomplete-content dropdown-content');
      searchContent[0].innerHTML = '';
    }
    return false;
  },
});
