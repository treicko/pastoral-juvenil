/* global Meteor */

// Users = new Meteor.Collection('users');

/* Meteor.publish('users', function(){
  return Meteor.users.find({}).fetch();
}); */

Meteor.publish('userData', function() {
  if (this.userId) {
    return Meteor.users.find(
      { _id: this.userId },
      { fields: { other: 1, things: 1 } },
    );
  }
  this.ready();
  return {};
});
