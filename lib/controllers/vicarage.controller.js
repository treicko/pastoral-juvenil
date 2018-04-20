/* global Meteor Vicarages */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */

import MapHelper from './../helpers/map.helper';

class VicarageController {
  constructor() {
    this.map = null;
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

  setMap(map) {
    this.map = new MapHelper(map);
  }

  setEntitiesVicaragesDetailForShowOnMap(parishes) {
    // console.log('Parishes: ', parishes);
    if (this.map) {
      const entityParishes = parishes.map((parish) => {
        const entity = {
          location: {
            lat: parish.latitude,
            lng: parish.longitude,
          },
          label: 'P',
          name: parish.name,
          link: `<a href="/parishes/${parish._id}">Ver detalles</a>`,
        };
        return entity;
      });

      // console.log('entityParishes: ', entityParishes);

      this.map.setEntitiesDetailOnMapForShow(entityParishes);
    }
  }
}

module.exports = VicarageController;
