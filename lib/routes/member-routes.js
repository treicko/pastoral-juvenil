/* global FlowRouter BlazeLayout */

FlowRouter.route('/members', {
  name: 'members',
  action() {
    BlazeLayout.render('main', { main: 'members' });
  },
});
