/* global FlowRouter GAnalytics BlazeLayout */

FlowRouter.route('/', {
  name: 'home',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('main', { main: 'events' });
  },
});

/* FlowRouter.route('/menu', {
  name: 'menu',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('main', { main: 'main' });
  },
}); */
