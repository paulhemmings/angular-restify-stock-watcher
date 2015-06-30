'use strict';

angular
    .module('MainApplicationModule')
    .controller('StockController', ['$scope', '$rootScope', '$location', 'stockService', 'workflowService', 'lodash',
        function($scope, $rootScope, $location, stockService, workflowService, lodash) {

            $scope.stocks = [];
            $scope.errorReason = '';
            $scope.keys = [];
            $scope.sortArray = [];

            // http://www.growingwiththeweb.com/2014/07/order-a-js-array-by-multiple-properties.html
            // genius script that allows you to order by multiple properties

            function orderByProperty(prop) {
              var args = Array.prototype.slice.call(arguments, 1);
              return function (a, b) {
                var equality = a[prop] - b[prop];
                if (equality === 0 && arguments.length > 1) {
                  return orderByProperty.apply(null, args)(a, b);
                }
                return equality;
              };
            }

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

            function splitCamelCase(value) {
              return value.replace(/([a-z])([A-Z])/g, '$1 $2');
            }

            function positiveValue(value) {
                return value.trim().indexOf('-') !== 0;
            }

            function readSymbolsFromUrl() {
                $scope.symbols = $location.search()['stock'];
                return $scope.symbols;
            }

            function writeSymbolsToUrl(symbols) {
                $location.path('/stocks').search({'stock': symbols});
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
                      })).sort();
                }, function(reason) {
                    $scope.errorReason = reason.data;
                });
                return symbols;
            }

            function selectStock(stock) {
                $scope.selectedStock = objectToArray(stock)
                    .filter(function(prop) {
                        return !!prop.value;
                    });
            }

            function keySelected(key) {
                return $scope.sortArray.indexOf(key) !== -1;
            }

            function selectKey(key) {
                var pos = $scope.sortArray.indexOf(key);
                if (pos !== -1) {
                    $scope.sortArray.splice(pos, 1);
                } else {
                    $scope.sortArray.push(key);
                }
                $scope.stocks.sort(orderByProperty.apply(null, $scope.sortArray));
                // $scope.stocks.sort(function(lhs, rhs) {
                //     return lhs[key] - rhs[key];
                // });
            }

            function exposeMethods() {
                $scope.loadStocks = loadStocks;
                $scope.clearStocks = clearStocks;
                $scope.selectStock = selectStock;
                $scope.selectKey = selectKey;
                $scope.keySelected = keySelected;
                $scope.writeSymbolsToUrl = writeSymbolsToUrl;
                $scope.positiveValue = positiveValue;
                $scope.splitCamelCase = splitCamelCase;
            }

            function initialize() {
                exposeMethods();
                loadStocks(readSymbolsFromUrl());
            }

            initialize();

            /*
             * How do you unit test private methods?
             * Expose them via a 'test' property
             */

            $scope.__test__ = {
                initialize: initialize,
                orderByProperty: orderByProperty,
                objectToArray: objectToArray,
                objectAsArray: objectAsArray,
                splitCamelCase: splitCamelCase,
                positiveValue: positiveValue,
                readSymbolsFromUrl: readSymbolsFromUrl,
                writeSymbolsToUrl: writeSymbolsToUrl
            };

        }]);
