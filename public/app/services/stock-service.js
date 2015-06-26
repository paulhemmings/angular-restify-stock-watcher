'use strict';

/*
 * Data provider service.
 * Used to retrieve data from external service
 *
 * Style guide:
 * avoid using a variable and instead use chaining with the getter syntax
 * produces more readable code and avoids variable collisions or leaks.
 *
 */

angular
    .module('MainApplicationModule')
    .service('stockService', [ '$http', '$q', function($http, $q) {

        function verifyRequest(symbols) {
          return $http({
              url: '/stocks/' + symbols + '/verify',
              method: 'GET'
          });
        }

        function listStocks(symbols) {
            return $http({
                url: '/stocks/' + symbols,
                method: 'GET'
            });
        }

        return {
            verifyRequest: verifyRequest,
            listStocks: listStocks
        };

    }]);
