/* global FlowRouter BlazeLayout */

FlowRouter.route('/messages', {
  name: 'messages',
  action() {
    BlazeLayout.render('main', { main: 'messages' });
  },
});

FlowRouter.route('/messages/:id', {
  name: 'message',
  action() {
    BlazeLayout.render('main', { main: 'message' });
  },
});
