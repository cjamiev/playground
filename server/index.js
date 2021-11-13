const child_process = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const exec = child_process.exec;
const { writeToFile, loadFile, readDirectory } = require('./utils/file');
const { isEqual } = require('./utils/util');
const {
  createMockFile,
  updateMockFile,
  removeMockRequestsEntry,
  loadMockRequests,
  loadMockResponse,
  getMatchedMockResponse,
  loadConfiguration,
  updateConfiguration,
  loadLog,
  logEntry,
  clearLog
} = require('./utils/mockserver-util');
const { projectController } = require('./controllers/projectController');

const DEFAULT_PORT = 1000;
const SECOND_ARGUMENT = 2;
const port = process.argv[SECOND_ARGUMENT] || DEFAULT_PORT;
const ROOT_DIR = './server/static/';
const UTF8 = 'utf-8';
const TYPE_OCTET = 'application/octet-stream';
const mimeTypes = {
  '.ico': 'image/x-icon',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword'
};
const STANDARD_HEADER = { 'Content-Type': 'application/json' };
const MOCK_SERVER_ERROR = 'mock server error has occurred';
const NOT_FOUND = 'Not found';
const STATUS_OK = 200;
const STATUS_ERROR = 500;
const METHOD_POST = 'POST';
const FILE_DIRECTORY = './storage/io/file';
const DB_DIRECTORY = './storage/io/db';
const COMMAND_DIRECTORY = './storage/io/command';

const cors = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
};

