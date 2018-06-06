/* global FlowRouter BlazeLayout */

FlowRouter.route('/events', {
  name: 'events',
  action() {
    BlazeLayout.render('main', { main: 'events' });
  },
});

FlowRouter.route('/events/:id', {
  name: 'event',
  action() {
    BlazeLayout.render('main', { main: 'event' });
  },
});

FlowRouter.route('/events/:id/edit', {
  name: 'eventSingle',
  action() {
    BlazeLayout.render('main', { main: 'eventSingle' });
  },
});

FlowRouter.route('/events/:id/inscription', {
  name: 'eventInscription',
  action() {
    BlazeLayout.render('main', { main: 'eventInscription' });
  },
});

FlowRouter.route('/new-event/', {
  name: 'new-event',
  action() {
    BlazeLayout.render('main', { main: 'newEvent' });
  },
});
