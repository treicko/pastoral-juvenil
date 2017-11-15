FlowRouter.route('/messages', {
  name: 'messages',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Messages'});
  }
})

FlowRouter.route('/messages/:id', {
  name: 'message',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Message'});
  }
})