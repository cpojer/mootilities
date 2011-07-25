(function(){

describe('Queue', function(){

	it('should queue and call functions', function(){
		var queue = new Queue,
			list = [];

		queue.chain(function(){
			list.push(1);
			queue.next();
		}).chain(function(){
			list.push(2);
			queue.next();
		}).chain(function(){
			list.push(3);
			queue.next();
		}).call();

		expect(list).toEqual([1, 2, 3]);
	});

	it('should reuse a queue', function(){
		var queue = new Queue,
			list = [];

		queue.chain(function(){
			list.push(1);
			queue.next();
		}).call();

		expect(list).toEqual([1]);

		queue.chain(function(){
			list.push(2);
			// doesn't call next here
		}).call();

		expect(list).toEqual([1, 2]);

		queue.chain(function(){
			list.push(3);
			queue.next();
		});

		expect(list).toEqual([1, 2]);
		queue.next();
		expect(list).toEqual([1, 2, 3]);
	});

});

})();
