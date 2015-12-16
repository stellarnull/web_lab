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

function updateDone(){
	var me =this;
	console.log(me);
	

	//find the line whose checkbox is checked
	var DoneID=this.id.replace("cb_","");

	//find the corresponding sp_ID
	var targetspan=document.getElementById("sp_"+DoneID);
	console.log("sp_"+DoneID);

	//done
	document.getElementById("todo"+DoneID).className = "done";
	newlist[DoneID].done="DONE!";
	console.log(newlist[DoneID].task);
}

function updateDelete(){
	var me = this;
	var j;
	console.log(me);
	var DeleteID = this.id.replace("db_","");
	var targetList = document.getElementById("todo"+DeleteID);
	console.log("DeleteID:"+DeleteID);
	$(targetList).remove();
	console.log(i);
	number=number-1;
	//for (j = DeleteID + 1; j < i; j++)
	//{
	//	newlist[j] = newlist[j+1];
	//	console.log(targetList.task);
	//	console.log(document.getElementById("db_"+DeleteID).id);
	//	document.getElementById("todo"+j).id="todo"+j-1;
	//	document.getElementById("sp_"+DeleteID).id="sp_"+j-1;
	//	document.getElementById("db_"+DeleteID).id="db_"+j-1;
	//	document.getElementById("cb_"+DeleteID).id="cb_"+j-1;
	//}
	//i;
}


//for sorting all data according to due date
var sort=function(new_TODO,i){//new_TODO is the item, i is its index
	var j;
	var p=document.getElementById("todolist").firstChild.nextSibling;
	//the second child(.firstChild.nextSibling)is the first TODO item in the list
	//(我也不知道为啥我是试出来的)
	console.log(p);
	for(j=0;j<number;j++,p=p.nextSibling)
	//从头开始遍历所有item,按照日期找到第一个比他日期大的，插到他前面
	{
		var index=p.id.replace("todo","")
		if(newlist[i].due<newlist[index].due)
		{
			document.getElementById("todolist").insertBefore(new_TODO,p);
			break;
		}
	}
if(j==number) document.getElementById("todolist").appendChild(new_TODO);
};//找不到就插到最后

function updateEdit(){//用来改变其中一个条目
	var me = this;
	var j;
	console.log(me);
	var EditID = this.id.replace("ed_","");
	var targetList = document.getElementById("todo"+EditID);
	console.log("EditID:"+EditID);
	if ($("#task").val()===""||$("#due").val()===""
		||!($("#priority").val()==='1'
		||$("#priority").val()==='2'
		||$("#priority").val()==='3')) 
		{
			console.log("invalid input!");
			window.alert("invalid input!");
		}//以上格式控制等内容和增加新条目是几乎一样的
	else
	{
		newlist[EditID].task= $("#task").val();
		newlist[EditID].due= $("#due").val();
		newlist[EditID].priority= $("#priority").val();
		console.log(targetList.firstChild)
		targetList.firstChild.innerText=newlist[EditID].getAList();
		sort(targetList,EditID);

		$("#task").val("");
		$("#due").val("");
		$("#priority").val("");
	}//以上进行赋值，排序和增加新条目函数也是一样的，但是由于这个函数被
	//增加新条目的函数调用了，所以不可以相互调用就只能复制部分相关代码
}

var newlist=Array();
var main=function()
{
	"use strict";
	i=0;
	number=0;
	console.log("hello world!");
	
	var addTodosToList = function (todos) {
		console.log("Loading todos from server");
		var todolist = document.getElementById("todolist");
		for (var key in todos) {
			var li = document.createElement("li");
			li.innerHTML = "TODO: " + todos[key].task;
			todolist.appendChild(li);
		}
	};

	//this function is for adding new item to the list
	var addCommentFromInputBox = function () 
	{		
		//find todolist tag
		var List = document.getElementById("todolist");

		//add a item
		var new_TODO=document.createElement("li");
		var span=document.createElement("span");
		span.id="sp_"+i;
		new_TODO.id="todo"+i;

		//create content
		newlist[i]=new listItem($("#task").val(), $("#due").val(), $("#priority").val(),"Unfinished");

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

		var Editbutton=document.createElement("input");
		Editbutton.type="button";
		Editbutton.Text="Edit!";
		Editbutton.onclick=updateEdit;
		Editbutton.id="ed_"+i;//增加了一个用来Edit的按钮，在最后

		//to ensure only valid input are typed
		var task = $("#task").val();
		var due = $("#due").val();
		var pri = $("#priority").val();

		function invalidInput()
		{
			console.log("invalid input!");
			window.alert("invalid input!");
		}

		if (task===""||due.length!==6||pri!=='1'&&pri!=='2'&&pri!=='3')
		{
			invalidInput();
		}
		else
		{
			var yy = parseInt(due.substring(0, 2));
			var mm = parseInt(due.substring(2, 4));
			var dd = parseInt(due.substring(4, 6));

			if (mm<1||mm>12||dd<1||dd>31)
			{
				invalidInput();
			}
			else
			{
				console.log("New todo created!");
				span.innerText=newlist[i].getAList();

				//add the new item
				new_TODO.appendChild(span);
				new_TODO.appendChild(Donebox);
				new_TODO.appendChild(Deletebutton);
				new_TODO.appendChild(Editbutton);
				if(number===0)
				List.appendChild(new_TODO);
				else
				sort(new_TODO,i);//put the ith item in the right place
				//var setDoneButton= $('<button id="DoneB"+i>Unfinished</button>');
				//$(".TODOs").append(newlist.Donebox);
				//var DeleteButton= $('<button id="DeleteB"+i>Delete</button>');
				//$(".TODOs").append(newlist.Deletebutton);
				
				if (due < 151208)
				{
					$("#sp_"+i).addClass("overdue");
				}

				if (pri==='1')
				{
					$("#sp_"+i).addClass("pri_1");
				}
				else if (pri==='2')
				{
					$("#sp_"+i).addClass("pri_2");
				}
				else
				{
					$("#sp_"+i).addClass("pri_3");
				}

				$("#task").val("");
				$("#due").val("");
				$("#priority").val("");
				console.log("todoNum"+i);

				//increment counter
				i = i + 1;
				number=number+1;
			}
		}

		$.getJSON("../todos", addTodosToList)
			.error(function (jqXHR, textStatus, errorThrown) 
			{
				console.log("error " + textStatus);
				console.log("incoming Text " + jqXHR.responseText);
			});

		//$.getJSON("../todos", addTodosToList);
		setInterval(function () 
		{
	        console.log("Fetching the todo list from the server.");
	        $.getJSON("../todos", addTodosToList);
		}, 2000);
		
	};

	//Either Enter or click the button will trigger the addCommentFromTnputBox() function
	$(".TODO-input button").on("click", function (event)
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
};

$(document).ready(main);



