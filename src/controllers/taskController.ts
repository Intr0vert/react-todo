// eslint-disable-next-line no-unused-vars
import {Request, Response} from 'express';
import Task from './../task';
import { Todo } from '../types/todo';

export const allTasks = (req: Request, res: Response) => {
  Task.find((err: Error, tasks: Array<Todo>) => {
    console.log(tasks);
    if (err) {
      res.send('Error!');
    } else {
      res.send(tasks);
    }
  });
};

export const getTask = (req: Request, res: Response) => {
  Task.findById(req.params.id, (err: Error, task: Todo) => {
    if (err) {
      res.send(err);
    } else {
      res.send(task);
    }
  });
};

export const deleteTask = (req: Request, res: Response) => {
  Task.deleteOne({_id: req.params.id}, (err: Error) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Successfully Deleted task');
    }
  });
};

export const updateTask = (req: Request, res: Response) => {
  Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      (err: Error) => {
        if (err) {
          res.send(err);
        } else {
          res.send('Successfully updated task!');
        }
      },
  );
};

export const addTask = (req: Request, res: Response) => {
  const task = new Task(req.body);
  task.save((err: Error) => {
    if (err) {
      res.send(err);
    } else {
      res.send(JSON.stringify(task._id));
    }
  });
};
