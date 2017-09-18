Meteor.publish('vicarages', function(){
  return Vicarages.find({});
});

Meteor.publish('singleVicarage', function(id){
  check(id, String);
  return Vicarages.find({_id: id});
});