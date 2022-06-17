const path = require('path');
const { fileController } = require('./controllers/fileController');
const { commandController } = require('./controllers/commandController');
const { staticController } = require('./controllers/staticController');

const router = async ({ reqUrl, reqMethod, queryParameters, payload }) => {
  if (reqUrl.includes('file')) {
    return await fileController(queryParameters.name, payload);
  } else if (reqUrl.includes('command')) {
    return await commandController(queryParameters);
  } else {
    return await staticController(reqUrl);
  }
};

module.exports = {
  router
};
