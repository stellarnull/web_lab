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
app.use(express.static(__dirname + "/dash"));
http.createServer(app).listen(port);

var glo_sto;;

app.get("/home", function (req, res) 
{
	console.log("retreive global storage");
	res.json(glo_sto);
});


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
			for(var i=0;i<=obj.length-1;i++)
			{
				
					var qu={};
					qu.id=obj[i].Id;
					qu.task=obj[i].Text;
					qu.pri=obj[i].Priority;
					qu.due=obj[i].DueDate;
					qu.done=obj[i].Completed===1? "Done":"Unfinished";
					queryans.push(qu);
					
			}
			glo_sto = queryans;
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
	var q = "INSERT INTO ToDoItem(text, Priority) VALUES ('"+task+"', "+pri+");";
	console.log(q);

	
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
		}
		res.json(s);
		res.end();
	});
});


//done?id=0
app.get("/done", function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var id = query.id;
	var q = "update ToDoItem set Completed=1 where Id="+id+";";
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
		}
		res.json(s);
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
		}
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
		}
		res.json(s);
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
			for(var i=0;i<=obj.length-1;i++)
			{
						
				var qu={};
				
				qu.Id=obj[i].Id;
				qu.Name=obj[i].Name;
				queryans.push(qu);	
			}
			glo_sto = queryans;
		}
		res.json(queryans);
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
			for(var i=0;i<=obj.length-1;i++)
			{
						
				var qu={};
				
				qu.Id=obj[i].Id;
				qu.Title=obj[i].Title;
				queryans.push(qu);	
			}
			glo_sto = queryans;
		}
		res.json(queryans);
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
			for(var i=0;i<=obj.length-1;i++)
			{
						
				var qu={};
				
				qu.Id=obj[i].Id;
				qu.Title=obj[i].Title;
				queryans.push(qu);	
			}
			glo_sto = queryans;
		}
		res.json(queryans);
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
			for(var i=0;i<=obj.length-1;i++)
			{
						
				var qu={};
				
				qu.Id=obj[i].Id;
				qu.Title=obj[i].Title;
				queryans.push(qu);	
			}
			glo_sto = queryans;
		}
		res.json(queryans);
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
			for(var i=0;i<=obj.length-1;i++)
			{
						
				var qu={};
				
				qu.Id=obj[i].Id;
				qu.Title=obj[i].Title;
				queryans.push(qu);	
			}
			glo_sto = queryans;
		}
		res.json(queryans);
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
	var q = "select Title as task,Tag.Text as tag from Tag inner join ItemTag on ItemTag.TagId=Tag.Id inner join ToDoItem on ToDoId=ToDoItem.id  where ToDoItem.Id="+id+";";
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
			for(var i=0;i<=obj.length-1;i++)
			{
						
				var qu={};
				
				qu.task=obj[i].task;
				qu.tag=obj[i].tag;
				queryans.push(qu);	
			}
			glo_sto = queryans;
		}
		res.json(queryans);
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
	var q = "select distinct L.* as item from ToDoList as L inner join ToDoItem as I on L.Id=I.ToDoListID inner join ItemTag as IT on I.Id=IT.ToDoId where IT.TagId="+id+";";
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
			for(var i=0;i<=obj.length-1;i++)
			{
						
				var qu={};
				
				qu.item=obj[i].item;
				queryans.push(qu);	
			}
			glo_sto = queryans;
		}
		res.json(queryans);
		res.end();
	});
});

//2.8
//input:
//todo_ct
app.get("/todo_ct", function (req, res) 
{
	var q = "select T.Text as tag ,ToDoItem.Completed as completion,count(*) as num from Tag as T, ToDoItem,ItemTag where ToDoItem.Id=ItemTag.ToDoId and ItemTag.TagId=T.Id group by T.Id,ToDoItem.Completed;";
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
			for(var i=0;i<=obj.length-1;i++)
			{
						
				var qu={};
				
				qu.tag=obj[i].tag;
				qu.completion=obj[i].completion;
				qu.num=obj[i].num;
				queryans.push(qu);	
			}
			glo_sto = queryans;
		}
		res.json(queryans);
		res.end();
	});
});

//2.9
//input:
//todo_w
app.get("/todo_w", function (req, res) 
{
	var q = "select week(CompletionDate) as week, count(*) as num from ToDoItem where week(CompletionDate) is not null group by week(CompletionDate);";
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
			for(var i=0;i<=obj.length-1;i++)
			{
						
				var qu={};
				
				qu.week=obj[i].week;
				qu.num=obj[i].num;
				queryans.push(qu);	
			}
			glo_sto = queryans;
		}
		res.json(queryans);
		res.end();
	});
});

//2.10
//input:
//todo_q?id=1
app.get("/todo_q", function (req, res) 
{
	var q = "select TI.Id as id,TI.Title as task,CompletionDate-CreationDate as time from Tag as T, ToDoItem as TI ,ItemTag as IT  where TI.Id=IT.ToDoId and IT.TagId=T.Id AND T.Id=1 AND CompletionDate-CreationDate>0  order by time asc limit 10;";
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
			for(var i=0;i<=obj.length-1;i++)
			{
						
				var qu={};
				
				qu.id=obj[i].id;
				qu.task=obj[i].task;
				qu.time=obj[i].time;
				queryans.push(qu);	
			}
			glo_sto = queryans;
		}
		res.json(queryans);
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
	var q = "select COUNT(*) as num from ItemTag as a1 join ItemTag as a2 on a1.ToDoId = a2.ToDoId and a1.TagId="+id1+" and a2.TagId="+id2+";";
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
			var obj=JSON.parse(s);
			var queryans=[];
			for(var i=0;i<=obj.length-1;i++)
			{
						
				var qu={};
				qu.num=obj[i].num;
				queryans.push(qu);	
			}
			glo_sto = queryans;
		}
		res.json(queryans);
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
	var q = "SELECT AVG(CompletionDate-CreationDate) as avgTime FROM ToDoItem WHERE ToDoListId="+id+" AND (CompletionDate-CreationDate)>0;";
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
			for(var i=0;i<=obj.length-1;i++)
			{
						
				var qu={};
				qu.avgTime=obj[i].avgTime;
				queryans.push(qu);	
			}
			glo_sto = queryans;
		}
		res.json(queryans);
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
			for(var i=0;i<=obj.length-1;i++)
			{
						
				var qu={};
				qu.id=obj[i].Id;
				qu.task=obj[i].Title;
				queryans.push(qu);
				
			}
			glo_sto = queryans;
		}
		res.json(queryans);
		res.end("retreived!");
	});
});


// Notify that the server is now running
console.log('Server running at ' + port);