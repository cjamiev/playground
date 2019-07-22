const fs = require('fs');
const { cors } = require('./config');
const { routes1, routes2 } = require('./routes');
const { loadRoutes } = require('./router');

const { routesWithMethodGet, routesWithMethodPost } = loadRoutes([routes1, routes2]);

const handleError = (response) => {
  setTimeout(() => {
    if (!response._headerSent) {
      fs.readFile('./myserver/404.html', (err, content404) => {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(content404, 'utf-8');
      });
    }
  }, 250);
};

const myserver = (request, response) => {
  cors(response);

  if (request.method === 'GET') {
    routesWithMethodGet.forEach(route => route(request, response));
  } else if (request.method === 'POST') {
    routesWithMethodPost.forEach(route => route(request, response));
  }

  handleError(response);
};

const http = require('http');
http.createServer(myserver).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');