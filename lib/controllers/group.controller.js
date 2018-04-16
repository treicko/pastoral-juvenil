/* global Meteor Groups Members Geolocation */
/* eslint-disable class-methods-use-this */

import MapHelper from './../helpers/map.helper';

class GroupController {
  constructor() {
    this.map = null;
  }

  editGroup(groupId, editedGroup) {
    const data = {
      name: editedGroup.name,
      location: editedGroup.location,
      inCharges: editedGroup.inCharges,
      description: editedGroup.description,
      latitude: editedGroup.latitude,
      longitude: editedGroup.longitude,
      members: editedGroup.members,
      parish: editedGroup.parish,
    };

    Meteor.call('editGroup', groupId, data);
  }

  findByName(nameForSearch) {
    return Groups.find({ name: { $regex: nameForSearch, $options: 'i' } }).fetch();
  }

  getGroupPosition() {
    return this.map.getPositionFromEventLocation();
  }

  getGroupsForSearch(groups) {
    const groupData = {};
    if (groups.length > 0) {
      groups.forEach((group) => {
        groupData[group.name] = null;
      });
    }
    return groupData;
  }

  getReversePublicationsGroup(publications) {
    return publications.reverse();
  }

  getMembersOrInChargesFromData(collectionData) {
    return collectionData.map(data => data.tag);
  }

  getMembersForShow(group) {
    let counter = 0;
    const membersGroup = [];
    group.members.forEach((member) => {
      if (counter < 4) {
        const memberFound = Members.find({ name: member }).fetch();
        if (memberFound.length > 0) {
          membersGroup.push({
            name: memberFound[0].name,
            phone: memberFound[0].phone,
          });
          counter += 1;
        }
      }
    });
    return membersGroup;
  }

  getInChargeForShow(group) {
    const groupInCharge = [];
    group.inCharges.forEach((memberInCharge) => {
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

  updatedGroupKardex(groupId, data) {
    data.inCharges.forEach((memberInChargeName) => {
      const memberFound = data.memberList.find(member => member.name === memberInChargeName);
      if (memberFound) {
        Meteor.call('updateKardexByUserId', memberFound.userId, { inChargeGroups: groupId });
      }
    });

    data.members.forEach((memberName) => {
      const memberFound = data.memberList.find(member => member.name === memberName);
      if (memberFound) {
        Meteor.call('updateKardexByUserId', memberFound.userId, { memberGroups: groupId });
      }
    });
  }

  saveGroup(data) {
    Meteor.call('insertGroup', data.newGroup, (error, groupId) => {
      if (!error) {
        this.updatedGroupKardex(
          groupId,
          {
            inCharges: data.newGroup.inCharges,
            members: data.newGroup.members,
            memberList: data.memberList,
          },
        );
      }
    });
  }

  savePublication(newPublication) {
    Meteor.call('insertPublication', newPublication);
  }

  saveComment(newComment) {
    Meteor.call('insertComment', newComment);
  }

  setGroupForCreate(entityLocationForm) {
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

  setGroupForEditOnMap(group, entityLocationForm) {
    if (this.map) {
      const entity = {
        location: {
          lat: group.latitude,
          lng: group.longitude,
        },
        label: 'G',
        message: 'Ubicacion del grupo.',
        radius: 100,
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

  setGroupForShowOnMap(group) {
    if (this.map) {
      const entity = {
        location: {
          lat: group.latitude,
          lng: group.longitude,
        },
        label: 'G',
        message: 'Ubicacion del grupo.',
        radius: 100,
      };
      this.map.setEntityOnMapForShow(entity);
    }
  }

  setMap(map) {
    this.map = new MapHelper(map);
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

  setMapForCreateOrEdit(map, locationForm) {
    this.map = new MapHelper(map, locationForm);
  }

  setMapForShow(map, locationForm = '') {
    this.map = new MapHelper(map, locationForm);
  }

  setMembersForData(collectionData) {
    return collectionData.map(data => data.tag);
  }
}

module.exports = GroupController;
