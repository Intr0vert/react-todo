// eslint-disable-next-line no-unused-vars
import {Request, Response} from 'express';
import Task from './../task';

export const allTasks = (req: Request, res: Response) => {
  Task.find((err: any, tasks: any) => {
    if (err) {
      res.send('Error!');
    } else {
      res.send(tasks);
    }
  });
};

export const getTask = (req: Request, res: Response) => {
  Task.findById(req.params.id, (err: any, task: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(task);
    }
  });
};

export const deleteTask = (req: Request, res: Response) => {
  Task.deleteOne({_id: req.params.id}, (err: any) => {
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
      (err: any, task: any) => {
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

  task.save((err: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(task);
    }
  });
};
