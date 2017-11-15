/* Principal layout */

FlowRouter.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render('mainLayout');
  }
});

FlowRouter.route('/menu', {
  name: 'menu',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('mainLayout', {main: 'main'});
  }
})