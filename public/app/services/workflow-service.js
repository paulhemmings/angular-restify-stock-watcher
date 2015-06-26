'use strict';

angular
    .module('MainApplicationModule')
    .service('workflowService', [ '$q', function($q) {

        // allows function call to be deferred until required

        function wait(fn, args) {
          return function () {
            return fn.apply(this, args);
          };
        }

        // flow throw promises,
        // drops out whenever a fail occurs
        // returns: last success/failure

        function flow(waiting) {
          var deferred = $q.defer();
          if (waiting.length === 0) {
            deferred.reject('empty flow');
            return deferred.promise;
          }
          function turn(index) {
            $q.when(waiting[index]()).then(function(value) {
                if (waiting.length - index > 1) {
                  return turn(++index);
                }
                deferred.resolve(value);
            }, function(reason) {
                deferred.reject(reason);
            });
            return deferred.promise;
          }
          return turn(0);
        }

        return {
            wait : wait,
            flow : flow
        };

    }]);
