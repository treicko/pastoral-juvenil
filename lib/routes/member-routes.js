FlowRouter.route('/members', {
  name: 'members',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('mainLayout', {main: 'members'});
  }
})