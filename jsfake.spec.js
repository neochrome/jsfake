describe('jsFake', function(){
	function SomeClass(){}
	SomeClass.prototype = {
		protoMethodWithoutArgs: function(){ throw 'protoMethodWithoutArgs'; },
		protoMethodWithArgs: function(arg1, arg2){ throw 'protoMethodWithArgs'; },
		_privateMethod : function(){ throw '_privateMethod'; }
	};
	var blueprint = new SomeClass();
	blueprint.instMethodWithoutArgs = function(){ throw 'instMethodWithoutArgs'; };
	blueprint.instMethodWithArgs = function(arg1, arg2){ throw 'instMethodWithArgs'; };
	blueprint._privateMethod = function(){ throw '_privateMethod'; };

	it('should create a new instance from blueprint', function(){
		expect(a.fake(SomeClass)).not.toEqual(undefined);
		expect(a.fake(blueprint)).not.toBe(blueprint);
	});
  
	it('should provide default noop behavior for all "public" prototype methods', function(){
		var fake = a.fake(SomeClass);
		expect(function(){fake.protoMethodWithoutArgs();}).not.toThrow();
		expect(function(){fake.protoMethodWithArgs(1,2);}).not.toThrow();
		expect(fake._privateMethod).toBe(undefined);
	});

	it('should provide default noop behavior for all "public" instance methods', function(){
		var fake = a.fake(blueprint);
		expect(function(){fake.instMethodWithoutArgs();}).not.toThrow();
		expect(function(){fake.instMethodWithArgs(1,2);}).not.toThrow();
		expect(fake._privateMethod).toBe(undefined);
	});

	it('should support "strict" behavior for stubbed methods', function(){
		var fake = a.fake(SomeClass);
		any.callOn(fake).throws();
		expect(function(){fake.protoMethodWithoutArgs();}).toThrow();
	});

	it('should support stubbing of methods', function(){
		var fake = a.fake(SomeClass);
		fake.protoMethodWithoutArgs.whenCalled(function(){
			throw 'stubbed';
		});
		fake.protoMethodWithArgs.whenCalled(function(arg1, arg2){
			throw 'stubbed-' + arg1 + arg2;
		});
		expect(function(){ fake.protoMethodWithoutArgs(); }).toThrow('stubbed');
		expect(function(){ fake.protoMethodWithArgs('one','two'); }).toThrow('stubbed-onetwo');
	});

	it('should bind "this" in stubbed method', function(){
		var fake = a.fake(SomeClass);
		fake.prop = 'value';
		fake.protoMethodWithoutArgs.whenCalled(function(){
			throw this.prop;
		});
		expect(function(){ fake.protoMethodWithoutArgs(); }).toThrow('value');
	});

	it('should fail to create stub for undefined method', function(){
		var fake = a.fake(SomeClass);
		expect(function(){
			fake.undefinedMethod.whenCalled(function(){});
		}).toThrow();
	});

	it('should track number of times a method is called', function(){
		var fake = a.fake(SomeClass);
		expect(fake.protoMethodWithoutArgs.numberOfCalls).toBe(0);
		fake.protoMethodWithoutArgs();
		fake.protoMethodWithoutArgs();
		expect(fake.protoMethodWithoutArgs.numberOfCalls).toBe(2);
	});
});

