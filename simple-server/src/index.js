const execSync = require('child_process').execSync;
const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.argv[2] || 1000;
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
const EXTENSION_BAT = '.bat';
const NOT_FOUND = 'file not found';
const STATUS_OK = 200;
const STATUS_ERROR = 500;
const METHOD_GET = 'GET';
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
      resolve(JSON.parse(queryData.join().toString('utf8')));
    });
  });

  const result = await promise;

  return result;
};

const getCommand = (command) => `cd ./scripts && ${command}`;

const getFilePath = (url) => {
  if (url === '/' || url === '/index.html') {
    return './src/static/index.html';
  } else if (url.includes('/command')) {
    return url.replace('/command', '');
  } else {
    return './src/static/' + url;
  }
};

const executeCommand = (filepath, response) => {
  try {
    const result = execSync(getCommand(filepath), { encoding: UTF8 });

    response.writeHead(STATUS_OK, { 'Content-Type': TYPE_JSON });
    response.end(JSON.stringify({ message: result }), UTF8);
  } catch (ex) {
    response.writeHead(STATUS_ERROR, { 'Content-Type': TYPE_JSON });
    response.end(JSON.stringify({
      error: true,
      message: {
        status: ex.status,
        message: ex.message
      }
    }));
  }
};

const staticRoute = (filePath, response) => {
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

http.createServer(async (request, response) => {
  cors(response);
  if (request.method === METHOD_POST) {
    const result = await resolvePostBody(request);

    console.log(result);
    response.writeHead(STATUS_OK, { 'Content-Type': TYPE_JSON });
    response.end(JSON.stringify(result), UTF8);
  }

  else {
    const filepath = getFilePath(request.url);

    if (filepath.includes(EXTENSION_BAT)) {
      executeCommand(filepath, response);
    } else {
      staticRoute(filepath, response);
    }
  }
}).listen(parseInt(port));

console.log(`Server listening on port ${port}`);