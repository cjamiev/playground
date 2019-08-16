const fs = require('fs');
const { loadRoutes, router } = require('./router');

const UTF8 = 'utf-8';
const STATUS_OK = 200;
const NOT_FOUND = 404;
const DELAY = 250;
const RESPONSE_TYPE_JSON = { 'Content-Type': 'application/json' };
const RESPONSE_TYPE_HTML = { 'Content-Type': 'text/html' };

const routerOne = (req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    fs.readFile('./myserver/index.html', (err, content) => {
      if (err) {
        res.writeHead(STATUS_OK, RESPONSE_TYPE_JSON);
        res.end(JSON.stringify({ message: 'not found' }));
      } else {
        res.writeHead(STATUS_OK, RESPONSE_TYPE_HTML);
        res.end(content, UTF8);
      }
    });
  }
  if (req.url === '/test') {
    res.writeHead(STATUS_OK, RESPONSE_TYPE_JSON);
    res.end(JSON.stringify({ message: 'testing get' }));
  }
  if (req.url === '/test2') {
    res.writeHead(STATUS_OK, RESPONSE_TYPE_JSON);
    res.end(JSON.stringify({ message: 'testing get2' }));
  }
  else {
    return;
  }
};

const routerOneOne = (req, res) => {
  if (req.url === '/test3') {
    res.writeHead(STATUS_OK, RESPONSE_TYPE_JSON);
    res.end(JSON.stringify({ message: 'testing get3' }));
  }
  if (req.url === '/test4') {
    res.writeHead(STATUS_OK, RESPONSE_TYPE_JSON);
    res.end(JSON.stringify({ message: 'testing get4' }));
  }
};

const routerTwo = (req, res) => {
  if (req.url === '/test') {
    res.writeHead(STATUS_OK, RESPONSE_TYPE_JSON);
    res.end(JSON.stringify({ message: 'testing post' }));
  }
  if (req.url === '/test2') {
    res.writeHead(STATUS_OK, RESPONSE_TYPE_JSON);
    res.end(JSON.stringify({ message: 'testing post2' }));
  }
};

const routes1 = router().get(routerOne).post(routerTwo);
const routes2 = router().get(routerOneOne);

const { routesWithMethodGet, routesWithMethodPost } = loadRoutes([routes1, routes2]);

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

module.exports = {
  routeError,
  routeOptions,
  routesWithMethodGet,
  routesWithMethodPost
};