const { router } = require('./server/router');
const { send } = require('./server/responseHelper');
const testRouter = router();
const testRouter2 = router();

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