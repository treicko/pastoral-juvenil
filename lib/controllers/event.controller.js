/* global Geolocation google GoogleMaps Events moment Meteor */
/* eslint-disable class-methods-use-this */

import MapHelper from './../helpers/map.helper';

class EventController {
  constructor() {
    this.map = null;
  }

  updatedEventKardex(eventId, data) {
    data.inCharge.forEach((memberInChargeName) => {
      const memberFound = data.memberList.find(member => member.name === memberInChargeName);
      if (memberFound) {
        Meteor.call('updateKardexByUserId', memberFound.userId, { inChargeEvents: eventId });
      }
    });

    data.members.forEach((memberName) => {
      const memberFound = data.memberList.find(member => member.name === memberName);
      if (memberFound) {
        Meteor.call('updateKardexByUserId', memberFound.userId, { memberEvents: eventId });
      }
    });
  }

  createEvent(data) {
    Meteor.call('insertEvent', data.newEvent, (error, eventId) => {
      if (!error) {
        this.updatedEventKardex(
          eventId,
          {
            inCharge: data.newEvent.inCharges,
            members: data.newEvent.members,
            memberList: data.memberList,
          },
        );

        /* if (data.userKardex) {
          Meteor.call('updateKardex', data.userKardex._id, { events: eventId });
        } else {
          Meteor.call('inserKardex', {
            userId: Meteor.user()._id,
            events: [eventId],
          });
        } */
      }
    });
  }

  /* Meteor.call('insertGroup', data.newGroup, (error, groupId) => {
    if (!error) {
      this.updatedGroupKardex(
        groupId,
        {
          inCharge: data.newGroup.inCharge,
          members: data.newGroup.members,
          memberList: data.memberList,
        },
      );
    }
  }); */

  isEnableInscription(eventId) {
    const eventFound = Events.findOne({ _id: eventId });
    if (this.map && eventFound) {
      return this.map.computeDistanceBetween(100);
    }
    return false;
  }

  getEventByIdForShow(eventId) {
    const eventFound = Events.findOne({ _id: eventId });
    if (eventFound) {
      const eventDate = eventFound.date;
      eventFound.date = moment(eventDate).format('LL');
      eventFound.hour = moment(eventDate).format('HH:mm');
      return eventFound;
    }
    return {};
  }

  getEventPosition() {
    return this.map.getPositionFromEventLocation();
  }

  getGeolocation() {
    return this.map.getGeolocation();
  }

  getMapOptions() {
    const latLng = Geolocation.latLng();
    if (GoogleMaps.loaded() && latLng) {
      return {
        center: new google.maps.LatLng(latLng.lat, latLng.lng),
        zoom: 15,
      };
    }
    return {};
  }

  getMap() {
    return this.map;
  }

  getMembersOrInChargesFromData(collectionData) {
    return collectionData.map(data => data.tag);
  }

  onDestroyMapForCreate() {
    this.map.clearMapInstance();
  }

  setEventForEditOnMap(eventId, entityLocationForm) {
    const eventFound = Events.findOne({ _id: eventId });
    if (eventFound && this.map) {
      const entity = {
        location: {
          lat: eventFound.latitude,
          lng: eventFound.longitude,
        },
        label: 'E',
        message: 'Ubicacion del evento.',
        radius: eventFound.radius,
      };
      this.map.setEntityOnMapForShow(entity, true);
      this.map.setGeolocation(Geolocation.latLng());

      if (!this.map.getGeolocation()) {
        return;
      }

      this.map.addEventLocationMarkerOnClick(entityLocationForm, true);
      this.map.addCurrentLocationControl(entityLocationForm, true);
      this.map.addPlacesSearchBoxControlToEntity(entityLocationForm);
    }
  }

  setEventForInscriptionOnMap(eventId) {
    const eventFound = Events.findOne({ _id: eventId });
    if (eventFound && this.map) {
      const entity = {
        location: {
          lat: eventFound.latitude,
          lng: eventFound.longitude,
        },
        label: 'E',
        message: 'Ubicacion del evento.',
        radius: eventFound.radius,
      };
      this.map.setEntityOnMapForShow(entity);
      this.map.setGeolocation(Geolocation.latLng());

      if (!this.map.getGeolocation()) {
        return;
      }

      this.map.addCurrentLocationControlForInscription();
      this.map.calculateAndDisplayRoute();
    }
  }

  setEventForShowOnMap(eventId) {
    const eventFound = Events.findOne({ _id: eventId });
    if (eventFound && this.map) {
      const entity = {
        location: {
          lat: eventFound.latitude,
          lng: eventFound.longitude,
        },
        label: 'E',
        message: 'Ubicacion del evento.',
        radius: eventFound.radius,
      };
      this.map.setEntityOnMapForShow(entity);
    }
  }

  setMap(map) {
    this.map = new MapHelper(map);
  }

  /* setMapAttributes() {
    this.map.setGeolocation(Geolocation.latLng());

    if (!this.map.getGeolocation()) {
      return;
    }

    if (!this.map.getEventLocationMarker()) {
      this.map.setEventOnCurrentLocationMarker();
      this.map.addEventLocationMarkerOnClick();
    }

    this.map.addCurrentLocationControl();
    this.map.addPlacesSearchBoxControl();
  } */

  setEventForCreate(entityLocationForm) {
    this.map.setGeolocation(Geolocation.latLng());

    if (!this.map.getGeolocation()) {
      return;
    }

    if (!this.map.getEventLocationMarker()) {
      this.map.setMarkerOnCurrentLocation(entityLocationForm);
      this.map.drawEntityCircleOnMapByRadio(100);
      this.map.addEventLocationMarkerOnClick(entityLocationForm, true);
    }

    this.map.addCurrentLocationControl(entityLocationForm, true);
    this.map.addPlacesSearchBoxControlToEntity(entityLocationForm);
  }

  updateRadioOnMap(newRadio) {
    this.map.updateDrawEntityCircleOnMapRadio(newRadio);
  }
}

module.exports = EventController;

