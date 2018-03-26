/* global $ Template */

Template.kardexDetail.onRendered(function() {
  $('.tabs').tabs();
});

Template.kardexDetail.onCreated(function() {
  this.autorun(() => {
  });

  const tabs = document.getElementsByClassName('tabs-content');
  for (let i = 0; i < tabs.length; i += 1) {
    $('.tabs-content').remove();
  }
});

Template.kardexDetail.helpers({
});
