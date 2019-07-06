var http = require('http');

const router = {
    get: (req, res) => {
        if(req.url === '/test'){
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'testing get'}));        
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'testing get other'}));
        }

    },
    post: (req, res) => {
        if(req.url === '/test'){
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'testing post'}));        
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'testing get post'}));
        }
    }
};

const route = (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Request-Method', '*');
	response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	response.setHeader('Access-Control-Allow-Headers', '*');

    if(request.method === 'GET'){
      router.get(request, response);
    } else {
      router.post(request, response);
    }
};

const testResponse = (request, response) => {
    console.log('request ', request.url);

    route(request, response);
};

const defaultResponse = require('./defaultResponse').defaultResponse;

http.createServer(testResponse).listen(8080);
console.log('Server running at http://127.0.0.1:8080/');