(function($){
	if($.a){ throw 'the a-namespace already exists'; }
	$.a = {};

	$.a.fake = function(blueprint){ return new $.a.Fake(blueprint); };
	$.a.Fake = function(blueprint){
		_interceptMethodsFor.call(this, blueprint.prototype);
		_interceptMethodsFor.call(this, blueprint);
	};

	var _noop = function(){};

	var _interceptMethodsFor = function(obj){
		for(var methodName in obj){
			if(obj[methodName] instanceof Function){
				this[methodName] = _createInterceptedMethod();
			}
		}
	}

	var _createInterceptedMethod = function(){
		var method = function(){
			method.numberOfCalls++;
				return method.behavior.apply(this, arguments);
		};
		method.numberOfCalls = 0;
		method.behavior = _noop;
		method.whenCalled = function(newBehavior){ method.behavior = newBehavior; };
		return method;
	}
})(this);
