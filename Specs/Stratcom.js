(function(){

describe('Stratcom', function(){

	it('should provide publish and subscribe messages', function(){
		var stratcom = Stratcom,
			list = [];

		stratcom.notify('type', ['a', 'b', 'c']);

		stratcom.listen('type', function(a, b, c){
			list.push(a, b, c);
		});

		stratcom.notify('type', ['a', 'b', 'c']);
		expect(list).toEqual(['a', 'b', 'c']);
	});

	it('should be able to listen to events', function(){
		var stratcom = Stratcom,
			list = [],
			fn = function(){
				list.push(1);
			};

		stratcom.listen('toMe', fn)
			.notify('toMe')
			.ignore('toMe', fn)
			.notify('toMe');

		expect(list).toEqual([1]);
	});

	it('should be able listen and notify multiple events', function(){
		var stratcom = Stratcom,
			list = [],
			object = {
				event: function(){
					list.push(1);
				},
				event2: function(){
					list.push(2);
				}
			};

		stratcom.listen(object)
			.notify('event')
			.notify('event2')
			.ignore(object)
			.notify('event2')
			.notify('event')

		expect(list).toEqual([1, 2]);
	});

});

})();
