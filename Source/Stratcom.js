/*
---

name: Stratcom

description: The simplest form of notifying other parts of your app about cool stuff. Will be more awesome in the future.

authors: Christoph Pojer (@cpojer)

license: MIT-style license.

requires: [Core/Class.Extras]

provides: Stratcom

...
*/

(function(){

var bag = new Events;
this.Stratcom = {

	notify: function(type, args){
		bag.fireEvent(type, args);
		return this;
	},

	listen: function(type, fn){
		bag.addEvent(type, fn);
		return this;
	}.overloadSetter(),

	ignore: function(type, fn){
		bag.removeEvent(type, fn);
		return this;
	}.overloadSetter()

};

})();
