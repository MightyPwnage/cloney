/*	
	Isomorphic Code
	
	Input: Listening for local player actions, either from the recorder or the client
	Output: On request, local delivery of calculation of the position of all active entities
*/
(function(module){ module.exports = function engine(eventBus){

eventBus.on('cycle.end', function onCycleEnd(payload){

});

eventBus.on('player.leave', function onPlayerLeave(payload){

});

eventBus.on('player.damage', function onPlayerDeath(payload){

});

eventBus.on('player.death', function onPlayerDeath(payload){

});

eventBus.on('player.action.leftdown', function onPlayerActionLeftDown(payload){

});

eventBus.on('player.action.leftup', function onPlayerActionLeftUp(payload){

});

eventBus.on('player.action.rightdown', function onPlayerActionRightDown(payload){

});

eventBus.on('player.action.rightup', function onPlayerActionRightUp(payload){

});

eventBus.on('player.action.jump', function onPlayerActionJump(payload){

});

eventBus.on('player.action.shoot', function onPlayerActionShoot(payload){

});

eventBus.on('player.action.slash', function onPlayerActionSlash(payload){

});

eventBus.on('player.action.laytrap', function onPlayerActionLayTrap(payload){

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