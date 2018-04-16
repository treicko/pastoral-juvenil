/* global Template Meteor ReactiveVar Kardex Events Groups Parishes Vicarages $ */

import KardexController from './../../../../../lib/controllers/kardex.controller';

Template.reports.onRendered(function() {
  this.autorun(() => {
    this.subscribe('parishesNumber');
    this.subscribe('vicaragesNumber');

    if (Template.instance().subscriptionsReady()) {
      const parishes = Parishes.find({}).fetch();
      const vicarages = Vicarages.find({}).fetch();
      const parishesData = {};
      const vicaragesData = {};

      if (parishes && parishes.length) {
        if (this.parishSelected.get() === 'none') {
          this.parishSelected.set(parishes[0].name);
        }

        const parishNumberForVicarageSelected =
          this.kardexController.get().getParishNumerForVicarageSelected(parishes);
        this.parishNumberForVicarageSelected.set(parishNumberForVicarageSelected);

        parishes.forEach((parish) => {
          parishesData[parish.name] = null;
        });

        $('#report_parish_selected').autocomplete({
          data: parishesData,
          limit: 10,
          minLength: 1,
          onAutocomplete: (val) => {
            this.parishSelected.set(val);
          },
        });
      }

      if (vicarages && vicarages.length) {
        if (this.vicarageSelected.get() === 'none') {
          this.vicarageSelected.set(vicarages[0].name);
        }

        vicarages.forEach((vicarage) => {
          vicaragesData[vicarage.name] = null;
        });

        $('#report_vicarage_selected').autocomplete({
          data: vicaragesData,
          limit: 10,
          minLength: 1,
          onAutocomplete: (val) => {
            this.vicarageSelected.set(val);
          },
        });
      }
    }
  });
  document.getElementById('label_report_parish_selected').classList.add('active');
  document.getElementById('label_report_vicarage_selected').classList.add('active');
});

Template.reports.onCreated(function() {
  const currentUserId = Meteor.user()._id;
  this.userKardex = new ReactiveVar({});
  this.evenstNumber = new ReactiveVar(0);
  this.groupsNumber = new ReactiveVar(0);
  this.parishSelected = new ReactiveVar('none');
  this.vicarageSelected = new ReactiveVar('none');
  this.groupsNumberForParishSelected = new ReactiveVar(0);
  this.evenstNumberForParishSelected = new ReactiveVar(0);
  this.parishNumberForVicarageSelected = new ReactiveVar(0);
  this.vicaragesNumber = new ReactiveVar(0);
  this.kardexController = new ReactiveVar(new KardexController());

  this.autorun(() => {
    this.subscribe('userKardex', currentUserId);
    this.subscribe('assistantEventsByUserNumber', Meteor.user().profile.name);
    this.subscribe('inChargeEventsByUserNumber', Meteor.user().profile.name);
    this.subscribe('assistantGroupsByUserNumber', Meteor.user().profile.name);
    this.subscribe('inChargeGroupsByUserNumber', Meteor.user().profile.name);
    this.subscribe('groupsByParishName', this.parishSelected.get());
    this.subscribe('eventsByParishName', this.parishSelected.get());
    this.subscribe('parishesByVicarageName', this.vicarageSelected.get());

    if (Template.instance().subscriptionsReady()) {
      const userKardex = Kardex.find({ userId: currentUserId }).fetch();
      const groups = Groups.find({}).fetch();
      const events = Events.find({}).fetch();

      if (userKardex && userKardex.length) {
        this.userKardex.set(userKardex[0]);
      }

      if (groups && groups.length) {
        const groupsNumberForParishSelected =
          this.kardexController.get().getGroupsOrEventsNumerForParishSelected(groups);
        this.groupsNumberForParishSelected.set(groupsNumberForParishSelected);

        const groupsNumber =
          this.kardexController.get().getGroupsOrEventsByCurrentUser(groups);
        this.groupsNumber.set(groupsNumber);
      }

      if (events && events.length) {
        const evenstNumberForParishSelected =
          this.kardexController.get().getGroupsOrEventsNumerForParishSelected(events);
        this.evenstNumberForParishSelected.set(evenstNumberForParishSelected);

        const evenstNumber =
          this.kardexController.get().getGroupsOrEventsByCurrentUser(events);
        this.evenstNumber.set(evenstNumber);
      }
    }
  });
});

Template.reports.helpers({
  userkardex: () => Template.instance().userKardex.get(),
  evenstNumber: () => Template.instance().evenstNumber.get(),
  groupsNumber: () => Template.instance().groupsNumber.get(),
  parishSelected: () => Template.instance().parishSelected.get(),
  groupsNumerForParishSelected: () => Template.instance().groupsNumberForParishSelected.get(),
  eventsNumerForParishSelected: () => Template.instance().evenstNumberForParishSelected.get(),
  parishNumber: () => Template.instance().parishNumber.get(),
  vicarageSelected: () => Template.instance().vicarageSelected.get(),
  parishNumberForVicarageSelected: () => Template.instance().parishNumberForVicarageSelected.get(),
});
