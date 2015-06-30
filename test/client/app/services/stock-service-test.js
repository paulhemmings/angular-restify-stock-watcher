describe('MainApplicationModule', function () {

    var service,
        mockHttp = {
        };

    beforeEach(function () {
        module('MainApplicationModule');
    });

    describe('stockService', function () {

        beforeEach(inject(function (_stockService_, $http) {
            service = _stockService_,
                mockHttp = $http;
        }));
    });
});
