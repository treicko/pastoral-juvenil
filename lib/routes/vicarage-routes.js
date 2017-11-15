FlowRouter.route('/vicarages', {
  name: 'vicarages',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('mainLayout', {main: 'vicarages'});
  }
})

FlowRouter.route('/vicarages/:id', {
  name: 'singleVicarage',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('mainLayout', {main: 'vicarage'});
  }
})