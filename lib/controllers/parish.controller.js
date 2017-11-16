/* global Parishes Meteor */
/* eslint-disable class-methods-use-this */

import MapHelper from './../helpers/map.helper';

class ParishController {
  constructor() {
    this.map = null;
  }

  getParishes() {
    return Parishes.find({});
  }

  getParishById(parishId) {
    return Parishes.findOne({ _id: parishId });
  }

  saveParish(newParish) {
    Meteor.call('insertParish', newParish);
  }

  setMapForShow(map) {
    this.map = new MapHelper(map, '');
  }

  setParishForShowOnMap(parish) {
    if (this.map) {
      const parishLocation = {
        lat: parish.latitude,
        lng: parish.longitude,
      };
      this.map.setEntityOnMapForShow(parishLocation, 'P', 'Ubicacion de la capilla/parroquia.');
    }
  }
}

module.exports = ParishController;
