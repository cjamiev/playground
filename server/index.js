const router = require('./router');

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

const route = (router) => {
    return (request, response) => {
        const { routesWithMethodGet, routesWithMethodPost } = router.entries();
        console.log(routesWithMethodGet, routesWithMethodPost);
    
        if(request.method === 'GET'){
          routesWithMethodGet.forEach(route => route(request, response));
        } else {
          routesWithMethodPost.forEach(route => route(request, response));
        }
    };
};

const testResponse = (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Request-Method', '*');
	response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	response.setHeader('Access-Control-Allow-Headers', '*');

    const routes = router().get(routerOne).post(routerTwo);

    route(routes)(request, response);
};

const http = require('http');
http.createServer(testResponse).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');