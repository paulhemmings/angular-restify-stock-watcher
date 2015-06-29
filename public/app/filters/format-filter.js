
/*
 * Handy format filters
 */

angular
    .module('MainApplicationModule')
    .filter('escape', function() {
        return window.encodeURIComponent;
    })
    .filter('removePath', function() {
        return function(input) {
            return input.split('/')[input.split('/').length-1];
        }
    })
    .filter('splitCamelCase', function() {
        return function(input) {
            return value.replace(/([a-z])([A-Z])/g, '$1 $2');
        }
    });
