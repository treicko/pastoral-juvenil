import MapHelper from './../helpers/map.helper';

class GroupController {
  constructor() {
    this.map = null;
  }

  getGroupById(groupId) {    
    return Groups.findOne({_id: groupId});
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
    this.map.addEventLocationMarkerOnClick();
    this.map.addCurrentLocationControl();
    this.map.addPlacesSearchBoxControl();
    console.log('Entro aqui...!!');
  }

  setMapForShow(map) {
    this.map = new MapHelper(map, '');
  }
}

module.exports = GroupController;