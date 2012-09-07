/*
	Input: Bundle of sockets representing all players
	Output: Wire up global socket mesh and kick off game event loop
*/
(function(){

	var EventEmitter2 = require('eventemitter2').EventEmitter2;
	var _ = require('underscore');

	var game = function game(sockets){

		var eventHub = new EventEmitter2({
			wildcard:false,
			delimiter:"::"
		});

		_.each(sockets, function (socket){
			socket.on('player.action', function (data){
				eventHub.emit('player.action', data);
			});
			eventHub.on('player.action', function (data){
				socket.emit('player.action', data);
			});
		});

		var start = function start(){

		};

		return {
			start:start
		};
	};

	module.exports = {
		game:game
	};

})();
