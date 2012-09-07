(function(){
	var actions = {};

	var push = function push(cycle, tick, payload){
		
		var cycle = (actions[cycle] = actions[cycle] || { });
		var tick = (actions[tick] = actions[tick] || [ ]);

		tick.push(payload);
	};

	
})();