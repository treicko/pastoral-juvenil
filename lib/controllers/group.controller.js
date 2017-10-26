import MapHelper from './../helpers/map.helper';

class GroupController {
  constructor() {
    this.map = null;
  }

  editGroup(groupId, editedGroup) {
    Meteor.call('editGroup', groupId, editedGroup);
  }

  findByName(nameForSearch){
    return Groups.find({name: {$regex: nameForSearch, $options: 'i'}}).fetch();
  }

  getGroups() {
    return Groups.find({}).fetch();
  }

  getGroupsForSearch(groups) {
    const groupData = {};
    if(groups.length > 0) {
      groups.forEach(group => {
        groupData[group.name] = null;
      });
    }
    return groupData
  }

  getGroupPosition() {
    return this.map.getPositionFromEventLocation();
  }

  getGroupById(groupId) {    
    const group = Groups.findOne({_id: groupId});
    if (group) {
      group.publications = group.publications.reverse();
      return group;
    }
  }

  getMembersOrInChargesFromData(collectionData) {
    return collectionData.map(data => data.tag);
  }

  getMembersForShow(group) {
    let counter = 0;
    const membersGroup = [];
    group.members.forEach(member => {
      if (counter < 4) {
        memberFound = Members.find({name: member}).fetch();
        if (memberFound.length > 0){
          membersGroup.push({
            name: memberFound[0].name,
            phone: memberFound[0].phone
          });
          counter += 1;
        }
      }
    });
    return membersGroup;
  }

  getInChargeForShow(group) {
    const groupInCharge = [];
    group.inCharge.forEach(memberInCharge => {
      inChargeFound = Members.find({name: memberInCharge}).fetch();
      if (inChargeFound.length > 0){
        groupInCharge.push({
          name: inChargeFound[0].name,
          phone: inChargeFound[0].phone
        });
      }
    });
    return groupInCharge;
  }

  saveGroup(newGroup) {
    Meteor.call('insertGroup', newGroup);
  }

  savePublication(newPublication) {
    Meteor.call('insertPublication', newPublication);
  }

  setGroupForShowOnMap(group) {
    if (this.map) {
      const groupLocation = {
        lat: group.latitude,
        lng: group.longitude
      };
      this.map.setEntityOnMapForShow(groupLocation, 'P', 'Ubicacion del grupo.');
    }
  }

  setMapAttributes() {
    /* this.map.addPlacesSearchBoxControl(); */
    /* this.map.addEventLocationMarkerOnClick(); */
    /* this.map.addCurrentLocationControl(); */
    console.log('Entro aqui...!!');
  }

  setControlsToMap() {
    let latLng;
    if(!this.map) 
      return;
    
    latLng = Geolocation.latLng();
    if (!latLng)
      return;
    
    this.map.setGeolocation(latLng);
    this.map.addCurrentLocationControl();
    this.map.addPlacesSearchBoxControl();
    this.map.addEventLocationMarkerOnClick();
  }

  setInChargesForData(collectionData) {
    return collectionData.map(data => {
      const memberFound = Members.find({name: data}).fetch();
      if (memberFound.length > 0){
        return {
          tag: memberFound[0].name,
          id: memberFound[0]._id
        };
      }
    });
  }

  setMapForCreateOrEdit(map, locationForm) {
    this.map = new MapHelper(map, locationForm);
  }

  setMapForShow(map, locationForm = '') {
    console.log('Location form: ', locationForm);
    this.map = new MapHelper(map, locationForm);
  }

  setMembersForData(collectionData) {
    return collectionData.map(data => data.tag);
  }
}

module.exports = GroupController;