FlowRouter.route('/parishes', {
  name: 'parishes',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'parishes'});
  }
})

FlowRouter.route('/parishes/:id', {
  name: 'parish',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'parishSingle'});
  }
})