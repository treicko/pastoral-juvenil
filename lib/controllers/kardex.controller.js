/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */

class KardexController {
  constructor() {
  }

  getAssistantDataByUser(groups) {
    return groups.filter(group => !!group.members);
  }

  getInChargeDataByUser(groups) {
    return groups.filter(group => !!group.inCharges);
  }

  getGroupsOrEventsNumerForParishSelected(collectionData) {
    const collectionFiltered = collectionData.filter(data => !!data.parish);
    return collectionFiltered.length;
  }

  getGroupsOrEventsByCurrentUser(collectionData) {
    const collectionFiltered = collectionData.filter(data => !!data.name);
    return collectionFiltered.length;
  }

  getParishNumerForVicarageSelected(collectionData) {
    const collectionFiltered = collectionData.filter(data => !!data.vicarage);
    return collectionFiltered.length;
  }
}

module.exports = KardexController;
