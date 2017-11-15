/* global Template $ ReactiveVar */
import VicarageController from './../../../../../lib/controllers/vicarage.controller';

Template.vicarages.onRendered(function() {
  $('ul.tabs').tabs();
});

Template.vicarages.onCreated(function() {
  this.vicarageController = new ReactiveVar(new VicarageController());

  this.autorun(() => {
    this.subscribe('vicarages');
  });

  const tabs = document.getElementsByClassName('tabs-content');
  for (let i = 0; i < tabs.length; i += 1) {
    $('.tabs-content').remove();
  }
});

Template.vicarages.helpers({
  vicarages: () => Template.instance().vicarageController.get().getVicarages(),
});
