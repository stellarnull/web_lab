/* global __dirname */
//Stellar_Null/academic31/Web\ and\ Database\ Technology/lab/web_lab
var express = require("express");
var url = require("url");
var http = require("http");

var port = 3000;
var app = express();
app.use(express.static(__dirname + "/client"));
http.createServer(app).listen(port);

var todos = [];
var t1 = { task : "homework", pri: '1', due : "121212", done: "Unfinished"};
var t2 = { task : "English homework due", pri : '3', due : "111111", done: "Done"};
todos.push(t1);
todos.push(t2);

//clients requests todos
app.get("/todos", function (req, res) {
	console.log("todos requested!");
	res.json(todos);
});

<<<<<<< HEAD


//addtodo?task=maths&pri=3&due=123
=======
//addtodo?task=maths&pri=3&due=123&done=done
>>>>>>> origin/master
app.get("/addtodo", function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	console.log(query);
	
	if(query["task"]!==undefined) {
		var tx = { task : query["task"], 
			pri: query["pri"],
			due: query["due"],
			done: query["done"]
		};
		todos.push(tx);
		console.log("Added " + tx.task);
		res.end("Todo added successfully");
	}
	else {
		res.end("Error: missing task parameter");
	}
});

//done?id=0
app.get("/done", function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var flag=0;
	console.log(query);
	
	if(query["id"]!==undefined) 
	{
	var i = query["id"];
		if (query["id"]<todos.length)
		{
			console.log("setdone " + todos[i].task);
			todos[i].done="Done";
			res.end("Todo set done successfully");
		}
		else
		{
			res.end("No such todo");
		}
	}
		else {
		res.end("Error: missing id parameter");
	}
});

//detodo?id=0
app.get("/detodo", function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var flag = 0;

	if(query["id"]!==undefined) 
	{
		var i = query["id"];
		if (query["id"]<todos.length)
		{
			console.log("Deleted " + todos[i].task);
			todos.splice(i, 1);
			res.end("Todo deleted successfully");
		}
		else
		{
			res.end("No such todo");
		}
		
	}
	else {
		res.end("Error: missing id parameter");
	}
});

//uptodo?id=0&task=maths&pri=3&due=123&done=done;
app.get("/uptodo", function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var flag = 0;

	if(query["id"]!==undefined) 
	{
		var i = query["id"];
		if (query["id"]<todos.length)
		{
			var temp = todos[i];
			todos[i].task = query["task"];
			todos[i].pri = query["pri"];
			todos[i].due = query["due"];
			todos[i].done: query["done"];
			console.log("Updated " + todos[i].task + " to " + temp.task);
			res.end("Todo updated successfully");
		}
		else
		{
			res.end("No such todo");
		}
		
	}
	else {
		res.end("Error: missing id parameter");
	}
});