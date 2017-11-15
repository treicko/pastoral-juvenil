/* global Template ReactiveVar FlowRouter */
import VicarageController from './../../../../../lib/controllers/vicarage.controller';

Template.vicarage.onCreated(function() {
  this.vicarageController = new ReactiveVar(new VicarageController());

  this.autorun(() => {
    const id = FlowRouter.getParam('id');
    this.subscribe('singleVicarage', id);
  });
});

Template.vicarage.helpers({
  vicarage: () => Template.instance().vicarageController.get().getVicarageById(FlowRouter.getParam('id')),
});
