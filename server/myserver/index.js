const {
  routes1,
  routes2
} = require('./routes');
const {
  cors
} = require('./config');

const route = (routesWithMethodGet, routesWithMethodPost) => {
  return (request, response) => {
    if (request.method === 'GET') {
      routesWithMethodGet.forEach(route => {
        console.log(request.url);
        route(request, response);
      }
      );
    } else if (request.method === 'POST') {
      routesWithMethodPost.forEach(route => route(request, response));
    } else {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: 'not found' }));
    }
  };
};

const testResponse = (request, response) => {
  cors(response);

  console.log('entry', request.url, request.method);

  const routesWithMethodGet = routes1.loadGetRoutes().concat(routes2.loadGetRoutes());
  const routesWithMethodPost = routes1.loadPostRoutes().concat(routes2.loadPostRoutes());

  route(routesWithMethodGet, routesWithMethodPost)(request, response);
};

const http = require('http');
http.createServer(testResponse).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');