const express = require('express');
const router = express.Router();

import { loadMockRequests } from '../services/mocks';
import { mapHandlersForMockRequests } from '../handlers/customMocksHandler';
import { runDelayResponse, runLoggerAndOverrides } from '../middlewares/customMocksMiddleware';
import { METHOD_GET, METHOD_POST } from '../constants';

const mockRequests = loadMockRequests();
const mocks = mapHandlersForMockRequests(mockRequests);
const httpGetEndpoints = mocks.filter(mock => (mock.method).toUpperCase() === METHOD_GET);
const httpPostEndpoints = mocks.filter(mock => (mock.method).toUpperCase() === METHOD_POST);

router.use(runDelayResponse);
router.use(runLoggerAndOverrides);

httpGetEndpoints.forEach(({ url, handler }) => {
  router.get(url, handler);
});
httpPostEndpoints.forEach(({ url, handler }) => {
  router.post(url, handler);
});

export {
  router as customMocksRouter
};