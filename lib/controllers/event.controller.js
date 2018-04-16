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
      }
    });
  }

  isEnableInscription(eventId) {
    const eventFound = Events.findOne({ _id: eventId });
    if (this.map && eventFound) {
      return this.map.computeDistanceBetween(100);
    }
    return false;
  }

  /* getEventByIdForShow(event) {
    if (eventFound) {
      const eventDate = eventFound.date;
      eventFound.date = moment(eventDate).format('LL');
      eventFound.hour = moment(eventDate).format('HH:mm');
      return eventFound;
    }
    return {};
  } */

  getEventDateForShow(event) {
    return moment(event.date).format('LL');
  }

  getEventHourForShow(event) {
    return moment(event.date).format('HH:mm');
  }

  getEventPosition() {
    return this.map.getPositionFromEventLocation();
  }

  getInChargeForShow(inCharges, members) {
    let counter = 0;
    const groupInCharge = [];
    inCharges.forEach((memberInCharge) => {
      if (counter < 4) {
        const inChargeFound = members.find(member => member.name === memberInCharge);
        if (inChargeFound) {
          groupInCharge.push({
            name: inChargeFound.name,
            phone: inChargeFound.phone,
          });
          counter += 1;
        }
      }
    });
    return groupInCharge;
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

  getMembersForShow(participants, members) {
    let counter = 0;
    const membersGroup = [];
    participants.forEach((memberName) => {
      if (counter < 4) {
        const memberFound = members.find(member => member.name === memberName);
        if (memberFound) {
          membersGroup.push({
            name: memberFound.name,
            phone: memberFound.phone,
          });
          counter += 1;
        }
      }
    });
    return membersGroup;
  }

  getMembersOrInChargesFromData(collectionData) {
    return collectionData.map(data => data.tag);
  }

  onDestroyMapForCreate() {
    this.map.clearMapInstance();
  }

  setEventForEditOnMap(event, entityLocationForm) {
    if (this.map) {
      const entity = {
        location: {
          lat: event.latitude,
          lng: event.longitude,
        },
        label: 'E',
        message: 'Ubicación del evento.',
        radius: event.radius,
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
        message: 'Ubicación del evento.',
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

  setEventForShowOnMap(event) {
    if (this.map) {
      const entity = {
        location: {
          lat: event.latitude,
          lng: event.longitude,
        },
        label: 'E',
        message: 'Ubicación del evento.',
        radius: event.radius,
      };
      this.map.setEntityOnMapForShow(entity);
    }
  }

  setInChargesForData(collectionData, members) {
    return collectionData.map((data) => {
      const memberFound = members.find(member => member.name === data);
      if (memberFound) {
        return { tag: memberFound.name };
      }
      return {};
    });
  }

  setMap(map) {
    this.map = new MapHelper(map);
  }

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

  updateEvent(eventId, editedEvent) {
    const data = {
      name: editedEvent.name,
      description: editedEvent.description,
      ubication: editedEvent.ubication,
      radius: editedEvent.radius,
      latitude: editedEvent.latitude,
      longitude: editedEvent.longitude,
      date: editedEvent.date,
      inCharges: editedEvent.inCharges,
      members: editedEvent.members,
      interested: [],
      parish: editedEvent.parish,
    };

    Meteor.call('updateEvent', eventId, data);
  }

  updateRadioOnMap(newRadio) {
    this.map.updateDrawEntityCircleOnMapRadio(newRadio);
  }
}

module.exports = EventController;

