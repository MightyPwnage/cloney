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
				showCycles:function() {return cycles;}
			}
		};
	};

	return {
		bindToBus:bindToBus,
	};
};

module.exports = {

	create:create

};
