const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const port = process.argv[2] || 8080;

http
  .createServer((request, response) => {
    const uri = url.parse(request.url).pathname;
    let filename = path.join(process.cwd(), uri);

    const contentTypesByExtension = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'text/javascript'
    };

    fs.exists(filename, (exists) => {
      if (!exists) {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.write('404 Not Found\n');
        response.end();
        return;
      }

      if (fs.statSync(filename).isDirectory()) filename += '/src/index.html';

      fs.readFile(filename, 'binary', (err, file) => {
        if (err) {
          response.writeHead(500, { 'Content-Type': 'text/plain' });
          response.write(err + '\n');
          response.end();
          return;
        }
        const headers = {};
        const contentType = contentTypesByExtension[path.extname(filename)];
        if (contentType) headers['Content-Type'] = contentType;
        response.writeHead(200, headers);
        response.write(file, 'binary');
        response.end();
      });
    });
  })
  .listen(parseInt(port, 10));

console.log('Static file server running at\n  => http://localhost:' + port + '/\nCTRL + C to shutdown');
