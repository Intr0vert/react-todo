import {Request, Response} from 'express';
import Task from './../task';

export let allTasks = (req: Request, res: Response) => {
    Task.find((err: any, tasks: any) => {
        if (err) {
            res.send("Error!");
        } else {
            res.send(tasks);
        }
    });
};

export let getTask = (req: Request, res: Response) => {
    Task.findById(req.params.id, (err: any, task: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send(task);
        }
    });
};

export let deleteTask = (req: Request, res: Response) => {
    Task.deleteOne({ _id: req.params.id }, (err: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send("Successfully Deleted task");
        }
    });
};

export let updateTask = (req: Request, res: Response) => {
    console.log(req);
    Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        (err: any, task: any) => {
            if (err) {
                res.send(err);
            } else {
                res.send("Successfully updated task!");
            }
        }
    );
};

export let addTask = (req: Request, res: Response) => {
    let task = new Task(req.body);
  
    task.save((err: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send(task);
        }
    });
};