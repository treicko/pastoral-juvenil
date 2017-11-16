/* global Meteor */
/* eslint-disable meteor/audit-argument-checks */

import VicarageSchema from './vicarage.schema';

const Vicarages = new Meteor.Collection('vicarages');
Vicarages.attachSchema(VicarageSchema);

Meteor.methods({
  insertVicarage: (vicarage) => {
    Vicarages.insert(vicarage);
  },
});