const getExecCommand = ({ name, args }) => {
  const command = name.includes('.sh') ? `sh ${name}` : name;

  return `cd ${COMMAND_DIRECTORY} && ${command} ${args}`;
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

const send = (response, { data = {}, message = '', error = false }) => {
  const status = error ? STATUS_ERROR : STATUS_OK;

  response.writeHead(status, STANDARD_HEADER);
  response.end(JSON.stringify({ data, message, error }), UTF8);
};

const handleFileResponse = async (request, response) => {
  if (request.method === METHOD_POST) {
    const payload = await resolvePostBody(request);

    const content = payload.content || '';
    const filename = payload.filename || 'no-name.txt';

    const { message, error } = writeToFile(`${FILE_DIRECTORY}/${filename}`, content);

    send(response, { message, error });
  }
  else {
    const queryParams = url.parse(request.url, true).query;

    const data = queryParams.name
      ? loadFile(`${FILE_DIRECTORY}/${queryParams.name}`)
      : readDirectory(FILE_DIRECTORY);

    send(response, { data });
  }
};

const handleCommandResponse = (request, response) => {
  const queryParams = url.parse(request.url, true).query;

  if(queryParams.name) {
    exec(getExecCommand(queryParams), { encoding: UTF8 }, (error, stdout, stderr) => {
      error
        ? send(response, { message: JSON.stringify(error || stderr) })
        : send(response, { message: stderr.concat(stdout) });
    });
  } else {
    const data = readDirectory(COMMAND_DIRECTORY);

    send(response, { data });
  }
};

const handleDbResponse = async (request, response) => {
  if (request.method === METHOD_POST) {
    const payload = await resolvePostBody(request);

    const content = payload.content;
    const filename = payload.filename;

    const { message, error } = writeToFile(`${DB_DIRECTORY}/${filename}`, content);

    send(response, { message, error });
  } else {
    const queryParams = url.parse(request.url, true).query;
    const data = queryParams.name
      ? loadFile(`${DB_DIRECTORY}/${queryParams.name}`)
      : readDirectory(DB_DIRECTORY);

    send(response, { data });
  }
};

const handleMockServerPostResponses = async (request, response) => {
  const payload = await resolvePostBody(request);

  if (request.url.includes('config')) {
    const { message, error } = updateConfiguration(payload);

    send(response, { message, error });
  } else if (request.url.includes('loadMockResponse')) {
    const data = loadMockResponse(payload.responsePath);

    send(response, { data });
  } else if (request.url.includes('deleteMockEndpoint')) {
    const { message, error } = removeMockRequestsEntry(payload);

    send(response, { message, error });
  } else if (request.url.includes('createMockEndpoint')) {
    const { message, error } = createMockFile(payload);

    send(response, { message, error });
  } else if (request.url.includes('updateMockEndpoint')) {
    const { message, error } = updateMockFile(payload);

    send(response, { message, error });
  }
};

const handleMockServerResponse = (request, response) => {
  if (request.method === METHOD_POST) {
    handleMockServerPostResponses(request, response);
  } else if (request.url.includes('config')) {
    const data = loadConfiguration();

    send(response, { data });
  } else if (request.url.includes('mockRequests')) {
    const data = loadMockRequests();

    send(response, { data });
  } else if (request.url.includes('clearLog')) {
    const { message, error } = clearLog();

    send(response, { message, error });
  } else if (request.url.includes('loadLog')) {
    const data = loadLog();

    send(response, { data });
  }
};

const handleMockResponse = async ({ payload, reqUrl, method }, response) => {
  const matchedResponse = getMatchedMockResponse(reqUrl, method);

  if (matchedResponse && matchedResponse.conditionalResponse) {
    const matchedConditionalResponse = matchedResponse.conditionalResponse.find((item) =>
      isEqual(item.payload, payload)
    );
    const responsePayload = (matchedConditionalResponse && matchedConditionalResponse.body) || matchedResponse.body;

    response.writeHead(matchedResponse.status, matchedResponse.headers);
    response.end(JSON.stringify(responsePayload), UTF8);
  } else if (matchedResponse) {
    response.writeHead(matchedResponse.status, matchedResponse.headers);
    response.end(JSON.stringify(matchedResponse.body), UTF8);
  } else {
    send(response, { message: NOT_FOUND, error: true });
  }
};

const handleStaticResponse = (request, response) => {
  const filePath = ROOT_DIR + request.url;
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || TYPE_OCTET;

  fs.readFile(filePath, (error, content) => {
    if (error) {
      send(response, { message: NOT_FOUND, error: true });
    } else {
      response.writeHead(STATUS_OK, { 'Content-Type': contentType });
      response.end(content, UTF8);
    }
  });
};

const handleDefaultResponse = async (request, response) => {
  const { delay, delayUrls, error, log, overrideUrls, overrideStatusCode, overrideResponse } = loadConfiguration();
  const shouldDelayAllUrls = !delayUrls.length;
  const shouldDelayThisUrl = delayUrls.some((item) => item === request.url);
  const matchedUrl = overrideUrls.some((endpoint) => endpoint === request.url);

  const payload = request.method === METHOD_POST ? await resolvePostBody(request) : {};

  if (log) {
    logEntry(request.url, payload);
  }
  if (error) {
    send(response, { message: MOCK_SERVER_ERROR, error: true });
  } else if (matchedUrl) {
    response.writeHead(overrideStatusCode, STANDARD_HEADER);
    response.end(JSON.stringify(overrideResponse), UTF8);
  } else if (shouldDelayAllUrls || shouldDelayThisUrl) {
    setTimeout(() => {
      handleMockResponse({ payload, reqUrl: request.url, method: request.method }, response);
    }, delay);
  } else {
    handleMockResponse({ payload, reqUrl: request.url, method: request.method }, response);
  }
};

const handleRequest = async (request, response) => {
  if (request.url.includes('file')) {
    handleFileResponse(request, response);
  } else if (request.url.includes('command')) {
    handleCommandResponse(request, response);
  } else if (request.url.includes('db')) {
    handleDbResponse(request, response);
  } else if (request.url.includes('project')) {
    const queryParameters = url.parse(request.url, true).query;
    const payload = request.method === METHOD_POST ? await resolvePostBody(request) : {};

    const { data, message, error } = await projectController(queryParameters, payload);

    send(response, { data, message, error });
  } else if (request.url.includes('mockserver')) {
    handleMockServerResponse(request, response);
  } else if (path.extname(request.url)) {
    handleStaticResponse(request, response);
  } else {
    handleDefaultResponse(request, response);
  }
};

http
  .createServer((request, response) => {
    cors(response);
    handleRequest(request, response);
  })
  .listen(parseInt(port));

console.log(`Server listening on port ${port}`);
