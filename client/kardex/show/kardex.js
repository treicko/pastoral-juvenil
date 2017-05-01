Template.Kardex.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('singleKardexByUser', Meteor.userId());
  });
});

Template.Kardex.helpers({
  kardex: () => {
    const kardexsito = Kardex.findOne({userId: Meteor.userId()});
    return kardexsito;
  }
});

Template.CurrentUser.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('singleUser', Meteor.userId());
  });
});

Template.CurrentUser.helpers({
  currentUser: () => {
    var id = Meteor.userId();
    console.log('current user id leoooo: ', id);
    return Meteor.users.findOne({_id: id});
  }
});

Template.GroupOnKardex.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('groups');
  });
});

Template.GroupOnKardex.helpers({
  groupOnKardex: function() {
    return Groups.findOne({ _id: this.groupId });
  },
  eventOnKardex: function() {
    return Events.findOne({ _id: this.eventId });
  }

});

Template.EventOnKardex.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('events');
  });
});

Template.EventOnKardex.helpers({
  eventOnKardex: function() {
    return Events.findOne({ _id: this.eventId });
  }
});