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
}

module.exports = KardexController;
