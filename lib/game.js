(function(){

	var EventEmitter2 = require('eventemitter2').EventEmitter2;
	var _ = require('underscore');

	var game = function game(sockets){

		var events = new EventEmitter2({
			wildcard:false,
			delimiter:"::"
		});

		_.each(sockets, function (socket){
			socket.on('player.action', function(data){
				events.emit('player.action', data);
			});
		});

		var start = function start(){

		};

		return {
			start:start
		}
	};

	return {
		Game:Game
	}
})();