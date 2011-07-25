/*
---

name: Queue

description: A really really lightweight queuing system.

authors: Christoph Pojer (@cpojer)

license: MIT-style license.

requires: [Core/Class.Extras, Class-Extras/Class.Binds]

provides: Queue

...
*/

(function(){

this.Queue = new Class({

	Extends: Chain,

	Implements: Class.Binds,

	call: function(){
		if (this.busy || !this.$chain.length) return this;

		this.busy = true;
		this.callChain();
		return this;
	},

	next: function(){
		this.busy = false;
		this.call();
		return this;
	}

});

})();
