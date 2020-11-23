import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { loadConfiguration } from './services/config';
import { clearSessionStorage } from './services/sessionStorage';
import { configRouter } from './routers/configRouter';
import { customMocksRouter } from './routers/customMocksRouter';
import { logRouter } from './routers/logRouter';
import { mockRouter } from './routers/mockRouter';
import { sessionRouter } from './routers/sessionRouter';

const server = express();
const { port } = loadConfiguration();

server
  .use(cors())
  .use(bodyParser.json())
  .use(express.static('src/public'))
  .use(configRouter)
  .use(logRouter)
  .use(mockRouter)
  .use(sessionRouter)
  .use(customMocksRouter);

clearSessionStorage();
server.listen(port, () => {
  console.info('mock server is running on http://localhost:' + port);
});