import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Task from '../infra/typeorm/entities/Task';
import ITaksRepository from '../repositories/ITasksRepository';

interface IRequest {
  id: string;
  description: string;
  end_date: Date;
  concluded: boolean;
  user_id: string;
}

@injectable()
class UpdateTaskService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITaksRepository,
  ) {}

  public async execute({
    id,
    description,
    end_date,
    concluded,
    user_id,
  }: IRequest): Promise<Task> {
    const task = await this.tasksRepository.findById(id);

    if (!task) {
      throw new AppError('Task not found', 404);
    }

    if (user_id !== task.user_id || task.concluded) {
      throw new AppError('You cannot update this task');
    }

    task.description = description;
    task.end_date = end_date;
    task.concluded = !!concluded;

    await this.tasksRepository.save(task);

    return task;
  }
}

export default UpdateTaskService;
