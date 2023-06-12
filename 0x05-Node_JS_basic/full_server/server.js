import express from 'express';
import routes from './routes';

const app = express();
const port = 1245;
const databaseFilePath = process.argv[2];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom middleware to pass the database file path to the request object
app.use((req, res, next) => {
  req.databaseFilePath = databaseFilePath;
  next();
});

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

export default app;
