(function(module){
	
	var startGame = function startGame(sockets){
		require('./game.js').game(sockets).start();
	};
	
	var receive = function receive(socket){
		startGame([socket]);
	};
	
	module.exports =  {
		receive:receive
	}

})(module);