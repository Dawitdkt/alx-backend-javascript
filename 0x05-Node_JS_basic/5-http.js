const http = require('http');
const { countStudents } = require('./3-read_file_async');

const hostname = '127.0.0.1';
const port = 1245;

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === 'GET') {
    if (url === '/') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hello Holberton School!\n');
    } else if (url === '/students') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');

      countStudents('database.csv')
        .then(() => {
          res.end();
        })
        .catch((error) => {
          console.error(error.message);
          res.end('Cannot load the database\n');
        });
    } else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Not Found\n');
    }
  } else {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Method Not Allowed\n');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = server;
