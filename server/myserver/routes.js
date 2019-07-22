const router = require('./router');
const fs = require('fs');

const routerOne = (req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    fs.readFile('./myserver/index.html', (err, content) => {
      if (err) {
        fs.readFile('./404.html', (err, content404) => {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(content404, 'utf-8');
        });
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
      }
    });
  }
  if (req.url === '/test') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'testing get' }));
  }
  if (req.url === '/test2') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'testing get2' }));
  }
  else {
    return;
  }
};

const routerOneOne = (req, res) => {
  if (req.url === '/test3') {
    console.log('oneone');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'testing get3' }));
  }
  if (req.url === '/test4') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'testing get4' }));
  }
};

const routerTwo = (req, res) => {
  if (req.url === '/test') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'testing post' }));
  }
  if (req.url === '/test2') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'testing post2' }));
  }
};

const routes1 = router().get(routerOne).post(routerTwo);
const routes2 = router().get(routerOneOne);

module.exports = {
  routes1,
  routes2
};