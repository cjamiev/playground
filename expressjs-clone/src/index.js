const { serverFactory } = require('./server/server');
const { addStaticRoutes } = require('./server/staticRouter');
const { testRouter, testRouter2 } = require('./routes');

const server = serverFactory();

const port = 8080;

const NOT_FOUND = 404;
const RESPONSE_TYPE_JSON = { 'Content-Type': 'application/json' };

server
  .addCors()
  .addRouteError((req, res) => {
    res.writeHead(NOT_FOUND, RESPONSE_TYPE_JSON);
    res.end(JSON.stringify({ message: 'testing override' }));
  })
  .addRoute(addStaticRoutes('./src/static/'))
  .addRoute(testRouter)
  .addRoute(testRouter2);

server.start(port);