FlowRouter.route('/groups', {
  name: 'groups',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Groups'});
  }
})

FlowRouter.route('/groups/:id', {
  name: 'group',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Group'});
  }
})

FlowRouter.route('/groups/:id/edit', {
  name: 'group',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'GroupSingle'});
  }
})