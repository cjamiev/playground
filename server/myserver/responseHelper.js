const UTF8 = 'utf-8';
const STATUS_OK = 200;
const RESPONSE_TYPE_JSON = { 'Content-Type': 'application/json' };
const RESPONSE_TYPE_HTML = { 'Content-Type': 'text/html' };

const send = (response, data) => {
  response.writeHead(STATUS_OK, RESPONSE_TYPE_JSON);
  response.end(JSON.stringify(data));
};

const sendHTML = (response, data) => {
  response.writeHead(STATUS_OK, RESPONSE_TYPE_HTML);
  response.end(data, UTF8);
};

module.exports = { send, sendHTML };