require('dotenv').config();
import mongoose from 'mongoose';

let uri : string;

if (process.env.mongoDB) {
  uri = process.env.mongoDB;
} else {
  throw new Error('Some problems with connection');
}

mongoose.connect(uri, (err: any) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log('Successfully Connected!');
  }
});

export interface ITask extends mongoose.Document {
  id: number,
  title: string,
  description: string,
  isDone: boolean
}

export const TaskSchema = new mongoose.Schema({
  id: {type: Number, required: true},
  title: {
    type: String, required: true,
  },
  description: {type: String, required: false},
  isDone: {type: Boolean, required: true},
}, {
  collection: 'task',
});

const Task = mongoose.model<ITask>('Task', TaskSchema);
export default Task;
