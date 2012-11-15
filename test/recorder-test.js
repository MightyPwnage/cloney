var _ = require('underscore');
var vows = require('vows');
var assert = require('assert');

var recorder = require('../lib/recorder.js').recorder;
var EventEmitter2 = require("eventemitter2").EventEmitter2;

vows.describe('recorder').addBatch({

	'creates an instance per call':{
		topic:function(){
			return [recorder.create(), recorder.create()]
		},
		'they are not equal': function(topic){
			assert.notEqual(topic[0], topic[1]);
		}
	},

	'creates a cycle on cycle.start':{
		topic:function(){
			var bus = new EventEmitter2();
			var r = recorder.create().bindToBus(bus);
			var payload = {};
			bus.emit('cycle.start', +new Date());
			return r;
		},
		'first cycle exists and is array': function(topic){
			assert.isObject(topic.getCycle(0).events);
			assert.isNumber(topic.getCycle(0).start);
		}
	},
	'records player.* events':{
		topic:function(){
			var bus = new EventEmitter2({wildcard:true});
			var r = recorder.create().bindToBus(bus);
			var payload = {};
			bus.emit('cycle.start', +new Date());
			bus.emit('player.jump', 5, {});
			return r;
		},
		'first cycle contains one event': function(topic){
			assert.lengthOf(topic.getCycle(0).events[5], 1);
		}
	},
	'records effect.* events':{
		topic:function(){
			var bus = new EventEmitter2({wildcard:true});
			var r = recorder.create().bindToBus(bus);
			var payload = {};
			bus.emit('cycle.start', +new Date());
			bus.emit('effect.platform', 5, {});
			return r;
		},
		'first cycle contains one event': function(topic){
			assert.lengthOf(topic.getCycle(0).events[5], 1);
		}
	},
	'does not record non-effect and non-player events':{
		topic:function(){
			var bus = new EventEmitter2({wildcard:true});
			var r = recorder.create().bindToBus(bus);
			var payload = {};
			bus.emit('cycle.start', +new Date());
			bus.emit('', 5, {});
			bus.emit('test', 5, {});
			bus.emit('yourmom.platform', 5, {});
			bus.emit('test.*', 5, {});
			bus.emit('test.you.*', 5, {});
			return r;
		},
		'first cycle contains one event': function(topic){
			assert.isUndefined(topic.getCycle(0).events[5]);
		}
	},
	'records on the correct cycle':{
		topic:function(){
			var bus = new EventEmitter2({wildcard:true});
			var r = recorder.create().bindToBus(bus);
			var payload = {};
			bus.emit('cycle.start', +new Date());
			bus.emit('player.jump', 5, {});
			bus.emit('cycle.end', +new Date());
			bus.emit('cycle.start', +new Date());
			bus.emit('player.jump', 5, {});
			bus.emit('player.jump', 5, {});
			bus.emit('cycle.end', +new Date());
			return r;
		},
		'first cycle contains one event': function(topic){
			assert.lengthOf(topic.getCycle(0).events[5], 1);
		},
		'second cycle contains two events': function(topic){
			assert.lengthOf(topic.getCycle(1).events[5], 2);
		}
	},
	'emits cycle result':{
		topic:function(){
			var bus = new EventEmitter2({wildcard:true});
			var r = recorder.create().bindToBus(bus);

			bus.on('recorder.report.*', this.callback);

			bus.emit('cycle.start', +new Date());
			bus.emit('cycle.end', +new Date());
		},
		'on cycle end': function(err, topic){
			assert.isObject(topic);
		},
		'with start':function(err, topic){
			assert.isNumber(topic.start);
		},
		'with end':function(err, topic){
			assert.isNumber(topic.end);
		},
		'with events':function(err, topic){
			assert.isObject(topic.events);
		}
	},
	'records event name':{
		topic:function(){
			var bus = new EventEmitter2({wildcard:true});
			var r = recorder.create().bindToBus(bus);
			var payload = {};
			bus.emit('cycle.start', +new Date());
			bus.emit('player.jump', 5, {});
			bus.emit('cycle.end', +new Date());
			return r;
		},
		'in payload.eventName': function(topic){
			assert.equal(topic.getCycle(0).events[5][0].eventName, 'player.jump');
		}
	}


}).export(module);