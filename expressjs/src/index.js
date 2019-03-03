const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const Service = require('./api-service');

const server = express();
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const ApiService = new Service();
const port = process.env.PORT || 8080;

server
  .use(cors())
  .use(express.static(PUBLIC_DIR))
  .use(bodyParser.json())
  .get('/api', ApiService.getData)
  .post('/api', ApiService.postData)
  .delete('/api', ApiService.deleteData)
  .listen(port, () => {
    console.info('server is running on http://localhost:' + port);
  });

module.exports = server;
