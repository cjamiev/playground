import express from 'express';

import { clearLog, loadLog } from '../services/log';
import { STATUS_OK } from '../constants';

const router = express.Router();
const CLEAR_LOG_SUCCESS = { message: 'cleared log file' };

router.get('/clearLog', (req, res) => {
  const errorMessage = clearLog();

  if (errorMessage) {
    res.status(STATUS_OK).send({ message: errorMessage });
  } else {
    res.status(STATUS_OK).send(CLEAR_LOG_SUCCESS);
  }
});

router.get('/log', (req, res) => {
  const currentLog = loadLog();

  res.status(STATUS_OK).send(currentLog);
});

export {
  router as logRouter
};