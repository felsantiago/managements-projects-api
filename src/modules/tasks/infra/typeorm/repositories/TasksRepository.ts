import { getRepository, Repository } from 'typeorm';
import ICreateTaskDTO from '@modules/tasks/dtos/ICreateTaskDTO';
import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import Task from '../entities/Task';

class TaskRepository implements ITasksRepository {
  private ormRepository: Repository<Task>;

  constructor() {
    this.ormRepository = getRepository(Task);
  }

  public async create({
    description,
    end_date,
    project_id,
    user_id
  }: ICreateTaskDTO): Promise<Task> {
    const task = this.ormRepository.create({
      description,
      project_id,
      end_date,
      user_id,
      concluded: false
    });

    await this.ormRepository.save(task);

    return task;
  }

  public async save(task: Task): Promise<Task> {
    return this.ormRepository.save(task);
  }

  public async findById(id: string): Promise<Task | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findOne(id: string, user_id: string): Promise<Task | undefined> {
    const task = await this.ormRepository.findOne({
      where: {
        id,
        user_id
      },
    });

    return task;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default TaskRepository;
