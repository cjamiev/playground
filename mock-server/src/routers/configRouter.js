import express from 'express';

import { loadConfiguration, updateConfiguration } from '../services/config';
import { STATUS_OK } from '../constants';

const router = express.Router();
const UPDATED_CONFIG_SUCCESS = { message: 'updated configuration' };

router.get('/config', (req, res) => {
  res.status(STATUS_OK).send(loadConfiguration());
});

router.post('/config', (req, res) => {
  const payloadConfig = req.body;

  const errorMessage = updateConfiguration(payloadConfig);

  if (errorMessage) {
    res.status(STATUS_OK).send({ message: errorMessage });
  } else {
    res.status(STATUS_OK).send(UPDATED_CONFIG_SUCCESS);
  }
});

export {
  router as configRouter
};