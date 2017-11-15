FlowRouter.route('/kardex', {
  name: 'kardex',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('mainLayout', {main: 'kardex'});
  }
})