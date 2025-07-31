import { AppDataSource } from '../../data-source';
import { Task } from './task.entity';

export const TaskRepository = AppDataSource.getRepository(Task).extend({
    async createTask(name: string, description: string) {
        const task = this.create({ name, description });
        return await this.save(task);
    },

    async getAllTasks() {
        return await this.find();
    }
});
