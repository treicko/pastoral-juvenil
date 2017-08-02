/* Principal layout */

FlowRouter.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render('MainLayout');
  }
});

FlowRouter.route('/menu', {
  name: 'menu',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'main'});
  }
})

/* Groups */

/*FlowRouter.route('/groups', {
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
    BlazeLayout.render('MainLayout', {main: 'GroupSingle'});
  }
})*/

/* Members */

/*FlowRouter.route('/members', {
  name: 'members',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Members'});
  }
})*/

/* */
