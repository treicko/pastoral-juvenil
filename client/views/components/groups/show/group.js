/* global Template $ ReactiveVar FlowRouter GoogleMaps Meteor Groups */
import GroupController from './../../../../../lib/controllers/group.controller';

Template.group.onRendered(function() {
  $('.chips').material_chip();
  $('.modal').modal();
});

Template.group.onCreated(function() {
  const groupId = FlowRouter.getParam('id');
  this.groupController = new ReactiveVar(new GroupController());
  this.group = new ReactiveVar(null);
  this.autorun(() => {
    this.subscribe('singleGroupByShow', groupId);
    this.subscribe('membersByShow');

    if (Template.instance().subscriptionsReady()) {
      GoogleMaps.ready('showMap', (map) => {
        this.groupController.get().setMapForShow(map);
        this.autorun(() => {
          const groupFound = Groups.find({ _id: groupId }).fetch();
          if (groupFound && groupFound.length) {
            this.group.set(groupFound[0]);
            this.groupController.get().setGroupForShowOnMap(groupFound[0]);
          }
        });
      });
    }
  });
});

Template.group.helpers({
  group: () => Template.instance().group.get(),
  inCharges: () => {
    const groupFound = Template.instance().group.get();
    if (groupFound) {
      return Template.instance().groupController.get().getInChargeForShow(groupFound);
    }
    return [];
  },
  members: () => {
    const groupFound = Template.instance().group.get();
    if (groupFound) {
      return Template.instance().groupController.get().getMembersForShow(groupFound);
    }
    return [];
  },
  publicationsCount: () => {
    const group = Template.instance().group.get();
    if (group) {
      return group.publications.length;
    }
    return 0;
  },
  hasPublications: publicationsCount => publicationsCount > 0,
});

Template.group.events({
  'click #delete_group': () => {
    Meteor.call('deleteGroup', FlowRouter.getParam('id'));
    $('#modalDeleteGroup').modal('close');
    FlowRouter.go('/groups');
  },
});
