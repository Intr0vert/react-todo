require('dotenv').config();
import mongoose from 'mongoose';

let uri : string;

mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

if (process.env.mongoDB) {
  uri = process.env.mongoDB;
} else {
  throw new Error('Some problems with connection');
}

mongoose.connect(uri, (err: Error) => {
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
