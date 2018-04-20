/* global Parishes Meteor Geolocation Members */
/* eslint-disable class-methods-use-this */

import MapHelper from './../helpers/map.helper';

class ParishController {
  constructor() {
    this.map = null;
  }

  editParish(parishId, editedParish) {
    Meteor.call('editParish', parishId, editedParish);
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
    const parishInCharge = [];
    if (parish.inCharge) {
      parish.inCharge.forEach((memberInCharge) => {
        const inChargeFound = Members.find({ name: memberInCharge }).fetch();
        if (inChargeFound.length > 0) {
          parishInCharge.push({
            name: inChargeFound[0].name,
            phone: inChargeFound[0].phone,
          });
        }
      });
    }

    return parishInCharge;
  }

  saveParish(newParish) {
    Meteor.call('insertParish', newParish);
  }

  setInChargesForData(collectionData) {
    return collectionData.map((data) => {
      const memberFound = Members.find({ name: data }).fetch();
      if (memberFound.length > 0) {
        return {
          tag: memberFound[0].name,
          id: memberFound[0]._id,
        };
      }
      return {};
    });
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

  setParishForShowOnMap(parishId) {
    const parishFound = Parishes.findOne({ _id: parishId });
    if (parishFound && this.map) {
      const entity = {
        location: {
          lat: parishFound.latitude,
          lng: parishFound.longitude,
        },
        label: 'P',
        message: 'Ubicación de la capilla/parroquia.',
      };
      this.map.setEntityOnMapForShow(entity);
    }
  }

  setEntitiesParishesDetailForShowOnMap(events, groups) {
    if (this.map) {
      const entityEvents = events.map((event) => {
        const entity = {
          location: {
            lat: event.latitude,
            lng: event.longitude,
          },
          label: 'E',
          name: event.name,
          link: `<a href="/events/${event._id}">Ver detalles</a>`,
        };
        return entity;
      });

      const entityGroups = groups.map((group) => {
        const entity = {
          location: {
            lat: group.latitude,
            lng: group.longitude,
          },
          label: 'G',
          name: group.name,
          link: `<a href="/groups/${group._id}">Ver detalles</a>`,
        };
        return entity;
      });

      const entities = entityEvents.concat(entityGroups);
      this.map.setEntitiesDetailOnMapForShow(entities);
    }
  }

  setParishForEditOnMap(parishId, entityLocationForm) {
    const parishFound = Parishes.findOne({ _id: parishId });
    if (parishFound && this.map) {
      const entity = {
        location: {
          lat: parishFound.latitude,
          lng: parishFound.longitude,
        },
        label: 'P',
        message: 'Ubicación de la capilla/parroquia.',
      };
      this.map.setEntityOnMapForShow(entity);
      this.map.setGeolocation(Geolocation.latLng());

      if (!this.map.getGeolocation()) {
        return;
      }

      this.map.addEventLocationMarkerOnClick(entityLocationForm);
      this.map.addCurrentLocationControl(entityLocationForm);
      this.map.addPlacesSearchBoxControlToEntity(entityLocationForm);
    }
  }
}

module.exports = ParishController;
