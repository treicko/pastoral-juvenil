FlowRouter.route('/messages', {
  name: 'messages',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'messages'});
  }
})

FlowRouter.route('/messages/:id', {
  name: 'message',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'message'});
  }
})