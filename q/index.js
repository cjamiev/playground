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
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword'
};

const getCommand = (command) => `cd ./scripts && ${command}`;

const getFilePath = (url) => {
	if(url === '/' || url === '/index.html'){
		return './index.html';
	} else if(url.includes('/command')){
		return url.replace('/command','');
	} else {
		return '.' + url;
	}
};

const executeCommand = (filepath) => {
	try {
		return execSync(getCommand(filepath), { encoding: UTF8 } );
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

const sendFile = (filePath, response) => {
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

http.createServer(function (request, response) {
  const filepath = getFilePath(request.url);
	
	if(filepath.includes('.bat')){
		executeCommand(filepath, response);
	} else {
		sendFile(filepath, response);
	}
}).listen(parseInt(port));

console.log(`Server listening on port ${port}`);