(function(){
	var http = require('http');
	var io = require('socket.io');
	var fs = require('fs');	

	var app = http.createServer(function handler (req, res) {
		fs.readFile('./lib/static/index.html', function (err, data) {
			if (err) {
				console.log(err);
				res.writeHead(500);
				return res.end('Error loading index.html');
			}

			res.writeHead(200);
			res.end(data);
		});
	});
	
	io.listen(app)
		.sockets.on('connection', function (socket) {
			console.log("noop. TODO: intercept the socket to spawn games.")
		});

	app.listen(process.argv[2] || 80);
})();
