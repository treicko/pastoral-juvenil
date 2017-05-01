FlowRouter.route('/events', {
  name: 'events',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Events'});
  }
})

FlowRouter.route('/events/:id', {
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
})