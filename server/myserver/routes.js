const fs = require('fs');
const { router } = require('./src/router');
const testRouter = router();
const testRouter2 = router();

const UTF8 = 'utf-8';
const STATUS_OK = 200;
const RESPONSE_TYPE_JSON = { 'Content-Type': 'application/json' };
const RESPONSE_TYPE_HTML = { 'Content-Type': 'text/html' };

const send = (response, data) => {
  response.writeHead(STATUS_OK, RESPONSE_TYPE_JSON);
  response.end(JSON.stringify(data));
};

const sendHTML = (response, data) => {
  response.writeHead(STATUS_OK, RESPONSE_TYPE_JSON);
  response.end(data, UTF8);
};

const homeRoute = (req, res) => {
  fs.readFile('./myserver/index.html', (err, content) => {
    if (err) {
      send(res, { message: 'not found' });
    } else {
      sendHTML(res, content);
    }
  });
};

testRouter.get('/', homeRoute);
testRouter.get('/index.html', homeRoute);
testRouter.get('/test', (req, res) => {
  send(res, { message: 'testing get from testRouter' });
});
testRouter.get('/test2', (req, res) => {
  send(res, { message: 'testing get2 from testRouter' });
});

const realRoute = (req, res) => {
  send(res, req.body);
};

testRouter.post('/test3', (req, res) => {
  realRoute(req, res);
});

testRouter2.post('/test2', (req, res) => {
  send(res, req.body);
});

testRouter2.get('/test3', (req, res) => {
  send(res, { message: 'testing get3 from testRouter2' });
});

module.exports = { testRouter, testRouter2 };