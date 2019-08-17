const fs = require('fs');
const { router } = require('./src/router');
const testRouter = router();
const testRouter2 = router();

const UTF8 = 'utf-8';
const STATUS_OK = 200;
const RESPONSE_TYPE_JSON = { 'Content-Type': 'application/json' };
const RESPONSE_TYPE_HTML = { 'Content-Type': 'text/html' };

const homeRoute = (req, res) => {
  fs.readFile('./myserver/index.html', (err, content) => {
    if (err) {
      res.writeHead(STATUS_OK, RESPONSE_TYPE_JSON);
      res.end(JSON.stringify({ message: 'not found' }));
    } else {
      res.writeHead(STATUS_OK, RESPONSE_TYPE_HTML);
      res.end(content, UTF8);
    }
  });
};

testRouter.get('/', homeRoute);
testRouter.get('/index.html', homeRoute);
testRouter.get('/test', (req, res) => {
  res.writeHead(STATUS_OK, RESPONSE_TYPE_JSON);
  res.end(JSON.stringify({ message: 'testing get from testRouter' }));
});
testRouter.get('/test2', (req, res) => {
  res.writeHead(STATUS_OK, RESPONSE_TYPE_JSON);
  res.end(JSON.stringify({ message: 'testing get2 from testRouter' }));
});
testRouter.post('/test3', (req, res) => {
  res.writeHead(STATUS_OK, RESPONSE_TYPE_JSON);
  res.end(JSON.stringify({ message: 'testing post3 from testRouter1' }));
});

testRouter2.post('/test2', (req, res) => {
  res.writeHead(STATUS_OK, RESPONSE_TYPE_JSON);
  res.end(JSON.stringify({ message: 'testing post2 from testRouter2' }));
});
testRouter2.get('/test3', (req, res) => {
  res.writeHead(STATUS_OK, RESPONSE_TYPE_JSON);
  res.end(JSON.stringify({ message: 'testing get3 from testRouter2' }));
});

module.exports = { testRouter, testRouter2 };