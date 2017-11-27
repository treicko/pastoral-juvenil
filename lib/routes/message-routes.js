/* global FlowRouter GAnalytics BlazeLayout */

FlowRouter.route('/messages', {
  name: 'messages',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('main', { main: 'messages' });
  },
});

FlowRouter.route('/messages/:id', {
  name: 'message',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('main', { main: 'message' });
  },
});
