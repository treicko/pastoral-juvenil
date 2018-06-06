/* global FlowRouter BlazeLayout */

FlowRouter.route('/kardex', {
  name: 'kardex',
  action() {
    BlazeLayout.render('main', { main: 'kardex' });
  },
});

FlowRouter.route('/kardex/:id/chart', {
  name: 'kardexChart',
  action() {
    BlazeLayout.render('main', { main: 'kardexChart' });
  },
});

FlowRouter.route('/kardex/:id/detail', {
  name: 'kardexDetail',
  action() {
    BlazeLayout.render('main', { main: 'kardexDetail' });
  },
});
