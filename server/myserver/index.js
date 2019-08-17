const { serverFactory } = require('./src/server');
const { testRouter, testRouter2 } = require('./routes');

const server = serverFactory();

const port = 8081;

const NOT_FOUND = 404;
const RESPONSE_TYPE_JSON = { 'Content-Type': 'application/json' };

server
  .addCors()
  .addRouteError((req, res) => {
    res.writeHead(NOT_FOUND, RESPONSE_TYPE_JSON);
    res.end(JSON.stringify({ message: 'testing override' }));
  })
  .addRoute(testRouter)
  .addRoute(testRouter2);

server.start();