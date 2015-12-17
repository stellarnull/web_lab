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
app.use(express.static(__dirname + "/client"));
http.createServer(app).listen(port);

//var t;


//clients requests todos
//?q=select * from ToDoList
app.get("/todos", function (req, res) 
{	
	q = "select * from ToDoItem;";
	console.log(q);

	//t = "Retrieved from database: ";
	
	console.log("todos requested!");
	// Execute query
	connection.query(q, function(e, rows) 
	{
		if (e) 
		{
			throw e;
		} 
		else 
		{
			//console.log(rows);
			var s = JSON.stringify(rows);
				var obj=JSON.parse(s);
				var queryans=[];
				console.log("LENGTH="+obj.length);
				for(var i=0;i<=obj.length-1;i++)
				{
					
						var qu={};
						qu.id=obj[i].Id;
						qu.task=obj[i].Text;
						qu.pri=obj[i].Priority.toString();
						var str=JSON.stringify(obj[i].DueDate);
						var yy=str.substring(3,5);
						var mm=str.substring(6,8);
						var dd=str.substring(9,11);
						qu.due=yy+mm+dd;
						qu.done=obj[i].Completed===1? "Done":"Unfinished";
						console.log(qu);
						queryans.push(qu);
				}
		}
		res.json(queryans);
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
	var due=query.due;
	var yy=due.substring(0,2);
	var mm=due.substring(2,4);
	var dd=due.substring(4,6);
	var DueDate='20'+yy+'-'+mm+'-'+dd+' 05:00:00';
	var q = "INSERT INTO ToDoItem(text, Priority, DueDate) VALUES ('"+task+"', "+pri+",'"+DueDate+"');";
	console.log(q);

	t = "Retrieved from database: ";

	
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
		res.json(t);
		res.end();
	});
});


//done?id=0
app.get("/done", function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	console.log(query);
	var id = query.id;
	//var task = query.task;
	//var pri = query.pri;
	var q = "update ToDoItem set Completed=1 where Id="+id+";";
	//console.log(q);
	t = "Retrieved from database: ";
	
	//console.log("todos updated!");
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
		res.json(t);
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
	//t = "Retrieved from database: ";
	
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
			console.log(rows);
			var s = JSON.stringify(rows);
			//t += s;
		}
		//t += "\n";
		res.json(s);
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
	t = "Retrieved from database: ";
	
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
		res.json(t);
		res.end();
	});
});

//2.1
//input:userId
//todo_user?id=1
app.get("/todo_user", function (req, res) 
{
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var id = query.id;
	var q = "SELECT * FROM ToDoList WHERE OWNER="+id+";";
	console.log(q);
	t = "Retrieved from database: ";

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
		res.json(t);
		res.end();
	});
});

//2.2
//input:ToDoListId
//todo_todolist?id=1
app.get("/todo_todolist", function (req, res) 
{
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var id = query.id;
	var q = "SELECT * FROM ToDoItem WHERE ToDoListId="+id+";";
	console.log(q);
	t = "Retrieved from database: ";

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
		res.json(t);
		res.end();
	});
});


//2.3
//input:ToDoListId,start,num
//todo_ll?id=1&start=5&num=3
app.get("/todo_ll", function (req, res) 
{
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var id = query.id;
	var start = query.start;
	var num = query.num;
	var q = "SELECT * FROM ToDoItem WHERE ToDoListId="+id+" LIMIT "+start+","+num+";";
	console.log(q);
	t = "Retrieved from database: ";

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
		res.json(t);
		res.end();
	});
});

//2.4
//input:ToDoListId,c,pri
//todo_lcp?id=1&c=5&pri=3
app.get("/todo_lcp", function (req, res) 
{
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var id = query.id;
	var c = query.c;
	var pri = query.pri;
	var q = "SELECT * FROM ToDoItem WHERE ToDoListId="+id+" AND Completed="+c+" and Priority="+pri+";";
	console.log(q);
	t = "Retrieved from database: ";

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
		res.json(t);
		res.end();
	});
});

//2.5
//input:parentToDo
//todo_p?par=1
app.get("/todo_p", function (req, res) 
{
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var par = query.par;
	var q = "select * from ToDoItem where ParentToDo="+par+";";
	console.log(q);
	t = "Retrieved from database: ";

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
		res.json(t);
		res.end();
	});
});

