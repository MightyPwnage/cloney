var vows = require('vows');
var assert = require('assert');
var sinon = require('sinon');

var _ = require('underscore');
var EventEmitter2 = require("eventemitter2").EventEmitter2;

var playback = require('../lib/playback.js').playback;

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
			bus.emit("recorder.report.1", null, {
				events:{
					0:[{test2:1}],
					1:[{test3:2}]
				}
			});

			var that = this;
			setTimeout(function(){
				that.callback(null, p);
			}, 10);
		},
		'consumes cycle report': function(err, topic){
			var a = topic.debug.events();
			assert.equal(a[0][0].test, 1);
		},
		'merges cycle reports correctly':function(err, topic){
			var a = topic.debug.events();
			assert.lengthOf(a[0], 2);
			assert.equal(a[0][1].test2, 1);
			assert.equal(a[1][0].test3, 2);
		}
	},

	'on cycle.start':{
		topic:function(){
			var bus = new EventEmitter2({wildcard:true});
			var p = playback.create().bindToBus(bus);			
			var spy = sinon.spy();
			
			bus.on('player.test', spy);
			var e = {eventName:"player.test"};
			bus.emit("recorder.report.0", null, {
				events:{
					0:[e,e],
					10:[e],
					20:[e,e]
				}
			});
			bus.emit('cycle.start');
			var that = this;
			setTimeout(function(){
				that.callback(null,spy);
			}, 30);
		},
		'replays events':function(err, spy){
			assert.equal(spy.callCount, 5);
		}
	}

}).export(module);