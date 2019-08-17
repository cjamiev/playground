const fs = require('fs');
const { router } = require('./src/router');

const UTF8 = 'utf-8';
const STATUS_OK = 200;
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

module.exports = { routes1, routes2 };