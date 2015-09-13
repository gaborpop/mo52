Template.dashboard.rendered = function() {

};

Template.dashboard.helpers({
	//tasks:  function () {
  	//	var thedate =  Session.get('viewDate');	
			//return Tasks.find({submittedRealDate: thedate, backlogTask: false});
  //},
		task:  function () {
      return Tasks.find({});
  }
	
	
	
	
})

Template.dashboard.events({
  'keypress .newTask':function(evt,tmpl){
    if (evt.which === 13) {
      var url = tmpl.find(".newTask").value;
      
      var newTask = {
        textTask: url,
        doneTask: false,
			  backlogTask : false,
        userId : Meteor.user()._id,
        author: Meteor.user().emails.adress,
        submitted: new Date().getTime(),
        modifiedStatus: new Date().getTime(),
        
        
      };
      newTask._id = Tasks.insert(newTask);
      //alert('bouyaka' + newTask);
  }},
   'click .checkbox2': function (evt, tmpl) {
   Tasks.update(this._id, {$set: {doneTask: true}});
    
  },
   'click .checkbox3': function (evt, tmpl) {
   Tasks.update(this._id, {$set: {doneTask: false}});
    
  },
  'click .destroy': function () {
    Tasks.remove(this._id);
  },
  'click .tomorrow': function () {
    alert('tomorrow');
  },
}); 

