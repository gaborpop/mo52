DashboardController = AppController.extend({
  waitOn: function() {
    return this.subscribe('tasks');
  },
  data: {
    tasks: Tasks.find({}),
    projects: Projects.find({}),
    backlogtasks: Backlogtasks.find({})
    


  },
  onAfterAction: function () {
    Meta.setTitle('Dashboard');
  }
});

DashboardController.events({
  'click [data-action=doSomething]': function (event, template) {
    event.preventDefault();
  }
});
