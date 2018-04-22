/* global FlowRouter GAnalytics BlazeLayout */

FlowRouter.route('/notifications', {
  name: 'notifications',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('main', { main: 'notifications' });
  },
});
