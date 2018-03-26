/* global FlowRouter GAnalytics BlazeLayout */

FlowRouter.route('/kardex', {
  name: 'kardex',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('main', { main: 'kardex' });
  },
});

FlowRouter.route('/kardex/:id/chart', {
  name: 'kardexChart',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('main', { main: 'kardexChart' });
  },
});

FlowRouter.route('/kardex/:id/detail', {
  name: 'kardexDetail',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('main', { main: 'kardexDetail' });
  },
});
