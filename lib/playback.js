(function(exports){
	var _ = require('underscore');	

	var create = function create(){
		
		var emitting = false;
		var events = {};

		var mergeCycle = function (cycleReport){
			_.each(cycleReport.events, function (eventList, tick){
				if(!events[tick]){
					events[tick] = [];
				}
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
						for(idx in queue){
							var key = queue[idx];
							if (key <= now){
								_.each(events[key], function (eventPayload){
									bus.emit(eventPayload.eventName, eventPayload);
									delete queue[idx];
								})
							}
							else{
								setTimeout(emit,key - (new Date() - start))
								break;
							}
						}
					}
				};
			};

			bus.on("recorder.report.*", function (err,result){
				mergeCycle(result);
			});

			bus.on("cycle.start", function (){
				emitting = true;
				emit()();
			});

			bus.on("cycle.end", function (){
				emitting = false;
			});

			return {
				debug:{
					events: function() { return events; },
					watch:function() { bus.on("*", console.log); }

				}
			}

		};

		return {
			bindToBus:bindToBus
		};
	}

	exports.playback = {
		create:create
	};
})(exports || this);