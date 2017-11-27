/* global FlowRouter GAnalytics BlazeLayout */

FlowRouter.route('/events', {
  name: 'events',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('main', { main: 'events' });
  },
});

FlowRouter.route('/events/:id', {
  name: 'event',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('main', { main: 'event' });
  },
});

FlowRouter.route('/events/:id/edit', {
  name: 'eventSingle',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('main', { main: 'eventSingle' });
  },
});

FlowRouter.route('/events/:id/inscription', {
  name: 'eventInscription',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('main', { main: 'eventInscription' });
  },
});

FlowRouter.route('/new-event/', {
  name: 'new-event',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('main', { main: 'newEvent' });
  },
});
