import GroupController from './../../../../../lib/controllers/group.controller';

Template.GroupSingle.onRendered(function() {
});

Template.GroupSingle.onCreated(function() {
  let groupId;
  const self = this;
  this.groupController = new ReactiveVar(new GroupController());
  self.autorun(function() {
    groupId = FlowRouter.getParam('id');
    self.subscribe('singleGroup', groupId);
  });

  GoogleMaps.ready('groupMap', (map) => {
    this.groupController.get().setMapForCreateEdit(map, 'group_ubication');
    self.autorun(() => {
      this.groupController.get().setMapAttributes();
    });
  });

  GoogleMaps.ready('showMap', (map) => {
    this.groupController.get().setMapForShow(map, '');
    const groupFound = this.groupController.get().getGroupById(groupId);
    if (groupFound) {
      this.groupController.get().setGroupForShowOnMap(groupFound);
    }
  });
});

Template.GroupSingle.helpers({
  group: () => {
    const groupId = FlowRouter.getParam('id');
    if (Template.instance().groupController) {
      const groupFound = Template.instance().groupController.get().getGroupById(groupId);
      if (groupFound) {
        return groupFound;
      }
    }
  }
});