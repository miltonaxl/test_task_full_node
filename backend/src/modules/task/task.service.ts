import { TaskRepository } from './task.repository';
import { CreateTaskDto } from './dtos/create-task.dto';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

export class TaskService {
    async create(data: CreateTaskDto) {
        const dto = plainToInstance(CreateTaskDto, data);
        await validateOrReject(dto);
        return await TaskRepository.createTask(dto.name, dto.description);
    }

    async getAll() {
        return await TaskRepository.getAllTasks();
    }
}
