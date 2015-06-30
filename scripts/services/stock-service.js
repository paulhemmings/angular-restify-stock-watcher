'use strict';

/*
 * https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20%3D%20%22GOOG%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=
 */

(function(ex){

    var request = require('request');
    var Promise = require('node-promise').Promise;

    function objectAsArray(obj) {
       return (obj instanceof Array) ? obj : [obj];
    }

    function buildYahooRequest(symbols) {
      return 'https://query.yahooapis.com/v1/public/yql?q='
              + encodeURIComponent('select * from yahoo.finance.quotes where symbol in (')
              + encodeURIComponent(symbols.map(function(item) { return "'" + item + "'"; }))
              + encodeURIComponent(')')
              + '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';
    }

    function requestStocks(symbols) {
        var promise = new Promise();
        var requestUrl = buildYahooRequest(objectAsArray(symbols));
        request({ url: requestUrl}, function(error, response, body) {
            if(error) {
                return promise.reject(error);
            }
            if(response.statusCode !== 200) {
                return promise.reject(response.statusCode);
            }
            promise.resolve(body);
        });
        return promise;
    }

    ex.get = requestStocks;
    ex.name = 'StockService';

    ex.__test__ = {
        objectAsArray: objectAsArray,
        buildYahooRequest: buildYahooRequest
    };


})(exports);
