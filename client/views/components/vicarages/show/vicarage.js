import VicarageController from './../../../../../lib/controllers/vicarage.controller';

Template.Vicarage.onCreated(function() {
  this.vicarageController = new ReactiveVar(new VicarageController());

  this.autorun(() => {
    var id = FlowRouter.getParam('id');
    this.subscribe('singleVicarage', id);
  });
});

Template.Vicarage.helpers({
  vicarage: () => {
    return Template.instance().vicarageController.get().getVicarageById(FlowRouter.getParam('id'));
  }
});