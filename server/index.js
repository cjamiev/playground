const child_process = require('child_process');
const http = require('http');
const path = require('path');
const url = require('url');
const { isEqual } = require('./utils/util');
const { projectController } = require('./controllers/projectController');
const { fileController } = require('./controllers/fileController');
const { databaseController } = require('./controllers/databaseController');
const { mockserverController } = require('./controllers/mockserverController');
const { mockController } = require('./controllers/mockController');
const { commandController } = require('./controllers/commandController');
const { staticController } = require('./controllers/staticController');

const DEFAULT_PORT = 1000;
const SECOND_ARGUMENT = 2;
const port = process.argv[SECOND_ARGUMENT] || DEFAULT_PORT;
const UTF8 = 'utf-8';
const STANDARD_HEADER = { 'Content-Type': 'application/json' };
const STATUS_OK = 200;
const STATUS_ERROR = 500;
const METHOD_POST = 'POST';

const cors = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
};

const resolvePostBody = async (request) => {
  const promise = new Promise((resolve, reject) => {
    const queryData = [];
    request.on('data', (data) => {
      queryData.push(data);
    });

    request.on('end', () => {
      try {
        const result = queryData.length && JSON.parse(queryData.join().toString('utf8'));
        resolve(result);
      } catch (e) {
        resolve(e);
      }
    });
  });

  return await promise;
};

const send = (response, { data = {}, message = '', error = false }, { status, headers, body } = {}) => {
  if(status, headers, body) {
    response.writeHead(status, headers);
    response.end(JSON.stringify(body), UTF8);
  } else {
    const STANDARD_STATUS = error ? STATUS_ERROR : STATUS_OK;

    response.writeHead(STANDARD_STATUS, STANDARD_HEADER);
    response.end(JSON.stringify({ data, message, error }), UTF8);
  }
};

const handleRequest = async (request, response) => {
  const queryParameters = url.parse(request.url, true).query;
  const payload = request.method === METHOD_POST ? await resolvePostBody(request) : {};

  if (request.url.includes('file')) {
    const { data, message, error } = await fileController(queryParameters.name, payload);

    send(response, { data, message, error });
  } else if (request.url.includes('command')) {

    const { data, message } = await commandController(queryParameters);

    send(response, { data, message });
  } else if (request.url.includes('db')) {
    const { data, message, error } = await databaseController(queryParameters.name, payload);

    send(response, { data, message, error });
  } else if (request.url.includes('project')) {
    const { data, message, error } = await projectController(queryParameters, payload);

    send(response, { data, message, error });
  } else if (request.url.includes('mockserver')) {
    const { data, message, error } = await mockserverController(request.url, payload);

    send(response, { data, message, error });
  } else if (path.extname(request.url)) {
    const {
      message,
      error,
      status,
      headers,
      body
    } = await staticController(request.url);

    send(response, { message, error }, { status, headers, body });
  } else {
    const {
      message,
      error,
      status,
      headers,
      body
    } = await mockController(request.url, request.method, payload);

    send(response, { message, error }, { status, headers, body });
  }
};

http
  .createServer((request, response) => {
    cors(response);
    handleRequest(request, response);
  })
  .listen(parseInt(port));

console.log(`Server listening on port ${port}`);
