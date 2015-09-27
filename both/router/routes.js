Router.route('/', {
  name: 'home'
});
Router.route('/daily', {
  name: 'daily'
});

Router.route('/dashboard', {
  name: 'dashboard',
  controller: 'DashboardController'
});

Router.plugin('ensureSignedIn', {
  only: ['dashboard']
});
