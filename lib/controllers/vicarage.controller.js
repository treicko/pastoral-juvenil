class VicarageController {
  constructor() {
  }

  getVicarages() {
    return Vicarages.find({});
  }

  getVicarageById(vicarageId) {    
    return Vicarages.findOne({_id: vicarageId});
  }

  saveVicarage(newVicarage) {
    Meteor.call('insertVicarage', newVicarage);
  }
}

module.exports = VicarageController;