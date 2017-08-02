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