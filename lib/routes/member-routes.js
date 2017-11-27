/* global FlowRouter GAnalytics BlazeLayout */

FlowRouter.route('/members', {
  name: 'members',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('main', { main: 'members' });
  },
});
