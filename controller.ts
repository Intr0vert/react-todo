import {Request, Response} from 'express';

export let addTask = (req: Request, res: Response) => {
    res.send('Returns one task');
}