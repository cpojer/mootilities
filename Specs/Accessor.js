describe('Accessor', function(){

	it('should define accessor methods', function(){
		var accessor = new Accessor;

		accessor.define('key', 'value');
		expect(accessor.lookup('key')).toEqual('value');

		accessor.defines({
			b: 2,
			c: 3
		});
		expect(accessor.lookup('b')).toEqual(2);
		expect(accessor.lookups('b', 'key')).toEqual({
			b: 2,
			key: 'value'
		});

		var list = {};
		accessor.each(function(value, key){
			list[key] = value;
		});

		expect(list).toEqual({
			key: 'value',
			b: 2,
			c: 3
		});
	});

	it('should define named accessors', function(){
		var CandyStore = new Accessor('Item');
		var Candy = new Class;

		var jello = new Candy;
		var skittles = new Candy;
		CandyStore.defineItem('jello', jello);
		CandyStore.defineItems({
			skittles: skittles,
			snickers: new Candy
		});

		expect(CandyStore.lookupItem('jello')).toBe(jello);
		expect(CandyStore.lookupItems('skittles', 'jello')).toEqual({
			skittles: skittles,
			jello: jello
		});

		var items = 0;
		CandyStore.eachItem(function(candy){
			expect(candy instanceof Candy).toBeTruthy();
			items++;
		});
		expect(items).toEqual(3);
	});

});
