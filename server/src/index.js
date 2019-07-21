const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const { createClipmark, executeCommand, getClipmark } = require('./clipmark-service');

const server = express();
const PUBLIC_DIR = path.resolve(__dirname, './public');
const port = 3001;

server
  .use(cors())
  .use(express.static(PUBLIC_DIR))
  .use(bodyParser.json())
  .get('/clipmarks', getClipmark)
  .post('/create-clipmark', createClipmark)
  .post('/execute-command', executeCommand);

server.listen(port, () => {
  console.info('server is running on http://localhost:' + port);
});