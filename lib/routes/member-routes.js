FlowRouter.route('/members', {
  name: 'members',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'members'});
  }
})