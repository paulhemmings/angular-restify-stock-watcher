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

        function validateSymbols(symbols) {
            var deferred = $q.defer();
            if (!symbols || symbols.length === 0) {
                deferred.reject('invalid request');
            } else {
                deferred.resolve('valid');
            }
            return deferred.promise;
        }

        function listStocks(symbols) {
            return $http({
                url: '/stocks/' + symbols,
                method: 'GET'
            });
        }

        return {
            validateSymbols: validateSymbols,
            listStocks: listStocks
        };

    }]);
