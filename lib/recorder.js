(function(exports){

	var _ = require("underscore");
	var EventEmitter2 = require("eventemitter2").EventEmitter2;
    


	// var create = function create(inbus, outbus){

	// 	var recording = false;
	// 	var cycles = [];
	// 	var currentCycle = null;

	// 	var bindToBus = function bindToBus(bus){

	// 		bus.on("cycle.start", function record(timestamp){
	// 			if(!recording){
	// 				recording = true;
	// 				currentCycle = {
	// 					start:timestamp,
	// 					events:{}
	// 				};
	// 				cycles.push(currentCycle);	
	// 			}
	// 		});

	// 		bus.on("cycle.end", function record(timestamp){
	// 			if(recording){
	// 				recording = false;
	// 				currentCycle.end = timestamp;	
	// 				bus.emit("recorder.report."+(cycles.length - 1), null, currentCycle);
	// 			}
	// 		})

	// 		bus.on("player.*", function record(tick, payload){
	// 			if(recording){
	// 				payload.eventName = this.event;
	// 				if(!currentCycle.events[tick])
	// 					currentCycle.events[tick] = [];
	// 				currentCycle.events[tick].push(payload);
	// 			}
	// 		});

	// 		bus.on("effect.*", function record(tick, payload){
	// 			if(recording){
	// 				payload.eventName = this.event;
	// 				if(!currentCycle.events[tick])
	// 					currentCycle.events[tick] = [];
	// 				currentCycle.events[tick].push(payload);
	// 			}
	// 		});

	// 		var getCycle = function getCycle(index){
	// 			return cycles[index];
	// 		};

	// 		return {
	// 			getCycle:getCycle,
	// 			debug:{
	// 				cycles:function() {return cycles;},
	// 				watch:function() {
	// 					var oldEmit = bus.emit;
	// 					return function (watch) { 
	// 						if(watch){
	// 							bus.emit = function() {
	// 								console.log('recorder recording', arguments);
	// 								return oldEmit.apply(this, arguments);
	// 							};	
	// 						}
	// 						else {
	// 							bus.emit = oldEmit;
	// 						}
	// 					};
	// 				}()
	// 			}
	// 		};
	// 	};

	// 	return {
	// 		bindToBus:bindToBus,
	// 	};
	// };

	var recorder = function recorder(){

		var outbus = new EventEmitter2({wildcard:true});

		var recording = false;
		var cycles = [];
		var currentCycle = null;

		var onStart = function onStart(timestamp){
			if(!recording){
				recording = true;
				currentCycle = {
					start:timestamp,
					events:{}
				};
				cycles.push(currentCycle);	
			}
		};

		var onEnd = function onEnd(timestamp){
			if(recording){
				recording = false;
				currentCycle.end = timestamp;	
				outbus.emit("recorder.report."+(cycles.length - 1), null, currentCycle);
			}
		};

		var onEvent = function onEvent(tick, payload){
			if(recording){
				payload.eventName = this.event;
				if(!currentCycle.events[tick])
					currentCycle.events[tick] = [];
				currentCycle.events[tick].push(payload);
			}
		};

		var getCycle = function getCycle(index){
			return cycle[index];
		};

		var bindToBus = function bindToBus(inbus){
			outbus = inbus;

			inbus.on("cycle.start", onStart);
			inbus.on("cycle.end", onEnd);
			inbus.on("effect.*", onEvent);
			inbus.on("player.*", onEvent);

			var debugWatch = function debugWatch(){
				inbus.on("*", function(){
					console.log('recorder-inbus-event', arguments);
				});
				outbus.on("*", function(){
					console.log('recorder-outbus-event', arguments);
				});
			};
			return {
				debug:{
					bind: bind,
					unbind: unbind,
					inbus: inbus,
					outbus: outbus,
					watch: debugWatch
				},
				useInputBus: useInputBus,
				onReport: function(func){ outbus.on('recorder.report.*', func) },k
				offReport: function(func){ outbus.off('recorder.report.*', func) },
				getCycle: getCycle
			};
		};

		return {
			bindToBus:bindToBus,
		};
	};

	exports.recorder = {
		create: recorder
	};
	
})(exports || this);