FlowRouter.route('/parishes', {
  name: 'parishes',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Parishes'});
  }
})

FlowRouter.route('/parishes/:id', {
  name: 'parish',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'ParishSingle'});
  }
})