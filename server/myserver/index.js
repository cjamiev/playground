const { serverFactory } = require('./src/server');
const { routes1, routes2 } = require('./routes');

const server = serverFactory();

const port = 8081;

const STATUS_OK = 200;
const NOT_FOUND = 404;
const DELAY = 250;
const RESPONSE_TYPE_JSON = { 'Content-Type': 'application/json' };

server
  .addCors()
  .addRouteError((req, res) => {
    setTimeout(() => {
      if (!res._headerSent) {
        res.writeHead(NOT_FOUND, RESPONSE_TYPE_JSON);
        res.end(JSON.stringify({ message: 'testing override' }));
      }
    }, DELAY);
  })
  .addRoute(routes1)
  .addRoute(routes2);

server.start();