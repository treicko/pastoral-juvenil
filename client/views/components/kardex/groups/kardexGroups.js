/* global Template ReactiveVar Groups Meteor */

Template.kardexGroups.onRendered(function() {
});

Template.kardexGroups.onCreated(function() {
  this.assistantUserGroups = new ReactiveVar([]);

  this.autorun(() => {
    this.subscribe('assistantGroupsByUser', Meteor.user().profile.name);

    if (Template.instance().subscriptionsReady()) {
      const groupsFound = Groups.find({}).fetch();
      console.log('Grupos para el user: ', groupsFound);
      if (groupsFound && groupsFound.length) {
        this.assistantUserGroups.set(groupsFound);
      }
    }
  });
});

Template.kardexGroups.helpers({
  assistantGroups: () => Template.instance().assistantUserGroups.get(),
});
