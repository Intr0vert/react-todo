/* eslint-disable indent */
require('dotenv').config();

import * as bodyParser from 'body-parser';
import morgan from 'morgan';
import express, {
  Request,
  Response,
 } from 'express';
import * as taskController from './controllers/taskController';

const app: express.Application = express();
import 'assert';

app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});
app.use(morgan('dev'));
app.set('port', process.env.PORT || 3000);

app.get('/', function(req: Request, res: Response) {
  res.send('Hey!');
});

app.get('/tasks', taskController.allTasks);
app.get('/task/:id', taskController.getTask);
app.post('/task', taskController.addTask);
app.put('/task/:id', taskController.updateTask);
app.delete('/task/:id', taskController.deleteTask);

app.listen(app.get('port'), () => {
  console.log('App is running on http://localhost:%d', app.get('port'));
});
