/* global Meteor */
/* eslint-disable meteor/audit-argument-checks */

import ParishSchema from './parish.schema';

const Parishes = new Meteor.Collection('parishes');

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

