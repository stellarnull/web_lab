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
	"database": "dump"
});
connection.connect();

var port = 3000;
var app = express();
//app.use(express.static(__dirname + "/client"));
http.createServer(app).listen(port);


//clients requests todos
//?q=select * from ToDoList
app.get("/", function (req, res) 
{
	//var url_parts = url.parse(req.url, true);
	//var query = url_parts.query;
	var query = "select * from ToDoList";
	console.log(query);

	var t = "Retrieved from database: ";

	// Execute query
	connection.query(query, function(e, rows) 
	{
		if (e) 
		{
			throw e;
		} 
		else 
		{
			t += JSON.stringify(rows);
		}
		t += "\n";
	});
	console.log("todos requested!");
	res.write(t);
});

// Notify that the server is now running
console.log('Server running at ' + port);