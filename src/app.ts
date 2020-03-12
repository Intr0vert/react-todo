require('dotenv').config();

const morgan = require('morgan');
import cors = require('cors');
import express, { Request, Response } from "express";
import * as taskController from "./controllers/taskController";

const app: express.Application = express();
const assert = require('assert');

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(morgan('dev'));
app.set("port", process.env.PORT || 3000);

app.get("/", function(req: Request, res: Response) {
  res.send("Hey!");
});

app.get("/tasks", taskController.allTasks);
app.get("/task/:id", taskController.getTask);
app.post("/task", taskController.addTask);
app.put("/task/:id", taskController.updateTask);
app.delete("/task/:id", taskController.deleteTask);

const server = app.listen(app.get("port"), () => {
  console.log("App is running on http://localhost:%d", app.get("port"));
});