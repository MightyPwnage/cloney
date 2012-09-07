/*	
	Isomorphic Code

	Input: Listening for local player actions, either from the recorder or the client
	Output: On request, local delivery of calculation of the position of all active entities
*/
(function(module){ module.exports = function engine(localEventBus){

localEventBus.on('cycle.start', function onCycleStart(payload){

});

localEventBus.on('cycle.end', function onCycleEnd(payload){

});

localEventBus.on('player.leave', function onPlayerLeave(payload){

});

localEventBus.on('player.damage', function onPlayerDeath(payload){

});

localEventBus.on('player.death', function onPlayerDeath(payload){

});

localEventBus.on('player.action.leftdown', function onPlayerActionLeftDown(payload){

});

localEventBus.on('player.action.leftup', function onPlayerActionLeftUp(payload){

});

localEventBus.on('player.action.rightdown', function onPlayerActionRightDown(payload){

});

localEventBus.on('player.action.rightup', function onPlayerActionRightUp(payload){

});

localEventBus.on('player.action.jump', function onPlayerActionJump(payload){

});

localEventBus.on('player.action.shoot', function onPlayerActionShoot(payload){

});

localEventBus.on('player.action.slash', function onPlayerActionSlash(payload){

});

localEventBus.on('player.action.laytrap', function onPlayerActionLayTrap(payload){

});

var calculateState = function calculateState(){

};
setInterval(calculateState, 10);

var deliverState = function deliverState(){

};

return {
	deliverState:deliverState
};

};})(module);