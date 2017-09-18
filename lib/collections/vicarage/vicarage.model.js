import VicarageSchema from './vicarage.schema';

Vicarages = new Meteor.Collection('vicarages');
Vicarages.attachSchema(VicarageSchema);

Meteor.methods({
  insertVicarage: function(vicarage) {
    Vicarages.insert(vicarage);
  }
});
