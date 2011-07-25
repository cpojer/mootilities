(function(){

describe('LocalStorage', function(){

	it('should get, set and erase values', function(){
		expect(LocalStorage.set('key', 'value').get('key')).toEqual('value');

		LocalStorage.erase('key');
		expect(LocalStorage.get('key')).toBeNull();
	});

	it('should store objects', function(){
		// chains?
		expect(LocalStorage.set('object', {a: 1, b: 2})).toBe(LocalStorage);

		expect(LocalStorage.get('object')).toEqual({a: 1, b: 2});

		expect(LocalStorage.erase('object')).toBe(LocalStorage);
		expect(LocalStorage.get('object')).toBeNull();

		// Multiple erases should still return the LocalStorage instance.
		expect(LocalStorage.erase('a', 'b')).toBe(LocalStorage);
	});

});

})();
