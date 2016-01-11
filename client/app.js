var i; //global counter
var number//the number of items currently
function listItem(task,due,priority,done){
	
	this.task=task;
	this.priority=priority;
	this.due=due;
	this.done=done;
}
listItem.prototype.settask=function(t){this.task=t;};
listItem.prototype.setpriority=function(t){this.priority=t;};
listItem.prototype.setdue=function(t){this.due=t;};
//listItem.prototype.setdone=function(t){this.done=t;};
listItem.prototype.gettask=function(){return this.task;};
listItem.prototype.getpriority=function(){return this.priority;};
listItem.prototype.getdue=function(){return this.due;};
//listItem.prototype.getdone=function(){return this.done;};
listItem.prototype.getAList=function(){return "Task:"+this.task+"\t"+"Due:"+
this.due+"\t"+"Priority:"+this.priority;};
listItem.prototype.get



var newlist=Array();
var main=function()
{
	"use strict";
	i=0;
	number=0;
	console.log("hello world!");
	
	var addTodosToList = function (todos) {
		//console.log("Loading todos from server");
		var todolist = document.getElementById("todolist");
		$("#todolist").empty();
		for (var key in todos) {
			addCommentFromInputBox(todos[key], key);

		}

		number=todos.length;
	};
/*
	$.getJSON("../todos", addTodosToList)
			.error(function (jqXHR, textStatus, errorThrown) 
			{
				console.log("error " + textStatus);
				console.log("incoming Text " + jqXHR.responseText);
			});

		//$.getJSON("../todos", addTodosToList);
	setInterval(function () 
	{
        $.getJSON("../todos", addTodosToList)
		.error(function (jqXHR, textStatus, errorThrown) 
		{
			console.log("error " + textStatus);
			console.log("incoming Text " + jqXHR.responseText);
		});
	}, 2000);
*/
	//this function is for adding new item to the list
	var addCommentFromInputBox = function (Atodo, i) 
	{		
		console.log(Atodo.task+" "+Atodo.due+" "+Atodo.pri);
		//find todolist tag
		var List = document.getElementById("todolist");

		//add a item
		var new_TODO=document.createElement("li");
		var span=document.createElement("span");
		span.id="sp_"+i;
		new_TODO.id="todo"+i;

		//create content
		//newlist[i]=new listItem($(".task").val(), $(".due").val(), $(".priority").val(),"Unfinished");

	
			
		//console.log("New todo created!");
		span.innerHTML=Atodo.id+"\tTask:"+Atodo.task+ "\tDue:"+Atodo.due + "\tPriority:"+Atodo.pri;

		//add the new item
		new_TODO.appendChild(span);
		List.appendChild(new_TODO);
		
		
		if (Atodo.due < 160112)//should get the current date instead
		{
			$("#sp_"+i).addClass("overdue");
		}
		if (Atodo.done ==="Done")
		{
			$("#sp_"+i).addClass("done");
		}
		if (Atodo.pri==='1')
		{
			$("#sp_"+i).addClass("pri_1");
		}
		else if (Atodo.pri==='2')
		{
			$("#sp_"+i).addClass("pri_2");
		}
		else
		{
			$("#sp_"+i).addClass("pri_3");
		}

		console.log("todoNum"+i);


	
		
	};

	//Either Enter or click the button will trigger the addCommentFromTnputBox() function
	$("#addnew").on("click", function (event)
	{
		addCommentFromInputBox();
	});

	$(".TODO-input input").on("keypress", function (event) 
	{
		if (event.keyCode === 13) 
		{
			addCommentFromInputBox();
		}
	});


	// Make cookie
	$(".RandomColor").on("click", function () {
	console.log("RandomColor cliked");
		$.removeCookie("color");
		var color_new = getRandomColor();
		$.cookie("color", color_new, {expires: new Date(2017,10,10)});
		console.log($.cookie("color"));

		//COOKIE CHANGE COLOR
		$(".body").css({"color": $.cookie("color")});
	});
};









function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


$(document).ready(main);