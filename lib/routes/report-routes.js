/* global FlowRouter GAnalytics BlazeLayout */

FlowRouter.route('/reports', {
  name: 'reports',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('main', { main: 'reports' });
  },
});
