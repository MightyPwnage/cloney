var _ = require('underscore');
var vows = require('vows');
var assert = require('assert');

var playback = require('../lib/playback.js');
var EventEmitter2 = require("eventemitter2").EventEmitter2;

vows.describe('playback').addBatch({

	'creates an instance per call':{
		topic:function(){
			return [playback.create(), playback.create()]
		},
		'they are not equal': function(topic){
			assert.notEqual(topic[0], topic[1]);
		}
	},

	'on recorder.report.*':{
		topic:function(){
			var bus = new EventEmitter2({wildcard:true});
			var p = playback.create().bindToBus(bus);

			bus.emit("recorder.report.0", null, {
				events:{
					0:[{test:1}]
				}
			});
			return p;
		},
		'consumes cycle report': function(topic){
			var a = topic.debug.showEvents();
			assert.equal(a[0][0].test, 1);
		}
	},

}).export(module);