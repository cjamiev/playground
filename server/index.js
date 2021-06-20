const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { loadFile, readDirectory } = require('../utils/read');
const { writeToFile } = require('../utils/write');

const port = process.argv[2] || 1000;
const ROOT_DIR = './server/static/';
const UTF8 = 'utf-8';
const TYPE_JSON = 'application/json';
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
const NOT_FOUND = 'file not found';
const STATUS_OK = 200;
const STATUS_ERROR = 500;
const METHOD_POST = 'POST';

const cors = res => {
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
      const result = queryData.length && JSON.parse(queryData.join().toString('utf8'));
      resolve(result);
    });
  });

  const result = await promise;

  return result;
};

const handlePostResponse = async (request, response) => {
  const payload = await resolvePostBody(request);
  response.writeHead(STATUS_OK, { 'Content-Type': TYPE_JSON });

  const content = payload.content || '';
  const filename = payload.filename || 'no-name-' + new Date().toString().slice(4, 24).replace(/ /g, '.').replace(/:/g, '.');
  const filepath = payload.filepath || './tmp/';

  const data = writeToFile(filepath + filename, content);

  response.end(JSON.stringify({
    data,
    url: request.url,
    method: METHOD_POST,
    payload,
    timestamp: new Date()
  }), UTF8);
};

const handleStaticResponse = (request, response) => {
  const filePath = (request.url === '/' || request.url === '/index.html') ? ROOT_DIR + 'index.html' : ROOT_DIR + request.url;
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || TYPE_OCTET;

  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(STATUS_ERROR);
      response.end(NOT_FOUND);
    } else {
      response.writeHead(STATUS_OK, { 'Content-Type': contentType });
      response.end(content, UTF8);
    }
  });
};

const handleResponse = (request, response) => {
  response.writeHead(STATUS_OK, { 'Content-Type': TYPE_JSON });
  const queryParams = url.parse(request.url, true).query;

  if (queryParams.read === 'true') {
    const data = loadFile('./tmp/' + queryParams.name + '.' + queryParams.ext);
    response.end(JSON.stringify({ data }), UTF8);
  }
  else if (queryParams.readdir === 'true') {
    const data = readDirectory('./tmp');
    response.end(JSON.stringify({ data }), UTF8);
  }
  else {
    response.end(JSON.stringify({
      url: request.url,
      method: request.method,
      timestamp: new Date()
    }), UTF8);
  }
};

http.createServer((request, response) => {
  cors(response);
  if (request.method === METHOD_POST) {
    handlePostResponse(request, response);
  }
  else if (path.extname(request.url)) {
    handleStaticResponse(request, response);
  }
  else {
    handleResponse(request, response);
  }
}).listen(parseInt(port));

console.log(`Server listening on port ${port}`);