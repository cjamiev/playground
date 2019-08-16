const http = require('http');
const fs = require('fs');
const { cors } = require('./config');

const METHOD_GET = 'GET';
const METHOD_POST = 'POST';
const METHOD_OPTIONS = 'OPTIONS';
const UTF8 = 'utf-8';
const STATUS_OK = 200;
const NOT_FOUND = 404;
const DELAY = 250;
const RESPONSE_TYPE_JSON = { 'Content-Type': 'application/json' };
const RESPONSE_TYPE_HTML = { 'Content-Type': 'text/html' };

const DEFAULT_PORT = '8080';
const DEFAULT_CALLBACK = (portnumber) => {
  console.log(`Server running at http://127.0.0.1:${portnumber}/`);
};

const flatten = (arr = []) => arr.reduce((accumulator, item) => accumulator.concat(item), []);

const loadRoutes = (routes) => {
  const routesWithMethodGet = flatten(routes.map(route => route.loadGetRoutes()));
  const routesWithMethodPost = flatten(routes.map(route => route.loadPostRoutes()));

  return { routesWithMethodGet, routesWithMethodPost };
};

const routeOptions = (res) => {
  res.writeHead(STATUS_OK, RESPONSE_TYPE_JSON);
  res.end();
};

const routeError = (res) => {
  setTimeout(() => {
    if (!res._headerSent) {
      fs.readFile('./myserver/404.html', (err, content404) => {
        res.writeHead(NOT_FOUND, RESPONSE_TYPE_HTML);
        res.end(content404, UTF8);
      });
    }
  }, DELAY);
};


const services = (routes) => {
  const { routesWithMethodGet, routesWithMethodPost } = loadRoutes(routes);

  return (request, response) => {
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
};

const serverFactory = () => {
  const routes = [];
  const server = {
    addRoute(route) {
      routes.push(route);

      return this;
    },
    start(port = DEFAULT_PORT, callback) {
      const myserver = services(routes);

      http.createServer(myserver).listen(port);

      if (callback) {
        callback();
      } else {
        DEFAULT_CALLBACK(port);
      }
    }
  };

  return server;
};

module.exports = { serverFactory };