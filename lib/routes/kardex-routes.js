FlowRouter.route('/kardex', {
  name: 'kardex',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'kardex'});
  }
})