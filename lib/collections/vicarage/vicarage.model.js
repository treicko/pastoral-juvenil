/* global Meteor */
/* eslint-disable meteor/audit-argument-checks */
/* eslint-disable no-undef */
import VicarageSchema from './vicarage.schema';

Vicarages = new Meteor.Collection('vicarages');
Vicarages.attachSchema(VicarageSchema);

Meteor.methods({
  insertVicarage: (vicarage) => {
    Vicarages.insert(vicarage);
  },
});
