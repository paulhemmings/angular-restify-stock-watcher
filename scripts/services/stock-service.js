'use strict';

var request = require('request');
var Promise = require('node-promise').Promise;

exports.name = 'StockService';

/*
 * https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20%3D%20%22GOOG%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=
 */
exports.get = function(symbols) {
    var promise = new Promise();
    var symbolArray = (symbols instanceof Array) ? symbols : [symbols];
    var requestUrl = 'https://query.yahooapis.com/v1/public/yql?q='
        	+ encodeURIComponent('select * from yahoo.finance.quotes where symbol in (')
          + encodeURIComponent(symbolArray.map(function(item) { return "'" + item + "'"; }))
          + encodeURIComponent(')')
          + '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';

   	var options = {
   		url: requestUrl
   	};

    function responseHandler(error, response, body) {
        if(error) {
            return promise.reject(error);
        }
        if(response.statusCode !== 200) {
            return promise.reject(response.statusCode);
        }
        promise.resolve(body);
    }

    console.log('retrieving quotes: ', requestUrl);

  	request(options, responseHandler);

    return promise;
};
