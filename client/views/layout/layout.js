/* global Template $ FlowRouter */

Template.layout.onRendered(function() {
  $('.button-collapse').sideNav();
  $('.dropdown-button').dropdown({
    inDuration: 300,
    outDuration: 225,
    constrainWidth: false, // Does not change width of dropdown to that of the activator
    hover: false, // Activate on hover
    gutter: 0, // Spacing from edge
    belowOrigin: false, // Displays dropdown below the button
    alignment: 'left', // Displays dropdown with edge aligned to the left of button
    stopPropagation: false, // Stops event propagation
  });
  document.body.style.backgroundImage = "url('images/bg02.png')";
  const elems = document.getElementsByClassName('waves-effect waves-light btn');
  for (let i = 0; i < elems.length; i += 1) {
    elems[i].removeAttribute('class');
  }
  if (elems.length === 1) {
    elems[0].removeAttribute('class');
  }
});

Template.layout.onCreated(function() {
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
