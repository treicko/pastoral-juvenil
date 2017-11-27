/* global FlowRouter GAnalytics BlazeLayout */

FlowRouter.route('/groups', {
  name: 'groups',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('main', { main: 'groups' });
  },
});

FlowRouter.route('/groups/:id', {
  name: 'group',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('main', { main: 'group' });
  },
});

FlowRouter.route('/groups/:id/edit', {
  name: 'groupEdit',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('main', { main: 'groupSingle' });
  },
});

FlowRouter.route('/groups/:id/publications', {
  name: 'groupPublications',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('main', { main: 'groupPublications' });
  },
});
