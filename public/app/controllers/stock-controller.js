'use strict';

angular
    .module('MainApplicationModule')
    .controller('StockController', ['$scope', '$rootScope', 'stockService', 'workflowService', 'lodash',
        function($scope, $rootScope, stockService, workflowService, lodash) {

            $scope.stocks = [];
            $scope.errorReason = '';
            $scope.keys = [];

            function objectToArray(obj) {
                return Object.keys(obj).map(function (key) {
                  return {
                      'key': key,
                      'value': obj[key]
                  };
                });
            }

            function objectAsArray(obj) {
                return (obj instanceof Array) ? obj : [obj];
            }

            function unionArrays(arrays) {
                return lodash.union.apply(this, arrays);
            }

            function clearStocks() {
                $scope.errorReason = '';
                $scope.stocks.length = 0;
                $scope.keys.length = 0;
            }

            function loadStocks(symbols) {
                workflowService.flow([
                    workflowService.wait(stockService.verifyRequest, [symbols]),
                    workflowService.wait(stockService.listStocks, [symbols])
                ])
                .then(function(response) {
                    $scope.stocks = objectAsArray(response.data.query.results.quote);
                    $scope.keys = unionArrays($scope.stocks.map(function(stock) {
                        return lodash.pluck(objectToArray(stock),'key');
                    }));
                }, function(reason) {
                    $scope.errorReason = reason.data;
                });
            }

            function selectStock(stock) {
                $scope.selectedStock = objectToArray(stock)
                    .filter(function(prop) {
                        return !!prop.value;
                    });
            }

            function initialize() {
              $scope.loadStocks = loadStocks;
              $scope.clearStocks = clearStocks;
              $scope.selectStock = selectStock;
            }

            initialize();

            /*
             * How do you unit test private methods?
             * Expose them via a 'test' property
             */

            $scope.__test__ = {
                initialize: initialize
            };

        }]);
