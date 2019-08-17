const { cors } = require('./cors');
const { DEFAULT_ERROR_ROUTE, DEFAULT_METHOD_OPTIONS_RESPONSE } = require('./defaults');

const METHOD_GET = 'GET';
const METHOD_POST = 'POST';
const METHOD_OPTIONS = 'OPTIONS';

const flatten = (arr = []) => arr.reduce((accumulator, item) => accumulator.concat(item), []);

const loadRoutes = (routes) => {
  const routesWithMethodGet = flatten(routes.map(route => route.loadGetRoutes()));
  const routesWithMethodPost = flatten(routes.map(route => route.loadPostRoutes()));

  return { routesWithMethodGet, routesWithMethodPost };
};

const services = (routes, config) => {
  const { routesWithMethodGet, routesWithMethodPost } = loadRoutes(routes);
  const isCorsOn = config.some(item => item.cors);
  const errorRoute = config.find(item => item.errorRoute).errorRoute || DEFAULT_ERROR_ROUTE;

  return (request, response) => {
    if (isCorsOn) {
      cors(response);
    }

    if (request.method === METHOD_GET) {
      routesWithMethodGet.forEach(route => route(request, response));
    } else if (request.method === METHOD_POST) {
      routesWithMethodPost.forEach(route => route(request, response));
    } else if (request.method === METHOD_OPTIONS) {
      DEFAULT_METHOD_OPTIONS_RESPONSE(request, response);
    }

    errorRoute(request, response);
  };
};

module.exports = { services };