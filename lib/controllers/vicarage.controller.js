/* global Meteor Vicarages */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */

class VicarageController {
  constructor() {
  }

  getVicarages() {
    return Vicarages.find({});
  }

  getVicarageById(vicarageId) {
    return Vicarages.findOne({ _id: vicarageId });
  }

  saveVicarage(newVicarage) {
    Meteor.call('insertVicarage', newVicarage);
  }
}

module.exports = VicarageController;
