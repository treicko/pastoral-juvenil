/* global Template $ ReactiveVar */
import VicarageController from './../../../../../lib/controllers/vicarage.controller';

Template.newVicarage.onRendered(function() {
  $(document).ready(function() {
    $('select').material_select();
  });
});

Template.newVicarage.onCreated(function() {
  this.vicarageController = new ReactiveVar(new VicarageController());
});

Template.newVicarage.events({
  'submit #new_vicarage': (event) => {
    event.preventDefault();
    const newVicarage = {
      name: event.target.vicarage_name.value,
      department: event.target.vicarage_department.value,
    };
    Template.instance().vicarageController.get().saveVicarage(newVicarage);
    $('form')[0].reset();
    $('ul.tabs').tabs('select_tab', 'vicarages');
  },
});
