import VicarageController from './../../../../../lib/controllers/vicarage.controller';

Template.Vicarages.onRendered(function() {
  $('ul.tabs').tabs();
});

Template.Vicarages.onCreated(function() {
  this.vicarageController = new ReactiveVar(new VicarageController());

  this.autorun(() => {
    this.subscribe('vicarages');
  });

  const tabs = document.getElementsByClassName('tabs-content');
  for (let i = 0; i < tabs.length; i++) {
    $(".tabs-content").remove();
  }
});

Template.Vicarages.helpers({
  vicarages: () => {
    return Template.instance().vicarageController.get().getVicarages();;
  }
});