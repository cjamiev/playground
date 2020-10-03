const http = require('http');
const fs = require('fs');

const port = process.argv[2] || 1002;
const UTF8 = 'utf-8';
const TYPE_JSON = 'application/json';

const STATUS_OK = 200;
const METHOD_POST = 'POST';

const cors = res => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
};

const writeToFile = (filepath, content) => {
  try {
    fs.writeFileSync(filepath, content);
    return {
      error: false,
      message: 'Wrote to file:' + filepath
    };
  } catch (e) {
    return {
      error: true,
      message: e
    };
  }
};

const loadFile = (filepath) => {
  return fs.existsSync(filepath) ? fs.readFileSync(filepath, UTF8) : null;
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

const handlePostResponse = async (request, response) => {
  const payload = await resolvePostBody(request);
  response.writeHead(STATUS_OK, { 'Content-Type': TYPE_JSON });

  const content = payload.content || '';
  const filename = payload.filename || 'no-name-' + new Date().toString().slice(4, 24).replace(/ /g, '.').replace(/:/g, '.');
  const filepath = payload.filepath || './storage/';

  const data = writeToFile(filepath + filename, JSON.stringify(content));

  response.end(JSON.stringify({ data }), UTF8);
};

const handleResponse = (request, response) => {
  response.writeHead(STATUS_OK, { 'Content-Type': TYPE_JSON });

  const data = loadFile('./' + request.url);
  response.end(JSON.stringify({ data }), UTF8);
};

http.createServer((request, response) => {
  cors(response);
  if (request.method === METHOD_POST) {
    handlePostResponse(request, response);
  }
  else {
    handleResponse(request, response);
  }
}).listen(parseInt(port));

console.log(`Server listening on port ${port}`);