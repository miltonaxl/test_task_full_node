import { Request, Response } from 'express';
import { TaskService } from './task.service';

const taskService = new TaskService();

export class TaskController {
    static async create(req: Request, res: Response) {
        try {
            const task = await taskService.create(req.body);
            return res.status(201).json(task);
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

    static async getAll(_req: Request, res: Response) {
        const tasks = await taskService.getAll();
        return res.json(tasks);
    }
}
