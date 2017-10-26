import GroupController from './../../../../../lib/controllers/group.controller';

Template.GroupPublications.onRendered(function() {
});

Template.GroupPublications.onCreated(function() {
  const self = this;
  this.groupController = new ReactiveVar(new GroupController());
  self.autorun(function() {
    groupId = FlowRouter.getParam('id');
    console.log('OnCreated: groupId: ', groupId, ' userId: ', Meteor.userId());
    self.subscribe('singleGroup', groupId);
    /* self.subscribe('singleGroup', groupId);
    self.subscribe('members'); */
  });
  /* var kardex = this;
  kardex.autorun(function() {
    kardex.subscribe('singleKardexByUser', Meteor.userId());
  }); */
  /* let groupId;
  
  

  GoogleMaps.ready('showMap', (map) => {
    this.groupController.get().setMapForShow(map, '');
    const groupFound = this.groupController.get().getGroupById(groupId);
    if (groupFound) {
      this.groupController.get().setGroupForShowOnMap(groupFound);
    }
  }); */
});

Template.GroupPublications.helpers({
  group: function() {
    const groupFound = Template.instance().groupController.get().getGroupById(groupId);
    if (groupFound) {
      return groupFound;
    }
  },
  user: function() {
    const currentUser = Meteor.user();
    return {
      _id: currentUser._id,
      email: currentUser.emails[0],
      name: currentUser.profile.name
    };
  }
});

Template.GroupPublications.events({
  'submit #new-publication-group': function(event, template) {
    event.preventDefault();
    const newPublication = {
      groupId: event.target.group_publication_groupId.value,
      description: event.target.group_publication_description.value,
      userName: event.target.group_publication_userName.value,
      userId: event.target.group_publication_userId.value,
      userImage: '',
      comments: []
    }
    Template.instance().groupController.get().savePublication(newPublication);
    $("form")[0].reset();
    $('#group_publication_description').trigger('autoresize');
    return false;    
  }
});