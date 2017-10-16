import GroupController from './../../../../../lib/controllers/group.controller';

Template.CreateEditMap.onRendered(function() {
  GoogleMaps.load({
    v: '3',
    libraries: 'places',
    key: 'AIzaSyCVKw1zfv0JsOsrH9yeAwoIjwcF7_JDAHY'
  });
});

Template.CreateEditMap.onCreated(function() {
  let groupId;
  const self = this;
  this.groupController = new ReactiveVar(new GroupController());
  
  self.autorun(function() {
    groupId = FlowRouter.getParam('id');
    self.subscribe('singleGroup', groupId);
    self.subscribe('members');
  });

  GoogleMaps.ready('showMap', (map) => {
    this.groupController.get().setMapForShow(map, '');
    const groupFound = this.groupController.get().getGroupById(groupId);
    if (groupFound) {
      this.groupController.get().setGroupForShowOnMap(groupFound);
      this.groupController.get().setMapAttributes();
    }
  });
});

Template.CreateEditMap.helpers({
  mapOptions: function() {
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng( 0, 0),
        zoom: (this.location) ? 15 : 1
      }
    }
    return {};
  }
});