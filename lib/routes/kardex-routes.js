/* global FlowRouter GAnalytics BlazeLayout */

FlowRouter.route('/kardex', {
  name: 'kardex',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('main', { main: 'kardex' });
  },
});
