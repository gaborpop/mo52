Template.dashboard.rendered = function() {
	Session.set("archivedProjects", true);
	Session.set("displayArchivedProjects", false);
	Session.set("showDoneTasks", false);
	Session.setDefault('editing_itemname', null);
var activateInput = function (input) {
  input.focus();
  input.select();
}
};

Template.dashboard.helpers({
	//tasks:  function () {
  	//	var thedate =  Session.get('viewDate');
			//return Tasks.find({submittedRealDate: thedate, backlogTask: false});
  //},
		task:  function () {
      return Tasks.find({isProject:false});
  },
		project: function() {
			return Tasks.find({isProject:true, archivedProject: false});
		},
		activeproject: function() {
			return Tasks.find({isProject:true, activeProject:true});
		},
		projectTask: function() {
			return Tasks.find({motherProject : this._id, doneTask:false}, {sort: {submitted: -1}});
		},
		projectTaskDone: function() {
			return Tasks.find({motherProject : this._id, doneTask:true}, {sort: {submitted: -1}});
		},

		archivedProjects: function() {
		//console.log('returne ' + Session.get("archivedProjects"));
		return Session.get("archivedProjects");

	},
	displayDoneTasks: function() {
	//console.log('returne ' + Session.get("archivedProjects"));
	return Session.get("showDoneTasks");

},
		projectArchived: function() {
		return Tasks.find({isProject:true, archivedProject:true});
	},
	backlogTask1: function() {
	return Tasks.find({isProject:false, backlogTask:true});
},
	editing:  function () {
      return Session.equals('editing_itemname', this._id);
  },




})

Template.dashboard.events({
  'keypress .newTask':function(evt,tmpl){
    if (evt.which === 13) {
      var url = tmpl.find(".newTask").value;
			var projName = tmpl.find(".nameProject").value;
      var newTask = {
        textTask: url,
        doneTask: false,
			  backlogTask : false,
        userId : Meteor.user()._id,
        author: Meteor.user().emails.adress,
        submitted: new Date().getTime(),
        modifiedStatus: new Date().getTime(),
				isProject: false,
				motherProject:projName,
				activeProject: false,
				archivedProject: false,
				archivedTask: false,
				isDaily: false

      };
      newTask._id = Tasks.insert(newTask);
      //alert('bouyaka' + newTask);
			evt.target.value = '';
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
	'keypress .newProject':function(evt,tmpl){
    if (evt.which === 13) {
      var url = tmpl.find(".newProject").value;

      var newTask = {
        textTask: url,
        doneTask: false,
			  backlogTask : false,
        userId : Meteor.user()._id,
        author: Meteor.user().emails.adress,
        submitted: new Date().getTime(),
        modifiedStatus: new Date().getTime(),
				isProject: true,
				motherProject:"",
				activeProject: false,
				archivedProject: false,
				archivedTask: false,
				isDaily: false


      };
      newTask._id = Tasks.insert(newTask);
      //alert('bouyaka' + newTask);
			evt.target.value = '';
  }},
	'click .displayCommand': function (evt, tmpl) {
	if (this.activeProject == false) {
		Tasks.update(this._id, {$set: {activeProject: true}});
	}
	else {
		Tasks.update(this._id, {$set: {activeProject: false}});
	}

 },
 'click .toggle': function () {

	 if (Session.get("archivedProjects") == true) {
		 Session.set("archivedProjects", false);
		 console.log(Session.get("archivedProjects"));
	 }
	 else if (Session.get("archivedProjects") == false){
	 		Session.set("archivedProjects", true);
			console.log(Session.get("archivedProjects"));

	 }
 },
 'click .archiveCommand': function (evt, tmpl) {
	 //Session.get("displayArchivedProjects");
	 if (this.archivedProject == true) {
		 Tasks.update(this._id, {$set: {archivedProject: false, activeProject:false}});
		 alert("project un-archived");
	 }
	 else if (this.archivedProject == false){
		 Tasks.update(this._id, {$set: {archivedProject: true, activeProject:false}});
		alert("project archived");

	 }

},
'change .taskDoneClass': function (evt, tmpl) {

	if (this.doneTask == false) {
		Tasks.update(this._id, {$set: {doneTask: true}});

	}
	else {
		Tasks.update(this._id, {$set: {doneTask: false}});

	}

},
'click .dailyClass': function (evt, tmpl) {

	if (this.isDaily == true) {
		Tasks.update(this._id, {$set: {isDaily: false}});
		//alert("Not daily anymore");
	}
	else if (this.isDaily == false){
		 Tasks.update(this._id, {$set: {isDaily: true}});
		 //alert("Is daily");
	}
},
'keypress .newBacklogTask':function(evt,tmpl){
	if (evt.which === 13) {
		var url = tmpl.find(".newBacklogTask").value;

		var newTask = {
			textTask: url,
			doneTask: false,
			backlogTask : true,
			userId : Meteor.user()._id,
			author: Meteor.user().emails.adress,
			submitted: new Date().getTime(),
			modifiedStatus: new Date().getTime(),
			isProject: false,
			motherProject:"",
			activeProject: false,
			archivedProject: false,
			archivedTask: false,
			isDaily: false


		};
		newTask._id = Tasks.insert(newTask);
		//alert('bouyaka' + newTask);
		evt.target.value = '';
}},
'click .assignToProjectClass': function (evt, tmpl) {
	var url = tmpl.find(".assignToProjectClass").value;
	var projName = tmpl.find(".nameProject").value;
	 Tasks.update(this._id, {$set: {motherProject: projName, backlogTask:false }});
},
'click .toogleDoneTask': function () {

	if (Session.get("showDoneTasks") == true) {
		Session.set("showDoneTasks", false);
		console.log(Session.get("showDoneTasks"));
	}
	else if (Session.get("showDoneTasks") == false){
		 Session.set("showDoneTasks", true);
		 console.log(Session.get("showDoneTasks"));

	}
},
'dblclick #spanIdOnDom': function (evt, tmpl) {
    Session.set('editing_itemname', this._id);
		//console.log(Session.get("editing_itemname"));
		//alert(Session.get("editing_itemname"));
    Deps.flush(); // update DOM before focus
    activateInput(tmpl.find("#todo-input"));
  },
	'keypress #todo-input': function(e, template) {
    //e.preventDefault();
    if (e.which === 13) {
      var url2 = template.find("#todo-input").value;

      Tasks.update(this._id, {$set: {textTask: url2}});
      Session.set('editing_itemname', null);
		}
    },
		'focusout #todo-input': function(e, template) {
    //e.preventDefault();

      var url2 = template.find("#todo-input").value;

      Tasks.update(this._id, {$set: {textTask: url2}});
      Session.set('editing_itemname', null);

    },

});
