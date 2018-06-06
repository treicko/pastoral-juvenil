/* global FlowRouter BlazeLayout */

FlowRouter.route('/groups', {
  name: 'groups',
  action() {
    BlazeLayout.render('main', { main: 'groups' });
  },
});

FlowRouter.route('/groups/:id', {
  name: 'group',
  action() {
    BlazeLayout.render('main', { main: 'group' });
  },
});

FlowRouter.route('/groups/:id/edit', {
  name: 'groupEdit',
  action() {
    BlazeLayout.render('main', { main: 'groupSingle' });
  },
});

FlowRouter.route('/groups/:id/publications', {
  name: 'groupPublications',
  action() {
    BlazeLayout.render('main', { main: 'groupPublications' });
  },
});
