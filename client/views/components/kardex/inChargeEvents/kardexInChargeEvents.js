/* global Template ReactiveVar Groups Meteor */

import KardexController from './../../../../../lib/controllers/kardex.controller';

Template.kardexInChargeEvents.onRendered(function() {
});

Template.kardexInChargeEvents.onCreated(function() {
  this.inChargeUserGroups = new ReactiveVar([]);
  this.kardexController = new ReactiveVar(new KardexController());

  this.autorun(() => {
    this.subscribe('inChargeGroupsByUser', Meteor.user().profile.name);

    if (Template.instance().subscriptionsReady()) {
      const groupsFound = Groups.find({}).fetch();
      if (groupsFound && groupsFound.length) {
        const inChargeGroups = this.kardexController.get().getInChargeGroupsByUser(groupsFound);
        this.inChargeUserGroups.set(inChargeGroups);
      }
    }
  });
});

Template.kardexInChargeEvents.helpers({
  inChargeGroups: () => Template.instance().inChargeUserGroups.get(),
});
