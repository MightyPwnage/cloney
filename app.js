// Non-tested WIP
// Committing for future work

(function(){
	var cluster = require('cluster');
	
	var initMaster = function initMaster(){
		var http = require('http');
		var io = require('socket.io');
		var fs = require('fs');	
		var os = require('os');	

		var workers = [];
		var numCPUs = os.cpus().length;

		for(var i = 0; i < numCPUs; i++){
			workers.push(cluster.fork());
		}

		var gamesize = 1;
		var socketStaging = [];

		var gameSockets = {};
		var newGameId = +new Date();

		var handleSocket = function handleSocket(socket){
			// WIP, TODO refactoring
			socketStaging.push(socket);
			var gameId = newGameId++;
			if(socketStaging.length >= gamesize){
				var clients = socketStaging.splice(0,gamesize);
				var worker = workers.pop();
				worker.send({
					eventName: "initialize",
					payload: {
						gameId: gameId,
						gameSize: gamesize
					}
				});
				workers.shift(worker);
				clients.forEach(function (client){
					client.on("*", function(payload){
						worker.send({
							eventName: this.event,
							gameId: gameId,
							payload: payload
						});
					});
				});
				worker.on("message", function (data){
					clients.forEach(function (client){
						client.emit(data.eventName, data.payload);
					});
				});
			}
		}

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
				handleSocket(socket);
			});

		app.listen(process.argv[2] || 80);

	};

	var initWorker = function initWorker(){
		var EventEmitter2 = require("eventemitter2").EventEmitter2;
		var playback = require('./lib/playback').playback;
		var recorder = require('./lib/recorder').recorder;
		// still deciding whether a public/private bus scheme is adequate
		// maybe a single bus with a pushToAll flag to send out to the many
		// maybe make above decisions with event namespaces
		// maybe a bus for every component (recorder, playback, engine, etc)
		var publicBuses = {};
		var privateBuses = {};

		process.on('message', function (payload){
			if(payload.eventName === "initialize"){
				var publicBus = publicBuses[payload.gameId] = new EventEmitter2();
				var privateBus = privateBuses[payload.gameId] = new EventEmitter2();
				
				playback.create().bindToBus(privateBus);
				recorder.create().bindToBus(privateBus);

				publicBus.on("*", function (payload) {
					process.emit('message', {
						eventName: this.event,
						payload: payload,
					})
				});
			}
			else{
				publicBuses[payload.gameId].emit(eventName, payload);
			}
		});

		
	}

	if(cluster.isMaster) {

		initMaster();
	}	
	else {
		initWorker();
	}

})();
