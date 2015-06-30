describe('MainApplicationModule', function () {

    var scope,
        controller;

    beforeEach(function () {
        module('MainApplicationModule');
    });

    describe('StockController', function () {

        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('StockController', {
                '$scope': scope
            });
        }));

        it ("should convert object to array", function() {
            var testObject = { 'one' : 1, 'two': 2, 'three': 3};
            var objArray = scope.__test__.objectToArray(testObject);
            expect(objArray.length).toBe(3);
        });

    });

});
