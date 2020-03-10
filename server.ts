import env from "process-env";
 
env.get('path');

import express, { Request, Response } from "express";
import * as taskController from "./controller";

const MongoClient = require('mongodb').MongoClient;
const app: express.Application = express();
const assert = require('assert');

app.set("port", process.env.PORT || 3000);

MongoClient.connect('app.set("port", process.env.PORT || 3000);mongodb://localhost:27017', (err, client) => {
  assert.equal(null, err);
});

app.get("/", function(req: Request, res: Response) {
  res.send("Hey!");
});

app.get('/tasks', taskController.addTask);

const server = app.listen(app.get("port"), () => {
  console.log("App is running on http://localhost:%d", app.get("port"));
});