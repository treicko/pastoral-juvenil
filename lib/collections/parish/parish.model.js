import ParishSchema from './parish.schema';

Parishes = new Meteor.Collection('parishes');

Parishes.allow({
  insert: function(userId, doc) {
    return !!userId;
  }
});
Parishes.attachSchema(ParishSchema);



