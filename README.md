Mootilities
===========

This repository contains a few experimental and dead simple implementations of commonly required functionality. Use all of them at your own risk and only use them if you know what you are doing.

Note that parts of this repository may change without notice. Expect API changes, extensions and removals frequently. If you are updating, make sure everything works. Of course you have 100 % code coverage of all of your projects, so this will be super easy!

![Screenshot](http://cpojer.net/Logo/mootilities.png)

This Plugin is part of MooTools [PowerTools!](http://cpojer.net/PowerTools).

* [Build PowerTools!](http://cpojer.net/PowerTools)
* [Fork PowerTools!](https://github.com/cpojer/PowerTools)

Build
-----

Build via [Packager](http://github.com/kamicane/packager), requires [MooTools Core](http://github.com/mootools/mootools-core) to be registered to Packager already

	packager register /path/to/mootilities
	packager build Mootilities/* > mootilities.js

To build this plugin without external dependencies use

	packager build Mootilities/* +use-only Mootilities > mootilities.js

Accessor
--------
Allows you to abstract getters/setters with high-level lookup/define sugar.

```javascript
var Candy = new Class(…);
var CandyStore = new Accessor('item');

CandyStore.defineItem('jello', new Candy);
CandyStore.defineItems({
	skittles: new Candy,
	snickers: new Candy
});

CandyStore.lookupItem('jello') // returns the previously defined item
CandyStore.lookupItems('skittles', 'jello') // returns a list of previously defined items

// Execute a method on all defined
CandyStore.eachItem(function(candy){
	David.eat(candy);
});
```

Note: This is a 1:1 backport of a central feature of MooTools 2.0. Be aware that this will be provided in MooTools 2.0 and will be removed from here eventually. Do not hold me or MooTools responsible if you use this plugin now and if there will be API changes to the official version in MooTools.

Stratcom
--------
This is a dead-simple Notification system. It is not really more than what "Events" in MooTools Core does. Expect this component to become super awesome at some point in the future. Stay tuned!

```javascript
// Anywhere in your app
Stratcom.listen('page:show', function(){
	// do something when the page is shown
	// Will be called when some component notifies 'page:show' on Stratcom.
});

// In ApplicationController.js
Stratcom.notify('page:show', [uri]);
```

Queue
-----
This is a very simple queue implementation.
´´´javascript
var queue = new Queue;
queue.chain(function(){
	// Do some animation or something
	(function() {
		queue.next();
	}).delay(1000);
}).chain(function(){
	doSomething();
	queue.next();
}).call();
´´´

Listener
--------
If you get tired of writing attach/detach methods in your Classes - this is for you! Note that this utility is likely only useful if your classes are written to manage only one Element.

´´´javascript
var MenuItem = new Class({

	Implements: Listener

	initialize: function(element){
		// Set the main element for this class to this.element
		// Without this, Listener will not work
		this.element = element;

		// Attach any amount of listeners
		this.attach({
			click: this.click.bind(this),
			mouseenter: this.mouseenter.bind(this)
		});
	},

	click: function(){
		// If you click this element, all listeners will be detached.
		this.detach();
	}
});
´´´

You can detach specific listeners (same arguments as attach), all the listeners (no arguments), one specific listener (type, fn as arguments) or all listeners of one type (type as argument).

This helper also automatically adds a `toElement` method to your classes. You can do `document.id(instance)` to get the element associated with it. With that you are able to pass the instance into any method that expects an Element.

LocalStorage
------------
This is a very simple storage wrapper for MooTools. It uses localStorage if available and falls back to Cookie storage. Only use this if you know what you are doing - storing data in Cookies is bad.

´´´javascript
LocalStorage.set(key, value);

LocalStorage.get(key);

LocalStorage.erase(key);
´´´

All these methods work with multiple arguments as expected in MooTools.

If you want to use this seriously in IE feel free to modify it to support storage in Behaviors or similar. Send me a pull request :)
