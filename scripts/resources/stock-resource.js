'use strict';

/*
 * Stock resource
 * Provide endpoints for retrieving stocks
 */

 (function(ex) {

    var Extensions = require('./../helpers/extensions');
    var stockService;

    // verify request is valid
    // TODO: move to service

    function verifyRequest(req, res, next) {
       if (!req.params.symbols
           || req.params.symbols == 'undefined'
           || req.params.symbols.length == 0) {
          res.send(405, "not a valid request");
          next();
          return;
       }
       res.send(200);
       next();
    }

    // retrieve the requested stocks

    function getStock(req, res, next) {
       this.stockService.get(req.params.symbols).then(function(quotes) {
           res.send(200, JSON.parse(quotes));
           next();
       }, function(error) {
         res.send(400, error);
         next();
       });
    }

    // bind methods to service end points

    function initialize(server, services) {
      this.stockService = services.StockService;
      server.get('/stocks/:symbols', Extensions.bind(getStock, this));
      server.get('/stocks/:symbols/verify', Extensions.bind(verifyRequest, this));
    }

    ex.initialize = initialize;

 })(exports);
