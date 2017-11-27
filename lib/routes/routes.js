/* global FlowRouter GAnalytics BlazeLayout */

FlowRouter.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render('main');
  },
});

FlowRouter.route('/menu', {
  name: 'menu',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('main', { main: 'main' });
  },
});
