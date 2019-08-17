const fs = require('fs');
const { router } = require('./src/router');
const { send, sendHTML } = require('./responseHelper');
const testRouter = router();
const testRouter2 = router();

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

testRouter.post('/test3', (req, res) => {
  send(res, req.body);
});

testRouter2.post('/test2', (req, res) => {
  send(res, req.body);
});

testRouter2.get('/test3', (req, res) => {
  send(res, { message: 'testing get3 from testRouter2' });
});

module.exports = { testRouter, testRouter2 };