jsFake
------
A simple micro framework to help out with stubbing/mocking JavaScript objects and types.

It has no direct relation to the .net project [fakeiteasy](http://code.google.com/p/fakeiteasy/),
but might share some syntactic constructs.

Installation
------------
Include the source in your test runner page:

	<script src="jsfake.js" type="text/javascript"></script>

Usage
-----
To get started you need to create a fake object (can be used both for stubbing and mocking,
it's up to you - the developer to decide) from either an object instance or a prototype.

	var fakedObject = a.fake({aMethod: function(){ alert('I am for real'); }});
	var fakedArray = a.fake(Array);

You can then override the behavior of any function found on either the object instance and/or
prototype used as the blueprint when creating the fake.
By default all functions on a fake will have a [noop](http://www.wikipedia.org/wiki/NOP) behavior.

	fakedArray.sort.whenCalled(function(){
		alert('I am faking this.');
	});

	fakedObject.aMethod.whenCalled(function(arg){
		alert('I am faking this, and was called with: ' + arg);
	});

A fake also keeps tabs on the number of calls made to any of it's functions.

	fakedArray.sort.numberOfCalls === 0;
	fakedArray.sort();
	fakedArray.sort.numberOfCalls === 1;

Go ahead fake my day.
