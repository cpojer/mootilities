(function(){

describe('Listener', function(){

	var MyClass = new Class({

		Implements: Listener,

		initialize: function(){
			this.element = new Element('div');
		}

	});

	it('should implement toElement correctly', function(){
		var element = document.id(new MyClass);
		expect(typeOf(element)).toBe('element');
		expect(element.get('tag')).toBe('div');
	});

	it('should be able to attach listeners', function(){
		var instance = new MyClass,
			element = document.id(instance),
			list = [],
			click =  function(){
				list.push(1);
			},
			mouseenter = function(){
				list.push(2);
			};

		instance.attach({
			'click': click,
			'mouseenter': mouseenter
		});

		element.fireEvent('click');
		expect(list).toEqual([1]);

		instance.detach();
		element.fireEvent('click').fireEvent('mouseenter');
		expect(list).toEqual([1]);

		instance.attach('click', click);
		element.fireEvent('click');
		expect(list).toEqual([1, 1]);

		instance.detach('click', mouseenter);
		element.fireEvent('click');
		expect(list).toEqual([1, 1, 1]);

		instance.detach('click', click);
		element.fireEvent('click');
		expect(list).toEqual([1, 1, 1]);

		instance.attach('mouseenter', mouseenter);
		element.fireEvent('mouseenter');
		expect(list).toEqual([1, 1, 1, 2]);

		instance.detach({
			click: mouseenter
		});
		element.fireEvent('mouseenter');
		expect(list).toEqual([1, 1, 1, 2, 2]);

		instance.detach({
			mouseenter: mouseenter
		});
		element.fireEvent('mouseenter');
		expect(list).toEqual([1, 1, 1, 2, 2]);
	});

});

})();
