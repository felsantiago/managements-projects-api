import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Task from '../infra/typeorm/entities/Task';
import ITaksRepository from '../repositories/ITasksRepository';

interface IRequest {
  description: string;
  project_id: string;
  end_date: string;
  user_id: string;
}

@injectable()
class CreateTaskService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITaksRepository,

    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute({
    description,
    end_date,
    project_id,
    user_id,
  }: IRequest): Promise<Task> {
    const project = await this.projectsRepository.findById(project_id);

    if (!project) {
      throw new AppError('Project not found', 404);
    }

    if (user_id !== project.user_id) {
      throw new AppError('You cannot update this project');
    }

    const task = await this.tasksRepository.create({
      description,
      end_date,
      project_id,
      user_id
    });

    return task;
  }
}

export default CreateTaskService;
