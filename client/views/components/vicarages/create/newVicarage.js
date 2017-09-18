import VicarageController from './../../../../../lib/controllers/vicarage.controller';

Template.NewVicarage.onRendered(function() {
  $(document).ready(function() {
    $('select').material_select();
  });
});

Template.NewVicarage.onCreated(function() {
  this.vicarageController = new ReactiveVar(new VicarageController());
});

Template.NewVicarage.events({
  'submit #new_vicarage': function(vicarage) {
    event.preventDefault();
    const newVicarage = {
      'name': vicarage.target.vicarage_name.value,
      'department': event.target.vicarage_department.value
    }
    Template.instance().vicarageController.get().saveVicarage(newVicarage);
    $("form")[0].reset();
    $('ul.tabs').tabs('select_tab', 'vicarages');
  }
});