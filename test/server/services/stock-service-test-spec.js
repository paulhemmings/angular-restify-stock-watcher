var stockService = require('./../../../scripts/services/stock-service');

describe("Stock Service suite", function() {

	beforeEach(function() {
	});

	it("should convert object to array", function() {
    var testObject = { 'test': 'test'};
		var testArray = stockService.__test__.objectAsArray(testObject);
		expect(testArray.length).toBe(1);

	});

});
