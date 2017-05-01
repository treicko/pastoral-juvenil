Meteor.publish('groups', function(){
  return Groups.find({});
});

Meteor.publish('singleGroup', function(id){
  check(id, String);
  return Groups.find({_id: id});
});

/* Parishes */

Meteor.publish('parishes', function(){
  return Parishes.find({});
});

Meteor.publish('singleParish', function(id){
  check(id, String);
  return Parishes.find({_id: id});
});

/* Events */

Meteor.publish('events', function(){
  return Events.find({});
});

Meteor.publish('singleEvent', function(id){
  check(id, String);
  return Events.find({_id: id});
});

/* Members */

Meteor.publish('members', function(){
  return Members.find({});
});

Meteor.publish('singleMember', function(id){
  check(id, String);
  return Members.find({_id: id});
});

/* Kardex */

Meteor.publish('kardex', function(){
  return Kardex.find({});
});

Meteor.publish('singleKardex', function(id){
  check(id, String);
  return Kardex.find({_id: id});
});

Meteor.publish('singleKardexByUser', function(id){
  check(id, String);
  return Kardex.find({userId: id});
});

/* users */

Meteor.publish('userData', function () {
  if (this.userId) {
    return Meteor.users.find({ _id: this.userId }, {
      fields: { other: 1, things: 1 }
    });
  } else {
    this.ready();
  }
});

