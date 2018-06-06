/* global FlowRouter BlazeLayout */

FlowRouter.route('/vicarages', {
  name: 'vicarages',
  action() {
    BlazeLayout.render('main', { main: 'vicarages' });
  },
});

FlowRouter.route('/vicarages/:id', {
  name: 'singleVicarage',
  action() {
    BlazeLayout.render('main', { main: 'vicarage' });
  },
});

FlowRouter.route('/vicarages/chart', {
  name: 'vicarageChart',
  action() {
    BlazeLayout.render('main', { main: 'vicarageChart' });
  },
});

FlowRouter.route('/vicarages/:name/detail', {
  name: 'vicarageDetail',
  action() {
    BlazeLayout.render('main', { main: 'vicarageDetail' });
  },
});
