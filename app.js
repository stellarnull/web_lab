var i;
function list(task,due,priority,done){
	
	this.task=task;
	this.priority=priority;
	this.due=due;
	this.done=done;
}
list.prototype.settask=function(t){this.task=t;};
list.prototype.setpriority=function(t){this.priority=t;};
list.prototype.setdue=function(t){this.due=t;};
//list.prototype.setdone=function(t){this.done=t;};
list.prototype.gettask=function(){return this.task;};
list.prototype.getpriority=function(){return this.priority;};
list.prototype.getdue=function(){return this.due;};
//list.prototype.getdone=function(){return this.done;};
list.prototype.getAList=function(){return "Task:"+this.task+"\t"+"Due:"+
this.due+"\t"+"Priority:"+this.priority;};
list.prototype.get

function updateDone(){
	var me =this;
	console.log(me);
	var DoneID=this.id.replace("cb_","");
	var targetspan=document.getElementById("sp_"+DoneID);
	console.log("sp_"+DoneID);
	targetspan.innerText="DONE!";
	newlist[DoneID].done="DONE!";
	console.log(newlist[DoneID].task);
}

function updateDelete(){
	var me =this;
	var j;
	console.log(me);
	var DeleteID=this.id.replace("db_","");
	var targetList=document.getElementById("todo"+DeleteID);
	console.log("DeleteID:"+DeleteID);
	$(targetList).remove();
	console.log(i);
	for(j=DeleteID+1;j<i;j++)
	{
		newlist[j]=newlist[j+1];
		console.log(targetList.task);
		console.log(document.getElementById("db_"+DeleteID).id);
		document.getElementById("todo"+j).id="todo"+j-1;
		document.getElementById("sp_"+DeleteID).id="sp_"+j-1;
		document.getElementById("db_"+DeleteID).id="db_"+j-1;
		document.getElementById("cb_"+DeleteID).id="cb_"+j-1;
	}
	i--;
}

var sort=function(){
	for(var j=0;j<i;j++)
	{
		;
	}
};

var newlist=Array();
var main=function(){
	"use strict";
	i=0;
console.log("hello world!");
	
//this function is for adding new item to the list
var addCommentFromInputBox = function () {		
		console.log("New todo created!");
		var List = document.getElementById("todolist");
		var new_TODO=document.createElement("li");
		var span=document.createElement("span");
			span.id="sp_"+i;
			new_TODO.id="todo"+i;
		 newlist[i]=new list($("#task").val(), $("#due").val(), 
			$("#priority").val(),"Unfinished");
		var Donebox=document.createElement("input");
			Donebox.type="checkbox";
			Donebox.onclick=updateDone;
			Donebox.id="cb_"+i;
		var Deletebutton=document.createElement("input");
			Deletebutton.type="button";
			Deletebutton.Text="Delete!";
			Deletebutton.onclick=updateDelete;
			Deletebutton.id="db_"+i;
			//to ensure only valid input are typed
		if ($("#task").val()===""||$("#due").val()===""||!($("#priority").val()==='1'||$("#priority").val()==='2'||$("#priority").val()==='3')) 
			window.alert("invalid input!");
		else{console.log("it's fine!");
		span.innerText=newlist[i].getAList();
		new_TODO.appendChild(span);
		new_TODO.appendChild(Donebox);
		new_TODO.appendChild(Deletebutton);
		List.appendChild(new_TODO);
		//var setDoneButton= $('<button id="DoneB"+i>Unfinished</button>');
		//$(".TODOs").append(newlist.Donebox);
		//var DeleteButton= $('<button id="DeleteB"+i>Delete</button>');
		//$(".TODOs").append(newlist.Deletebutton);
		$("#task").val("");$("#due").val("");
		$("#priority").val("");
		console.log(i);
		i=i+1;
	}
	};

//Either Enter or click the button will trigger the addCommentFromTnputBox() function
$(".TODO-input button").on("click",function (event){
	addCommentFromInputBox();
});
$(".TODO-input input").on("keypress", function (event) {
if (event.keyCode === 13) {addCommentFromInputBox();}
});
};
$(document).ready(main);



