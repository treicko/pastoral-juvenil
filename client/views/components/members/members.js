/* global Template $ Members */

Template.members.onRendered(function() {
  $(document).ready(() => {
    $('input.autocomplete').autocomplete({
      data: {
        Apple: null,
        Microsoft: null,
      },
    });
  });
});

Template.members.onCreated(function() {
  this.autorun(() => {
    this.subscribe('members');
  });
});

Template.members.helpers({
  members: () => Members.find({}),
});
