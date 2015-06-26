'use strict';

/*
 * Main Angular module
 *
 * Style guide:
 * avoid polluting global namespace:
 *  var app = angular.module('app');
 */

angular.module('MainApplicationModule', ['ui.router', 'ngAnimate', 'ngLodash']);

/*
 * Add SPA Routing using route provider
 *
 * Style guide:
 * avoid using a variable and instead use chaining with the getter syntax
 *
 */

angular
    .module('MainApplicationModule')
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/stocks');

    $stateProvider
        .state('watching', {
            url:'/stocks',
            views: {
                'content': {
                    templateUrl: '/app/partials/stock-list.html',
                    controller: 'StockController'
                }
            }
        });
}]);
