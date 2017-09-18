


Template.Members.onRendered(function() {
  console.log('OnRendered - Members');
 /*  $('#autocomplete-input').keypress(function() {
    console.log( "Handler for .keypress() called." );
  }); */
    $(document).ready(function(){
      $('input.autocomplete').autocomplete({
        data: {
          "Apple": null,
          "Microsoft": null
        }
      });
    });
    console.log('Esto tiene el acutocolplete: ', $('#autocomplete-input'));
    /* $('#autocomplete-input').material_chip({
      autocompleteOptions: {
        data: {
          'Apple': null,
          'Microsoft': null,
          'Google': null
        },
        limit: Infinity,
        minLength: 1
      }
    }); */
});

Template.Members.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('members');
  });
});

Template.Members.helpers({
  members: () => {
    return Members.find({});
  }
});