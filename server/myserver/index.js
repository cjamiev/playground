const router = require('./router');

const cors = res => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
};

const routerOne = (req, res) => {
  if (req.url === '/test') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'testing get' }));
  }
  if (req.url === '/test2') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'testing get2' }));
  }
};

const routerOneOne = (req, res) => {
  console.log('oneone');
  if (req.url === '/test3') {
    console.log('oneone');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'testing get3' }));
  }
  if (req.url === '/test4') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'testing get4' }));
  }
};

const routerTwo = (req, res) => {
  if (req.url === '/test') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'testing post' }));
  }
  if (req.url === '/test2') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'testing post2' }));
  }
};

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

  const routes1 = router().get(routerOne).post(routerTwo);
  const routes2 = router().get(routerOneOne);

  const routesWithMethodGet = routes1.loadGetRoutes().concat(routes2.loadGetRoutes());
  const routesWithMethodPost = routes1.loadPostRoutes().concat(routes2.loadPostRoutes());

  route(routesWithMethodGet, routesWithMethodPost)(request, response);
};

const http = require('http');
http.createServer(testResponse).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');