(function(exports){
	var create = function create(){

		var recording = false;
		var cycles = [];
		var currentCycle = null;

		var bindToBus = function bindToBus(bus){

			bus.on("cycle.start", function record(timestamp){
				if(!recording){
					recording = true;
					currentCycle = {
						start:timestamp,
						events:{}
					};
					cycles.push(currentCycle);	
				}
			});

			bus.on("cycle.end", function record(timestamp){
				if(recording){
					recording = false;
					currentCycle.end = timestamp;	
					bus.emit("recorder.report."+(cycles.length - 1), null, currentCycle);
				}
			})

			bus.on("player.*", function record(tick, payload){
				if(recording){
					payload.eventName = this.event;
					if(!currentCycle.events[tick])
						currentCycle.events[tick] = [];
					currentCycle.events[tick].push(payload);
				}
			});

			bus.on("effect.*", function record(tick, payload){
				if(recording){
					payload.eventName = this.event;
					if(!currentCycle.events[tick])
						currentCycle.events[tick] = [];
					currentCycle.events[tick].push(payload);
				}
			});

			var getCycle = function getCycle(index){
				return cycles[index];
			};

			return {
				getCycle:getCycle,
				debug:{
					cycles:function() {return cycles;},
					watch:function() {
						var oldEmit = bus.emit;
						return function (watch) { 
							if(watch){
								bus.emit = function() {
									console.log('recorder recording', arguments);
									return oldEmit.apply(this, arguments);
								};	
							}
							else {
								bus.emit = oldEmit;
							}
						};
					}()
				}
			};
		};

		return {
			bindToBus:bindToBus,
		};
	};

	exports.recorder = {
		create:create
	};
})(exports || this);