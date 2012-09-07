/*	
	Isomorphic Code

	Input: Listening for global player actions, either from local or remote
	Input: Accepting an authoritative representation of the previous cycle
	Output: Re-emitting remote actions emitted by global eventbus on local eventbus
	Output: On cycle end, if server, global emission of authoritative representation of previous cycle
	Output: On cycle replay, local emission of actions on the correct tick
*/
(function(module){ module.exports = function engine(localEventBus, globalEventBus){

globalEventBus.on('cycle.previous', function onCyclePrevious(payload){

});

globalEventBus.on('cycle.start', function onCycleStart(payload){

});

globalEventBus.on('cycle.end', function onCycleEnd(payload){

});

globalEventBus.on('player.leave', function onPlayerLeave(payload){

});

globalEventBus.on('player.damage', function onPlayerDeath(payload){

});

globalEventBus.on('player.death', function onPlayerDeath(payload){

});

globalEventBus.on('player.action.leftdown', function onPlayerActionLeftDown(payload){

});

globalEventBus.on('player.action.leftup', function onPlayerActionLeftUp(payload){

});

globalEventBus.on('player.action.rightdown', function onPlayerActionRightDown(payload){

});

globalEventBus.on('player.action.rightup', function onPlayerActionRightUp(payload){

});

globalEventBus.on('player.action.jump', function onPlayerActionJump(payload){

});

globalEventBus.on('player.action.shoot', function onPlayerActionShoot(payload){

});

globalEventBus.on('player.action.slash', function onPlayerActionSlash(payload){

});

globalEventBus.on('player.action.laytrap', function onPlayerActionLayTrap(payload){

});

};})(module);