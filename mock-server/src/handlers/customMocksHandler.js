import { isEqual, isEmpty } from '../../my_modules';
import { STATUS_NOT_FOUND } from '../constants';
import { loadJSONFromFile } from '../utility';

const DEFAULT_HEADERS = { 'Content-Type': 'application/json' };
const DEFAULT_BODY = { message: 'no response found for this endpoint' };
const DEFAULT_RESPONSE = {
  headers: DEFAULT_HEADERS,
  status: STATUS_NOT_FOUND,
  body: DEFAULT_BODY
};

const getCorrectResponse = (requestBody, defaultResponse, conditionalResponse = []) => {
  const match = conditionalResponse.find(entry => isEqual(entry.payload, requestBody));
  if (!isEmpty(match)) {
    return {
      ...DEFAULT_RESPONSE,
      ...match
    };
  }
  else {
    return {
      ...DEFAULT_RESPONSE,
      ...defaultResponse
    };
  }
};


const getMockHandler = (responsePath) => {
  return (req, res) => {
    if (!res.headersSent) {
      const { headers, status, body, conditionalResponse = [] } = loadJSONFromFile(responsePath, DEFAULT_RESPONSE);
      const response = getCorrectResponse(req.body, { headers, status, body }, conditionalResponse);

      res.set(response.headers).status(response.status).send(response.body);
    }
  };
};

const mapHandlersForMockRequests = (requests) => {
  const mappedHandlers = requests.map(({ method, url, responsePath }) => {
    return { method, url, handler: getMockHandler(responsePath) };
  });

  return mappedHandlers;
};

export {
  mapHandlersForMockRequests
};