/* global __dirname */
//Stellar_Null/academic31/Web\ and\ Database\ Technology/lab/web_lab
var express = require("express");
var url = require("url");
var http = require("http");

// Connect to database
var mysql = require("mysql");
var connection = mysql.createConnection({
	"hostname": "localhost",
	"user": "root",
	"password": "webdata",
	"database": "todo"
});
connection.connect();

var port = 3000;
var app = express();
//app.use(express.static(__dirname + "/client"));
http.createServer(app).listen(port);


//clients requests todos
//?q=select * from ToDoList
app.get("/todos", function (req, res) 
{
	var query = "select * from ToDoItem";
	//console.log(query.q);

	var t = "Retrieved from database: ";
	
	console.log("todos requested!");
	// Execute query
	connection.query(query, function(e, rows) 
	{
		if (e) 
		{
			throw e;
		} 
		else 
		{
			var s = JSON.stringify(rows);
			t += s;
		}
		t += "\n";
		res.write(t);
		res.end();
	});
});

//addtodo?task=maths&pri=3&due=123
app.get("/addtodo", function (req, res) 
{
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var task = query.task;
	var pri = query.pri;
	var q = "INSERT INTO ToDoItem(text, Priority) VALUES ('"+task+"', "+pri+");";
	console.log(q);
	var t = "Retrieved from database: ";
	
	console.log("todos added!");
	// Execute query
	connection.query(q, function(e, rows) 
	{
		if (e) 
		{
			throw e;
		} 
		else 
		{
			var s = JSON.stringify(rows);
			t += s;
		}
		t += "\n";
		res.write(t);
		res.end();
	});
});

//detodo?id=30
app.get("/detodo", function (req, res) 
{
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var id = query.id;
	var q = "DELETE FROM ToDoItem where Id="+id+";";
	console.log(q);
	var t = "Retrieved from database: ";
	
	console.log("todos deleted!");
	// Execute query
	connection.query(q, function(e, rows) 
	{
		if (e) 
		{
			throw e;
		} 
		else 
		{
			var s = JSON.stringify(rows);
			t += s;
		}
		t += "\n";
		res.write(t);
		res.end();
	});
});

//uptodo?id=1&task=maths&pri=3&due=123
app.get("/uptodo", function (req, res) 
{
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var id = query.id;
	var task = query.task;
	var pri = query.pri;
	var q = "update ToDoItem set text='"+task+"',Priority="+pri+" where Id="+id+";";
	console.log(q);
	var t = "Retrieved from database: ";
	
	console.log("todos updated!");
	// Execute query
	connection.query(q, function(e, rows) 
	{
		if (e) 
		{
			throw e;
		} 
		else 
		{
			var s = JSON.stringify(rows);
			t += s;
		}
		t += "\n";
		res.write(t);
		res.end();
	});
});

// Notify that the server is now running
console.log('Server running at ' + port);