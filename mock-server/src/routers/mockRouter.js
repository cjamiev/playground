import express from 'express';

import {
  createMockFile,
  loadMockRequests,
  removeMockRequestsEntry
} from '../services/mocks';
import { STATUS_OK } from '../constants';
import {
  isObject,
  isString,
  loadJSONFromFile
} from '../utility';

const router = express.Router();
const INCORRECT_PAYLOAD_ERROR = { message: 'missing or incorrect parameters' };
const CREATED_MOCK_SUCCESS = { message: 'Created new mock endpoint successfully' };
const DELETED_MOCK_SUCCESS = { message: 'Deleted mock endpoint successfully' };
const NO_VALID_RESPONSE_FOUND = { message: 'No valid response found' };

router.get('/mockRequests', (req, res) => {
  res.status(STATUS_OK).send(loadMockRequests());
});

router.post('/loadMockResponse', (req, res) => {
  const { responsePath } = req.body;

  const response = loadJSONFromFile(responsePath, NO_VALID_RESPONSE_FOUND);

  res.status(STATUS_OK).send(response);
});

router.post('/createMockEndpoint', (req, res) => {
  const payloadMockFile = req.body;
  const { filename, foldername, content } = payloadMockFile;

  if (!isString(filename) || !isObject(content)) {
    res.status(STATUS_OK).send(INCORRECT_PAYLOAD_ERROR);
  } else {
    const errorMessage = createMockFile(content, filename, foldername);

    if (errorMessage) {
      res.status(STATUS_OK).send({ message: errorMessage });
    } else {
      res.status(STATUS_OK).send(CREATED_MOCK_SUCCESS);
    }
  }
});

router.post('/deleteMockEndpoint', (req, res) => {
  const endpoint = req.body;

  const errorMessage = removeMockRequestsEntry(endpoint);

  if (errorMessage) {
    res.status(STATUS_OK).send({ message: errorMessage });
  } else {
    res.status(STATUS_OK).send(DELETED_MOCK_SUCCESS);
  }
});

export {
  router as mockRouter
};