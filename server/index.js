const routerOne = (req, res) => {
        if(req.url === '/test'){
            console.log('get1');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'testing get'}));        
        }
        if(req.url === '/test2'){
            console.log('get2');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'testing get2'}));        
        }
};

const routerTwo = (req, res) => {
        if(req.url === '/test'){
            console.log('post1');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'testing post'}));        
        }
        if(req.url === '/test2'){
            console.log('post2');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'testing post2'}));        
        } 
};

const route = (routesGET, routesPOST) => (request, response) => {
    if(request.method === 'GET'){
      routesGET(request, response);
    } else {
      routesPOST(request, response);
    }
};

const testResponse = (request, response) => {
    console.log('request ', request.url, request.method);
    response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Request-Method', '*');
	response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	response.setHeader('Access-Control-Allow-Headers', '*');

    route(routerOne, routerTwo)(request, response);
};

const http = require('http');
http.createServer(testResponse).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');