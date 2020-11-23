import { loadConfiguration } from '../services/config';
import { loadSessionStorage } from '../services/sessionStorage';
import { SERVER_ERROR } from '../constants';
import { logEntry } from '../services/log.js';

const mockServerError = { message: 'mock server error has occurred' };

const overrideEndpoints = (url, res, { overrideUrls, overrideStatusCode, overrideResponse }) => {
  const matchedUrl = overrideUrls.some(endpoint => endpoint === url);

  if (matchedUrl) {
    res.status(overrideStatusCode).send(overrideResponse);
  }
};

const overrideSessionEndpoints = (url, res, endpoints) => {
  const matchedEndpoint = endpoints.find(endpoint => endpoint.request.url === url);

  if (matchedEndpoint) {
    res.status(matchedEndpoint.response.status).send(matchedEndpoint.response.body);
  }
};

const runLoggerAndOverrides = (req, res, next) => {
  const { error, log, overrideUrls, overrideStatusCode, overrideResponse } = loadConfiguration();
  const { endpoints } = loadSessionStorage();

  if (log) {
    logEntry(req.url, req.body);
  }
  if (error) {
    res.status(SERVER_ERROR).send(mockServerError);
  }
  else if (overrideUrls.length) {
    overrideEndpoints(req.url, res, { overrideUrls, overrideStatusCode, overrideResponse });
  }
  if (endpoints && !res.headersSent) {
    overrideSessionEndpoints(req.url, res, endpoints);
  }

  next();
};

const runDelayResponse = (req, res, next) => {
  const { delay, delayUrls } = loadConfiguration();

  const shouldDelayAllUrls = !delayUrls.length;
  const shouldDelayThisUrl = delayUrls.some(item => item === req.url);

  if (shouldDelayAllUrls || shouldDelayThisUrl) {
    setTimeout(next, delay);
  } else {
    next();
  }
};

export {
  runDelayResponse,
  runLoggerAndOverrides
};