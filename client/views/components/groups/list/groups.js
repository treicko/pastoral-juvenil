/* Meteor.subscribe('groups'); */

/*Meteor.subscribe('userData');*/

Template.Groups.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('groups');
  });
});

Template.Groups.helpers({
  groups: () => {
    return Groups.find({});
  },
  users: () => {
    return Meteor.users.find({});
  }/*,
  g: () => {
    return Meteor.users.find({ _id: '25jYEFaPLD8ScZpmP' })
  }*/
});

/*Template.Grupito.helpers({
  gru: () => {
    return Groups.findOne({_id: 'bjHQy9ZdJsEgW4u9B'});
  }
});*/

Template.Grupito.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var id = Meteor.userId();
    self.subscribe('singleUser', id);
  });
});

Template.Grupito.helpers({
  gru: () => {
    var id = Meteor.userId();
    return Meteor.users.findOne({_id: id});
  }
});