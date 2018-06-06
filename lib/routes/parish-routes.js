/* global FlowRouter BlazeLayout */

FlowRouter.route('/parishes', {
  name: 'parishes',
  action() {
    BlazeLayout.render('main', { main: 'parishes' });
  },
});

FlowRouter.route('/parishes/:id', {
  name: 'parish',
  action() {
    BlazeLayout.render('main', { main: 'parish' });
  },
});

FlowRouter.route('/parishes/:id/edit', {
  name: 'parishSingle',
  action() {
    BlazeLayout.render('main', { main: 'parishSingle' });
  },
});

FlowRouter.route('/parishes/chart', {
  name: 'parishChart',
  action() {
    BlazeLayout.render('main', { main: 'parishChart' });
  },
});

FlowRouter.route('/parishes/:name/detail', {
  name: 'parishDetail',
  action() {
    BlazeLayout.render('main', { main: 'parishDetail' });
  },
});

