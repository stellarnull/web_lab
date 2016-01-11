/* global __dirname */
//Stellar_Null/academic31/Web\ and\ Database\ Technology/lab/web_lab
var express = require("express");
var url = require("url");
var http = require("http");
var passport = require("passport");
var FacebookStrategy = require("passport-facebook").Strategy;
var session = require('express-session')
var bodyparser = require("body-parser");
var ejs = require("ejs")

var query = require("./query");
var facebook = require("./facebook");

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


app.set('views', __dirname + '/dash');
app.set('view engine', 'ejs');
app.use(session({ secret: 'secretsession' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(express.static("client"));

http.createServer(app).listen(port);



//var FACEBOOK_APP_ID = "1640705326190277";
//138630813180416
//var FACEBOOK_APP_SECRET = "33610047a2044ce05e26feef4cd2b529";
//1c576a7d8914eb6aa0e9455b512804d3
var FACEBOOK_APP_ID = facebook.appID;
var FACEBOOK_APP_SECRET = facebook.appSecret;

//todo < "/home/pracuser/Desktop/dump.sql"

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: facebook.callbackUrl,
    //enableProof: false
},
	function (accessToken, refreshToken, profile, done) {

		done(null, profile);
	}
	));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/index' }),
  function(req, res) {
    res.redirect('/main.html');
  });

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/index')
}





var glo_sto;


app.get("/home", function (req, res) 
{
	res.json(glo_sto);
});



//clients requests todos
//?q=select * from ToDoList
app.get("/todos?", function (req, res) 
{	
	q = "select * from ToDoItem where ItemOwner=" + FACEBOOK_APP_ID + ";";
	console.log(q);
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
						queryans.push(qu);
				}

				glo_sto = queryans;

		}

		res.json(glo_sto);

		res.end();

	});

});



//addtodo?task=mathhomework&pri=3&due=123

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
	var q = "INSERT INTO ToDoItem(text, Priority, DueDate, ItemOwner) VALUES ('"+task+"', "+pri+",'"+DueDate+"','"+FACEBOOK_APP_ID+ "');";
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
	var due=query.due;
	var yy=due.substring(0,2);
	var mm=due.substring(2,4);
	var dd=due.substring(4,6);
	var DueDate='20'+yy+'-'+mm+'-'+dd+' 05:00:00';
	var q = "update ToDoItem set text='"+task+"',Priority="+pri+", DueDate='"+Duedate+"' where Id="+id+' and todoitem.ItemOwner=' + req.user.facebookId+";";
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


query.todosAmount(app, connection, ejs);
query.getTodoList(app, connection, ejs);
query.getTodoItems(app, connection, ejs);
query.get5TodoItems(app, connection, ejs);
query.getTodoItemsFilterd(app, connection, ejs);
query.getSubItems(app, connection, ejs);
query.getTags(app, connection, ejs);
query.todoListByTag(app, connection, ejs);
query.totalPendingAndCompleted(app, connection, ejs);
query.todosCompletedEachWeek(app, connection, ejs);
query.tagsFrequency(app, connection, ejs);
query.averageCompletionTime(app, connection, ejs);
query.lowerThenAverageCompletionTime(app, connection, ejs);

// Notify that the server is now running
console.log('Server running at ' + port);