FlowRouter.route('/groups', {
  name: 'groups',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'groups'});
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
  name: 'groupEdit',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'groupSingle'});
  }
})

FlowRouter.route('/groups/:id/publications', {
  name: 'groupPublications',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'GroupPublications'});
  }
})