/* global Meteor */
/* eslint-disable meteor/audit-argument-checks */
/* eslint-disable no-undef */
import ParishSchema from './parish.schema';

Parishes = new Meteor.Collection('parishes');

/* Parishes.allow({
  insert: function(userId, doc) {
    return !!userId;
  }
}); */

Parishes.attachSchema(ParishSchema);

Meteor.methods({
  insertParish: (parish) => {
    Parishes.insert(parish);
  },
});

