import express from 'express';

import {
  clearSessionStorage,
  loadSessionStorage
} from '../services/sessionStorage';
import { STATUS_OK } from '../constants';

const router = express.Router();
const CLEAR_SESSION_STORAGE_SUCCESS = { message: 'cleared sessionStorage successfully' };

router.get('/clearSessionStorage', (req, res) => {
  const errorMessage = clearSessionStorage();

  if (errorMessage) {
    res.status(STATUS_OK).send({ message: err });
  } else {
    res.status(STATUS_OK).send(CLEAR_SESSION_STORAGE_SUCCESS);
  }
});

router.get('/sessionStorage', (req, res) => {
  const session = loadSessionStorage();

  res.status(STATUS_OK).send(session);
});

export {
  router as sessionRouter
};