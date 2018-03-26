/* global Template Meteor ReactiveVar Kardex Events Groups Parishes Vicarages */

Template.reports.onCreated(function() {
  const currentUserId = Meteor.user()._id;
  this.userKardex = new ReactiveVar({});
  this.evenstNumber = new ReactiveVar(0);
  this.groupsNumber = new ReactiveVar(0);
  this.parishNumber = new ReactiveVar(0);
  this.vicaragesNumber = new ReactiveVar(0);

  this.autorun(() => {
    this.subscribe('userKardex', currentUserId);
    this.subscribe('eventsNumber');
    this.subscribe('groupsNumber');
    this.subscribe('parishesNumber');
    this.subscribe('vicaragesNumber');

    if (Template.instance().subscriptionsReady()) {
      const userKardex = Kardex.find({ userId: currentUserId }).fetch();
      if (userKardex && userKardex.length) {
        this.userKardex.set(userKardex[0]);
      }

      Template.instance().evenstNumber.set(Events.find({}).count());
      Template.instance().groupsNumber.set(Groups.find().count());
      Template.instance().parishNumber.set(Parishes.find().count());
      Template.instance().vicaragesNumber.set(Vicarages.find().count());
    }
  });
});

Template.reports.helpers({
  userkardex: () => Template.instance().userKardex.get(),
  evenstNumber: () => Template.instance().evenstNumber.get(),
  groupsNumber: () => Template.instance().groupsNumber.get(),
  parishNumber: () => Template.instance().parishNumber.get(),
  vicaragesNumber: () => Template.instance().vicaragesNumber.get(),
});

