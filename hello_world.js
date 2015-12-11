// Port that clients use to connect with
var port = 8000;
var IP = "127.0.0.1";

// Load the HTTP module
var http = require('http');

// Create server using HTTP module
http.createServer(function(req, res) {
	res.writeHead(200, {'Content-type' : 'text/plain'});
	res.end('Hello World');
}).listen(port, IP);

// Notify that the server is now running
console.log('Server running at http://' + IP + ':' + port +'/');
