var _ = require('underscore');	

var create = function create(){
	
	var emitting = false;
	var events = {};

	var mergeCycle = function (cycleReport){
		_.each(cycleReport.events, function (eventList, tick){
			if(!events[tick])
				events[tick] = [];
			events[tick] = events[tick].concat(eventList);
		});
	};

	var bindToBus = function bindToBus(bus){
		
		var emit = function emitScope(){
		
			var queue = _.keys(events);
			var start = +new Date();
			
			return function emit(){
				var now = new Date() - start;
				if(emitting){
					for(key in queue){
						if (key <= now){
							_.each(queue[key], function (eventPayload){
								bus.emit(payload.eventName, payload);
								delete queue[key];
							})
						}
						else{
							setTimeout(emit, new Date() - start - key)
							break;
						}
					}
				}
			};
		}();

		bus.on("recorder.report.*", function (err,result){
			mergeCycle(result);
		});

		bus.on("cycle.start", function (){
			emitting = true;
			emit();
		});

		bus.on("cycle.end", function (){
			emitting = false;
		});

		return {
			debug:{
				showEvents: function(){ return events; }
			}
		}

	};

	return {
		bindToBus:bindToBus
	};
}

module.exports = {
	create:create
};