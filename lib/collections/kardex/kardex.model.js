/* global Meteor */
/* eslint-disable meteor/audit-argument-checks */
/* eslint-disable no-undef */
import KardexSchema from './kardex.schema';

Kardex = new Meteor.Collection('kardex');

Kardex.attachSchema(KardexSchema);

Meteor.methods({
  inserKardex: (newKardex) => {
    Kardex.insert(newKardex);
  },
  updateKardex: (id, data) => {
    Kardex.update(id, { $push: data });
  },
});
