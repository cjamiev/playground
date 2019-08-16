const { serverFactory } = require('./server');
const { routes1, routes2 } = require('./routes');

const server = serverFactory();

const port = 8081;

server
  .addRoute(routes1)
  .addRoute(routes2);

server.start();