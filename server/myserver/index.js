const http = require('http');
const { cors } = require('./config');
const { routeError, routeOptions, routesWithMethodGet, routesWithMethodPost } = require('./routes');

const port = 8081;
const METHOD_GET = 'GET';
const METHOD_POST = 'POST';
const METHOD_OPTIONS = 'OPTIONS';

const myserver = (request, response) => {
  cors(response);

  if (request.method === METHOD_GET) {
    routesWithMethodGet.forEach(route => route(request, response));
  } else if (request.method === METHOD_POST) {
    routesWithMethodPost.forEach(route => route(request, response));
  } else if (request.method === METHOD_OPTIONS) {
    routeOptions(response);
  }

  routeError(response);
};

http.createServer(myserver).listen(port);

console.log(`Server running at http://127.0.0.1:${port}/`);