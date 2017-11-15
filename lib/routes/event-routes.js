FlowRouter.route('/events', {
  name: 'events',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'events'});
  }
})

FlowRouter.route('/events/:id', {
  name: 'event',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'eventSingle'});
  }
})

FlowRouter.route('/new-event/', {
  name: 'new-event',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'newEvent'});
  }
})