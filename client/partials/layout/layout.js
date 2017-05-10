Template.Layout.onRendered(function() {
    $(".button-collapse").sideNav();
});

Template.registerHelper('active', function(routeName) {
  var routeN = FlowRouter.getRouteName();
  console.log("Current route name is: ", routeN, 'the other brother: ', routeName);
  return routeN === routeName ? 'layout-active' : '';
  //return curRoute.getName() === routeName ? 'active' : '';
});


/*Template.regi ("", function() {
    var routeName = FlowRouter.getRouteName();
  console.log("Current route name is: ", routeName);
});*/