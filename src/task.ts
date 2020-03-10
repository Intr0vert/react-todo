require('dotenv').config();
import mongoose from 'mongoose';

let uri : string;

if (process.env.mongoDB) {
  uri = process.env.mongoDB;
} else {
  throw 'Some problems with connection';
}

mongoose.connect(uri, (err: any) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Successfully Connected!");
  }
});

export interface ITask extends mongoose.Document {
  title: string;
}

export const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
}, {
  collection: 'task'
});

const Task = mongoose.model<ITask>("Task", TaskSchema);
export default Task;