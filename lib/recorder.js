/*	
	Server Code

	Input: Listening for global events
	Output: Authoritative event record to be distributed to clients
*/

(function(module){ module.exports = function recorder(globalEventBus){
/*
model
{
	0:{
		123:[payload,payload]
	},

	1:{
		12:[payload]
	}
}
*/
var _ = require('underscore');

var events = {};
var recording = false;

globalEventBus.on('cycle.start', function onCycleStart(payload){
	recording = true;
	events[payload.cycle] = {};
});

globalEventBus.on('cycle.end', function onCycleEnd(payload){
	recording = false;
});

globalEventBus.on('player.action.*', function onPlayerAction(payload){
	payload.action = this.event;
	if(recording){
		(events[payload.cycle][payload.tick] = events[payload.cycle][payload.tick] || []).push(payload);
	}
});

return {
	getCycle:function(cycle){
		return events[cycle];
	}
}

};})(module);