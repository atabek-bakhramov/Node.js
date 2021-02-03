/**
 * Exercise 3: Create an HTTP web server
 */

const http = require('http');
const path = require('path');
const fs = require('fs');

function handleError(res, mistake) {
  if (mistake.code === 'ENOENT') {
    fs.readFile(path.join(__dirname, 'public', '404.html'), (fileNotFoundError, content) => {
      if (fileNotFoundError) {
        res.writeHead(500);
        res.end(`404 error file not found: ${fileNotFoundError.message}`);
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf8');
      }
    });
  } else {
    res.writeHead(500);
    res.end(`Server error ${mistake.code}`);
  }
}

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  const extName = path.extname(filePath);

  fs.readFile(filePath, (err, content) => {
    const extensions = {
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpg',
    };

    if (err) {
      handleError(res, err);
    } else {
      res.writeHead(200, {
        'Content-Type': extensions[extName] || 'text/html',
      });
      res.end(content, 'utf8');
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server is running on ${PORT}`));