//2.6
//input:todoitemid
//todo_tt?id=1
app.get("/todo_tt", function (req, res) 
{
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var id = query.id;
	var q = "select ToDoId,Title,TagId,Tag.Text from Tag inner join ItemTag on ItemTag.TagId=Tag.Id inner join ToDoItem on ToDoId=ToDoItem.id  where ToDoItem.Id="+id+";";
	console.log(q);
	t = "Retrieved from database: ";

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
		res.json(t);
		res.end();
	});
});

//2.7
//input:tagid
//todo_t?id=1
app.get("/todo_t", function (req, res) 
{
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var id = query.id;
	var q = "select distinct L.* from ToDoList as L inner join ToDoItem as I on L.Id=I.ToDoListID inner join ItemTag as IT on I.Id=IT.ToDoId where IT.TagId="+id+";";
	console.log(q);
	t = "Retrieved from database: ";

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
		res.json(t);
		res.end();
	});
});

//2.8
//input:
//todo_ct?
app.get("/todo_ct", function (req, res) 
{
	var q = "select T.id,T.Text,ToDoItem.Completed,count(*) from Tag as T, ToDoItem,ItemTag where ToDoItem.Id=ItemTag.ToDoId and ItemTag.TagId=T.Id group by T.Id,ToDoItem.Completed;";
	console.log(q);
	t = "Retrieved from database: ";

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
		res.json(t);
		res.end();
	});
});

//2.9
//input:
//todo_w?
app.get("/todo_w", function (req, res) 
{
	var q = "select week(CompletionDate), count(*) from ToDoItem group by week(CompletionDate);";
	console.log(q);
	t = "Retrieved from database: ";

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
		res.json(t);
		res.end();
	});
});

//2.10
//input:
//todo_q?id=1
app.get("/todo_q", function (req, res) 
{
	var q = "select TI.Id,TI.Title,CompletionDate,CreationDate, CompletionDate-CreationDate as time from Tag as T, ToDoItem as TI ,ItemTag as IT  where TI.Id=IT.ToDoId and IT.TagId=T.Id AND T.Id=1 AND CompletionDate-CreationDate>0  order by time asc limit 10;";
	console.log(q);
	t = "Retrieved from database: ";

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
		res.json(t);
		res.end();
	});
});

//2.11
//input:id1 id2
//todo_11?id1=1&id2=3
app.get("/todo_11", function (req, res) 
{
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var id1 = query.id1;
	var id2 = query.id2;
	var q = "select COUNT(*) from ItemTag as a1 join ItemTag as a2 on a1.ToDoId = a2.ToDoId and a1.TagId="+id1+" and a2.TagId="+id2+";";
	console.log(q);
	t = "Retrieved from database: ";

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
		res.json(t);
		res.end();
	});
});

//2.12
//input:todolistid
//todo_12?id=1
app.get("/todo_12", function (req, res) 
{
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var id = query.id;
	var q = "SELECT AVG(CompletionDate-CreationDate) FROM ToDoItem WHERE ToDoListId="+id+" AND (CompletionDate-CreationDate)>0;";
	console.log(q);
	t = "Retrieved from database: ";

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
		res.json(t);
		res.end();
	});
});

//2.13
//input:todolistid
//todo_13?id=1
app.get("/todo_13", function (req, res) 
{
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var id = query.id;
	var q = "SELECT Id,Title FROM ToDoItem WHERE ToDoListId="+id+" AND CompletionDate-CreationDate >(SELECT AVG(CompletionDate-CreationDate) FROM ToDoItem WHERE ToDoListId="+id+" AND (CompletionDate-CreationDate)>0); ";
	console.log(q);
	
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
			var obj=JSON.parse(s);
			var queryans=[];
			console.log("LENGTH="+obj.length);
			for(var i=0;i<=obj.length-1;i++)
			{
						
				var qu={};
				qu.id=obj[i].Id;
				qu.task=obj[i].Title;
				console.log(qu);
				queryans.push(qu);
			}
		}
		res.json(queryans);
		res.end();
	});
});


// Notify that the server is now running
console.log('Server running at ' + port);