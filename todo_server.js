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
var t1 = { task : "homework", pri: 1, due : "121212"};
var t2 = { task : "English homework due", pri : 3, due : "111111"};
todos.push(t1);
todos.push(t2);

//clients requests todos
app.get("/todos", function (req, res) {
	console.log("todos requested!");
	res.json(todos);
});

//addtodo?task=maths&pri=3&due=123
app.get("/addtodo", function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	console.log(query);
	
	if(query["task"]!==undefined) {
		var tx = { task : query["task"], 
			pri: query["pri"],
			due: query["due"]
		};
		todos.push(tx);
		console.log("Added " + tx.task);
		res.end("Todo added successfully");
	}
	else {
		res.end("Error: missing task parameter");
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
			todos.splice(i);
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

//uptodo?id=0&task=maths&pri=3&due=123
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