const execSync = require('child_process').execSync;
const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.argv[2] || 9000;

const UTF8 = 'utf-8';
const mimeTypes = {
  '.ico': 'image/x-icon',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword'
};

const getPath = (url) => {
	if(url === '/' || url === '/index.html'){
		return './index.html';
	} else if(url === '/command'){
		return 'command';
	} else {
		return '.' + url;
	}
}

const executeCommand = (command) => {
	try {
		return execSync(command, { encoding: UTF8 } );
	} catch (ex) {
		return {
			error: true,
			message: {
				status: ex.status,
				message: ex.message
			}
		};
	}
};

const fileResponse = (filePath, response) => {
	const extname = String(path.extname(filePath)).toLowerCase();
	const contentType = mimeTypes[extname] || 'application/octet-stream';
	
	fs.readFile(filePath, function(error, content){
      if(error){
        response.writeHead(500);
        response.end('file not found');
      } else {
				response.writeHead(200, {'Content-type': contentType});
        response.end(content, UTF8);
      }
    });
}

const handleResponse = (endpoint, response) => {
	if(endpoint === 'command'){
		executeCommand('ls');
	} else {
		fileResponse(endpoint, response);
	}
}

http.createServer(function (request, response) {
  const endpoint = getPath(request.url);
	
	handleResponse(endpoint, response);
}).listen(parseInt(port));

console.log(`Server listening on port ${port}`);