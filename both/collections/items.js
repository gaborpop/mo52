Items = new Mongo.Collection('items');
Tasks = new Mongo.Collection('tasks');
Projects = new Mongo.Collection('projects');
Backlogtasks = new Mongo.Collection('backlogtasks');

Items.helpers({

});

Items.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
});
