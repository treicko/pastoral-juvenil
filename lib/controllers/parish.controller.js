/* global Parishes Meteor Geolocation Members */
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

  getParishPosition() {
    return this.map.getPositionFromEventLocation();
  }

  getInChargesFromData(collectionData) {
    return collectionData.map(data => data.tag);
  }

  getInChargeForShow(parish) {
    const groupInCharge = [];
    parish.inCharge.forEach((memberInCharge) => {
      const inChargeFound = Members.find({ name: memberInCharge }).fetch();
      if (inChargeFound.length > 0) {
        groupInCharge.push({
          name: inChargeFound[0].name,
          phone: inChargeFound[0].phone,
        });
      }
    });
    return groupInCharge;
  }

  saveParish(newParish) {
    Meteor.call('insertParish', newParish);
  }

  setMap(map) {
    this.map = new MapHelper(map);
  }

  setParishForCreate(entityLocationForm) {
    this.map.setGeolocation(Geolocation.latLng());

    if (!this.map.getGeolocation()) {
      return;
    }

    if (!this.map.getEventLocationMarker()) {
      this.map.setMarkerOnCurrentLocation(entityLocationForm);
      this.map.addEventLocationMarkerOnClick(entityLocationForm);
    }

    this.map.addCurrentLocationControl(entityLocationForm);
    this.map.addPlacesSearchBoxControlToEntity(entityLocationForm);
  }

  setMapForShow(map) {
    this.map = new MapHelper(map, '');
  }

  setParishForShowOnMap(parishId) {
    const parishFound = Parishes.findOne({ _id: parishId });
    if (parishFound && this.map) {
      const entity = {
        location: {
          lat: parishFound.latitude,
          lng: parishFound.longitude,
        },
        label: 'P',
        message: 'Ubicacion de la capilla/parroquia.',
      };
      this.map.setEntityOnMapForShow(entity);
    }
  }
}

module.exports = ParishController;
