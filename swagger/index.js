'use strict';
Error.stackTraceLimit = Infinity;

var app = require('connect')();
var http = require('http');
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var fs = require('fs');
var config = require('../examples/config');

// swaggerRouter configuration
var options = {
  swaggerUi: __dirname + '/swagger.json',
  controllers: __dirname + '/controllers',
  useStubs: process.env.NODE_ENV === 'development' ? true : false // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(__dirname + '/api/swagger.yaml', 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);
if (config.host) {
    swaggerDoc.host = config.host + ':' + config.port;
}

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  // Start the server
  http.createServer(app).listen(config.port, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', config.port, config.port);
    console.log('Swagger-ui is available on http://localhost:%d/docs', config.port);
  });
});
