/* global FlowRouter BlazeLayout */

FlowRouter.route('/reports', {
  name: 'reports',
  action() {
    BlazeLayout.render('main', { main: 'reports' });
  },
});
