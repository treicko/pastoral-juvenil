/* global FlowRouter BlazeLayout */

FlowRouter.route('/notifications', {
  name: 'notifications',
  action() {
    BlazeLayout.render('main', { main: 'notifications' });
  },
});
