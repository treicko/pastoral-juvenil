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
  editParish: (parishId, editedParish) => {
    check(parishId, String);
    Parishes.update(parishId, {
      $set: {
        name: editedParish.name,
        location: editedParish.location,
        inCharge: editedParish.inCharge,
        latitude: editedParish.latitude,
        longitude: editedParish.longitude,
        members: editedParish.members,
        updatedAt: new Date(),
      },
    });
  },
  deleteParish: (id) => {
    Parishes.remove(id);
  },
});
