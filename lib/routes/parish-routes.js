/* global FlowRouter GAnalytics BlazeLayout */

FlowRouter.route('/parishes', {
  name: 'parishes',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('main', { main: 'parishes' });
  },
});

FlowRouter.route('/parishes/:id', {
  name: 'parish',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('main', { main: 'parishSingle' });
  },
});
