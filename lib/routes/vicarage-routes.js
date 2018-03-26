/* global FlowRouter GAnalytics BlazeLayout */

FlowRouter.route('/vicarages', {
  name: 'vicarages',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('main', { main: 'vicarages' });
  },
});

FlowRouter.route('/vicarages/:id', {
  name: 'singleVicarage',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('main', { main: 'vicarage' });
  },
});

FlowRouter.route('/vicarages/chart', {
  name: 'vicarageChart',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('main', { main: 'vicarageChart' });
  },
});

FlowRouter.route('/vicarages/detail', {
  name: 'vicarageDetail',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('main', { main: 'vicarageDetail' });
  },
});
