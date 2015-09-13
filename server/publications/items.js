
Meteor.publishComposite("tasks", function() {
  return {
    find: function() {
      return Tasks.find({});
    }
    // ,
    // children: [
    //   {
    //     find: function(item) {
    //       return [];
    //     }
    //   }
    // ]
  }
});

