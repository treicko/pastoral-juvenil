/* global Template GoogleMaps $ google ReactiveVar Groups */
/* eslint-disable prefer-destructuring */

import GroupController from './../../../../../lib/controllers/group.controller';

Template.groups.onRendered(function() {
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

Template.groups.onCreated(function() {
  this.groupsFound = new ReactiveVar([]);
  this.groupController = new ReactiveVar(new GroupController());
  this.autorun(() => {
    this.subscribe('groupsNameAndLocation');

    if (Template.instance().subscriptionsReady()) {
      const groups = Groups.find({}).fetch();

      if (groups && groups.length) {
        this.groupsFound.set(groups);
      }

      $('input#search_group').autocomplete({
        data: this.groupController.get().getGroupsForSearch(groups),
        limit: 20,
        onAutocomplete: (val) => {
          const groupsFoundByName = this.groupController.get().findByName(val);
          this.groupsFound.set(groupsFoundByName);
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
});

Template.groups.events({
  'keypress #search_group': (event, templateInstance) => {
    if (event.which === 13) {
      const groups = Template.instance().groupController.get().findByName(event.target.value);
      templateInstance.groupsFound.set(groups);
      const searchContent = document.getElementsByClassName('autocomplete-content dropdown-content');
      searchContent[0].innerHTML = '';
    }
  },
});
