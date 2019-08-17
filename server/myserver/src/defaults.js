const STATUS_OK = 200;
const NOT_FOUND = 404;
const DELAY = 250;
const RESPONSE_TYPE_JSON = { 'Content-Type': 'application/json' };

const DEFAULT_CALLBACK = (portnumber) => {
  console.log(`Server running at http://127.0.0.1:${portnumber}/`);
};

const DEFAULT_ERROR_ROUTE = (req, res) => {
  setTimeout(() => {
    if (!res._headerSent) {
      res.writeHead(NOT_FOUND, RESPONSE_TYPE_JSON);
      res.end(JSON.stringify({ message: `request is invalid with method:${req.method} and url:${req.url}` }));
    }
  }, DELAY);
};

const DEFAULT_METHOD_OPTIONS_RESPONSE = (req, res) => {
  res.writeHead(STATUS_OK, RESPONSE_TYPE_JSON);
  res.end();
};

module.exports = {
  DEFAULT_CALLBACK,
  DEFAULT_ERROR_ROUTE,
  DEFAULT_METHOD_OPTIONS_RESPONSE
};