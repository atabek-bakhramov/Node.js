/**
 * Exercise 3: Create an HTTP web server
 */

const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
	let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
	let extName = path.extname(filePath);

	fs.readFile(filePath, (err, content) => {

		const extensions = {
			'.js': 'text/javascript',
			'.css': 'text/css',
			'.json': 'application/json',
			'.png': 'image/png',
			'.jpg': 'image/jpg'
		};

		if (err) {
			if (err.code === 'ENOENT') {
				fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
					res.writeHead(200, { 'Content-Type': 'text/html' });
					res.end(content, 'utf8');
				})
			} else {
				// some server error
				res.writeHead(500);
				res.end(`Server error ${err.code}`);
			}
		} else {
			res.writeHead(200, {
				'Content-Type': extensions[extName] || 'text/html'
			});
			res.end(content, 'utf8');
		}
	});
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`server is running on ${PORT}`));





// //create a server
// let server = http.createServer(function (req, res) {
// 	// YOUR CODE GOES IN HERE
// 	res.write('Hello World!'); // Sends a response back to the client
// 	res.end(); // Ends the response
// });

// server.listen(3000); // The server starts to listen on port 3000