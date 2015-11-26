function list(index,task,due,priority,done){
	
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
//list.prototype.get


function sort(List){
	var j,k
	for(j=1;j<i;j++)
	{
		for(k=1;k<i-j;k++)
		{
			if(getElementById("todo_"+j).p){;}
		}
	}
}

function updateDone(){
	var me =this;
	console.log(me);

	//find the line whose checkbox is checked
	var DoneID=this.id.replace("cb_","");

	//find the corresponding sp_ID
	var targetspan=document.getElementById("sp_"+DoneID);
	console.log("sp_"+DoneID);

	//done
	targetspan.innerText="DONE!";
}



function updateDelete(){
	var me =this;
	console.log(me);
	var DeleteID=this.id.replace("db_","");
	var targetList=document.getElementById("todo"+DeleteID);
	console.log("todo_"+DeleteID);
	$(targetList).remove();
}

var main=function(){
	"use strict";
	var i=1;
	console.log("hello world!");

	/*add button clicked*/
	$(".TODO-input button").on("click",function (event){
		console.log("New todo created!");

		//find todolist tag
		var List = document.getElementById("todolist");

		//add a item
		var new_TODO=document.createElement("li");
		var span=document.createElement("span");
			span.id="sp_"+i;
			new_TODO.id="todo"+i;

		//create content
		var newlist=new list(i,$("#task").val(), $("#due").val(), 
			$("#priority").val(),"Unfinished");

		//declare buttons
		var Donebox=document.createElement("input");
			Donebox.type="checkbox";
			Donebox.onclick=updateDone;
			Donebox.id="cb_"+i;
		var Deletebutton=document.createElement("input");
			Deletebutton.type="button";
			Deletebutton.Text="Delete!";
			Deletebutton.onclick=updateDelete;
			Deletebutton.id="db_"+i;

		//check for empty task
		if ($("#task").val()==="") window.alert("invalid input!");
		else
		{
			console.log("it's fine!");
			span.innerText=newlist.getAList();

			//add the new item
			new_TODO.appendChild(span);
			new_TODO.appendChild(Donebox);
			new_TODO.appendChild(Deletebutton);

			//append the new utem to the existing list
			List.appendChild(new_TODO);

			//var setDoneButton= $('<button id="DoneB"+i>Unfinished</button>');
			//$(".TODOs").append(newlist.Donebox);
			//var DeleteButton= $('<button id="DeleteB"+i>Delete</button>');
			//$(".TODOs").append(newlist.Deletebutton);
			$("#task").val("Task");$("#due").val("yymmdd");
			$("#priority").val("Priority:1-3");

			//increment counter
			i=i+1;
		}
	});

	$("#DoneB").on("click",function (event){
		var setDone = $('<p>Done</p>');
		$('.vacation').append(setDone);
		$(".TODOs").remove();
	});
};
$(document).ready(main);


