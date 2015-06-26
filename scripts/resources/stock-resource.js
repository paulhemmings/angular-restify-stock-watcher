'use strict';

  var Extensions = require('./../helpers/extensions');
/*
 * Blog resource
 * Provide endpoints for managing blogs
 * TODO: add a prefilter to all requests for authentication.
 */

  exports.initialize = function(server, services) {

    var Context = {

        stockService : services.StockService,

        get : function(req, res, next) {
          console.log('params', req.params);
          this.stockService.get(req.params.symbols).then(function(quotes) {
              res.send(200, JSON.parse(quotes));
              next();
          }, function(error) {
            res.send(401, error);
            next();
          });
        }

    };

    /*
     * Bind service end points to methods
     */

    server.get('/stocks/:symbols', Extensions.bind(Context.get, Context));

    /*
     * Expose hidden methods for unit testing.
     */

    exports.__test__ = {
        get: Extensions.bind(Context.get, Context)
    };

  };
