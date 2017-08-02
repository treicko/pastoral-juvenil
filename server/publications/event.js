Meteor.publish('events', function(){
  return Events.find({});
});

Meteor.publish('singleEvent', function(id){
  check(id, String);
  return Events.find({_id: id});
});