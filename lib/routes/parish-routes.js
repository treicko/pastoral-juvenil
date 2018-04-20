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
    BlazeLayout.render('main', { main: 'parish' });
  },
});

FlowRouter.route('/parishes/:id/edit', {
  name: 'parishSingle',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('main', { main: 'parishSingle' });
  },
});

FlowRouter.route('/parishes/chart', {
  name: 'parishChart',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('main', { main: 'parishChart' });
  },
});

FlowRouter.route('/parishes/:name/detail', {
  name: 'parishDetail',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('main', { main: 'parishDetail' });
  },
});

