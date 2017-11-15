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

/* FlowRouter.route('/events/:id', {
  name: 'event',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'EventSingle'});
  }
})

FlowRouter.route('/new-event/', {
  name: 'new-event',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'NewEvent'});
  }
}) */