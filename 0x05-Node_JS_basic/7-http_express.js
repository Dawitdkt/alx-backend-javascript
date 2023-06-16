const express = require('express');
const fs = require('fs');
const { countStudents } = require('./3-read_file_async');

const app = express();
const port = 1245;
const database = 'database.csv';

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  countStudents(database)
    .then(() => {
      const readableStream = fs.createReadStream(database);

      res.setHeader('Content-Type', 'text/plain');
      res.write('This is the list of our students\n\n');

      readableStream.on('data', (chunk) => {
        res.write(chunk);
      });

      readableStream.on('end', () => {
        res.end();
      });
    })
    .catch((error) => {
      res.status(500).send(`Cannot load the database: ${error.message}`);
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

module.exports = app;
