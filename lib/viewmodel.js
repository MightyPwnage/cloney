/*	
	Client Code

	Input: Listening for global player actions, either from local or remote
	Input: Accepting an authoritative representation of the previous cycle
	Output: Re-emitting remote actions emitted by global eventbus on local eventbus
	Output: On cycle end, if server, global emission of authoritative representation of previous cycle
	Output: On cycle replay, local emission of actions on the correct tick
*/
(function(module){ module.exports = function engine(){

};})(module);