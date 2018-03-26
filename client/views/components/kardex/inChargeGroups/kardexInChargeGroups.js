/* global Template ReactiveVar Groups Meteor */

Template.kardexInChargeGroups.onRendered(function() {
});

Template.kardexInChargeGroups.onCreated(function() {
  this.inChargeUserGroups = new ReactiveVar([]);

  this.autorun(() => {
    this.subscribe('inChargeGroupsByUser', Meteor.user().profile.name);

    if (Template.instance().subscriptionsReady()) {
      const groupsFound = Groups.find({}).fetch();
      // console.log('In charge Grupos: ', groupsFound);
      if (groupsFound && groupsFound.length) {
        this.inChargeUserGroups.set(groupsFound);
      }
    }
  });
});

Template.kardexInChargeGroups.helpers({
  inChargeGroups: () => Template.instance().inChargeUserGroups.get(),
});
