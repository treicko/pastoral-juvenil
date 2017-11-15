/* global Template $ FlowRouter */

Template.layout.onRendered(function() {
  $('.button-collapse').sideNav();
  document.body.style.backgroundImage = "url('images/bg02.png')";
});

Template.layout.onDestroyed(function () {
  document.body.style.backgroundImage = "url('images/login.jpg')";
});

Template.registerHelper('active', function(routeName) {
  const routeN = FlowRouter.getRouteName();
  return routeN === routeName ? 'layout-active' : '';
  // return curRoute.getName() === routeName ? 'active' : '';
});

/* Template.regi ("", function() {
    var routeName = FlowRouter.getRouteName();
  console.log("Current route name is: ", routeName);
}); */
