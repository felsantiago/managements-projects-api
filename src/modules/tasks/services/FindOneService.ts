import { injectable, inject } from 'tsyringe';
import Task from '../infra/typeorm/entities/Task';
import ITaksRepository from '../repositories/ITasksRepository';

interface IRequest {
  id: string,
  user_id: string;
}

@injectable()
class FindService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITaksRepository,
  ) {}

  public async execute({
    id,
    user_id,
  }: IRequest): Promise<Task | undefined> {
    const task = await this.tasksRepository.findOne(id, user_id);
    return task;
  }
}

export default FindService;
