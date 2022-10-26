import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import ITaksRepository from '../repositories/ITasksRepository';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DeleteService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITaksRepository,
  ) { }

  public async execute({
    id,
    user_id,
  }: IRequest): Promise<void> {
    const task = await this.tasksRepository.findById(id);

    if (!task) {
      throw new AppError('Task not found', 404);
    }

    if (user_id !== task.user_id || task.concluded) {
      throw new AppError('You cannot delete this task');
    }

    await this.tasksRepository.delete(id);
  }
}

export default DeleteService;
