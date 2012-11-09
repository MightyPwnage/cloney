(function(){
	var http = require('http');
	var io = require('socket.io');
	var fs = require('fs');	

	var gameManager = require('./lib/socketHub.js');

	var app = http.createServer(function handler (req, res) {
		fs.readFile('./lib/static/index.html', function (err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading index.html');
			}

			res.writeHead(200);
			res.end(data);
		});
	});
	
	io.listen(app)
		.sockets.on('connection', function (socket) {
			hub.receive(socket);
		});

	app.listen((function () {
		if(process.argv[2]===undefined) {
			return 80;
		}
		return parseInt(process.argv[2], 10);
        })());
})();
