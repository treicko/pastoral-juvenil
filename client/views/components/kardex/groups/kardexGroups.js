/* global Template ReactiveVar Groups Meteor */

import KardexController from './../../../../../lib/controllers/kardex.controller';

Template.kardexGroups.onRendered(function() {
});

Template.kardexGroups.onCreated(function() {
  this.assistantUserGroups = new ReactiveVar([]);
  this.kardexController = new ReactiveVar(new KardexController());

  this.autorun(() => {
    this.subscribe('assistantGroupsByUser', Meteor.user().profile.name);

    if (Template.instance().subscriptionsReady()) {
      const groupsFound = Groups.find({}).fetch();
      if (groupsFound && groupsFound.length) {
        const assistantGroups = this.kardexController.get().getAssistantDataByUser(groupsFound);
        this.assistantUserGroups.set(assistantGroups);
      }
    }
  });
});

Template.kardexGroups.helpers({
  assistantGroups: () => Template.instance().assistantUserGroups.get(),
});
