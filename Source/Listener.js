/*
---

name: Listener

description: Attach listeners to your elements and detach them all at once easily.

authors: Christoph Pojer (@cpojer)

license: MIT-style license.

requires: [Core/Class.Extras, Core/Element.Event]

provides: Listener

...
*/

(function(){

var property = '$' + String.uniqueID() + '-listener';
var setup = function(element){
	var listener = new Events, removeEvent = listener.removeEvent;
	listener.removeEvent = function(key, value){
		removeEvent.call(this, key, value);
		element.removeEvent(key, value);
	};
	return listener;
};

this.Listener = new Class({

	attach: function(key, value){
		if (!this[property]) this[property] = setup(this.toElement());
		this[property].addEvent(key, value);
		this.toElement().addEvent(key, value);
	}.overloadSetter(),

	detach: function(key, value){
		if (this[property]){
			if (typeof key == 'string') this[property].removeEvent(key, value);
			else this[property].removeEvents(key);
		}
		return this;
	},

	toElement: function(){
		return this.element;
	}

});

})();
